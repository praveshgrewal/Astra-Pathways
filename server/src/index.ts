import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { initDatabase, db } from './db/index.js';
import { seedDatabase } from './db/seed.js';
import authRoutes from './routes/auth.js';
import programsRoutes from './routes/programs.js';
import leadsRoutes from './routes/leads.js';
import contentRoutes from './routes/content.js';
import studentRoutes from './routes/student.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const isProd = process.env.NODE_ENV === 'production';

// Render / Reverse Proxy trust for accurate client IP rate limiting
app.set('trust proxy', 1);

// Initialize Database schema
initDatabase();

// Auto-seed initial data if database is fresh/empty
try {
  const row = db.prepare('SELECT COUNT(*) as count FROM programs').get() as { count: number };
  if (row && row.count === 0) {
    console.log('🌱 Fresh empty database detected. Auto-seeding initial production data...');
    seedDatabase(false);
  }
} catch (err) {
  console.warn('Auto-seed check note:', err);
}

// 1. Security Headers (Helmet)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      connectSrc: ["'self'", "https:"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 2. Rate Limiters
// General API rate limiter: 200 requests per 15 min
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
  }
});

// Strict Auth limiter: 15 login/registration requests per 15 min (brute force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.'
  }
});

// Lead / Contact inquiry limiter: 10 submissions per 15 min (anti-spam)
const leadsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many inquiries submitted from this connection. Please wait a few minutes before submitting again.'
  }
});

// 3. Dynamic CORS configuration
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map(s => s.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. same-origin static assets, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (!isProd || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Cross-Origin Request Blocked by Security Policy'));
  },
  credentials: true
}));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// 4. Static uploads directory
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// 5. API Routes with rate limiting
app.use('/api/', apiLimiter);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/programs', programsRoutes);
app.use('/api/leads', leadsLimiter, leadsRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    name: 'Astra Pathways EdTech Platform',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// 6. Production Static Client Serving & SPA Routing
let clientDistPath: string | null = null;
const candidatePaths = [
  path.resolve(process.cwd(), 'client', 'dist'),
  path.resolve(process.cwd(), '..', 'client', 'dist'),
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist')
];

for (const candidate of candidatePaths) {
  if (fs.existsSync(candidate) && fs.existsSync(path.join(candidate, 'index.html'))) {
    clientDistPath = candidate;
    break;
  }
}

if (clientDistPath) {
  console.log(`📦 Serving production client bundle from: ${clientDistPath}`);
  app.use(express.static(clientDistPath));

  // SPA fallback for all non-API and non-upload GET routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath!, 'index.html'));
  });
} else {
  console.log('ℹ️ Client dist directory not found (running in standalone API mode)');
}

// 7. Sanitized Error Handling
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: isProd && status >= 500
      ? 'An unexpected error occurred. Please try again later.'
      : (err.message || 'Internal Server Error')
  });
});

// 8. Bind Server to 0.0.0.0
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Astra Pathways Server running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Environment:  ${process.env.NODE_ENV || 'development'}`);
});

// 9. Graceful Process Termination
const gracefulShutdown = (signal: string) => {
  console.log(`\nReceived ${signal}. Shutting down server gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    try {
      db.close();
      console.log('Database connection closed cleanly.');
    } catch (e) {
      console.error('Error closing database:', e);
    }
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
