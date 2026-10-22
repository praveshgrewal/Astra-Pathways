import React, { useState } from 'react';
import { 
  Sparkles, Mail, Phone, MapPin, Send, CheckCircle2, 
  AlertCircle, ShieldCheck, Clock, MessageSquare 
} from 'lucide-react';
import { api } from '../services/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program_of_interest: 'Full-Stack Web Development',
    current_experience: 'Beginner / Student',
    preferred_contact: 'Email',
    message: '',
    consent: true,
    website_hp: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await api.submitLead({
        ...formData,
        source: 'Contact Page Form'
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-[#4F7CFF]/15 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#4F7CFF] border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Admissions & Academic Inquiries
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Connect with Astra Pathways
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mt-6 leading-relaxed">
            Have questions regarding program prerequisites, syllabus modules, or scheduling? Our academic advisory team is here to guide you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Details & Center Info */}
          <div className="space-y-8">
            <div className="bg-white p-7 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#0B1020]">Direct Communication</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Reach out directly or submit the enquiry form. We aim to respond to all inquiries within one business day.
              </p>

              <div className="space-y-4 pt-2 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#0B1020]">Email Inquiries</span>
                    <a href="mailto:info@astrapathways.net" className="text-gray-600 hover:text-[#4F7CFF] transition-colors">
                      info@astrapathways.net
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#0B1020]">Contact Phone</span>
                    <a href="tel:13073177151" className="text-gray-600 hover:text-[#4F7CFF] transition-colors">
                      1-307-317-7151
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#0B1020]">Availability & Hours</span>
                    <span className="text-gray-600 block">Monday to Sunday (7 days a week)</span>
                    <span className="text-gray-500 text-xs">Timing: 9am to 9pm EST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#0B1020]">Office Address</span>
                    <span className="text-gray-600 block">30 N Gould St, STE N</span>
                    <span className="text-gray-600 block">Sheridan, WY, USA - 82801</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparent Educational Policy Box */}
            <div className="p-6 rounded-2xl bg-[#0B1020] text-gray-300 border border-white/10 space-y-2 text-xs">
              <span className="font-bold text-white block text-sm">Transparent Policy</span>
              <p className="leading-relaxed text-gray-300">
                Astra Pathways provides practical skills instruction, hands-on lab projects, and career placement assistance support. We do not provide job guarantees or guaranteed salaries.
              </p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-md">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1020]">Message Successfully Sent</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#0B1020]">{formData.name}</strong>. Your enquiry has been routed to our academic advisory team. We will be in touch via <strong className="text-[#0B1020]">{formData.preferred_contact}</strong>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#0B1020] tracking-tight">
                      Send an Inquiry
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Fill out the form below and an educational advisor will answer your questions.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-600">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Full Name <span className="text-[#4F7CFF]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-sm text-[#0B1020] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Email Address <span className="text-[#4F7CFF]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-sm text-[#0B1020] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-sm text-[#0B1020] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Preferred Contact Method
                        </label>
                        <select
                          value={formData.preferred_contact}
                          onChange={(e) => setFormData({ ...formData, preferred_contact: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-sm text-[#0B1020] transition-colors bg-white"
                        >
                          <option value="Email">Email</option>
                          <option value="Phone">Phone Call</option>
                          <option value="WhatsApp">WhatsApp</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Program of Interest
                        </label>
                        <select
                          value={formData.program_of_interest}
                          onChange={(e) => setFormData({ ...formData, program_of_interest: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-sm text-[#0B1020] transition-colors bg-white"
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
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Current Experience Level
                        </label>
                        <select
                          value={formData.current_experience}
                          onChange={(e) => setFormData({ ...formData, current_experience: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-sm text-[#0B1020] transition-colors bg-white"
                        >
                          <option value="Beginner / Student">Beginner / Student</option>
                          <option value="Career Switcher (Non-tech to tech)">Career Switcher (Non-tech to tech)</option>
                          <option value="Working Professional (1-3 yrs)">Working Professional (1-3 yrs)</option>
                          <option value="Experienced Engineer (3+ yrs)">Experienced Engineer (3+ yrs)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Your Questions or Comments
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your background, career targets, or questions about syllabus details..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-sm text-[#0B1020] transition-colors resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-2.5 pt-1 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        id="consent-contact"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 rounded border-gray-300 text-[#4F7CFF] focus:ring-[#4F7CFF]"
                      />
                      <label htmlFor="consent-contact" className="cursor-pointer leading-relaxed">
                        I agree to receive academic advisement and program communications from Astra Pathways. You can unsubscribe at any time.
                      </label>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>Data stored securely. Never shared with third parties.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={loading || !formData.consent}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-sm hover:opacity-95 disabled:opacity-50 transition-all shadow-md shadow-[#4F7CFF]/20"
                      >
                        {loading ? (
                          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
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
      </div>
    </div>
  );
};
