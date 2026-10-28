import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, DollarSign, CheckCircle2, AlertCircle, Shield, 
  HelpCircle, Copy, Check, Calculator, Send, CreditCard, Building 
} from 'lucide-react';
import { api } from '../../services/api';

export const RefundFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    program_name: 'Full-Stack Web Development',
    cohort: '',
    transaction_id: '',
    payment_method: 'Cash Payment / Full Card Payment',
    total_amount_paid: '',
    refund_amount_requested: '',
    refund_destination: 'Original Payment Card / Method',
    account_details: '',
    refund_reason: 'Cancellation within 72-Hour Full Refund Window',
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

  const refundReasons = [
    'Cancellation within 72-Hour Full Refund Window',
    'Cancellation within 24-Hour Installment Refund Window',
    'Cancellation after 72 Hours within 90 Days (Pro-Rated Calculation)',
    'Third-Party Finance Cancellation (within 5 business days)',
    'Administrative Overcharge / Duplicate Transaction Correction',
    'Special Circumstance / Approved Medical Deferral'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.policy_acknowledgment) {
      setErrorMessage('Please acknowledge the terms of the Refund Policy.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitForm({
        form_type: 'refund',
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        program_name: formData.program_name,
        cohort: formData.cohort,
        priority: 'Important',
        payload: {
          transaction_id: formData.transaction_id,
          payment_method: formData.payment_method,
          total_amount_paid: formData.total_amount_paid,
          refund_amount_requested: formData.refund_amount_requested,
          refund_destination: formData.refund_destination,
          account_details: formData.account_details,
          refund_reason: formData.refund_reason,
          reason_details: formData.reason_details,
          policy_acknowledgment: formData.policy_acknowledgment
        },
        website_hp: formData.website_hp
      });

      if (res.success) {
        setSubmittedRef(res.reference_number);
      } else {
        setErrorMessage(res.message || 'Failed to submit refund request.');
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
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/forms" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Student Forms Hub
          </Link>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-2 uppercase tracking-wider">
            <DollarSign className="w-4 h-4" /> Finance & Billing Services
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Tuition Refund Request Form</h1>
          <p className="text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
            Submit your payment verification and refund request in accordance with the Astra Pathways Refund and Cancellation Policy.
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
                <h2 className="text-2xl font-black text-gray-900">Refund Request Form Submitted</h2>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Your refund claim has been forwarded to finance operations. Please record your unique tracking reference:
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

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-left text-xs sm:text-sm text-emerald-950 space-y-2">
                <span className="font-bold block">Processing Timeline:</span>
                <p>
                  • <strong>Acknowledgment:</strong> Sent within 1 business day.
                </p>
                <p>
                  • <strong>Audit & Calculation:</strong> Verified against cohort start date within 3 business days.
                </p>
                <p>
                  • <strong>Disbursement:</strong> Approved funds are released to your payment method within <strong>7–10 business days</strong>.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <Link
                  to="/forms"
                  className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-all"
                >
                  Return to Forms Hub
                </Link>
                <Link
                  to="/refunds"
                  className="px-6 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-bold hover:bg-gray-800 transition-all"
                >
                  Review Refund Policy
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Formula & Rule Guidance */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-1.5">
                <span className="font-bold flex items-center gap-1.5 text-blue-950">
                  <Calculator className="w-4 h-4 text-[#4F7CFF]" /> Refund Calculation Reference (Section 2.3)
                </span>
                <p>
                  <code>Refund Amount = Total Paid − 10% Administrative Fee − Pro-Rated Service Charge</code>
                </p>
                <p className="text-[11px] text-blue-800">
                  Full 100% refund is available if cancellation occurred within 72 hours of initial enrollment (or 24 hours for In-House installment plans).
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
                    Transaction ID / Invoice Reference # *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.transaction_id}
                    onChange={e => setFormData({ ...formData, transaction_id: e.target.value })}
                    placeholder="e.g. INV-2026-8941 / Stripe ch_xxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Cohort / Batch ID
                  </label>
                  <input
                    type="text"
                    value={formData.cohort}
                    onChange={e => setFormData({ ...formData, cohort: e.target.value })}
                    placeholder="e.g. October 2026 Cohort"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Total Amount Paid to Date (USD $) *
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.total_amount_paid}
                    onChange={e => setFormData({ ...formData, total_amount_paid: e.target.value })}
                    placeholder="e.g. 1500.00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Refund Amount Requested (USD $) *
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.refund_amount_requested}
                    onChange={e => setFormData({ ...formData, refund_amount_requested: e.target.value })}
                    placeholder="e.g. 1500.00 or pro-rated"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Payment Method Used *
                  </label>
                  <select
                    value={formData.payment_method}
                    onChange={e => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  >
                    <option value="Cash Payment / Full Card Payment">Cash Payment / Full Card Payment</option>
                    <option value="In-House Installment Payment Plan">In-House Installment Payment Plan</option>
                    <option value="Third-Party Finance Partner">Third-Party Finance Partner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Refund Destination *
                  </label>
                  <select
                    value={formData.refund_destination}
                    onChange={e => setFormData({ ...formData, refund_destination: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  >
                    <option value="Original Payment Card / Method">Original Payment Card / Method</option>
                    <option value="Bank Wire / ACH Direct Deposit">Bank Wire / ACH Direct Deposit</option>
                    <option value="Tuition Credit for Future Cohort">Tuition Credit for Future Cohort</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Reason for Refund Request *
                </label>
                <select
                  value={formData.refund_reason}
                  onChange={e => setFormData({ ...formData, refund_reason: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                >
                  {refundReasons.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Detailed Explanation / Account Details (if ACH requested)
                </label>
                <textarea
                  rows={3}
                  value={formData.reason_details}
                  onChange={e => setFormData({ ...formData, reason_details: e.target.value })}
                  placeholder="Provide any additional explanation, date of cancellation, or bank wire coordinates if applicable..."
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
                    I verify that the amounts and dates entered above are accurate. I have read and agree to the <Link to="/refunds" target="_blank" className="text-[#4F7CFF] underline font-semibold">Astra Pathways Refund and Cancellation Policy</Link>, including the 72-hour full refund rule and the pro-rated calculation with 10% administrative fee for cancellations after 72 hours.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Refund Request
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
