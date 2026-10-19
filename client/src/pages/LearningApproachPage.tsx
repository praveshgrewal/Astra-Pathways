import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, CheckCircle2, ArrowRight, Terminal, Layers, Laptop, 
  HelpCircle, MessageSquare, Compass, Shield, Code, Cpu 
} from 'lucide-react';

interface LearningApproachPageProps {
  onOpenAdvisorModal: () => void;
}

export const LearningApproachPage: React.FC<LearningApproachPageProps> = ({ onOpenAdvisorModal }) => {
  const [activeStage, setActiveStage] = useState(0);

  const approachStages = [
    {
      stage: '01',
      title: 'Structured Curriculum',
      subtitle: 'Engineered for progressive mastery',
      desc: 'Each learning track is systematically partitioned into modular tiers. Rather than wandering through random concepts, you build from foundational mechanics up to enterprise architectures with unambiguous prerequisites.',
      icon: Layers,
      color: '#4F7CFF',
      details: [
        'Clear learning objectives for every weekly module',
        'Scaffolded cognitive difficulty preventing overwhelm',
        'Direct mapping to modern engineering competencies'
      ]
    },
    {
      stage: '02',
      title: 'Conceptual Understanding',
      subtitle: 'Principles that endure beyond framework lifecycles',
      desc: 'Frameworks shift, but underlying computational abstractions endure. We teach how distributed systems coordinate, how databases execute transaction logs, and how networking protocols operate under load.',
      icon: Cpu,
      color: '#8B5CF6',
      details: [
        'Memory management and runtime lifecycles',
        'System design trade-offs and CAP theorem application',
        'Security threat modeling and input sanitization'
      ]
    },
    {
      stage: '03',
      title: 'Guided Practice',
      subtitle: 'Immediate hands-on laboratory exercises',
      desc: 'Theory without synthesis quickly evaporates. Learners immediately apply concepts in browser sandboxes and local IDE setups, writing tests and resolving deliberate edge cases.',
      icon: Terminal,
      color: '#38BDF8',
      details: [
        'Interactive diagnostic exercises with instant unit test verification',
        'Debugging puzzles mimicking real production incidents',
        'Command-line workflow habits and Git version control'
      ]
    },
    {
      stage: '04',
      title: 'Real-World Case Studies',
      subtitle: 'Deconstructing industry production challenges',
      desc: 'Analyze how high-scale tech organizations navigate outages, architectural migrations, database sharding, and security incidents. Understand the commercial context behind technical decisions.',
      icon: Laptop,
      color: '#10B981',
      details: [
        'Architecture teardowns of scalable cloud deployments',
        'Post-mortem outage analyses and recovery runbooks',
        'Optimization bottlenecks and indexing profiles'
      ]
    },
    {
      stage: '05',
      title: 'Project-Based Learning',
      subtitle: 'Creating demonstrable portfolio artifacts',
      desc: 'You graduate from synthetic exercises to building end-to-end, functional applications. From database schema design to automated CI/CD deployment, you construct software you can discuss authoritatively.',
      icon: Code,
      color: '#F59E0B',
      details: [
        'Modular full-stack systems with authenticated endpoints',
        'Predictive machine learning pipelines deployed as REST APIs',
        'Defensive network monitoring and vulnerability audit logs'
      ]
    },
    {
      stage: '06',
      title: 'Assessments & Feedback',
      subtitle: 'Constructive review by domain practitioners',
      desc: 'Submissions are reviewed against professional engineering rubrics: code readability, computational efficiency, security standards, and comprehensive test coverage.',
      icon: CheckCircle2,
      color: '#EC4899',
      details: [
        'Line-by-line pull request reviews from experienced developers',
        'Feedback on architecture anti-patterns and performance smells',
        'Structured rubrics highlighting strengths and growth areas'
      ]
    },
    {
      stage: '07',
      title: 'Portfolio Development',
      subtitle: 'Translating capability into presentation',
      desc: 'We assist you in documenting your GitHub repositories, crafting concise architecture diagrams, and writing README documentation that clearly demonstrates your problem-solving process.',
      icon: Compass,
      color: '#6366F1',
      details: [
        'Professional README curation and deployment links',
        'Architecture decision record (ADR) writing',
        'Interactive demo hosting on modern cloud infrastructure'
      ]
    },
    {
      stage: '08',
      title: 'Ongoing Career Support',
      subtitle: 'Sustained guidance through professional milestones',
      desc: 'Placement assistance is structured as continuous support: mock interviews, technical whiteboard practice, and resume guidance to help you navigate your career pathway.',
      icon: Shield,
      color: '#14B8A6',
      details: [
        'Technical mock interviews with experienced interviewers',
        'ATS-optimized resume and LinkedIn optimization sessions',
        'Strategic job-search planning and direct application feedback'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-[#8B5CF6]/15 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#8B5CF6] border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#4F7CFF]" />
            The Astra Pedagogy
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            How You Learn: The Astra Methodology
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mt-6 leading-relaxed">
            We reject the passive consumption of tutorial videos. Our eight-stage learning approach trains you to think, architect, and problem-solve like an experienced engineer.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        {/* Interactive Timeline Tabs */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1020]">
              The 8-Stage Learning Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Select any stage below to inspect the pedagogy, practical deliverables, and support provided.
            </p>
          </div>

          {/* Navigation Pill Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
            {approachStages.map((st, idx) => {
              const isSelected = activeStage === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStage(idx)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    isSelected
                      ? 'bg-[#0B1020] text-white shadow-md'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className={`block text-[11px] font-extrabold ${isSelected ? 'text-[#4F7CFF]' : 'text-gray-400'}`}>
                    Step {st.stage}
                  </span>
                  <span className="text-xs font-bold truncate block mt-0.5">
                    {st.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Spotlight */}
          {approachStages[activeStage] && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1020] text-white border border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-2 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-[#4F7CFF] border border-white/10">
                  <span>Stage {approachStages[activeStage].stage}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-200">{approachStages[activeStage].subtitle}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {approachStages[activeStage].title}
                </h3>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {approachStages[activeStage].desc}
                </p>

                <div className="space-y-2 pt-2">
                  {approachStages[activeStage].details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-[#4F7CFF] shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-4">
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white"
                  style={{ backgroundColor: approachStages[activeStage].color }}
                >
                  {React.createElement(approachStages[activeStage].icon, { className: 'w-8 h-8' })}
                </div>
                <h4 className="text-base font-bold text-white">
                  {approachStages[activeStage].title}
                </h4>
                <p className="text-xs text-gray-400">
                  Embedded across all Astra Pathways academic curricula.
                </p>
                <button
                  onClick={onOpenAdvisorModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  Discuss with an Advisor
                </button>
              </div>
            </div>
          )}
        </section>

        {/* All Stages Complete Vertical Roadmap */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">
              Full Breakdown
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B1020] tracking-tight mt-3">
              Comprehensive Stage Blueprint
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approachStages.map((st, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold text-[#4F7CFF] bg-[#4F7CFF]/10 px-2.5 py-1 rounded-md">
                      Stage {st.stage}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {st.subtitle}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B1020] mb-2">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">{st.desc}</p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-gray-100 text-xs text-gray-600">
                  {st.details.slice(0, 2).map((det, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF]" />
                      <span>{det}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <section className="text-center py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-[#0B1020] mb-3">
            Experience our practical approach firsthand
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto mb-6">
            Explore our featured programs or schedule a discussion with an advisor to evaluate which pathway best matches your goals.
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
              Speak With an Advisor
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
