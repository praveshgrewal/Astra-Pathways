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
      title: 'Hands-On Practice',
      desc: 'Learn by actually writing code and building websites and apps, not just watching videos.',
      icon: Terminal,
      color: '#4F7CFF'
    },
    {
      title: 'Real-World Skills',
      desc: 'Focus on modern tools and technologies that companies actually look for and use every day.',
      icon: Layers,
      color: '#8B5CF6'
    },
    {
      title: 'Portfolio Projects',
      desc: 'Graduate with real projects you built yourself to proudly show employers during interviews.',
      icon: Laptop,
      color: '#38BDF8'
    },
    {
      title: 'Friendly Mentorship',
      desc: 'Get personal help, code reviews, and quick answers to your questions whenever you are stuck.',
      icon: Users,
      color: '#818CF8'
    },
    {
      title: 'Career Coaching',
      desc: 'Get your resume polished, your LinkedIn profile optimized, and practice real technical interviews.',
      icon: Compass,
      color: '#A78BFA'
    },
    {
      title: 'Job Search Support',
      desc: 'Step-by-step guidance on finding job openings, applying to companies, and interview prep.',
      icon: Target,
      color: '#60A5FA'
    }
  ];

  const learningSteps = [
    { step: '01', title: 'Pick Your Path', desc: 'Choose the career track that fits your goals, with friendly advice from an academic advisor.' },
    { step: '02', title: 'Learn the Basics', desc: 'Master core concepts step-by-step with simple explanations and clear practical examples.' },
    { step: '03', title: 'Daily Coding Labs', desc: 'Practice coding in bite-sized interactive challenges to build strong muscle memory.' },
    { step: '04', title: 'Build Real Apps', desc: 'Create full working applications you can test, run, and share with friends and employers.' },
    { step: '05', title: 'Get Mentor Feedback', desc: 'Review your code with an experienced mentor who gives you actionable tips to improve.' },
    { step: '06', title: 'Get Career Ready', desc: 'Polish your resume, practice live job interviews, and apply to opportunities with confidence.' }
  ];

  const sampleProjects = [
    {
      title: 'Modern Cloud Web App',
      program: 'Cloud Computing & DevOps',
      desc: 'Deploy a live, high-speed website on the cloud using Docker containers and automated updates.',
      tags: ['Docker', 'Cloud Hosting', 'GitHub'],
      icon: Cloud
    },
    {
      title: 'Customer Prediction AI',
      program: 'AI & Machine Learning',
      desc: 'Build an AI tool in Python that analyzes customer behavior and automatically answers questions.',
      tags: ['Python', 'AI Models', 'FastAPI'],
      icon: Brain
    },
    {
      title: 'Full-Stack Team Workspace',
      program: 'Full-Stack Web Development',
      desc: 'A complete website with user login, live database storage, and a smooth interactive dashboard.',
      tags: ['React', 'JavaScript', 'Node.js', 'Database'],
      icon: Code2
    },
    {
      title: 'Website Defense & Security Lab',
      program: 'Cybersecurity Defense',
      desc: 'Learn how ethical hackers find security flaws and how to fix vulnerabilities to keep websites safe.',
      tags: ['Security Basics', 'Password Defense', 'Firewalls'],
      icon: Shield
    },
    {
      title: 'Company Growth Dashboard',
      program: 'Data Science & Analytics',
      desc: 'Turn messy business numbers into clean visual charts to show how a company can increase sales.',
      tags: ['Python', 'Data Charts', 'Excel / SQL'],
      icon: BarChart3
    },
    {
      title: 'Smart Search Assistant',
      program: 'Emerging Technologies',
      desc: 'A search tool that reads hundreds of documents and answers questions in simple plain English.',
      tags: ['Smart Search', 'Python', 'AI Tools'],
      icon: Database
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* ================= HERO SECTION - Light & Bright ================= */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-blue-50/90 via-indigo-50/30 to-[#F5F7FC] text-slate-900 overflow-hidden pt-12 pb-20 border-b border-slate-200/80">
        {/* Animated Canvas */}
        <PathwaysCanvas />

        {/* Ambient Soft Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#4F7CFF]/15 via-[#8B5CF6]/10 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[350px] bg-blue-100/60 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Co-branded Presentation Lockup: Madyan Holdings (Left) & Astra Pathways (Right) */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-xl mb-8 shadow-xl shadow-blue-500/5 hover:border-slate-300 transition-all animate-in fade-in duration-500">
            {/* Left: Madyan Holdings Logo & Name */}
            <div className="flex items-center gap-2.5">
              <div className="h-10 sm:h-11 px-2.5 py-1 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs shrink-0">
                <img 
                  src="/madyan-holdings.png" 
                  alt="Madyan Holdings Logo" 
                  className="h-8 sm:h-9 w-auto object-contain rounded"
                />
              </div>
              <div className="flex flex-col text-left justify-center">
                <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                  Madyan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">Holdings</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-amber-700 font-semibold tracking-wider uppercase">
                  Operating Entity
                </span>
              </div>
            </div>

            {/* Middle Badge: Host & Introduce */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[10px] sm:text-xs font-bold text-blue-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
              <span>Operates & Introduces</span>
            </div>

            {/* Right: Astra Pathways Logo & Name */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center shadow-xs shrink-0">
                <img src="/logo.png" alt="Astra Pathways Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-left justify-center">
                <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                  Astra <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]">Pathways</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#4F7CFF] font-semibold tracking-wider uppercase">
                  Practical Programs
                </span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-5xl mx-auto leading-[1.1] mb-6">
            Learn Practical Tech Skills.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7CFF] via-[#8B5CF6] to-[#3B82F6]">
              Shape Your Tomorrow.
            </span>
          </h1>

          {/* Supporting Copy - Simple and Welcoming */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            <span className="text-slate-900 font-bold">Madyan Holdings</span> operates <span className="text-slate-900 font-bold">Astra Pathways</span> — beginner-friendly tech programs designed for students, graduates, and career switchers. Build real projects, master in-demand tools, and get 1-on-1 guidance from friendly mentors.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/programs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-sm sm:text-base hover:opacity-95 transition-all shadow-lg shadow-[#4F7CFF]/25 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              Explore Programs
            </Link>

            <button
              onClick={() => onOpenAdvisorModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base border border-slate-300 shadow-sm transition-all hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-[#4F7CFF]" />
              Talk to an Advisor
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center max-w-5xl mx-auto border-t border-slate-200 mt-16">
            <div className="p-3">
              <span className="block text-sm font-bold text-slate-900">Hands-On Practice</span>
              <span className="text-xs text-slate-500">Real Coding Labs</span>
            </div>
            <div className="p-3">
              <span className="block text-sm font-bold text-slate-900">Zero Fluff</span>
              <span className="text-xs text-slate-500">In-Demand Skills</span>
            </div>
            <div className="p-3">
              <span className="block text-sm font-bold text-slate-900">Friendly Mentors</span>
              <span className="text-xs text-slate-500">Personal Reviews</span>
            </div>
            <div className="p-3">
              <span className="block text-sm font-bold text-slate-900">Job Preparation</span>
              <span className="text-xs text-slate-500">Resume & Mocks</span>
            </div>
            <div className="p-3">
              <span className="block text-sm font-bold text-slate-900">Easy Online Portal</span>
              <span className="text-xs text-slate-500">Track Progress</span>
            </div>
            <div className="p-3">
              <span className="block text-sm font-bold text-slate-900">Honest Guidance</span>
              <span className="text-xs text-slate-500">Transparent Terms</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= OPERATED BY MADYAN HOLDINGS SECTION - Light Theme ================= */}
      <section className="bg-gradient-to-b from-[#F5F7FC] via-white to-slate-50 text-slate-900 py-16 border-b border-slate-200/90 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-[#7C3AED]/10 via-transparent to-[#4F7CFF]/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Dual Logo Card (Left: Madyan Holdings, Right: Astra Pathways) */}
              <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Operating Company & Sponsor
                </span>

                {/* Both Logos in clear Left/Right presentation */}
                <div className="w-full flex items-center justify-between sm:justify-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  {/* Left: Madyan Holdings Logo */}
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-28 sm:w-32 rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center shadow-xs p-1">
                      <img 
                        src="/madyan-holdings.png" 
                        alt="Madyan Holdings" 
                        className="h-full w-full object-contain rounded-lg" 
                      />
                    </div>
                    <span className="block text-sm font-black text-slate-900 mt-2 uppercase tracking-wide">
                      Madyan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">Holdings</span>
                    </span>
                    <span className="block text-[9px] text-amber-700 font-semibold tracking-widest uppercase">
                      Crossroads of Commerce
                    </span>
                  </div>

                  {/* Host Connector */}
                  <div className="flex flex-col items-center justify-center px-1">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">operates</span>
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 my-1 font-bold shadow-xs">
                      &rarr;
                    </div>
                    <span className="text-[9px] text-purple-600 font-semibold uppercase">program</span>
                  </div>

                  {/* Right: Astra Pathways Logo */}
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 sm:w-20 rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center shadow-xs p-1">
                      <img 
                        src="/logo.png" 
                        alt="Astra Pathways" 
                        className="h-full w-full object-contain rounded-lg" 
                      />
                    </div>
                    <span className="block text-xs font-black text-slate-900 mt-2 uppercase tracking-wider">
                      Astra Pathways
                    </span>
                    <span className="block text-[8px] text-blue-600 tracking-widest uppercase font-semibold">
                      Practical EdTech
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Astra Pathways is hosted and operated under Madyan Holdings, bringing industry-standard training and supportive mentorship directly to motivated learners.
                </p>
              </div>

              {/* Informational Pillars */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Madyan Holdings Presents Astra Pathways
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    We designed Astra Pathways to make high-demand technology careers accessible to anyone. We cut out confusing academic jargon and replace it with practical projects, friendly guidance, and real-world tools that tech teams actually use.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all">
                    <div className="text-[#4F7CFF] font-bold text-sm mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" /> Trusted Organization
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Backed by Madyan Holdings, ensuring clear policies, prompt support, and transparent student protections.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all">
                    <div className="text-[#8B5CF6] font-bold text-sm mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" /> Career-First Curriculum
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Every module is built around projects you can actually demonstrate to hiring managers and clients.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-700">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Real Portfolio Projects
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Dedicated 1-on-1 Mentors
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Beginner-Friendly Modules
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

      {/* ================= FEATURED PROGRAMS - Light Theme ================= */}
      <section className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-purple-700 bg-purple-100/80 px-3 py-1 rounded-full border border-purple-200">
                Explore What You Can Learn
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Featured Career Programs
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                Practical, beginner-friendly courses designed to teach you real-world tech skills step-by-step through guided projects.
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
                className="rounded-2xl bg-white border border-slate-200 hover:border-[#4F7CFF]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-semibold text-[#4F7CFF] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {prog.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {prog.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#4F7CFF] transition-colors">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-3">
                    {prog.short_description}
                  </p>

                  {/* Skills badges */}
                  <div className="mb-5">
                    <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Tools You Will Master:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.skills_covered.slice(0, 5).map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 py-3 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7CFF] shrink-0" />
                      <span>{prog.curriculum_modules.length} Guided Learning Modules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                      <span>{prog.sample_projects.length} Real Portfolio Projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{prog.learning_format}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-3 mt-6">
                  <Link
                    to={`/programs/${prog.id}`}
                    className="text-center py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors"
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
            <div className="rounded-2xl bg-gradient-to-br from-purple-50/70 via-white to-blue-50/70 border-2 border-dashed border-purple-200 hover:border-purple-400 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl shadow-sm group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-md border border-purple-200 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    Custom & Team Training
                  </span>
                  <span className="text-[11px] font-medium text-emerald-600">
                    Flexible Pacing
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-purple-700 transition-colors">
                  Custom & Career Switcher Tracks
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Looking to switch into tech from another field, or need a customized syllabus for your team? Our advisors create tailored study plans matching your background.
                </p>

                {/* Skills badges */}
                <div className="mb-5">
                  <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Flexible Features:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Beginner Onboarding', 'Personalized Pace', '1-on-1 Mentorship', 'Custom Projects', 'Career Coaching'].map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-purple-700 border border-purple-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 py-3 border-t border-purple-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Flexible Evening & Weekend Schedules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7CFF] shrink-0" />
                    <span>Direct Access to Friendly Tech Mentors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Resume & Interview Support Included</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-purple-100 grid grid-cols-2 gap-3 mt-6">
                <Link
                  to="/programs"
                  className="text-center py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors"
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
      {/* ================= PRACTICAL PROJECTS SECTION - Light Theme ================= */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
              Build Real Things
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Sample Projects You Will Build
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Every course is built around real, portfolio-ready projects. You will create apps, websites, and data dashboards that you can show to employers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.map((proj, idx) => {
              const Icon = proj.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-[#4F7CFF]/50 transition-all hover:-translate-y-1 shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#4F7CFF] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-purple-700">
                        {proj.program}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {proj.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {proj.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/80">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 shadow-xs">
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
      <section className="py-20 bg-slate-50/50 text-[#0B1020] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">
              Career Readiness
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1020] tracking-tight mt-3">
              Friendly Career & Placement Support
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
              We help you prepare for job opportunities with personal resume feedback, mock coding interviews, and guided company outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Resume Development', desc: 'Craft a clean, professional resume that clearly highlights your projects and practical skills.' },
              { title: 'LinkedIn & GitHub Polish', desc: 'Set up your profiles so recruiters and tech teams can easily see what you can build.' },
              { title: 'Mock Tech Interviews', desc: 'Practice answering real coding challenges and interview questions with supportive mentors.' },
              { title: 'Placement Assistance', desc: 'Get personal guidance on finding open roles, applying to companies, and handling offers.' }
            ].map((support, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
                <h3 className="text-base font-bold text-[#0B1020] mb-2">{support.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{support.desc}</p>
              </div>
            ))}
          </div>

          {/* Mandatory Transparent Disclaimer Box - Light Theme */}
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/70 text-slate-800 border border-blue-200/90 max-w-4xl mx-auto shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white text-[#4F7CFF] border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-slate-900">Our Placement Assistance Policy</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                  “We support learners in preparing for career opportunities through structured guidance, interview preparation, resume support, and placement assistance. Employment outcomes depend on individual skills, preparation, eligibility, and employer requirements.”
                </p>
                <p className="text-[11px] text-slate-500">
                  Madyan Holdings and Astra Pathways never make exaggerated claims or fake job guarantees. We focus on giving you high-quality, practical skills and honest mentorship.
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

      {/* ================= FINAL CTA - Light & Inspiring ================= */}
      <section className="py-24 bg-gradient-to-b from-blue-50/80 via-indigo-50/30 to-white text-slate-900 text-center relative overflow-hidden border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white text-[#4F7CFF] border border-blue-200 shadow-xs mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#4F7CFF]" />
            Your Tech Career Starts Today
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            Ready to Build Real Skills with Astra Pathways?
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
            Take the first step toward an exciting tech career. Explore our beginner-friendly courses or chat with a friendly advisor to find the perfect track for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/programs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-sm sm:text-base hover:opacity-95 shadow-lg shadow-[#4F7CFF]/25 transition-all hover:-translate-y-0.5"
            >
              Explore Programs
            </Link>

            <button
              onClick={() => onOpenAdvisorModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base border border-slate-300 shadow-xs transition-all hover:-translate-y-0.5"
            >
              Talk to an Advisor
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
