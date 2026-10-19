import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { db } from '../db/index.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  program_of_interest: z.string().optional(),
  current_experience: z.string().optional(),
  preferred_contact: z.string().optional(),
  message: z.string().max(2000, 'Message is too long').optional(),
  source: z.string().optional(),
  consent: z.boolean().optional(),
  website_hp: z.string().optional() // Honeypot spam defense
});

// POST /api/leads - Public inquiry submission
router.post('/', (req, res) => {
  const result = leadSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: result.error.errors.map(e => e.message)
    });
    return;
  }

  const {
    name, email, phone, program_of_interest,
    current_experience, preferred_contact, message,
    source, website_hp
  } = result.data;

  // Spam Honeypot Check: if bot filled hidden field, gracefully accept without saving
  if (website_hp && website_hp.trim().length > 0) {
    res.status(200).json({ success: true, message: 'Thank you for your enquiry. We will be in touch shortly.' });
    return;
  }

  // Deduplication guard: check if duplicate inquiry in last 2 minutes
  const recentDuplicate = db.prepare(`
    SELECT id FROM leads 
    WHERE email = ? AND created_at >= datetime('now', '-2 minutes')
  `).get(email.toLowerCase());

  if (recentDuplicate) {
    res.status(200).json({
      success: true,
      message: 'We have received your recent enquiry. An advisor will contact you soon.'
    });
    return;
  }

  const leadId = 'lead_' + uuidv4().slice(0, 8);

  db.prepare(`
    INSERT INTO leads (
      id, name, email, phone, program_of_interest,
      current_experience, preferred_contact, message,
      source, status, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', '')
  `).run(
    leadId,
    name.trim(),
    email.toLowerCase().trim(),
    phone ? phone.trim() : '',
    program_of_interest || 'General Inquiry',
    current_experience || 'Not specified',
    preferred_contact || 'Email',
    message ? message.trim() : '',
    source || 'Website Contact Form'
  );

  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out to Astra Pathways! Our academic team will be in touch with you shortly.'
  });
});

// GET /api/leads (Admin only)
router.get('/', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const { status, search } = req.query;

  let query = 'SELECT * FROM leads WHERE 1=1';
  const params: any[] = [];

  if (status && status !== 'All') {
    query += ' AND status = ?';
    params.push(status);
  }

  if (search) {
    query += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR program_of_interest LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  query += ' ORDER BY created_at DESC';

  const leads = db.prepare(query).all(...params);

  // Calculate summary counts
  const statusCounts = db.prepare(`
    SELECT status, COUNT(*) as count FROM leads GROUP BY status
  `).all() as { status: string; count: number }[];

  res.json({
    success: true,
    leads,
    counts: statusCounts.reduce((acc: any, cur) => {
      acc[cur.status] = cur.count;
      return acc;
    }, {})
  });
});

// GET /api/leads/export/csv (Admin only)
router.get('/export/csv', authenticateToken, requireAdmin, (_req: AuthRequest, res) => {
  const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all() as any[];

  const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Program of Interest', 'Experience', 'Contact Method', 'Status', 'Notes', 'Follow-up Date'];
  const rows = leads.map(l => [
    l.id,
    l.created_at,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.program_of_interest || '').replace(/"/g, '""')}"`,
    `"${(l.current_experience || '').replace(/"/g, '""')}"`,
    `"${(l.preferred_contact || '').replace(/"/g, '""')}"`,
    l.status,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
    l.follow_up_date || ''
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="astra_pathways_leads.csv"');
  res.send(csvContent);
});

// PATCH /api/leads/:id (Admin only)
router.patch('/:id', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const { status, notes, follow_up_date, assigned_to } = req.body;

  db.prepare(`
    UPDATE leads SET
      status = COALESCE(?, status),
      notes = COALESCE(?, notes),
      follow_up_date = COALESCE(?, follow_up_date),
      assigned_to = COALESCE(?, assigned_to),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(status, notes, follow_up_date, assigned_to, req.params.id);

  const updated = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  res.json({ success: true, lead: updated });
});

// DELETE /api/leads/:id (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  db.prepare('DELETE FROM leads WHERE id = ?').run(req.params.id);
  res.json({ success: true, message: 'Lead record removed' });
});

export default router;
