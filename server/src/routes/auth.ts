import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { db } from '../db/index.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'astra_pathways_dev_jwt_secret_key_change_in_production_2026';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional()
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ success: false, message: 'Invalid credentials format', errors: result.error.errors });
    return;
  }

  const { email, password } = result.data;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase()) as any;

  if (!user) {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
    return;
  }

  const isValid = bcrypt.compareSync(password, user.password_hash);
  if (!isValid) {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      bio: user.bio,
      phone: user.phone
    }
  });
});

// POST /api/auth/register (Student registration)
router.post('/register', (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ success: false, message: 'Validation failed', errors: result.error.errors });
    return;
  }

  const { name, email, password, phone } = result.data;
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  if (existing) {
    res.status(409).json({ success: false, message: 'An account with this email address already exists' });
    return;
  }

  const userId = 'usr_' + uuidv4().slice(0, 8);
  const passwordHash = bcrypt.hashSync(password, 10);

  db.prepare(`
    INSERT INTO users (id, email, password_hash, name, role, phone)
    VALUES (?, ?, ?, ?, 'student', ?)
  `).run(userId, email.toLowerCase(), passwordHash, name, phone || '');

  // Automatically enroll new student in full-stack-web-development as starter track
  db.prepare(`
    INSERT INTO student_enrollments (id, user_id, program_id, progress_percent)
    VALUES (?, ?, 'full-stack-web-development', 0)
  `).run('enr_' + uuidv4().slice(0, 8), userId);

  const token = jwt.sign(
    { id: userId, email: email.toLowerCase(), name, role: 'student' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    token,
    user: {
      id: userId,
      email: email.toLowerCase(),
      name,
      role: 'student',
      phone: phone || ''
    }
  });
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req: AuthRequest, res) => {
  const user = db.prepare('SELECT id, email, name, role, bio, phone, created_at FROM users WHERE id = ?').get(req.user?.id) as any;
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }
  res.json({ success: true, user });
});

// PUT /api/auth/profile
router.put('/profile', authenticateToken, (req: AuthRequest, res) => {
  const { name, bio, phone } = req.body;
  db.prepare('UPDATE users SET name = COALESCE(?, name), bio = COALESCE(?, bio), phone = COALESCE(?, phone) WHERE id = ?')
    .run(name, bio, phone, req.user?.id);

  const updated = db.prepare('SELECT id, email, name, role, bio, phone FROM users WHERE id = ?').get(req.user?.id);
  res.json({ success: true, user: updated });
});

export default router;
