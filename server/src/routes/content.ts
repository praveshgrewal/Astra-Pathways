import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

// ================= ANNOUNCEMENTS =================
router.get('/announcements', (req, res) => {
  const { all } = req.query;
  const query = all === 'true' 
    ? 'SELECT * FROM announcements ORDER BY created_at DESC' 
    : 'SELECT * FROM announcements WHERE is_active = 1 ORDER BY created_at DESC LIMIT 1';
  
  const announcements = db.prepare(query).all();
  res.json({ success: true, announcements });
});

router.post('/announcements', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const { title, badge, link_url, is_active } = req.body;
  if (!title) {
    res.status(400).json({ success: false, message: 'Title is required' });
    return;
  }

  const id = 'ann_' + uuidv4().slice(0, 8);
  db.prepare(`
    INSERT INTO announcements (id, title, badge, link_url, is_active)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, title, badge || 'Notice', link_url || '/programs', is_active ? 1 : 0);

  const created = db.prepare('SELECT * FROM announcements WHERE id = ?').get(id);
  res.status(201).json({ success: true, announcement: created });
});

router.patch('/announcements/:id', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const { title, badge, link_url, is_active } = req.body;
  db.prepare(`
    UPDATE announcements SET
      title = COALESCE(?, title),
      badge = COALESCE(?, badge),
      link_url = COALESCE(?, link_url),
      is_active = COALESCE(?, is_active)
    WHERE id = ?
  `).run(title, badge, link_url, typeof is_active === 'boolean' ? (is_active ? 1 : 0) : null, req.params.id);

  const updated = db.prepare('SELECT * FROM announcements WHERE id = ?').get(req.params.id);
  res.json({ success: true, announcement: updated });
});

// ================= BLOGS / RESOURCES =================
function formatBlog(row: any) {
  if (!row) return null;
  return {
    ...row,
    tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags,
    published: Boolean(row.published)
  };
}

router.get('/blogs', (req, res) => {
  const { category, search, all } = req.query;

  let query = 'SELECT * FROM blogs WHERE 1=1';
  const params: any[] = [];

  if (all !== 'true') {
    query += ' AND published = 1';
  }

  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (title LIKE ? OR summary LIKE ? OR content LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  query += ' ORDER BY published_at DESC';

  const rows = db.prepare(query).all(...params);
  res.json({ success: true, count: rows.length, blogs: rows.map(formatBlog) });
});

router.get('/blogs/:slug', (req, res) => {
  const blog = db.prepare('SELECT * FROM blogs WHERE slug = ? OR id = ?').get(req.params.slug, req.params.slug);
  if (!blog) {
    res.status(404).json({ success: false, message: 'Article not found' });
    return;
  }
  res.json({ success: true, blog: formatBlog(blog) });
});

router.post('/blogs', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const { title, category, tags, read_time, summary, content, author_name, author_role, published } = req.body;
  if (!title || !content) {
    res.status(400).json({ success: false, message: 'Title and content are required' });
    return;
  }

  const id = 'blog_' + uuidv4().slice(0, 8);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  db.prepare(`
    INSERT INTO blogs (id, slug, title, category, tags, read_time, summary, content, author_name, author_role, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, slug, title, category || 'Education',
    JSON.stringify(tags || []),
    read_time || '5 min read',
    summary || '',
    content,
    author_name || 'Astra Academic Team',
    author_role || 'Faculty',
    published ? 1 : 0
  );

  const created = db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
  res.status(201).json({ success: true, blog: formatBlog(created) });
});

router.put('/blogs/:id', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const { title, category, tags, read_time, summary, content, author_name, author_role, published } = req.body;
  db.prepare(`
    UPDATE blogs SET
      title = COALESCE(?, title),
      category = COALESCE(?, category),
      tags = COALESCE(?, tags),
      read_time = COALESCE(?, read_time),
      summary = COALESCE(?, summary),
      content = COALESCE(?, content),
      author_name = COALESCE(?, author_name),
      author_role = COALESCE(?, author_role),
      published = COALESCE(?, published)
    WHERE id = ?
  `).run(
    title, category, tags ? JSON.stringify(tags) : null,
    read_time, summary, content, author_name, author_role,
    typeof published === 'boolean' ? (published ? 1 : 0) : null,
    req.params.id
  );

  const updated = db.prepare('SELECT * FROM blogs WHERE id = ?').get(req.params.id);
  res.json({ success: true, blog: formatBlog(updated) });
});

router.delete('/blogs/:id', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  db.prepare('DELETE FROM blogs WHERE id = ?').run(req.params.id);
  res.json({ success: true, message: 'Article deleted' });
});

// ================= FAQS =================
router.get('/faqs', (req, res) => {
  const { category, search } = req.query;
  let query = 'SELECT * FROM faqs WHERE 1=1';
  const params: any[] = [];

  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (question LIKE ? OR answer LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term);
  }

  query += ' ORDER BY order_num ASC, id ASC';
  const faqs = db.prepare(query).all(...params);
  res.json({ success: true, faqs });
});

router.post('/faqs', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const { category, question, answer, order_num } = req.body;
  if (!question || !answer) {
    res.status(400).json({ success: false, message: 'Question and answer are required' });
    return;
  }

  const id = 'faq_' + uuidv4().slice(0, 8);
  db.prepare(`
    INSERT INTO faqs (id, category, question, answer, order_num)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, category || 'General Queries', question, answer, order_num || 0);

  const created = db.prepare('SELECT * FROM faqs WHERE id = ?').get(id);
  res.status(201).json({ success: true, faq: created });
});

router.put('/faqs/:id', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const { category, question, answer, order_num } = req.body;
  db.prepare(`
    UPDATE faqs SET
      category = COALESCE(?, category),
      question = COALESCE(?, question),
      answer = COALESCE(?, answer),
      order_num = COALESCE(?, order_num)
    WHERE id = ?
  `).run(category, question, answer, order_num, req.params.id);

  const updated = db.prepare('SELECT * FROM faqs WHERE id = ?').get(req.params.id);
  res.json({ success: true, faq: updated });
});

router.delete('/faqs/:id', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  db.prepare('DELETE FROM faqs WHERE id = ?').run(req.params.id);
  res.json({ success: true, message: 'FAQ deleted' });
});

// ================= TESTIMONIALS =================
// Strictly verified & admin controlled. No fake testimonials.
router.get('/testimonials', (_req, res) => {
  const testimonials = db.prepare('SELECT * FROM testimonials WHERE is_verified = 1 AND is_active = 1').all();
  res.json({ success: true, testimonials });
});

export default router;
