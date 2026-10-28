import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, HelpCircle, CheckCircle2, AlertCircle, Sparkles, 
  Copy, Check, Send, MessageSquare, Clock 
} from 'lucide-react';
import { api } from '../../services/api';

export const QueryFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'Curriculum & Lab Projects',
    priority: 'Standard',
    query_details: '',
    website_hp: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = [
    'Curriculum & Lab Projects',
    'Admissions & Prerequisites',
    'Cohort Schedule & Time Commitment',
    'Student Portal & Technical Support',
    'Tuition Invoicing & Payment Methods',
    'Certificate Verification & Milestones',
    'General Inquiry'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await api.submitForm({
        form_type: 'query',
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        priority: formData.priority as any,
        payload: {
          subject: formData.subject,
          category: formData.category,
          query_details: formData.query_details
        },
        website_hp: formData.website_hp
      });

      if (res.success) {
        setSubmittedRef(res.reference_number);
      } else {
        setErrorMessage(res.message || 'Failed to submit query.');
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
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/forms" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Student Forms Hub
          </Link>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-2 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" /> Student Support & Helpdesk
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">General Query Form</h1>
          <p className="text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
            Have a specific academic, technical, or administrative question? Submit your query directly to our support helpdesk for tracked assistance.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-xl">
          
          {submittedRef ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-gray-900">Support Ticket Created</h2>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Your query has been logged and assigned to student support. Please save your reference ticket ID:
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

              <div className="pt-4 flex justify-center gap-3">
                <Link
                  to="/forms"
                  className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-all"
                >
                  Return to Forms Hub
                </Link>
                <Link
                  to="/faq"
                  className="px-6 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-bold hover:bg-gray-800 transition-all"
                >
                  Browse FAQs
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
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Morgan Lee"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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
                    placeholder="morgan@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Query Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Question regarding Capstone milestone project timeline"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  >
                    <option value="Standard">Standard (24–48h SLA)</option>
                    <option value="Important">Important (12–24h SLA)</option>
                    <option value="Urgent">Urgent (Cohort Blocking)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Detailed Query / Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.query_details}
                  onChange={e => setFormData({ ...formData, query_details: e.target.value })}
                  placeholder="Describe your question or technical challenge in detail..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Query to Support
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
