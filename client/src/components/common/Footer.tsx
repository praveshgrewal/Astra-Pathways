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
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/madyan-holdings-llc/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/1Dd89LFKJ1/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/astra_pathways26?utm_source=qr&psln=Nm1oNnFtN2VxcXlw"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-pink-50 text-slate-500 hover:text-pink-600 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
