import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, XCircle, CheckCircle2, AlertCircle, Shield, 
  HelpCircle, Copy, Check, FileText, Send, Calendar, DollarSign 
} from 'lucide-react';
import { api } from '../../services/api';

export const CancellationFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    program_name: 'Full-Stack Web Development',
    cohort: '',
    enrollment_date: '',
    payment_method: 'Cash Payment / Full Card Payment',
    cancellation_reason: 'Schedule conflict / Time constraints',
    reason_details: '',
    policy_acknowledgment: false,
    website_hp: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const programs = [
    'Full-Stack Web Development',
    'AI & Machine Learning',
    'Data Science & Analytics',
    'Cloud Computing & DevOps',
    'Cybersecurity Defense',
    'Emerging Technologies / General'
  ];

  const reasons = [
    'Schedule conflict / Time constraints',
    'Personal / Family health emergency',
    'Financial hardship',
    'Curriculum / Technical mismatch',
    'Enrolled in university or employer training',
    'Other personal circumstance'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.policy_acknowledgment) {
      setErrorMessage('Please acknowledge that you have reviewed the Refund and Cancellation Policy.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitForm({
        form_type: 'cancellation',
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        program_name: formData.program_name,
        cohort: formData.cohort,
        priority: 'Important',
        payload: {
          enrollment_date: formData.enrollment_date,
          payment_method: formData.payment_method,
          cancellation_reason: formData.cancellation_reason,
          reason_details: formData.reason_details,
          policy_acknowledgment: formData.policy_acknowledgment
        },
        website_hp: formData.website_hp
      });

      if (res.success) {
        setSubmittedRef(res.reference_number);
      } else {
        setErrorMessage(res.message || 'Failed to submit cancellation request.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyRef = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0B1020] text-white py-14 sm:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-red-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/forms" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Student Forms Hub
          </Link>
          <div className="flex items-center gap-2 text-xs text-red-400 font-semibold mb-2 uppercase tracking-wider">
            <XCircle className="w-4 h-4" /> Academic Operations
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Program Cancellation Form</h1>
          <p className="text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
            Submit a formal request to withdraw from your cohort seat, pause active billing, or cancel an enrollment agreement in accordance with our policies.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-xl">
          
          {submittedRef ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-gray-900">Cancellation Request Submitted</h2>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Your request has been logged and assigned to academic operations. Please keep your reference number for all tracking inquiries:
                </p>
              </div>

              <div className="inline-flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="font-mono font-bold text-base text-[#0B1020] tracking-wider">{submittedRef}</span>
                <button
                  onClick={copyRef}
                  className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 flex items-center gap-1 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-left text-xs sm:text-sm text-blue-900 space-y-2">
                <span className="font-bold block">Next Steps & Refund Processing:</span>
                <p>
                  1. Academic operations will review your elapsed cohort timeline and confirm eligibility within <strong>1 business day</strong>.
                </p>
                <p>
                  2. If you are eligible for financial reimbursement under Section 2 or 3 of our <Link to="/refunds" className="text-[#4F7CFF] underline font-semibold">Refund Policy</Link>, you may also submit the <Link to="/forms/refund" className="text-[#4F7CFF] underline font-semibold">Refund Request Form</Link> to provide payment details.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <Link
                  to="/forms"
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-all"
                >
                  Return to Forms Hub
                </Link>
                <Link
                  to="/forms/refund"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
                >
                  Submit Accompanying Refund Form &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Policy Notice Box */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-1.5">
                <span className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#4F7CFF]" /> Policy Snapshot (Refund & Cancellation)
                </span>
                <p>
                  • <strong>Cash Payment:</strong> 100% refund within 72 hours. After 72 hours up to 90 days: pro-rated service charge & 10% admin fee apply.
                </p>
                <p>
                  • <strong>In-House Installment:</strong> Full refund within 24 hours. Future installments cancelled upon covering pro-rated elapsed weeks.
                </p>
                <p>
                  • <strong>Financing:</strong> Cancellation requested within 5 business days initiates loan termination with the finance partner.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot field */}
              <input
                type="text"
                name="website_hp"
                value={formData.website_hp}
                onChange={e => setFormData({ ...formData, website_hp: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Student Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Registered Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Program Enrolled In *
                  </label>
                  <select
                    value={formData.program_name}
                    onChange={e => setFormData({ ...formData, program_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  >
                    {programs.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Cohort / Batch ID or Start Month
                  </label>
                  <input
                    type="text"
                    value={formData.cohort}
                    onChange={e => setFormData({ ...formData, cohort: e.target.value })}
                    placeholder="e.g. Cohort 2026-B / October 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Enrollment Date
                  </label>
                  <input
                    type="date"
                    value={formData.enrollment_date}
                    onChange={e => setFormData({ ...formData, enrollment_date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Payment Method Selected at Enrollment *
                </label>
                <select
                  value={formData.payment_method}
                  onChange={e => setFormData({ ...formData, payment_method: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                >
                  <option value="Cash Payment / Full Card Payment">Cash Payment / Full Card Payment</option>
                  <option value="In-House Installment Payment Plan">In-House Installment Payment Plan</option>
                  <option value="Third-Party Finance Partner">Third-Party Finance Partner</option>
                  <option value="Employer / Sponsored Voucher">Employer / Sponsored Voucher</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Primary Reason for Cancellation *
                </label>
                <select
                  value={formData.cancellation_reason}
                  onChange={e => setFormData({ ...formData, cancellation_reason: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                >
                  {reasons.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Additional Context or Feedback
                </label>
                <textarea
                  rows={3}
                  value={formData.reason_details}
                  onChange={e => setFormData({ ...formData, reason_details: e.target.value })}
                  placeholder="Please provide any relevant details or context regarding your withdrawal request..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.policy_acknowledgment}
                    onChange={e => setFormData({ ...formData, policy_acknowledgment: e.target.checked })}
                    className="mt-1 w-4 h-4 text-[#4F7CFF] rounded border-gray-300 focus:ring-[#4F7CFF]"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I confirm that I am requesting formal cancellation of my program enrollment. I have read and agree to the terms set forth in the <Link to="/refunds" target="_blank" className="text-[#4F7CFF] underline font-semibold">Astra Pathways Refund and Cancellation Policy</Link>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-sm shadow-lg shadow-red-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Cancellation Request
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
