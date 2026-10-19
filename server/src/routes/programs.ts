import { Router } from 'express';
import { db } from '../db/index.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

function formatProgram(row: any) {
  if (!row) return null;
  return {
    ...row,
    who_is_it_for: typeof row.who_is_it_for === 'string' ? JSON.parse(row.who_is_it_for) : row.who_is_it_for,
    prerequisites: typeof row.prerequisites === 'string' ? JSON.parse(row.prerequisites) : row.prerequisites,
    learning_objectives: typeof row.learning_objectives === 'string' ? JSON.parse(row.learning_objectives) : row.learning_objectives,
    skills_covered: typeof row.skills_covered === 'string' ? JSON.parse(row.skills_covered) : row.skills_covered,
    tools_technologies: typeof row.tools_technologies === 'string' ? JSON.parse(row.tools_technologies) : row.tools_technologies,
    curriculum_modules: typeof row.curriculum_modules === 'string' ? JSON.parse(row.curriculum_modules) : row.curriculum_modules,
    sample_projects: typeof row.sample_projects === 'string' ? JSON.parse(row.sample_projects) : row.sample_projects,
    career_pathways: typeof row.career_pathways === 'string' ? JSON.parse(row.career_pathways) : row.career_pathways,
    featured: Boolean(row.featured),
    published: Boolean(row.published)
  };
}

// GET /api/programs
router.get('/', (req, res) => {
  const { category, level, search, featured, all } = req.query;

  let query = 'SELECT * FROM programs WHERE 1=1';
  const params: any[] = [];

  if (all !== 'true') {
    query += ' AND published = 1';
  }

  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (level && level !== 'All') {
    query += ' AND level LIKE ?';
    params.push(`%${level}%`);
  }

  if (featured === 'true') {
    query += ' AND featured = 1';
  }

  if (search) {
    query += ' AND (title LIKE ? OR short_description LIKE ? OR skills_covered LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  query += ' ORDER BY featured DESC, created_at DESC';

  const rows = db.prepare(query).all(...params);
  res.json({
    success: true,
    count: rows.length,
    programs: rows.map(formatProgram)
  });
});

// GET /api/programs/categories
router.get('/meta/categories', (req, res) => {
  const rows = db.prepare('SELECT DISTINCT category FROM programs WHERE published = 1').all() as any[];
  res.json({
    success: true,
    categories: ['All', ...rows.map(r => r.category)]
  });
});

// GET /api/programs/:id
router.get('/:id', (req, res) => {
  const program = db.prepare('SELECT * FROM programs WHERE id = ?').get(req.params.id);
  if (!program) {
    res.status(404).json({ success: false, message: 'Program not found' });
    return;
  }
  res.json({
    success: true,
    program: formatProgram(program)
  });
});

// POST /api/programs (Admin only)
router.post('/', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const {
    id, title, category, level, short_description, full_overview,
    who_is_it_for, prerequisites, learning_objectives, skills_covered,
    tools_technologies, curriculum_modules, sample_projects,
    learning_methodology, mentorship_support, assessment_approach,
    career_pathways, placement_support_info, learning_format, featured, published
  } = req.body;

  if (!title || !category || !short_description) {
    res.status(400).json({ success: false, message: 'Title, category, and short description are required' });
    return;
  }

  const slug = (id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));

  try {
    db.prepare(`
      INSERT INTO programs (
        id, title, category, level, short_description, full_overview,
        who_is_it_for, prerequisites, learning_objectives, skills_covered,
        tools_technologies, curriculum_modules, sample_projects,
        learning_methodology, mentorship_support, assessment_approach,
        career_pathways, placement_support_info, learning_format, featured, published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      slug,
      title,
      category,
      level || 'Beginner to Intermediate',
      short_description,
      full_overview || short_description,
      JSON.stringify(who_is_it_for || []),
      JSON.stringify(prerequisites || []),
      JSON.stringify(learning_objectives || []),
      JSON.stringify(skills_covered || []),
      JSON.stringify(tools_technologies || []),
      JSON.stringify(curriculum_modules || []),
      JSON.stringify(sample_projects || []),
      learning_methodology || 'Interactive online lectures and structured labs.',
      mentorship_support || 'Weekly mentor office hours and code reviews.',
      assessment_approach || 'Milestone projects and practical evaluations.',
      JSON.stringify(career_pathways || []),
      placement_support_info || 'Career guidance and interview preparation support is provided.',
      learning_format || 'Interactive Online Learning',
      featured ? 1 : 0,
      published ? 1 : 0
    );

    const created = db.prepare('SELECT * FROM programs WHERE id = ?').get(slug);
    res.status(201).json({ success: true, program: formatProgram(created) });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/programs/:id (Admin only)
router.put('/:id', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const existing = db.prepare('SELECT * FROM programs WHERE id = ?').get(req.params.id) as any;
  if (!existing) {
    res.status(404).json({ success: false, message: 'Program not found' });
    return;
  }

  const {
    title, category, level, short_description, full_overview,
    who_is_it_for, prerequisites, learning_objectives, skills_covered,
    tools_technologies, curriculum_modules, sample_projects,
    learning_methodology, mentorship_support, assessment_approach,
    career_pathways, placement_support_info, learning_format, featured, published
  } = req.body;

  db.prepare(`
    UPDATE programs SET
      title = COALESCE(?, title),
      category = COALESCE(?, category),
      level = COALESCE(?, level),
      short_description = COALESCE(?, short_description),
      full_overview = COALESCE(?, full_overview),
      who_is_it_for = COALESCE(?, who_is_it_for),
      prerequisites = COALESCE(?, prerequisites),
      learning_objectives = COALESCE(?, learning_objectives),
      skills_covered = COALESCE(?, skills_covered),
      tools_technologies = COALESCE(?, tools_technologies),
      curriculum_modules = COALESCE(?, curriculum_modules),
      sample_projects = COALESCE(?, sample_projects),
      learning_methodology = COALESCE(?, learning_methodology),
      mentorship_support = COALESCE(?, mentorship_support),
      assessment_approach = COALESCE(?, assessment_approach),
      career_pathways = COALESCE(?, career_pathways),
      placement_support_info = COALESCE(?, placement_support_info),
      learning_format = COALESCE(?, learning_format),
      featured = COALESCE(?, featured),
      published = COALESCE(?, published),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    title,
    category,
    level,
    short_description,
    full_overview,
    who_is_it_for ? JSON.stringify(who_is_it_for) : null,
    prerequisites ? JSON.stringify(prerequisites) : null,
    learning_objectives ? JSON.stringify(learning_objectives) : null,
    skills_covered ? JSON.stringify(skills_covered) : null,
    tools_technologies ? JSON.stringify(tools_technologies) : null,
    curriculum_modules ? JSON.stringify(curriculum_modules) : null,
    sample_projects ? JSON.stringify(sample_projects) : null,
    learning_methodology,
    mentorship_support,
    assessment_approach,
    career_pathways ? JSON.stringify(career_pathways) : null,
    placement_support_info,
    learning_format,
    typeof featured === 'boolean' ? (featured ? 1 : 0) : null,
    typeof published === 'boolean' ? (published ? 1 : 0) : null,
    req.params.id
  );

  const updated = db.prepare('SELECT * FROM programs WHERE id = ?').get(req.params.id);
  res.json({ success: true, program: formatProgram(updated) });
});

// DELETE /api/programs/:id (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  db.prepare('DELETE FROM programs WHERE id = ?').run(req.params.id);
  res.json({ success: true, message: 'Program removed' });
});

export default router;
