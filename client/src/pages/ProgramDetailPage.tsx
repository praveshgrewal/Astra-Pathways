import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Sparkles, CheckCircle2, ChevronDown, ChevronUp, ArrowLeft, ArrowRight,
  Download, MessageSquare, Terminal, Users, Target, Shield, Layers, Code,
  Laptop, Compass, BookOpen, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { Program } from '../types';

interface ProgramDetailPageProps {
  onOpenAdvisorModal: (programTitle?: string) => void;
}

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({ onOpenAdvisorModal }) => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [relatedPrograms, setRelatedPrograms] = useState<Program[]>([]);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getProgram(id)
      .then(res => {
        if (res.success && res.program) {
          setProgram(res.program);
          // Fetch related
          api.getPrograms({ category: res.program.category })
            .then(relRes => {
              if (relRes.success) {
                setRelatedPrograms(relRes.programs.filter((p: Program) => p.id !== id).slice(0, 2));
              }
            })
            .catch(() => {});
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDownloadCurriculum = () => {
    if (!program) return;
    // Generate syllabus summary text file and trigger download
    const syllabusText = `ASTRA PATHWAYS — OFFICIAL CURRICULUM OVERVIEW
Program: ${program.title}
Category: ${program.category}
Level: ${program.level}
Learning Format: ${program.learning_format}

OVERVIEW:
${program.full_overview}

PREREQUISITES:
${program.prerequisites.map(p => `• ${p}`).join('\n')}

LEARNING OBJECTIVES:
${program.learning_objectives.map(o => `• ${o}`).join('\n')}

SKILLS COVERED:
${program.skills_covered.join(', ')}

TOOLS & TECHNOLOGIES:
${program.tools_technologies.join(', ')}

CURRICULUM MODULES:
${program.curriculum_modules.map((m, i) => `Module ${i + 1}: ${m.title}\n${m.description}\nTopics:\n${m.topics.map(t => `  - ${t}`).join('\n')}`).join('\n\n')}

SAMPLE PRACTICAL PROJECTS:
${program.sample_projects.map(p => `• ${p.title} (${p.tags.join(', ')}):\n  ${p.description}`).join('\n')}

PEDAGOGY & METHODOLOGY:
${program.learning_methodology}

MENTORSHIP & SUPPORT:
${program.mentorship_support}

CAREER SUPPORT & PLACEMENT ASSISTANCE:
${program.placement_support_info}

Note: Astra Pathways provides career support and placement assistance without guaranteeing job placement or employment outcomes.
Contact: info@astrapathways.net | Phone: 1-307-317-7151 | Office: 30 N Gould St, STE N, Sheridan, WY, USA - 82801
Availability: Monday to Sunday (7 days a week), 9am to 9pm EST.`;

    const blob = new Blob([syllabusText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${program.id}-curriculum-syllabus.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FC] py-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#4F7CFF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-gray-600">Loading program curriculum details...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-[#F5F7FC] py-24 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-3xl border border-gray-200 max-w-md mx-auto shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#0B1020]">Program Not Found</h2>
          <p className="text-sm text-gray-600 mt-2 mb-6">The requested curriculum pathway does not exist or has been updated.</p>
          <Link
            to="/programs"
            className="px-6 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24">
      
      {/* Program Header Hero */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-[#4F7CFF]/15 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to all programs
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-xs font-bold text-[#4F7CFF] bg-[#4F7CFF]/15 px-3 py-1 rounded-full border border-[#4F7CFF]/30">
              {program.category}
            </span>
            <span className="text-xs font-medium text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              Level: {program.level}
            </span>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {program.learning_format}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-6">
            {program.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed mb-8">
            {program.full_overview}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenAdvisorModal(program.title)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-sm hover:opacity-95 shadow-lg shadow-[#4F7CFF]/25 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Enquire About This Program
            </button>

            <button
              onClick={handleDownloadCurriculum}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#4F7CFF]" />
              {downloadSuccess ? 'Curriculum Downloaded!' : 'Download Syllabus Outline'}
            </button>
          </div>

        </div>
      </section>

      {/* Program Details Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main 2-Column Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Who It's For & Prerequisites */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B1020]">Who This Is For</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  {program.who_is_it_for.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4F7CFF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B1020]">Prerequisites</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  {program.prerequisites.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Learning Objectives */}
            <div className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0B1020]">Key Learning Objectives</h2>
                  <p className="text-xs text-gray-500">Measurable technical capabilities developed through the track.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {program.learning_objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/70 border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Module Curriculum */}
            <div className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#0B1020]">Detailed Module Curriculum</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Explore each phase, lab exercises, and practical topics covered.</p>
                </div>
                <span className="text-xs font-semibold text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-lg">
                  {program.curriculum_modules.length} Modules
                </span>
              </div>

              <div className="space-y-4">
                {program.curriculum_modules.map((mod, idx) => {
                  const isOpen = openModuleIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-gray-200 rounded-xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0B1020] hover:text-[#4F7CFF] bg-white transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-gray-100 text-xs font-extrabold text-gray-600 flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span>{mod.title}</span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#4F7CFF]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-2 border-t border-gray-100 bg-gray-50/50 space-y-3">
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {mod.description}
                          </p>

                          <div>
                            <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                              Core Topics & Guided Labs:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {mod.topics.map((t, tIdx) => (
                                <div key={tIdx} className="flex items-center gap-2 text-xs text-gray-700 bg-white p-2 rounded-lg border border-gray-100">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF]" />
                                  <span>{t}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Practical Projects */}
            <div className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0B1020]">Practical Milestone Projects</h2>
                  <p className="text-xs text-gray-500">Representative portfolio deliverables created in this program.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {program.sample_projects.map((proj, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-gray-50 border border-gray-200/80">
                    <h3 className="text-base font-bold text-[#0B1020] mb-2">{proj.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((t, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-gray-700 border border-gray-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pedagogy, Mentorship & Assessment Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                <Terminal className="w-6 h-6 text-[#4F7CFF] mb-3" />
                <h3 className="text-sm font-bold text-[#0B1020] mb-1.5">Methodology</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{program.learning_methodology}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                <Users className="w-6 h-6 text-[#8B5CF6] mb-3" />
                <h3 className="text-sm font-bold text-[#0B1020] mb-1.5">Mentorship & Support</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{program.mentorship_support}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-3" />
                <h3 className="text-sm font-bold text-[#0B1020] mb-1.5">Assessment Approach</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{program.assessment_approach}</p>
              </div>

            </div>

            {/* Career Support & Placement Assistance Policy */}
            <div className="p-6 rounded-2xl bg-[#0B1020] text-gray-300 border border-white/10">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-[#4F7CFF] shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white">Career Pathways & Placement Assistance</h3>
                  <div className="flex flex-wrap gap-2 pt-1 pb-2">
                    {program.career_pathways.map((path, idx) => (
                      <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 text-gray-200 border border-white/10">
                        {path}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {program.placement_support_info}
                  </p>
                  <p className="text-[11px] text-gray-400 border-t border-white/10 pt-2">
                    *Important Disclosure: Astra Pathways provides interview coaching, resume optimization, and placement assistance support. We do not provide guaranteed employment, job guarantees, or fixed salary packages. Outcomes depend on individual capability, dedication, and hiring organization requirements.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar / Quick Inquiry Card */}
          <div className="space-y-8">
            
            {/* Action Card */}
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-lg space-y-6">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Program Enrollment
                </span>
                <h3 className="text-xl font-bold text-[#0B1020] mt-1">
                  Ready to Start?
                </h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Connect with our academic team to discuss syllabus details, lab schedules, and enrollment availability.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-100">
                <button
                  onClick={() => onOpenAdvisorModal(program.title)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-sm hover:opacity-95 shadow-md shadow-[#4F7CFF]/25 transition-all text-center"
                >
                  Enquire Now
                </button>

                <button
                  onClick={handleDownloadCurriculum}
                  className="w-full py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0B1020] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-[#4F7CFF]" />
                  Download Syllabus (.txt)
                </button>
              </div>

              {/* Tools & Tech Covered */}
              <div className="pt-4 border-t border-gray-100">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Tools & Technologies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {program.tools_technologies.map((tool, idx) => (
                    <span key={idx} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills Developed */}
              <div className="pt-4 border-t border-gray-100">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Skills Developed:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {program.skills_covered.map((skill, idx) => (
                    <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#4F7CFF]/10 text-[#4F7CFF]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Advisor Support Help Callout */}
              <div className="p-4 rounded-xl bg-[#F5F7FC] border border-gray-200/80 text-xs text-gray-600 space-y-1">
                <span className="font-bold text-[#0B1020] block">Need Guidance?</span>
                <p>Speak with an academic advisor to understand if this track aligns with your prior experience.</p>
              </div>

            </div>

          </div>

        </div>

        {/* Related Programs Section */}
        {relatedPrograms.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-[#0B1020] mb-8">Related Learning Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPrograms.map((rel) => (
                <div key={rel.id} className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-[11px] font-bold text-[#4F7CFF] bg-[#4F7CFF]/10 px-2 py-0.5 rounded">
                      {rel.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#0B1020] mt-2 mb-2">{rel.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">{rel.short_description}</p>
                  </div>
                  <Link
                    to={`/programs/${rel.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F7CFF] hover:text-[#8B5CF6]"
                  >
                    Explore Program <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
