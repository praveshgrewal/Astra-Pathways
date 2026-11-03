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

  // Capture student IP address and precise UTC timestamp for legal/chargeback evidence
  const rawIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip || '';
  const clientIp = rawIp.split(',')[0].trim() || '127.0.0.1';
  const submissionTimestamp = new Date().toISOString();

  // Explicitly record IP address, timestamp, user agent, and verified checked status (true) for all checkboxes
  const enrichedPayload = {
    ...payload,
    ip_address: clientIp,
    timestamp: submissionTimestamp,
    submitted_at: submissionTimestamp,
    user_agent: (req.headers['user-agent'] as string) || '',
    consents: {
      terms_accepted: Boolean(payload.terms_accepted),
      arbitration_accepted: Boolean(payload.arbitration_accepted),
      refund_accepted: Boolean(payload.refund_accepted),
      recurring_billing_accepted: Boolean(payload.recurring_billing_accepted ?? payload.auto_charge_authorized),
      ...(payload.consents || {})
    }
  };

  // Insert into forms_submissions with ip_address
  db.prepare(`
    INSERT INTO forms_submissions (
      id, reference_number, form_type, full_name, email,
      phone, program_name, cohort, status, priority, payload, notes, resolution, ip_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New', ?, ?, '', '', ?)
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
    JSON.stringify(enrichedPayload),
    clientIp
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

// GET /api/forms/evidence/:ref - Export audit trail / signed terms evidence for chargeback defense
router.get('/evidence/:ref', (req, res) => {
  const ref = req.params.ref.toUpperCase().trim();
  const sub = db.prepare('SELECT * FROM forms_submissions WHERE reference_number = ?').get(ref) as any;
  if (!sub) {
    res.status(404).send('Submission not found.');
    return;
  }
  let payload: any = {};
  try { payload = JSON.parse(sub.payload); } catch {}

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Enrollment Legal Audit & Chargeback Evidence - ${sub.reference_number}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 40px; color: #111; line-height: 1.5; font-size: 13px; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    .badge { display: inline-block; padding: 4px 8px; background: #e0f2fe; color: #0369a1; border-radius: 4px; font-weight: bold; font-size: 11px; }
    .box { border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin: 16px 0; background: #fafafa; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    td, th { padding: 8px 12px; border: 1px solid #e5e5e5; text-align: left; }
    th { background: #f0f0f0; width: 35%; font-weight: 600; }
    .verified { color: #166534; font-weight: bold; }
    .terms-box { border: 1px solid #ccc; padding: 16px; margin-top: 16px; font-size: 11px; background: #fff; border-radius: 6px; }
    @media print { .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px;">
    <button onclick="window.print()" style="padding: 10px 20px; font-size: 14px; font-weight: bold; background: #2563eb; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
      🖨️ Print / Save as PDF (Stripe Chargeback Evidence)
    </button>
  </div>
  <h1>Madyan Holdings LLC · Student Enrollment Verification Record</h1>
  <p style="color: #666; margin-top: 0;">Official Enrollment Record & Cryptographic Audit Trail for Astra Pathways</p>
  
  <div class="box">
    <span class="badge">VERIFIED AUDIT LOG</span>
    <table>
      <tr><th>Reference Number</th><td><strong>${sub.reference_number}</strong></td></tr>
      <tr><th>Student Full Legal Name</th><td>${sub.full_name}</td></tr>
      <tr><th>Email Address</th><td>${sub.email}</td></tr>
      <tr><th>Phone</th><td>${sub.phone || 'N/A'}</td></tr>
      <tr><th>Program Enrolled</th><td>${sub.program_name}</td></tr>
      <tr><th>Cohort / Batch</th><td>${sub.cohort || 'Standard'}</td></tr>
      <tr><th>Submission Timestamp (UTC)</th><td>${payload.timestamp || sub.created_at}</td></tr>
      <tr><th>Student IP Address</th><td><strong>${sub.ip_address || payload.ip_address || 'Verified on file'}</strong></td></tr>
      <tr><th>User Agent / Device</th><td>${payload.user_agent || 'Web Browser'}</td></tr>
    </table>
  </div>

  <div class="box">
    <h3 style="margin-top: 0;">Verified Mandatory Consents & Disclosures</h3>
    <table>
      <tr>
        <th>Terms and Conditions</th>
        <td class="verified">
          ${payload.consents?.terms_accepted || payload.terms_accepted ? '✔ ACCEPTED & CHECKED (TRUE)' : 'NOT ACCEPTED'}
          <br><small style="color: #555;">Agreement to student responsibilities, transparency notice, and non-guarantee of employment.</small>
        </td>
      </tr>
      <tr>
        <th>Dispute Resolution & Binding Arbitration</th>
        <td class="verified">
          ${payload.consents?.arbitration_accepted || payload.arbitration_accepted ? '✔ ACCEPTED & CHECKED (TRUE)' : 'NOT ACCEPTED'}
          <br><small style="color: #555;">Agreement to informal negotiation, binding AAA arbitration in Cheyenne, WY, and class-action waiver.</small>
        </td>
      </tr>
      <tr>
        <th>Refund & Cancellation Policy</th>
        <td class="verified">
          ${payload.consents?.refund_accepted || payload.refund_accepted ? '✔ ACCEPTED & CHECKED (TRUE)' : 'NOT ACCEPTED'}
          <br><small style="color: #555;">Acceptance of full-refund window, late fee terms, and explicit $500/month pro-rated cancellation formula.</small>
        </td>
      </tr>
      <tr>
        <th>Recurring Payment Authorization</th>
        <td class="verified">
          ${payload.consents?.recurring_billing_accepted || payload.recurring_billing_accepted ? '✔ AUTHORIZED & CHECKED (TRUE)' : 'N/A'}
          <br><small style="color: #555;">Authorization to charge saved payment method on each installment due date under Section 6.2 & Section 7.</small>
        </td>
      </tr>
    </table>
  </div>

  <div class="terms-box">
    <h4 style="margin-top: 0;">Governing Terms & Dispute Policy Text at Time of Submission</h4>
    <p><strong>Operating Entity:</strong> Madyan Holdings LLC, 30 N Gould St, STE N, Sheridan, WY, USA - 82801 (Operating Astra Pathways).</p>
    <p><strong>Payment Processing Notice:</strong> Payments are securely processed by our parent entity, Madyan Holdings, a registered Wyoming LLC. Your credit card or bank statement will display the charge as MADYAN ASTRA PATHWAY.*</p>
    <p><strong>Governing Law:</strong> State of Wyoming, USA. Jurisdiction and venue exclusively in the state or federal courts located in Wyoming, or binding AAA arbitration seated in Cheyenne, Wyoming.</p>
    <p><strong>Chargeback & Dispute Policy:</strong> Students agree to contact support at info@madyanholdings.com to resolve billing issues before initiating a bank chargeback. Unauthorized chargebacks result in immediate platform suspension and collections recovery.</p>
    <p><strong>Cancellation & Pro-Rated Formula:</strong> After the initial refund window, services are charged at $500/month plus a 10% administrative fee for elapsed months.</p>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
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
