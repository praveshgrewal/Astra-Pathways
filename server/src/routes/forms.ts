import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { db } from '../db/index.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = Router();

const formSubmitSchema = z.object({
  form_type: z.enum([
    'cancellation',
    'refund',
    'complaint',
    'inquiry',
    'enrollment',
    'query',
    'placement_assistance'
  ]),
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  program_name: z.string().optional(),
  cohort: z.string().optional(),
  priority: z.enum(['Standard', 'Important', 'Urgent']).optional(),
  payload: z.record(z.any()),
  website_hp: z.string().optional() // Honeypot spam defense
});

// Helper: generate friendly reference number
function generateReferenceNumber(formType: string): string {
  const prefixes: Record<string, string> = {
    cancellation: 'REF-CAN',
    refund: 'REF-RFD',
    complaint: 'REF-CMP',
    inquiry: 'REF-INQ',
    enrollment: 'REF-ENR',
    query: 'REF-QRY',
    placement_assistance: 'REF-PLC'
  };
  const prefix = prefixes[formType] || 'REF-GEN';
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomSuffix}`;
}

// POST /api/forms/submit - Public submission of any of the 7 forms
router.post('/submit', (req, res) => {
  const result = formSubmitSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: result.error.errors.map(e => e.message)
    });
    return;
  }

  const {
    form_type, full_name, email, phone, program_name, cohort,
    priority, payload, website_hp
  } = result.data;

  // Honeypot check
  if (website_hp && website_hp.trim().length > 0) {
    res.status(200).json({
      success: true,
      reference_number: generateReferenceNumber(form_type),
      message: 'Your form submission has been received.'
    });
    return;
  }

  const id = 'sub_' + uuidv4().slice(0, 8);
  const referenceNumber = generateReferenceNumber(form_type);

  // Insert into forms_submissions
  db.prepare(`
    INSERT INTO forms_submissions (
      id, reference_number, form_type, full_name, email,
      phone, program_name, cohort, status, priority, payload, notes, resolution
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New', ?, ?, '', '')
  `).run(
    id,
    referenceNumber,
    form_type,
    full_name.trim(),
    email.toLowerCase().trim(),
    phone ? phone.trim() : '',
    program_name || '',
    cohort || '',
    priority || 'Standard',
    JSON.stringify(payload)
  );

  // Also sync to leads table so it is instantly tracked in the unified admin leads list
  const leadId = 'lead_' + uuidv4().slice(0, 8);
  const formattedFormName = form_type
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  try {
    db.prepare(`
      INSERT INTO leads (
        id, name, email, phone, program_of_interest,
        current_experience, preferred_contact, message,
        source, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?)
    `).run(
      leadId,
      full_name.trim(),
      email.toLowerCase().trim(),
      phone ? phone.trim() : '',
      program_name || 'General',
      `Form Type: ${formattedFormName}`,
      'Email',
      payload.reason || payload.message || payload.query_details || payload.description || `Submitted ${formattedFormName} (Ref: ${referenceNumber})`,
      `Form: ${formattedFormName}`,
      `Ref: ${referenceNumber} | Status: New`
    );
  } catch (err) {
    console.warn('Sync to leads table note:', err);
  }

  res.status(201).json({
    success: true,
    reference_number: referenceNumber,
    form_type,
    message: `Your ${formattedFormName} has been submitted successfully. Please save your reference number: ${referenceNumber}. Our team will review and respond promptly.`
  });
});

// GET /api/forms/lookup/:ref - Public tracking of submission status
router.get('/lookup/:ref', (req, res) => {
  const ref = req.params.ref.toUpperCase().trim();
  const submission = db.prepare(`
    SELECT reference_number, form_type, full_name, program_name, status, created_at, updated_at
    FROM forms_submissions
    WHERE reference_number = ?
  `).get(ref) as any;

  if (!submission) {
    res.status(404).json({
      success: false,
      message: 'No submission found with this reference number. Please check your reference code.'
    });
    return;
  }

  res.json({
    success: true,
    submission
  });
});

// GET /api/forms/submissions - Admin list of form submissions
router.get('/submissions', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const { form_type, status, search } = req.query;

  let query = 'SELECT * FROM forms_submissions WHERE 1=1';
  const params: any[] = [];

  if (form_type && form_type !== 'All') {
    query += ' AND form_type = ?';
    params.push(form_type);
  }

  if (status && status !== 'All') {
    query += ' AND status = ?';
    params.push(status);
  }

  if (search) {
    query += ' AND (full_name LIKE ? OR email LIKE ? OR reference_number LIKE ? OR program_name LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  query += ' ORDER BY created_at DESC';

  const submissions = db.prepare(query).all(...params).map((sub: any) => {
    try {
      sub.payload = JSON.parse(sub.payload);
    } catch {
      sub.payload = {};
    }
    return sub;
  });

  // Summary counts
  const typeCounts = db.prepare(`
    SELECT form_type, COUNT(*) as count FROM forms_submissions GROUP BY form_type
  `).all() as { form_type: string; count: number }[];

  const statusCounts = db.prepare(`
    SELECT status, COUNT(*) as count FROM forms_submissions GROUP BY status
  `).all() as { status: string; count: number }[];

  res.json({
    success: true,
    submissions,
    typeCounts: typeCounts.reduce((acc: any, cur) => {
      acc[cur.form_type] = cur.count;
      return acc;
    }, {}),
    statusCounts: statusCounts.reduce((acc: any, cur) => {
      acc[cur.status] = cur.count;
      return acc;
    }, {})
  });
});

// PATCH /api/forms/submissions/:id - Admin update submission status/notes
router.patch('/submissions/:id', authenticateToken, requireAdmin, (req: AuthRequest, res) => {
  const { status, notes, resolution, priority } = req.body;

  db.prepare(`
    UPDATE forms_submissions SET
      status = COALESCE(?, status),
      notes = COALESCE(?, notes),
      resolution = COALESCE(?, resolution),
      priority = COALESCE(?, priority),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(status, notes, resolution, priority, req.params.id);

  const updated = db.prepare('SELECT * FROM forms_submissions WHERE id = ?').get(req.params.id) as any;
  if (updated) {
    try {
      updated.payload = JSON.parse(updated.payload);
    } catch {}
  }

  res.json({
    success: true,
    submission: updated
  });
});

export default router;
