import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProgram?: string;
  source?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialProgram = '',
  source = 'Website Modal'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program_of_interest: initialProgram || 'Full-Stack Web Development',
    current_experience: 'Beginner / Student',
    preferred_contact: 'Email',
    message: '',
    consent: true,
    website_hp: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialProgram) {
      setFormData(prev => ({ ...prev, program_of_interest: initialProgram }));
    }
  }, [initialProgram]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await api.submitLead({
        ...formData,
        source
      });
      setSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0B1020] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-gray-200 my-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header decoration */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#4F7CFF] via-[#8B5CF6] to-[#4F7CFF]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {success ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Enquiry Received</h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>! An academic advisor will reach out to you via <span className="text-white font-semibold">{formData.preferred_contact}</span> shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSuccess(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-semibold text-sm hover:opacity-95 transition-all shadow-md"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#4F7CFF]/15 text-[#4F7CFF] border border-[#4F7CFF]/30">
                  <PhoneCall className="w-3.5 h-3.5" />
                  Academic Advising & Program Inquiry
                </div>
                <h2 id="modal-title" className="text-2xl font-extrabold text-white tracking-tight">
                  Connect with an Astra Advisor
                </h2>
                <p className="text-xs text-gray-400">
                  Have questions about our practical curriculum, labs, or career support? Speak directly with our academic team.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot hidden input */}
                <input
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Full Name <span className="text-[#4F7CFF]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-white text-sm placeholder-gray-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Email Address <span className="text-[#4F7CFF]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-white text-sm placeholder-gray-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-white text-sm placeholder-gray-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Preferred Contact Method
                    </label>
                    <select
                      value={formData.preferred_contact}
                      onChange={(e) => setFormData({ ...formData, preferred_contact: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1020] border border-white/15 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-white text-sm transition-colors"
                    >
                      <option value="Email">Email</option>
                      <option value="Phone">Phone Call</option>
                      <option value="WhatsApp">WhatsApp</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Program of Interest
                    </label>
                    <select
                      value={formData.program_of_interest}
                      onChange={(e) => setFormData({ ...formData, program_of_interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1020] border border-white/15 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-white text-sm transition-colors"
                    >
                      <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                      <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & ML</option>
                      <option value="Data Science & Advanced Analytics">Data Science & Analytics</option>
                      <option value="Cloud Computing & DevOps Engineering">Cloud & DevOps Engineering</option>
                      <option value="Cybersecurity & Defensive Engineering">Cybersecurity Defense</option>
                      <option value="General Academic Advising">General Academic Advising</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Current Experience Level
                    </label>
                    <select
                      value={formData.current_experience}
                      onChange={(e) => setFormData({ ...formData, current_experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1020] border border-white/15 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-white text-sm transition-colors"
                    >
                      <option value="Beginner / Student">Beginner / Student</option>
                      <option value="Career Switcher (Non-tech to tech)">Career Switcher (Non-tech to tech)</option>
                      <option value="Working Professional (1-3 yrs)">Working Professional (1-3 yrs)</option>
                      <option value="Experienced Engineer (3+ yrs)">Experienced Engineer (3+ yrs)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Your Questions or Goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you'd like to achieve or any questions regarding schedule and syllabus..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-white text-sm placeholder-gray-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1 text-xs text-gray-400">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded border-white/20 bg-white/5 text-[#4F7CFF] focus:ring-[#4F7CFF]"
                  />
                  <label htmlFor="consent" className="cursor-pointer leading-tight">
                    I agree to be contacted by Astra Pathways regarding academic programs and advisory guidance.
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Privacy protected. No spam.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !formData.consent}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-sm hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-[#4F7CFF]/25"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
