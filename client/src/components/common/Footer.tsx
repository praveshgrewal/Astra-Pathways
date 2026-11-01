import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Shield, ArrowUpRight, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 pt-16 pb-12 font-sans relative overflow-hidden">
      {/* Background ambient subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                <img src="/logo.png" alt="Astra Pathways Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                Astra <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Pathways</span>
              </span>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Helping students and career switchers learn real tech skills through hands-on projects, personal mentor support, and honest career guidance.
            </p>

            <div className="space-y-2.5 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <a href="mailto:info@madyanholdings.com" className="hover:text-blue-600 font-medium transition-colors">
                  info@madyanholdings.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                <a href="tel:13073177151" className="hover:text-blue-600 font-medium transition-colors">
                  1-307-317-7151
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>30 N Gould St, STE N, Sheridan, WY, USA - 82801</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span>Mon to Sun (7 days a week) · 9am to 9pm EST</span>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Explore Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/programs/full-stack-web-development" className="hover:text-blue-600 transition-colors">
                  Full-Stack Web Dev
                </Link>
              </li>
              <li>
                <Link to="/programs/ai-and-machine-learning" className="hover:text-blue-600 transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/programs/data-science-and-analytics" className="hover:text-blue-600 transition-colors">
                  Data Science & Analytics
                </Link>
              </li>
              <li>
                <Link to="/programs/cloud-computing-and-devops" className="hover:text-blue-600 transition-colors">
                  Cloud & DevOps
                </Link>
              </li>
              <li>
                <Link to="/programs/cybersecurity-fundamentals" className="hover:text-blue-600 transition-colors">
                  Cybersecurity Defense
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-blue-600 font-semibold hover:text-indigo-600 flex items-center gap-1 text-xs pt-1">
                  View All Programs <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Approach */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Learning & Career
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/learning-approach" className="hover:text-blue-600 transition-colors">
                  How You Learn
                </Link>
              </li>
              <li>
                <Link to="/career-support" className="hover:text-blue-600 transition-colors">
                  Career Support
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-blue-600 transition-colors">
                  Free Guides & Articles
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-600 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition-colors">
                  Talk to an Advisor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Portals */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Portals & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/student/login" className="hover:text-blue-600 transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  Student Portal
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  Admin Console
                </Link>
              </li>
              <li>
                <Link to="/forms" className="text-blue-600 font-semibold hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Student Forms Hub (7 Forms)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="hover:text-blue-600 transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/dispute-resolution" className="hover:text-blue-600 transition-colors">
                  Dispute & Charge Resolution
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy & Data Security
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-blue-600 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory & Ethical Educational Transparency Notice */}
        <div className="py-6 border-b border-slate-200 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-900 font-semibold">Educational Transparency Notice:</strong> Astra Pathways is operated by Madyan Holdings. We provide practical tech skills training, real hands-on projects, and career preparation. We do not provide job guarantees or guaranteed salaries. Career support includes resume reviews, interview practice, and portfolio coaching. Final job outcomes depend entirely on individual student dedication, skill, and employer hiring requirements.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Astra Pathways · Madyan Holdings. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/company/madyan-holdings-llc/" target="_blank" rel="noreferrer" className="hover:text-blue-600 font-medium transition-colors">
              LinkedIn
            </a>
            <a href="https://www.facebook.com/share/1Dd89LFKJ1/" target="_blank" rel="noreferrer" className="hover:text-blue-600 font-medium transition-colors">
              Facebook
            </a>
            <a href="https://www.instagram.com/astra_pathways26?utm_source=qr&psln=Nm1oNnFtN2VxcXlw" target="_blank" rel="noreferrer" className="hover:text-blue-600 font-medium transition-colors">
              Instagram
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
