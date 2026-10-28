import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Compass, CheckCircle2, AlertCircle, Shield, 
  HelpCircle, Copy, Check, Send, Briefcase, FileText, Target, ExternalLink 
} from 'lucide-react';
import { api } from '../../services/api';

export const PlacementAssistanceFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    student_id: '',
    program_name: 'Full-Stack Web Development',
    graduation_date: '',
    target_roles: '',
    work_authorization: 'US Citizen / Permanent Resident',
    location_preference: 'Remote (Any Location)',
    linkedin_url: '',
    github_url: '',
    resume_link: '',
    services_requested: {
      resume_review: true,
      portfolio_critique: true,
      mock_technical_interview: false,
      linkedin_optimization: false,
      employer_outreach_strategy: false
    },
    transparency_accepted: false,
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
    'Cybersecurity Defense'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.transparency_accepted) {
      setErrorMessage('Please acknowledge the Educational Transparency Notice to proceed.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitForm({
        form_type: 'placement_assistance',
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        program_name: formData.program_name,
        priority: 'Important',
        payload: {
          student_id: formData.student_id,
          graduation_date: formData.graduation_date,
          target_roles: formData.target_roles,
          work_authorization: formData.work_authorization,
          location_preference: formData.location_preference,
          linkedin_url: formData.linkedin_url,
          github_url: formData.github_url,
          resume_link: formData.resume_link,
          services_requested: formData.services_requested,
          transparency_accepted: formData.transparency_accepted
        },
        website_hp: formData.website_hp
      });

      if (res.success) {
        setSubmittedRef(res.reference_number);
      } else {
        setErrorMessage(res.message || 'Failed to submit placement assistance application.');
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
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#8B5CF6]/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/forms" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Student Forms Hub
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#8B5CF6] font-semibold mb-2 uppercase tracking-wider">
            <Compass className="w-4 h-4" /> Career Services & Industry Readiness
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Placement Assistance Request Form</h1>
          <p className="text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
            Apply for dedicated 1-on-1 career coaching, mock technical interview simulations, resume engineering, and portfolio readiness critique.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-xl">
          
          {submittedRef ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-[#8B5CF6] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-gray-900">Career Support Request Assigned</h2>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Your placement assistance file has been queued for assignment with our career talent advisors. Your reference ticket ID:
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

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-left text-xs sm:text-sm text-purple-950 space-y-2">
                <span className="font-bold block">Career Readiness Next Steps:</span>
                <p>
                  1. A career advisor will review your GitHub repositories, LinkedIn profile, and resume draft within <strong>2 business days</strong>.
                </p>
                <p>
                  2. You will receive an invitation to book a 45-minute 1-on-1 strategy session and mock technical interview schedule.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <Link
                  to="/career-support"
                  className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-all"
                >
                  Explore Career Support
                </Link>
                <Link
                  to="/forms"
                  className="px-6 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-bold hover:bg-gray-800 transition-all"
                >
                  Forms Hub
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Educational Notice Banner */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Shield className="w-4 h-4 text-amber-600" /> Transparency Notice (No Guaranteed Jobs)
                </span>
                <p>
                  Placement assistance consists of dedicated career advisory services (resume coaching, mock technical interviews, portfolio refinement, and outreach guidance). Astra Pathways does not offer guaranteed jobs or salary promises.
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

              <div className="border-b border-gray-100 pb-2">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">1. Candidate Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Sam Rivera"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
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
                    placeholder="sam@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Student ID (if enrolled)
                  </label>
                  <input
                    type="text"
                    value={formData.student_id}
                    onChange={e => setFormData({ ...formData, student_id: e.target.value })}
                    placeholder="e.g. AST-10492"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Program Track *
                  </label>
                  <select
                    value={formData.program_name}
                    onChange={e => setFormData({ ...formData, program_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                  >
                    {programs.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-b border-gray-100 pt-3 pb-2">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">2. Target Opportunities & Portfolios</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Target Job Roles *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.target_roles}
                    onChange={e => setFormData({ ...formData, target_roles: e.target.value })}
                    placeholder="e.g. Full-Stack Developer, Frontend Engineer, Cloud Analyst"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Work Authorization Status *
                  </label>
                  <select
                    value={formData.work_authorization}
                    onChange={e => setFormData({ ...formData, work_authorization: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                  >
                    <option value="US Citizen / Permanent Resident">US Citizen / Permanent Resident</option>
                    <option value="F-1 OPT / STEM OPT Eligible">F-1 OPT / STEM OPT Eligible</option>
                    <option value="H-1B / Work Authorized">H-1B / Work Authorized</option>
                    <option value="International / Remote Global Contractor">International / Remote Global Contractor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin_url}
                    onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    GitHub / Portfolio Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={e => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/username or portfolio link"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Resume Link (Google Drive / Dropbox link with viewer permission)
                </label>
                <input
                  type="url"
                  value={formData.resume_link}
                  onChange={e => setFormData({ ...formData, resume_link: e.target.value })}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                />
              </div>

              <div className="border-b border-gray-100 pt-3 pb-2">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">3. Services Requested</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.services_requested.resume_review}
                    onChange={e => setFormData({
                      ...formData,
                      services_requested: { ...formData.services_requested, resume_review: e.target.checked }
                    })}
                    className="rounded text-[#8B5CF6] focus:ring-[#8B5CF6]"
                  />
                  <span>Technical Resume Review & ATS Keyword Optimization</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.services_requested.portfolio_critique}
                    onChange={e => setFormData({
                      ...formData,
                      services_requested: { ...formData.services_requested, portfolio_critique: e.target.checked }
                    })}
                    className="rounded text-[#8B5CF6] focus:ring-[#8B5CF6]"
                  />
                  <span>Project Artifact & GitHub Code Review</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.services_requested.mock_technical_interview}
                    onChange={e => setFormData({
                      ...formData,
                      services_requested: { ...formData.services_requested, mock_technical_interview: e.target.checked }
                    })}
                    className="rounded text-[#8B5CF6] focus:ring-[#8B5CF6]"
                  />
                  <span>Mock Technical Interview (Coding / System Design)</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.services_requested.linkedin_optimization}
                    onChange={e => setFormData({
                      ...formData,
                      services_requested: { ...formData.services_requested, linkedin_optimization: e.target.checked }
                    })}
                    className="rounded text-[#8B5CF6] focus:ring-[#8B5CF6]"
                  />
                  <span>LinkedIn Presence & Brand Optimization</span>
                </label>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.transparency_accepted}
                    onChange={e => setFormData({ ...formData, transparency_accepted: e.target.checked })}
                    className="mt-1 w-4 h-4 text-[#8B5CF6] rounded border-gray-300 focus:ring-[#8B5CF6]"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I understand that placement assistance refers exclusively to career coaching, portfolio refinement, mock interviews, and application strategy. I acknowledge that Astra Pathways does not offer guaranteed jobs, salary packages, or employment assurances as outlined in Section 4 of the <Link to="/terms" target="_blank" className="text-[#4F7CFF] underline font-semibold">Terms and Conditions</Link>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#4F7CFF] text-white font-bold text-sm shadow-lg shadow-[#8B5CF6]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Placement Assistance Request
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
