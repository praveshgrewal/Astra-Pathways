import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, UserPlus, CheckCircle2, AlertCircle, Shield, 
  HelpCircle, Copy, Check, Send, Award, DollarSign, Calendar, MapPin 
} from 'lucide-react';
import { api } from '../../services/api';

export const EnrollmentFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    country: 'United States',
    postal_code: '',
    program_name: 'Full-Stack Web Development',
    cohort: 'Next Upcoming Cohort',
    education_level: 'Bachelor\'s Degree',
    payment_method: 'In-House Installment Payment Plan',
    emergency_contact: '',
    emergency_phone: '',
    terms_accepted: false,
    arbitration_accepted: false,
    refund_accepted: false,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.terms_accepted || !formData.arbitration_accepted || !formData.refund_accepted) {
      setErrorMessage('Please accept all required legal disclosures to proceed with enrollment.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitForm({
        form_type: 'enrollment',
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        program_name: formData.program_name,
        cohort: formData.cohort,
        priority: 'Important',
        payload: {
          dob: formData.dob,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postal_code: formData.postal_code,
          education_level: formData.education_level,
          payment_method: formData.payment_method,
          emergency_contact: formData.emergency_contact,
          emergency_phone: formData.emergency_phone,
          terms_accepted: formData.terms_accepted,
          arbitration_accepted: formData.arbitration_accepted,
          refund_accepted: formData.refund_accepted
        },
        website_hp: formData.website_hp
      });

      if (res.success) {
        setSubmittedRef(res.reference_number);
      } else {
        setErrorMessage(res.message || 'Failed to submit enrollment application.');
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
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#4F7CFF]/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/forms" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Student Forms Hub
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#4F7CFF] font-semibold mb-2 uppercase tracking-wider">
            <UserPlus className="w-4 h-4" /> Official Admissions
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Student Enrollment Form</h1>
          <p className="text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
            Complete your registration for an accredited technical program track. Our admissions team will review your cohort seat and issue your onboarding orientation packet.
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
                <h2 className="text-2xl font-black text-gray-900">Enrollment Application Received!</h2>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Welcome to Astra Pathways! Your enrollment has been registered under reference:
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
                <span className="font-bold block">Admissions Verification:</span>
                <p>
                  1. Our registrar will verify your cohort prerequisites and seat availability within <strong>24 business hours</strong>.
                </p>
                <p>
                  2. An official Welcome Email containing your Student Portal login credentials and syllabus onboarding will be sent to your registered address.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <Link
                  to="/student/login"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
                >
                  Go to Student Portal
                </Link>
                <Link
                  to="/forms"
                  className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-all"
                >
                  Return to Forms Hub
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

              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">1. Student Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Jordan Blake"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jordan@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Date of Birth * (Must be 18+)
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={e => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Mailing Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address or P.O. Box"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    State / Prov *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Country"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Zip / Postal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postal_code}
                    onChange={e => setFormData({ ...formData, postal_code: e.target.value })}
                    placeholder="Zip"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                  />
                </div>
              </div>

              <div className="border-b border-gray-100 pt-4 pb-2">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">2. Academic & Payment Selection</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Selected Program *
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

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Preferred Cohort Term *
                  </label>
                  <select
                    value={formData.cohort}
                    onChange={e => setFormData({ ...formData, cohort: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  >
                    <option value="Next Upcoming Cohort">Next Upcoming Cohort</option>
                    <option value="November 2026 Cohort">November 2026 Cohort</option>
                    <option value="December 2026 Cohort">December 2026 Cohort</option>
                    <option value="Q1 2027 Cohort">Q1 2027 Cohort</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Highest Education Completed *
                  </label>
                  <select
                    value={formData.education_level}
                    onChange={e => setFormData({ ...formData, education_level: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  >
                    <option value="High School Diploma / GED">High School Diploma / GED</option>
                    <option value="Some College / Associate Degree">Some College / Associate Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's / Advanced Degree">Master's / Advanced Degree</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Tuition Payment Method *
                  </label>
                  <select
                    value={formData.payment_method}
                    onChange={e => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] focus:border-transparent transition-all"
                  >
                    <option value="Cash Payment / Full Card Payment">Cash Payment / Full Card Payment (72-hr refund window)</option>
                    <option value="In-House Installment Payment Plan">In-House Installment Payment Plan (No Interest)</option>
                    <option value="Third-Party Finance Partner">Third-Party Finance Partner</option>
                  </select>
                </div>
              </div>

              <div className="border-b border-gray-100 pt-4 pb-2">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">3. Mandatory Disclosures & Consents</h3>
              </div>

              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.terms_accepted}
                    onChange={e => setFormData({ ...formData, terms_accepted: e.target.checked })}
                    className="mt-1 w-4 h-4 text-[#4F7CFF] rounded border-gray-300 focus:ring-[#4F7CFF]"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I have read and agree to the <Link to="/terms" target="_blank" className="text-[#4F7CFF] underline font-semibold">Terms and Conditions</Link>, including student responsibilities and educational transparency notice.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.arbitration_accepted}
                    onChange={e => setFormData({ ...formData, arbitration_accepted: e.target.checked })}
                    className="mt-1 w-4 h-4 text-[#4F7CFF] rounded border-gray-300 focus:ring-[#4F7CFF]"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I have read and accept the <Link to="/dispute-resolution" target="_blank" className="text-[#4F7CFF] underline font-semibold">Dispute Resolution and Arbitration Provision</Link> (including individual claims only, class-action waiver, and the 30-day opt-out right).
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.refund_accepted}
                    onChange={e => setFormData({ ...formData, refund_accepted: e.target.checked })}
                    className="mt-1 w-4 h-4 text-[#4F7CFF] rounded border-gray-300 focus:ring-[#4F7CFF]"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I have read and accept the <Link to="/refunds" target="_blank" className="text-[#4F7CFF] underline font-semibold">Refund and Cancellation Policy</Link>, including the applicable full-refund window, late fee terms, and pro-rated formula.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-sm shadow-lg shadow-[#4F7CFF]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Enrollment Application
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
