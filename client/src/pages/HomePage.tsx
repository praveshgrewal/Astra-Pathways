import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Code2, Brain, Database, Cloud, Shield, CheckCircle2,
  Compass, Laptop, Users, Target, HelpCircle, ChevronDown, ChevronUp, Layers,
  Terminal, BarChart3, Lock, Rocket, MessageSquare, Building2, Briefcase
} from 'lucide-react';
import { PathwaysCanvas } from '../components/common/PathwaysCanvas';
import { api } from '../services/api';
import { Program, Blog, FAQ } from '../types';

interface HomePageProps {
  onOpenAdvisorModal: (programTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAdvisorModal }) => {
  const [featuredPrograms, setFeaturedPrograms] = useState<Program[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openFaq, setOpenFaq] = useState<string | null>('faq_1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getPrograms({ featured: true }),
      api.getBlogs(),
      api.getFaqs()
    ]).then(([progRes, blogRes, faqRes]) => {
      if (progRes.success) setFeaturedPrograms(progRes.programs);
      if (blogRes.success) setBlogs(blogRes.blogs.slice(0, 3));
      if (faqRes.success) setFaqs(faqRes.faqs.slice(0, 6));
    }).catch(err => {
      console.error('Failed to load homepage data', err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const trustValues = [
    {
      title: 'Practical Learning',
      desc: 'Learn by actively constructing applications and systems rather than passive lecture consumption.',
      icon: Terminal,
      color: '#4F7CFF'
    },
    {
      title: 'Industry-Relevant Curriculum',
      desc: 'Continuously refined modules reflecting current technological tooling and engineering paradigms.',
      icon: Layers,
      color: '#8B5CF6'
    },
    {
      title: 'Project-Based Experience',
      desc: 'Build functional portfolio artifacts with code reviews, tests, and deployment verification.',
      icon: Laptop,
      color: '#38BDF8'
    },
    {
      title: 'Mentorship & Support',
      desc: 'Regular office hours, structured code critique, and guided feedback from domain practitioners.',
      icon: Users,
      color: '#818CF8'
    },
    {
      title: 'Career Guidance',
      desc: 'Resume coaching, GitHub presentation, interview simulations, and strategic job-search planning.',
      icon: Compass,
      color: '#A78BFA'
    },
    {
      title: 'Placement Assistance',
      desc: 'Structured professional support to prepare for industry opportunities without false promises.',
      icon: Target,
      color: '#60A5FA'
    }
  ];

  const learningSteps = [
    { step: '01', title: 'Discover', desc: 'Identify your target specialization and review prerequisite requirements with advisors.' },
    { step: '02', title: 'Learn', desc: 'Deep dive into fundamental theory, architecture patterns, and structured lessons.' },
    { step: '03', title: 'Practice', desc: 'Complete interactive programming exercises and milestone labs with instant diagnostics.' },
    { step: '04', title: 'Build Projects', desc: 'Engineer complete real-world software artifacts designed for technical portfolios.' },
    { step: '05', title: 'Receive Guidance', desc: 'Participate in milestone code reviews and 1-on-1 practitioner feedback sessions.' },
    { step: '06', title: 'Prepare for Opportunities', desc: 'Engage in mock technical interviews, resume optimization, and placement assistance.' }
  ];

  const sampleProjects = [
    {
      title: 'Enterprise Microservices Orchestration',
      program: 'Cloud Computing & DevOps',
      desc: 'Simulated containerized infrastructure with automated CI/CD pipeline and telemetry.',
      tags: ['Docker', 'Kubernetes', 'GitHub Actions'],
      icon: Cloud
    },
    {
      title: 'Predictive Churn Classification Pipeline',
      program: 'AI & Machine Learning',
      desc: 'End-to-end data pipeline with feature selection, cross-validation, and REST API inference.',
      tags: ['Python', 'Scikit-Learn', 'FastAPI'],
      icon: Brain
    },
    {
      title: 'Collaborative Real-Time Workspace',
      program: 'Full-Stack Web Development',
      desc: 'Full-stack application featuring modular React components, typed APIs, and relational persistence.',
      tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      icon: Code2
    },
    {
      title: 'Web Application Defensive Audit',
      program: 'Cybersecurity Defense',
      desc: 'Security assessment lab identifying OWASP Top 10 vulnerabilities with remediation patches.',
      tags: ['AppSec', 'OWASP', 'Wireshark'],
      icon: Shield
    },
    {
      title: 'Cohort Retention & Revenue Analytics',
      program: 'Data Science & Analytics',
      desc: 'Multi-touch attribution analysis evaluating customer lifetime engagement patterns.',
      tags: ['SQL', 'Pandas', 'Business Intelligence'],
      icon: BarChart3
    },
    {
      title: 'Autonomous Document Search Engine',
      program: 'Emerging Technologies',
      desc: 'Vectorized text retrieval architecture with similarity search and semantic ranking.',
      tags: ['Python', 'Vector DB', 'Information Retrieval'],
      icon: Database
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-[#0B1020] text-white overflow-hidden pt-12 pb-20">
        {/* Animated Canvas */}
        <PathwaysCanvas />

        {/* Ambient Gradient Flares */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#4F7CFF]/20 via-[#8B5CF6]/15 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[350px] bg-[#252B66]/30 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Co-branded Presentation Lockup: Madyan Holdings (Left) & Astra Pathways (Right) */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#181124]/90 via-[#0B1020]/95 to-[#121B3A]/90 border border-white/15 backdrop-blur-xl mb-8 shadow-2xl shadow-[#7C3AED]/20 hover:border-white/25 transition-all animate-in fade-in duration-500">
            {/* Left: Madyan Holdings Logo & Name */}
            <div className="flex items-center gap-2.5">
              <div className="h-10 sm:h-11 px-2.5 py-1 rounded-xl overflow-hidden bg-[#160e24] border border-[#7C3AED]/40 flex items-center justify-center shadow-md shrink-0">
                <img 
                  src="/madyan-holdings.png" 
                  alt="Madyan Holdings Logo" 
                  className="h-8 sm:h-9 w-auto object-contain rounded"
                />
              </div>
              <div className="flex flex-col text-left justify-center">
                <span className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                  Madyan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">Holdings</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-amber-300/90 font-medium tracking-wider uppercase">
                  Crossroads of Commerce
                </span>
              </div>
            </div>

            {/* Middle Badge: Host & Introduce */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-xs font-semibold text-gray-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-[#8B5CF6]">
                Introduces & Hosts
              </span>
            </div>

            {/* Right: Astra Pathways Logo & Name */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center shadow-lg shadow-[#4F7CFF]/25 shrink-0">
                <img src="/logo.png" alt="Astra Pathways Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-left justify-center">
                <span className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                  Astra <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]">Pathways</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-cyan-300/90 font-medium tracking-wider uppercase">
                  School & Programs
                </span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
            Build Skills Today.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7CFF] via-[#8B5CF6] to-[#60A5FA]">
              Shape Your Tomorrow.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            <span className="text-white font-semibold">Madyan Holdings</span> proudly introduces <span className="text-white font-semibold">Astra Pathways</span> — our premier school of practical technical education, offering industry-calibrated curricula, verifiable milestone artifacts, and guided career pathways.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/programs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-sm sm:text-base hover:from-[#3d6bf0] hover:to-[#7c4bed] transition-all shadow-lg shadow-[#4F7CFF]/25 hover:shadow-xl hover:shadow-[#4F7CFF]/35 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              Explore Programs
            </Link>

            <button
              onClick={() => onOpenAdvisorModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base border border-white/15 hover:border-white/30 backdrop-blur-md transition-all hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-[#4F7CFF]" />
              Talk to an Advisor
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center max-w-5xl mx-auto border-t border-white/10 mt-16">
            <div className="p-3">
              <span className="block text-sm font-bold text-white">Project-First</span>
              <span className="text-xs text-gray-400">Hands-on Labs</span>
            </div>
            <div className="p-3">
              <span className="block text-sm font-bold text-white">Curated Paths</span>
              <span className="text-xs text-gray-400">Zero Fluff Content</span>
            </div>
            <div className="p-3">
              <span className="block text-sm font-bold text-white">Practitioner Review</span>
              <span className="text-xs text-gray-400">Code Feedback</span>
            </div>
            <div className="p-3">
              <span className="block text-sm font-bold text-white">Career Support</span>
              <span className="text-xs text-gray-400">Resume & Mock Prep</span>
            </div>
            <div className="p-3">
              <span className="block text-sm font-bold text-white">Student Portal</span>
              <span className="text-xs text-gray-400">Milestone Tracking</span>
            </div>
            <div className="p-3">
              <span className="block text-sm font-bold text-white">Transparent Ethics</span>
              <span className="text-xs text-gray-400">No False Claims</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= HOSTED BY MADYAN HOLDINGS SECTION ================= */}
      <section className="bg-gradient-to-b from-[#0B1020] via-[#120d24] to-[#0B1020] text-white py-16 border-y border-white/10 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-[#7C3AED]/15 via-transparent to-[#4F7CFF]/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Dual Logo Card (Left: Madyan Holdings, Right: Astra Pathways) */}
              <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Institutional Sponsor & Host
                </span>

                {/* Both Logos in clear Left/Right presentation */}
                <div className="w-full flex items-center justify-between sm:justify-start gap-4 p-5 rounded-2xl bg-[#0B1020]/90 border border-white/15 shadow-xl">
                  {/* Left: Madyan Holdings Logo */}
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-28 sm:w-32 rounded-xl overflow-hidden bg-[#160e24] border border-[#7C3AED]/40 flex items-center justify-center shadow-lg p-1">
                      <img 
                        src="/madyan-holdings.png" 
                        alt="Madyan Holdings" 
                        className="h-full w-full object-cover rounded-lg" 
                      />
                    </div>
                    <span className="block text-sm font-black text-white mt-2 uppercase tracking-wide">
                      Madyan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">Holdings</span>
                    </span>
                    <span className="block text-[9px] text-amber-300 font-semibold tracking-widest uppercase">
                      Crossroads of Commerce
                    </span>
                  </div>

                  {/* Host Connector */}
                  <div className="flex flex-col items-center justify-center px-1">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">hosts</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-cyan-400 my-1 font-bold">
                      &rarr;
                    </div>
                    <span className="text-[9px] text-[#8B5CF6] font-semibold uppercase">program</span>
                  </div>

                  {/* Right: Astra Pathways Logo */}
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 sm:w-20 rounded-xl overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center shadow-lg shadow-[#4F7CFF]/20 p-1">
                      <img 
                        src="/logo.png" 
                        alt="Astra Pathways" 
                        className="h-full w-full object-contain rounded-lg" 
                      />
                    </div>
                    <span className="block text-xs font-black text-white mt-2 uppercase tracking-wider">
                      Astra Pathways
                    </span>
                    <span className="block text-[8px] text-cyan-300/80 tracking-widest uppercase font-semibold">
                      School & Programs
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  Astra Pathways is hosted and operated under the strategic umbrella of Madyan Holdings, bridging enterprise commerce with rigorous technical education.
                </p>
              </div>

              {/* Informational Pillars */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Madyan Holdings Introduces Astra Pathways
                  </h3>
                  <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                    At the crossroads of global commerce and technological transformation, Madyan Holdings introduces Astra Pathways as an elite training ground for the modern workforce. Every program blends technical depth with real-world business context.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
                    <div className="text-[#4F7CFF] font-bold text-sm mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" /> Enterprise Foundation
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Backed by Madyan Holdings' governance, ensuring accredited curricula, transparent ethics, and high educational standards.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
                    <div className="text-[#8B5CF6] font-bold text-sm mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" /> Crossroads of Commerce
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Lab projects and milestone artifacts modeled on real-world industry requirements, architectures, and data pipelines.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-gray-300">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Project Portfolios
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Dedicated Career Mentorship
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Accredited Technical Modules
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST & VALUE SECTION ================= */}
      <section className="py-20 bg-[#F5F7FC] text-[#0B1020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">
              Educational Foundations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1020] tracking-tight mt-3">
              Built Around Practical Mastery
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
              We anchor every program in verified pedagogical principles: hands-on implementation, continuous feedback loops, and transparent career readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx}
                  className="p-7 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `${val.color}15`, color: val.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1020] mb-2">{val.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROGRAMS ================= */}
      <section className="py-20 bg-[#0B1020] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#8B5CF6] bg-[#8B5CF6]/15 px-3 py-1 rounded-full border border-[#8B5CF6]/30">
                Curriculum Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
                Featured Learning Programs
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
                Structured, rigorous, and project-based pathways designed to build demonstrable competence in modern technical disciplines.
              </p>
            </div>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#4F7CFF] hover:text-[#8B5CF6] transition-colors"
            >
              View Full Program Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((prog) => (
              <div 
                key={prog.id}
                className="rounded-2xl bg-[#0B1020]/80 border border-white/10 hover:border-[#4F7CFF]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#4F7CFF]/10 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-semibold text-[#4F7CFF] bg-[#4F7CFF]/15 px-2.5 py-1 rounded-md border border-[#4F7CFF]/30">
                      {prog.category}
                    </span>
                    <span className="text-[11px] font-medium text-gray-400">
                      {prog.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-[#4F7CFF] transition-colors">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed mb-5 line-clamp-3">
                    {prog.short_description}
                  </p>

                  {/* Skills badges */}
                  <div className="mb-5">
                    <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Key Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.skills_covered.slice(0, 5).map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 py-3 border-t border-white/10 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7CFF] shrink-0" />
                      <span>{prog.curriculum_modules.length} Detailed Modules & Labs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                      <span>{prog.sample_projects.length} Real-World Portfolio Projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{prog.learning_format}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-3 mt-6">
                  <Link
                    to={`/programs/${prog.id}`}
                    className="text-center py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
                  >
                    View Curriculum
                  </Link>
                  <button
                    onClick={() => onOpenAdvisorModal(prog.title)}
                    className="text-center py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md shadow-[#4F7CFF]/20"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}

            {/* Custom Track Card completing the balanced 3x2 grid */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0B1020] via-[#111827] to-[#1E1B4B] border border-dashed border-[#8B5CF6]/40 hover:border-[#8B5CF6] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#8B5CF6]/15 group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-semibold text-[#A78BFA] bg-[#8B5CF6]/15 px-2.5 py-1 rounded-md border border-[#8B5CF6]/30 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#A78BFA]" />
                    Custom & Corporate
                  </span>
                  <span className="text-[11px] font-medium text-emerald-400">
                    Cohort & 1-on-1
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-[#A78BFA] transition-colors">
                  Enterprise & Custom Engineering Tracks
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed mb-5">
                  Need a tailored syllabus for your engineering squad, or a specialized technical transition track? Our curriculum architects design customized learning roadmaps.
                </p>

                {/* Skills badges */}
                <div className="mb-5">
                  <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Flexible Modules:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Team Upskilling', 'Tailored Syllabi', 'Live Architecture Reviews', 'Executive Briefings', 'Custom Capstones'].map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-purple-200 border border-purple-500/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 py-3 border-t border-white/10 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                    <span>Customized Duration & Modular Schedule</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7CFF] shrink-0" />
                    <span>Dedicated Domain Practitioner Mentors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Production Alignment & Security Hardening</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-3 mt-6">
                <Link
                  to="/programs"
                  className="text-center py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors"
                >
                  All Curricula
                </Link>
                <button
                  onClick={() => onOpenAdvisorModal('Custom & Corporate Track')}
                  className="text-center py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#4F7CFF] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md shadow-[#8B5CF6]/20"
                >
                  Request Track
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= WHY ASTRA PATHWAYS ================= */}
      <section className="py-20 bg-white text-[#0B1020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-[#8B5CF6] bg-[#8B5CF6]/10 px-3 py-1 rounded-full">
                Our Educational Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1020] tracking-tight leading-tight">
                Why Choose Astra Pathways for Your Technical Development?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Traditional education frequently over-emphasizes abstract memorization, while casual tutorials fail to prepare learners for production codebases. Astra Pathways bridges this gap through rigorous, deliberate practice and clear pathways.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { title: 'Skills-First Education', desc: 'Curricula engineered backwards from real engineering job competencies, focusing on what developers actually do daily.' },
                  { title: 'Structured Progression', desc: 'No guessing what to learn next. Clear modules advance progressively from foundations to complex architectures.' },
                  { title: 'Actionable Feedback', desc: 'Experienced practitioners review your code milestone submissions, highlighting edge cases and security best practices.' },
                  { title: 'Transparent Support', desc: 'Realistic, honest career guidance and placement assistance without exaggerated promises or marketing tricks.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#4F7CFF]/15 text-[#4F7CFF] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B1020]">{item.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Card Graphic */}
            <div className="relative">
              <div className="p-8 rounded-3xl bg-[#0B1020] text-white shadow-2xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F7CFF]/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">The Astra Competency Standard</h4>
                    <span className="text-xs text-gray-400">Holistic Engineering Readiness</span>
                  </div>
                </div>

                <div className="space-y-4 py-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                      <span>Practical Architecture Proficiency</span>
                      <span className="text-[#4F7CFF] font-bold">Comprehensive</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[90%] h-full bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                      <span>Code Quality & Testing Standards</span>
                      <span className="text-[#8B5CF6] font-bold">Rigorous</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                      <span>Technical Presentation & Interviews</span>
                      <span className="text-emerald-400 font-bold">Guided</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[95%] h-full bg-gradient-to-r from-[#4F7CFF] to-emerald-400]" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>Continuous Lab Diagnostics</span>
                  <span className="text-gray-300 font-semibold">Active Enrollment</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= LEARNING JOURNEY ================= */}
      <section className="py-20 bg-[#F5F7FC] text-[#0B1020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">
              Structured Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1020] tracking-tight mt-3">
              The Astra Learning Journey
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              A transparent, six-step journey transforming technical ambition into demonstrable capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningSteps.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
              >
                <span className="text-4xl font-black text-gray-100 group-hover:text-[#4F7CFF]/15 transition-colors absolute top-4 right-4 select-none">
                  {item.step}
                </span>
                <span className="inline-block text-xs font-bold text-[#4F7CFF] mb-2 uppercase tracking-wider">
                  Phase {item.step}
                </span>
                <h3 className="text-lg font-bold text-[#0B1020] mb-2 relative z-10">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed relative z-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRACTICAL PROJECTS SECTION ================= */}
      <section className="py-20 bg-[#0B1020] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#4F7CFF] bg-[#4F7CFF]/15 px-3 py-1 rounded-full border border-[#4F7CFF]/30">
              Concrete Deliverables
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              Sample Practical Projects
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed">
              Real engineering artifacts built across our pathways. These represent sample assignments designed to showcase practical capability in your professional portfolio.
            </p>
            <p className="text-xs text-gray-500 italic mt-2">
              (Clearly presented as representative program project samples, not fabricated individual testimonials.)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.map((proj, idx) => {
              const Icon = proj.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#4F7CFF]/15 text-[#4F7CFF] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-[#8B5CF6]">
                        {proj.program}
                      </span>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {proj.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {proj.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/10 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CAREER SUPPORT SECTION ================= */}
      <section className="py-20 bg-white text-[#0B1020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">
              Career Readiness
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1020] tracking-tight mt-3">
              Comprehensive Career Support Services
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
              We empower learners through systematic interview preparation, resume refinement, code presentation coaching, and structured placement assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Resume Development', desc: 'Craft modern, ATS-friendly technical resumes that effectively showcase your project artifacts.' },
              { title: 'Profile & Portfolio Review', desc: 'Optimize your GitHub and LinkedIn profiles to highlight demonstrable technical problem-solving.' },
              { title: 'Mock Technical Interviews', desc: 'Simulate live coding challenges, system design discussions, and behavioral interview questions.' },
              { title: 'Placement Assistance', desc: 'Receive structured guidance and outreach support to connect with prospective career opportunities.' }
            ].map((support, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F5F7FC] border border-gray-200/80">
                <h3 className="text-base font-bold text-[#0B1020] mb-2">{support.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{support.desc}</p>
              </div>
            ))}
          </div>

          {/* Mandatory Transparent Disclaimer Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1020] text-gray-300 border border-white/10 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#4F7CFF]/20 text-[#4F7CFF] flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white">Our Placement Assistance Policy</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-gray-300">
                  “We support learners in preparing for career opportunities through structured guidance, interview preparation, resume support, and placement assistance. Employment outcomes depend on individual skills, preparation, eligibility, and employer requirements.”
                </p>
                <p className="text-[11px] text-gray-400">
                  Astra Pathways never claims or promises guaranteed jobs, placement guarantees, or salary packages. Our commitment is providing high-quality, practical education and sincere guidance.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= BLOGS & RESOURCES PREVIEW ================= */}
      {blogs.length > 0 && (
        <section className="py-20 bg-[#F5F7FC] text-[#0B1020]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">
                  Educational Insights
                </span>
                <h2 className="text-3xl font-extrabold text-[#0B1020] tracking-tight mt-3">
                  Articles & Learning Resources
                </h2>
              </div>
              <Link
                to="/resources"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4F7CFF] hover:text-[#8B5CF6] transition-colors"
              >
                Explore All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((b) => (
                <article 
                  key={b.id}
                  className="rounded-2xl bg-white border border-gray-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="font-semibold text-[#4F7CFF]">{b.category}</span>
                      <span>{b.read_time}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0B1020] mb-2.5 group-hover:text-[#4F7CFF] transition-colors leading-snug">
                      <Link to={`/resources/${b.slug}`}>
                        {b.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {b.summary}
                    </p>
                  </div>

                  <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">{b.author_name}</span>
                    <Link
                      to={`/resources/${b.slug}`}
                      className="font-bold text-[#4F7CFF] group-hover:text-[#8B5CF6] flex items-center gap-1"
                    >
                      Read Guide <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= FAQ SECTION ================= */}
      <section className="py-20 bg-white text-[#0B1020]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">
              Common Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1020] tracking-tight mt-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Clear answers to help you navigate your educational decisions.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="rounded-2xl border border-gray-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-base text-[#0B1020] hover:text-[#4F7CFF] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#4F7CFF] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/faq"
              className="text-sm font-bold text-[#4F7CFF] hover:text-[#8B5CF6] transition-colors inline-flex items-center gap-1.5"
            >
              Browse complete FAQ knowledgebase <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 bg-gradient-to-b from-[#0B1020] via-[#252B66] to-[#0B1020] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-200 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#4F7CFF]" />
            Your Next Learning Chapter Starts Here
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            Ready to Build Real-World Skills with Astra Pathways?
          </h2>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
            Explore our project-based technical programs or connect with an academic advisor to map out a personalized learning path tailored to your professional objectives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/programs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-sm sm:text-base hover:opacity-95 shadow-lg shadow-[#4F7CFF]/30 transition-all hover:-translate-y-0.5"
            >
              Explore Programs
            </Link>

            <button
              onClick={() => onOpenAdvisorModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/20 transition-all hover:-translate-y-0.5"
            >
              Talk to an Advisor
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
