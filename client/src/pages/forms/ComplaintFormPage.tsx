import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ShieldAlert, CheckCircle2, AlertCircle, Scale, 
  HelpCircle, Copy, Check, Send, MessageSquare 
} from 'lucide-react';
import { api } from '../../services/api';

export const ComplaintFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    relationship: 'Enrolled Student',
    program_name: 'Full-Stack Web Development',
    complaint_category: 'Billing / Payment Dispute',
    incident_date: '',
    previous_contact: '',
    description: '',
    desired_remedy: '',
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

  const categories = [
    'Billing / Payment Dispute',
    'Academic / Curriculum Quality',
    'Instructor / Mentor Conduct',
    'Platform Access & LMS Technical Issue',
    'Career Support & Placement Guidance',
    'Policy Clarification or Other Concern'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.policy_acknowledgment) {
      setErrorMessage('Please confirm that you agree to the informal dispute resolution process.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitForm({
        form_type: 'complaint',
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        program_name: formData.program_name,
        priority: 'Important',
        payload: {
          relationship: formData.relationship,
          complaint_category: formData.complaint_category,
          incident_date: formData.incident_date,
          previous_contact: formData.previous_contact,
          description: formData.description,
          desired_remedy: formData.desired_remedy,
          policy_acknowledgment: formData.policy_acknowledgment
        },
        website_hp: formData.website_hp
      });

      if (res.success) {
        setSubmittedRef(res.reference_number);
      } else {
        setErrorMessage(res.message || 'Failed to submit complaint.');
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
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/forms" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Student Forms Hub
          </Link>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2 uppercase tracking-wider">
            <Scale className="w-4 h-4" /> Informal Dispute Resolution
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Complaint & Dispute Form</h1>
          <p className="text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
            Submit an official grievance, charge dispute, or academic concern in accordance with Section 14.2 of the Astra Pathways Terms & Conditions.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-xl">
          
          {submittedRef ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-gray-900">Grievance Form Received</h2>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Your complaint has been forwarded to academic leadership and legal compliance. Please keep your formal reference number:
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

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-left text-xs sm:text-sm text-amber-950 space-y-2">
                <span className="font-bold block">Informal Dispute SLA:</span>
                <p>
                  • <strong>Astra Pathways Assessment:</strong> We will review your submission and provide an official response within <strong>15 business days</strong>.
                </p>
                <p>
                  • <strong>Good-Faith Resolution Period:</strong> We will engage with you in good faith for 30 calendar days to reach an amicable solution before any formal arbitration is invoked.
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
                  to="/dispute-resolution"
                  className="px-6 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-bold hover:bg-gray-800 transition-all"
                >
                  View Dispute Resolution Policy
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
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
                    Your Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Jordan Smith"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Contact Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jordan@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Relationship to Astra Pathways *
                  </label>
                  <select
                    value={formData.relationship}
                    onChange={e => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  >
                    <option value="Enrolled Student">Enrolled Student</option>
                    <option value="Prospective Student">Prospective Student</option>
                    <option value="Parent / Legal Guardian">Parent / Legal Guardian</option>
                    <option value="Alumni / Past Student">Alumni / Past Student</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Program Involved
                  </label>
                  <select
                    value={formData.program_name}
                    onChange={e => setFormData({ ...formData, program_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  >
                    {programs.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Grievance Category *
                  </label>
                  <select
                    value={formData.complaint_category}
                    onChange={e => setFormData({ ...formData, complaint_category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Approximate Date of Incident / Concern
                  </label>
                  <input
                    type="date"
                    value={formData.incident_date}
                    onChange={e => setFormData({ ...formData, incident_date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Staff Member / Mentor Contacted Earlier
                  </label>
                  <input
                    type="text"
                    value={formData.previous_contact}
                    onChange={e => setFormData({ ...formData, previous_contact: e.target.value })}
                    placeholder="e.g. Instructor name or None"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Detailed Description of Dispute or Grievance *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please state clearly what occurred, relevant dates, transactions, and facts..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Desired Remedy or Resolution Requested *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.desired_remedy}
                  onChange={e => setFormData({ ...formData, desired_remedy: e.target.value })}
                  placeholder="Specify what action would fairly resolve this matter (e.g. billing adjustment, cohort transfer, 1-on-1 mentor session)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.policy_acknowledgment}
                    onChange={e => setFormData({ ...formData, policy_acknowledgment: e.target.checked })}
                    className="mt-1 w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I confirm that the details provided above are true to the best of my knowledge. I agree to participate in the informal dispute resolution process in good faith for 30 calendar days as specified in Section 14.2 of the <Link to="/terms" target="_blank" className="text-[#4F7CFF] underline font-semibold">Astra Pathways Terms and Conditions</Link>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B1020] font-black text-sm shadow-lg shadow-amber-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-[#0B1020] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Complaint / Dispute Notice
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
