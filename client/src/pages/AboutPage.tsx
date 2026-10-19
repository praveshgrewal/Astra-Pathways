import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Target, Compass, Award, Shield, Users, BookOpen, 
  Terminal, CheckCircle2, ArrowRight, MessageSquare 
} from 'lucide-react';

interface AboutPageProps {
  onOpenAdvisorModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenAdvisorModal }) => {
  const teamMembers = [
    {
      name: 'Dr. Aris Vance',
      role: 'Head of Academic Pedagogy (Placeholder)',
      bio: 'Former university faculty and distributed systems researcher focused on project-driven curriculum design.',
      avatarInitials: 'AV'
    },
    {
      name: 'Maya Lin',
      role: 'Director of Industry Alignment (Placeholder)',
      bio: 'Technology architect with 14+ years designing scalable cloud architectures and software engineering standards.',
      avatarInitials: 'ML'
    },
    {
      name: 'Samuel O’Connor',
      role: 'Lead Data Science Instructor (Placeholder)',
      bio: 'Quantitative analyst specializing in practical statistical modeling, predictive algorithms, and pipeline engineering.',
      avatarInitials: 'SO'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Career Support Services (Placeholder)',
      bio: 'Technical talent consultant guiding engineers through resume storytelling, portfolio readiness, and technical interviews.',
      avatarInitials: 'PS'
    }
  ];

  const coreValues = [
    {
      title: 'Practical Rigor First',
      desc: 'We prioritize working code, real datasets, and functional architectures over rote memorization of theoretical trivia.',
      icon: Terminal,
      color: '#4F7CFF'
    },
    {
      title: 'Uncompromising Transparency',
      desc: 'We never publish exaggerated placement statistics, deceptive guarantees, or hidden fees. We believe in honest education.',
      icon: Shield,
      color: '#8B5CF6'
    },
    {
      title: 'Empowered Learners',
      desc: 'Our role is providing structured pathways, diagnostic feedback, and mentorship so learners develop self-sufficient problem-solving.',
      icon: Users,
      color: '#38BDF8'
    },
    {
      title: 'Continuous Industry Relevance',
      desc: 'Our curricula continuously evolve to align with current tooling, frameworks, security practices, and engineering workflows.',
      icon: Target,
      color: '#10B981'
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
            Our Heritage & Vision
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Empowering Careers Through Meaningful Technical Education
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mt-6 leading-relaxed">
            Astra Pathways was founded with a singular conviction: modern technical education must be hands-on, transparent, and anchored in practical deliverables.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        
        {/* Brand Story & Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">
              The Astra Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1020] tracking-tight leading-tight">
              Bridging the Divide Between Theory and Practical Competence
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              In today's fast-paced tech landscape, learners are routinely caught between abstract university courses and superficial online tutorials. While tutorials show syntax, they rarely cultivate the debugging resilience, architectural judgment, and systems thinking required in modern workplaces.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Astra Pathways creates rigorous, structured learning pathways centered around practical laboratory milestones. Learners don't merely watch instructors code; they design schemas, configure containerized deployments, optimize model pipelines, and defend applications against vulnerabilities.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-md space-y-6">
            <div className="border-b border-gray-100 pb-5">
              <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-wider">Our Mission</span>
              <h3 className="text-xl font-bold text-[#0B1020] mt-1">
                Democratize Rigorous Technical Capability
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                To equip driven individuals with demonstrable technical skills, structured mentorship, and professional career readiness to navigate their career pathways.
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider">Our Vision</span>
              <h3 className="text-xl font-bold text-[#0B1020] mt-1">
                A Transparent Global Learning Standard
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                A world where educational quality is measured by genuine competence, verified project artifacts, and transparent learner outcomes rather than hollow claims.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] bg-[#8B5CF6]/10 px-3 py-1 rounded-full">
              Core Principles
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B1020] tracking-tight mt-3">
              Values That Guide Astra Pathways
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${val.color}15`, color: val.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#0B1020] mb-2">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Commitment to Practical Education */}
        <section className="bg-[#0B1020] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F7CFF] bg-[#4F7CFF]/15 px-3 py-1 rounded-full border border-[#4F7CFF]/30">
              Our Educational Commitment
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-4 mb-4">
              Our Pledge to Every Learner
            </h2>
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-300 leading-relaxed mb-8">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#4F7CFF] shrink-0 mt-0.5" />
                <span>We teach current industry frameworks, paradigms, and security conventions.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>Every curriculum includes verified milestone projects designed for portfolio presentation.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>We provide structured placement assistance, mock technical interviews, and resume coaching.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>We never make false claims, guaranteed job promises, or deceptive salary representations.</span>
              </div>
            </div>

            <button
              onClick={onOpenAdvisorModal}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-md shadow-[#4F7CFF]/20 transition-all inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Speak With Our Academic Team
            </button>
          </div>
        </section>

        {/* Faculty and Team Profiles */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">
              Academic Leadership
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B1020] tracking-tight mt-3">
              Faculty & Academic Advisory Team
            </h2>
            <p className="text-xs text-gray-500 italic mt-2">
              Note: Team profiles shown below represent instructional leadership and advisory roles; editable placeholders pending official accreditation review.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0B1020] to-[#252B66] text-[#4F7CFF] border-2 border-white flex items-center justify-center font-extrabold text-lg shadow-sm mb-4">
                  {member.avatarInitials}
                </div>
                <h3 className="text-base font-bold text-[#0B1020]">{member.name}</h3>
                <span className="text-xs font-semibold text-[#8B5CF6] mb-3 block">{member.role}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="text-center py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-[#0B1020] mb-3">
            Want to learn more about our curriculum?
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto mb-6">
            Browse our program catalog or speak with an academic advisor regarding admissions and prerequisites.
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
              Contact Advisory Team
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
