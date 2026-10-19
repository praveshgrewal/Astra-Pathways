import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Shield, Compass, FileText, UserCheck, Video, 
  Target, Award, CheckCircle2, MessageSquare, ArrowRight, Briefcase 
} from 'lucide-react';

interface CareerSupportPageProps {
  onOpenAdvisorModal: () => void;
}

export const CareerSupportPage: React.FC<CareerSupportPageProps> = ({ onOpenAdvisorModal }) => {
  const supportServices = [
    {
      title: 'Technical Resume Development',
      desc: 'Work with talent specialists to translate your milestone projects, code contributions, and architectural problem-solving into clear, ATS-compliant technical resumes.',
      icon: FileText,
      color: '#4F7CFF'
    },
    {
      title: 'LinkedIn & GitHub Profile Guidance',
      desc: 'Optimize your digital footprints. Ensure your repositories feature clean READMEs, functional demo deployments, clean commits, and clear architectural diagrams.',
      icon: UserCheck,
      color: '#8B5CF6'
    },
    {
      title: 'Mock Technical Interviews',
      desc: 'Simulate realistic coding interviews, whiteboard system design problems, and live debugging scenarios under realistic timed constraints with actionable feedback.',
      icon: Video,
      color: '#38BDF8'
    },
    {
      title: 'Behavioral & Leadership Preparation',
      desc: 'Master the STAR methodology to communicate past projects, team dynamics, cross-functional conflict resolution, and engineering trade-offs with confidence.',
      icon: Briefcase,
      color: '#10B981'
    },
    {
      title: 'Portfolio & Code Reviews',
      desc: 'Receive thorough critique on your capstone projects before presenting them to engineering hiring teams, eliminating common code smells and security flaws.',
      icon: Target,
      color: '#F59E0B'
    },
    {
      title: 'Strategic Job-Search Guidance',
      desc: 'Develop an organized, systematic job-search strategy: evaluating suitable openings, identifying hiring trends, tailoring applications, and managing follow-ups.',
      icon: Compass,
      color: '#6366F1'
    },
    {
      title: 'Career-Readiness Workshops',
      desc: 'Participate in group workshops discussing tech market dynamics, modern engineering interview patterns, and offer evaluation principles.',
      icon: Award,
      color: '#EC4899'
    },
    {
      title: 'Placement Assistance',
      desc: 'Our career specialists provide guided support in identifying and preparing for appropriate industry opportunities tailored to your developed skillset.',
      icon: Shield,
      color: '#14B8A6'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-[#4F7CFF]/15 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#4F7CFF] border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Professional Advancement
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Career Support & Placement Assistance
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mt-6 leading-relaxed">
            Developing technical competence is only half the journey. Our dedicated career support team guides you through portfolio presentation, interview preparation, and professional navigation.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        {/* Prominent Educational Disclosure Card */}
        <div className="p-7 sm:p-9 rounded-3xl bg-[#0B1020] text-gray-200 border border-white/10 shadow-xl max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4F7CFF]/20 text-[#4F7CFF] flex items-center justify-center shrink-0 mt-0.5">
              <Shield className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white">
                Our Transparent Career Support Philosophy
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-gray-300 font-medium">
                “We support learners in preparing for career opportunities through structured guidance, interview preparation, resume support, and placement assistance. Employment outcomes depend on individual skills, preparation, eligibility, and employer requirements.”
              </p>
              <div className="pt-2 border-t border-white/10 text-xs text-gray-400 space-y-1">
                <p>• Astra Pathways does not promise, advertise, or guarantee job placements, interviews, or salaries.</p>
                <p>• Our focus is delivering authentic education and dedicated preparatory career support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Support Services Grid */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] bg-[#8B5CF6]/10 px-3 py-1 rounded-full">
              Structured Services
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B1020] tracking-tight mt-3">
              How We Help You Prepare for Opportunities
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Comprehensive support services built directly into your learning pathway experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${srv.color}15`, color: srv.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#0B1020] mb-2">{srv.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interview Simulation Breakdown */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">
              Realistic Simulation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1020] tracking-tight">
              Master Technical Coding & Systems Design Interviews
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Technical interviews require both problem-solving ability and verbal communication. Our mock interviews simulate real evaluation settings:
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-gray-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#4F7CFF] shrink-0 mt-0.5" />
                <span>Live live-coding challenges with time complexity (Big-O) analysis.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>Architecture whiteboard sessions defending scalability and consistency trade-offs.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Detailed rubric scoring with specific recommendations for improvement.</span>
              </div>
            </div>

            <button
              onClick={onOpenAdvisorModal}
              className="px-6 py-3 rounded-xl bg-[#0B1020] text-white font-bold text-xs sm:text-sm hover:bg-gray-800 transition-colors inline-flex items-center gap-2 mt-4"
            >
              <MessageSquare className="w-4 h-4" /> Ask About Career Support
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B1020] text-white space-y-4 shadow-xl border border-white/10">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold text-gray-400">Mock Assessment Framework</span>
              <span className="text-xs text-emerald-400 font-semibold">Standardized Rubric</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between font-bold mb-1">
                  <span>Algorithmic Problem Decomposition</span>
                  <span className="text-[#4F7CFF]">4.8 / 5.0</span>
                </div>
                <p className="text-gray-400 text-[11px]">Ability to explain step-by-step logic before coding.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between font-bold mb-1">
                  <span>Code Cleanliness & Edge Handling</span>
                  <span className="text-[#8B5CF6]">4.6 / 5.0</span>
                </div>
                <p className="text-gray-400 text-[11px]">Validating null inputs, typing, and modular helpers.</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between font-bold mb-1">
                  <span>System Architecture Justification</span>
                  <span className="text-emerald-400]">4.9 / 5.0</span>
                </div>
                <p className="text-gray-400 text-[11px]">Articulating database schema choices and latency trade-offs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-[#0B1020] mb-3">
            Ready to explore your career pathway?
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto mb-6">
            Speak with an academic advisor today to discuss program curricula, prerequisites, and support options.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/programs"
              className="px-6 py-3 rounded-xl bg-[#0B1020] text-white font-bold text-xs sm:text-sm hover:bg-gray-800 transition-colors"
            >
              Explore Programs
            </Link>
            <button
              onClick={onOpenAdvisorModal}
              className="px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold text-xs sm:text-sm hover:bg-gray-50 transition-colors"
            >
              Talk to an Advisor
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
