import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Shield, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1020] text-gray-400 border-t border-white/10 pt-16 pb-12 font-sans relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#4F7CFF]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B1020] border border-white/15 flex items-center justify-center">
                <img src="/logo-icon.svg" alt="Astra Pathways Logo" className="w-8 h-8" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Astra <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]">Pathways</span>
              </span>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Helping motivated learners build industry-relevant technical capabilities, work on practical project artifacts, and navigate career pathways with confidence.
            </p>

            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#4F7CFF]" />
                <span>contact@astrapathways.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8B5CF6]" />
                <span>+1 (800) 555-ASTRA (Placeholder)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Global Digital Campus & Advisory Centers</span>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/programs/full-stack-web-development" className="hover:text-white transition-colors">
                  Full-Stack Web Dev
                </Link>
              </li>
              <li>
                <Link to="/programs/ai-and-machine-learning" className="hover:text-white transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/programs/data-science-and-analytics" className="hover:text-white transition-colors">
                  Data Science & Analytics
                </Link>
              </li>
              <li>
                <Link to="/programs/cloud-computing-and-devops" className="hover:text-white transition-colors">
                  Cloud & DevOps
                </Link>
              </li>
              <li>
                <Link to="/programs/cybersecurity-fundamentals" className="hover:text-white transition-colors">
                  Cybersecurity Defense
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-[#4F7CFF] font-semibold hover:text-[#8B5CF6] flex items-center gap-1 text-xs pt-1">
                  View All Programs <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Approach */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Learning & Career
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/learning-approach" className="hover:text-white transition-colors">
                  Learning Methodology
                </Link>
              </li>
              <li>
                <Link to="/career-support" className="hover:text-white transition-colors">
                  Career Support Services
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Articles & Guides
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact an Advisor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Portals */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Portals & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/student/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF]" />
                  Student Portal
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                  Admin Console
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="hover:text-white transition-colors">
                  Enrollment Terms
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory & Ethical Educational Transparency Notice */}
        <div className="py-6 border-b border-white/5 text-xs text-gray-400 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-[#4F7CFF] shrink-0 mt-0.5" />
            <p>
              <strong className="text-gray-300 font-semibold">Educational Transparency Notice:</strong> Astra Pathways provides industry-focused skill development, practical project-based learning, and career support services. We do not provide guaranteed jobs, placement guarantees, or guaranteed salary packages. Placement assistance refers to dedicated interview preparation, resume reviews, portfolio coaching, and job-search guidance. Final employment outcomes depend on individual learner skill, dedication, eligibility criteria, and hiring partner requirements.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Astra Pathways. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">
              GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">
              Twitter / X
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">
              YouTube
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
