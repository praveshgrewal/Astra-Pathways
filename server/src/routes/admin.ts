import { Router } from 'express';
import { db } from '../db/index.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.use(authenticateToken);
router.use(requireAdmin);

// GET /api/admin/metrics
router.get('/metrics', (_req: AuthRequest, res) => {
  const totalLeads = (db.prepare('SELECT COUNT(*) as count FROM leads').get() as any).count;
  const newLeads = (db.prepare("SELECT COUNT(*) as count FROM leads WHERE status = 'New'").get() as any).count;
  const activePrograms = (db.prepare('SELECT COUNT(*) as count FROM programs WHERE published = 1').get() as any).count;
  const publishedBlogs = (db.prepare('SELECT COUNT(*) as count FROM blogs WHERE published = 1').get() as any).count;
  const totalStudents = (db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'student'").get() as any).count;
  const totalSubmissions = (db.prepare("SELECT COUNT(*) as count FROM student_assignments WHERE status != 'Pending'").get() as any).count;

  // Real recent activity events
  const recentLeads = db.prepare(`
    SELECT id, name, program_of_interest, created_at, 'lead' as type
    FROM leads ORDER BY created_at DESC LIMIT 4
  `).all() as any[];

  const recentSubmissions = db.prepare(`
    SELECT a.id, u.name as student_name, a.title, a.submitted_at as created_at, 'submission' as type
    FROM student_assignments a
    JOIN users u ON a.user_id = u.id
    WHERE a.submitted_at IS NOT NULL
    ORDER BY a.submitted_at DESC LIMIT 3
  `).all() as any[];

  res.json({
    success: true,
    metrics: {
      totalLeads,
      newLeads,
      activePrograms,
      publishedBlogs,
      totalStudents,
      totalSubmissions
    },
    recentActivity: [...recentLeads, ...recentSubmissions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 6)
  });
});

// GET /api/admin/students
router.get('/students', (_req: AuthRequest, res) => {
  const students = db.prepare(`
    SELECT u.id, u.name, u.email, u.phone, u.bio, u.created_at,
      COUNT(e.id) as enrolled_count
    FROM users u
    LEFT JOIN student_enrollments e ON u.id = e.user_id
    WHERE u.role = 'student'
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `).all();

  res.json({ success: true, students });
});

// GET /api/admin/assignments
router.get('/assignments', (_req: AuthRequest, res) => {
  const assignments = db.prepare(`
    SELECT a.*, u.name as student_name, u.email as student_email, p.title as program_title
    FROM student_assignments a
    JOIN users u ON a.user_id = u.id
    JOIN programs p ON a.program_id = p.id
    ORDER BY CASE WHEN a.status = 'Submitted' THEN 0 ELSE 1 END, a.submitted_at DESC
  `).all();

  res.json({ success: true, assignments });
});

// PATCH /api/admin/assignments/:id/review
router.patch('/assignments/:id/review', (req: AuthRequest, res) => {
  const { feedback, score, status } = req.body;

  db.prepare(`
    UPDATE student_assignments SET
      feedback = COALESCE(?, feedback),
      score = COALESCE(?, score),
      status = COALESCE(?, status)
    WHERE id = ?
  `).run(feedback, score, status || 'Reviewed', req.params.id);

  const updated = db.prepare(`
    SELECT a.*, u.name as student_name, p.title as program_title
    FROM student_assignments a
    JOIN users u ON a.user_id = u.id
    JOIN programs p ON a.program_id = p.id
    WHERE a.id = ?
  `).get(req.params.id);

  res.json({ success: true, assignment: updated });
});

export default router;
