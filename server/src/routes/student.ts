import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { authenticateToken, requireStudent, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.use(authenticateToken);
router.use(requireStudent);

// GET /api/student/dashboard
router.get('/dashboard', (req: AuthRequest, res) => {
  const userId = req.user?.id;

  const enrollments = db.prepare(`
    SELECT e.*, p.title as program_title, p.category as program_category, p.level as program_level
    FROM student_enrollments e
    JOIN programs p ON e.program_id = p.id
    WHERE e.user_id = ?
    ORDER BY e.enrolled_at DESC
  `).all(userId) as any[];

  const assignments = db.prepare(`
    SELECT a.*, p.title as program_title
    FROM student_assignments a
    JOIN programs p ON a.program_id = p.id
    WHERE a.user_id = ?
    ORDER BY a.submitted_at DESC
  `).all(userId) as any[];

  const totalEnrollments = enrollments.length;
  const avgProgress = totalEnrollments > 0 
    ? Math.round(enrollments.reduce((acc, curr) => acc + (curr.progress_percent || 0), 0) / totalEnrollments) 
    : 0;

  const submittedAssignments = assignments.filter(a => a.status === 'Submitted' || a.status === 'Reviewed').length;
  const pendingAssignments = assignments.filter(a => a.status === 'Pending').length;

  res.json({
    success: true,
    stats: {
      totalEnrollments,
      avgProgress,
      submittedAssignments,
      pendingAssignments
    },
    enrollments,
    recentAssignments: assignments.slice(0, 5)
  });
});

// GET /api/student/programs
router.get('/programs', (req: AuthRequest, res) => {
  const userId = req.user?.id;
  const enrollments = db.prepare(`
    SELECT e.*, p.title, p.category, p.level, p.short_description, p.curriculum_modules, p.sample_projects, p.tools_technologies
    FROM student_enrollments e
    JOIN programs p ON e.program_id = p.id
    WHERE e.user_id = ?
  `).all(userId) as any[];

  const formatted = enrollments.map(e => ({
    ...e,
    curriculum_modules: typeof e.curriculum_modules === 'string' ? JSON.parse(e.curriculum_modules) : e.curriculum_modules,
    sample_projects: typeof e.sample_projects === 'string' ? JSON.parse(e.sample_projects) : e.sample_projects,
    tools_technologies: typeof e.tools_technologies === 'string' ? JSON.parse(e.tools_technologies) : e.tools_technologies
  }));

  res.json({ success: true, enrolledPrograms: formatted });
});

// POST /api/student/enroll
router.post('/enroll', (req: AuthRequest, res) => {
  const { program_id } = req.body;
  const userId = req.user?.id;

  if (!program_id) {
    res.status(400).json({ success: false, message: 'Program ID is required' });
    return;
  }

  const existing = db.prepare('SELECT id FROM student_enrollments WHERE user_id = ? AND program_id = ?').get(userId, program_id);
  if (existing) {
    res.status(409).json({ success: false, message: 'Already enrolled in this program' });
    return;
  }

  const enrollmentId = 'enr_' + uuidv4().slice(0, 8);
  db.prepare(`
    INSERT INTO student_enrollments (id, user_id, program_id, progress_percent)
    VALUES (?, ?, ?, 0)
  `).run(enrollmentId, userId, program_id);

  // Automatically seed an introductory milestone assignment for this enrolled program
  db.prepare(`
    INSERT INTO student_assignments (id, user_id, program_id, title, description, status)
    VALUES (?, ?, ?, ?, ?, 'Pending')
  `).run(
    'asg_' + uuidv4().slice(0, 8),
    userId,
    program_id,
    'Milestone 1: Environment Setup & Foundational Implementation',
    'Set up your local development workspace, initialize version control, and implement the initial project module.'
  );

  res.status(201).json({ success: true, message: 'Successfully enrolled in program!' });
});

// GET /api/student/assignments
router.get('/assignments', (req: AuthRequest, res) => {
  const userId = req.user?.id;
  const assignments = db.prepare(`
    SELECT a.*, p.title as program_title
    FROM student_assignments a
    JOIN programs p ON a.program_id = p.id
    WHERE a.user_id = ?
    ORDER BY a.submitted_at DESC, a.id DESC
  `).all(userId);

  res.json({ success: true, assignments });
});

// POST /api/student/assignments/:id/submit
router.post('/assignments/:id/submit', (req: AuthRequest, res) => {
  const { submission_link, notes } = req.body;
  const userId = req.user?.id;

  if (!submission_link) {
    res.status(400).json({ success: false, message: 'Submission repository or document URL is required' });
    return;
  }

  const assignment = db.prepare('SELECT * FROM student_assignments WHERE id = ? AND user_id = ?').get(req.params.id, userId);
  if (!assignment) {
    res.status(404).json({ success: false, message: 'Assignment not found' });
    return;
  }

  db.prepare(`
    UPDATE student_assignments SET
      submission_link = ?,
      notes = ?,
      status = 'Submitted',
      submitted_at = CURRENT_TIMESTAMP
    WHERE id = ? AND user_id = ?
  `).run(submission_link, notes || '', req.params.id, userId);

  // Increment progress for this program
  const userEnrollment = db.prepare('SELECT * FROM student_enrollments WHERE user_id = ? AND program_id = ?').get(userId, (assignment as any).program_id) as any;
  if (userEnrollment) {
    const newProgress = Math.min(100, (userEnrollment.progress_percent || 0) + 20);
    db.prepare('UPDATE student_enrollments SET progress_percent = ? WHERE id = ?').run(newProgress, userEnrollment.id);
  }

  res.json({ success: true, message: 'Milestone project successfully submitted for review!' });
});

// POST /api/student/programs/:id/progress
router.post('/programs/:id/progress', (req: AuthRequest, res) => {
  const { progress_percent } = req.body;
  const userId = req.user?.id;

  const validProgress = Math.min(100, Math.max(0, Number(progress_percent) || 0));

  db.prepare(`
    UPDATE student_enrollments SET
      progress_percent = ?,
      completed_at = CASE WHEN ? >= 100 THEN CURRENT_TIMESTAMP ELSE completed_at END
    WHERE user_id = ? AND program_id = ?
  `).run(validProgress, validProgress, userId, req.params.id);

  res.json({ success: true, progress_percent: validProgress });
});

export default router;
