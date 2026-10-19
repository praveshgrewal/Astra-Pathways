import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, CheckCircle2, Circle, ArrowLeft, Award, 
  HelpCircle, Sparkles, ChevronRight, Layers, Play, Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { StudentEnrollment, Program } from '../../types';

export const StudentPrograms: React.FC = () => {
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>([]);
  const [availablePrograms, setAvailablePrograms] = useState<Program[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState<StudentEnrollment | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizResult, setQuizResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  const sampleQuizzes: Record<string, any> = {
    'full-stack-web-development': {
      title: 'Full-Stack Architecture & TypeScript Checkpoint',
      questions: [
        {
          q: 'Which TypeScript feature guarantees compile-time exhaustiveness checking on discriminated unions?',
          options: [
            'Dynamic runtime eval() checks',
            'Strict switch statements with the "never" type fallback',
            'Automatic string coercion',
            'Disabling the TypeScript compiler'
          ],
          correct: 1
        },
        {
          q: 'Why should password hashes never be generated using fast symmetric encryption (like AES) instead of adaptive hashing (like bcrypt or argon2)?',
          options: [
            'AES requires too many round-trip database queries',
            'Adaptive algorithms introduce artificial work factors to resist high-speed GPU cracking',
            'Symmetric keys can only be stored in browser cookies',
            'Bcrypt outputs plain JSON text'
          ],
          correct: 1
        },
        {
          q: 'In relational database design, what does the ACID property "Isolation" guarantee?',
          options: [
            'All database files must reside on separate virtual hard disks',
            'Concurrent transactions execute without interfering with one another',
            'Data is automatically converted to unstructured XML',
            'No backups are required after writing to disk'
          ],
          correct: 1
        }
      ]
    }
  };

  useEffect(() => {
    Promise.all([
      api.getStudentPrograms(),
      api.getPrograms()
    ]).then(([enrRes, progRes]) => {
      if (enrRes.success && enrRes.enrolledPrograms) {
        setEnrollments(enrRes.enrolledPrograms);
        if (enrRes.enrolledPrograms.length > 0) {
          setSelectedEnrollment(enrRes.enrolledPrograms[0]);
        }
      }
      if (progRes.success) {
        setAvailablePrograms(progRes.programs);
      }
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleTopic = async (topicKey: string) => {
    if (!selectedEnrollment) return;
    const updated = { ...completedTopics, [topicKey]: !completedTopics[topicKey] };
    setCompletedTopics(updated);

    // Calculate updated progress
    const totalTopics = (selectedEnrollment.curriculum_modules || []).reduce((acc, m) => acc + (m.topics?.length || 0), 0);
    const completedCount = Object.values(updated).filter(Boolean).length;
    const progressPercent = totalTopics > 0 ? Math.min(100, Math.round((completedCount / totalTopics) * 100)) : selectedEnrollment.progress_percent;

    try {
      await api.updateProgramProgress(selectedEnrollment.program_id, progressPercent);
      setSelectedEnrollment(prev => prev ? { ...prev, progress_percent: progressPercent } : null);
      if (progressPercent >= 100) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnrollNew = async (progId: string) => {
    try {
      await api.enrollStudent(progId);
      const res = await api.getStudentPrograms();
      if (res.success) {
        setEnrollments(res.enrolledPrograms);
        const newlyEnrolled = res.enrolledPrograms.find((e: any) => e.program_id === progId);
        if (newlyEnrolled) setSelectedEnrollment(newlyEnrolled);
      }
    } catch (err: any) {
      alert(err.message || 'Enrollment failed');
    }
  };

  const handleStartQuiz = () => {
    if (!selectedEnrollment) return;
    const quiz = sampleQuizzes[selectedEnrollment.program_id] || sampleQuizzes['full-stack-web-development'];
    setActiveQuiz(quiz);
    setQuizAnswers({});
    setQuizResult(null);
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    let correctCount = 0;
    activeQuiz.questions.forEach((q: any, idx: number) => {
      if (quizAnswers[idx] === q.correct) correctCount++;
    });

    const score = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const passed = score >= 65;
    setQuizResult({ score, passed });

    if (passed) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FC] py-20 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#4F7CFF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-gray-600">Loading learning modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Header */}
      <section className="bg-[#0B1020] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link to="/student/dashboard" className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Interactive Learning Modules & Checkpoints
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Switch Active Program:</span>
            <select
              value={selectedEnrollment?.program_id || ''}
              onChange={(e) => {
                const enr = enrollments.find(item => item.program_id === e.target.value);
                if (enr) {
                  setSelectedEnrollment(enr);
                  setActiveQuiz(null);
                  setQuizResult(null);
                }
              }}
              className="bg-white/10 text-white text-xs font-semibold px-3 py-2 rounded-xl border border-white/20 focus:outline-none"
            >
              {enrollments.map((e) => (
                <option key={e.id} value={e.program_id} className="bg-[#0B1020]">
                  {e.title || e.program_id}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {selectedEnrollment ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Curriculum Modules & Topics */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-wider">{selectedEnrollment.category}</span>
                  <h2 className="text-2xl font-bold text-[#0B1020] mt-0.5">{selectedEnrollment.title}</h2>
                  <p className="text-xs text-gray-500 mt-1">Level: {selectedEnrollment.level} · Mark topics complete as you finish labs</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-gray-400 block">Progress</span>
                  <span className="text-2xl font-extrabold text-[#8B5CF6]">{selectedEnrollment.progress_percent}%</span>
                </div>
              </div>

              {/* Modules list with checkboxes */}
              <div className="space-y-4">
                {(selectedEnrollment.curriculum_modules || []).map((mod, mIdx) => (
                  <div key={mIdx} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#0B1020]">
                        {mod.title}
                      </h3>
                      <span className="text-xs font-semibold text-gray-400">
                        {mod.topics?.length || 0} Topics
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {mod.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      {(mod.topics || []).map((topic, tIdx) => {
                        const topicKey = `${mIdx}_${tIdx}`;
                        const isDone = Boolean(completedTopics[topicKey]);
                        return (
                          <button
                            key={tIdx}
                            onClick={() => handleToggleTopic(topicKey)}
                            className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-colors ${
                              isDone ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-400 shrink-0" />
                              )}
                              <span className={isDone ? 'line-through text-emerald-700' : ''}>{topic}</span>
                            </div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 shrink-0">
                              {isDone ? 'Completed' : 'Mark Complete'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Interactive Quiz / Assessment Engine */}
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B1020]">Knowledge Checkpoint</h3>
                    <p className="text-xs text-gray-500">Test comprehension on architectural concepts</p>
                  </div>
                </div>

                {!activeQuiz ? (
                  <div className="text-center py-6 space-y-3">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Complete this diagnostic assessment to validate your understanding of core concepts from this program.
                    </p>
                    <button
                      onClick={handleStartQuiz}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs hover:opacity-95 shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" /> Start Knowledge Checkpoint
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <h4 className="text-sm font-bold text-[#0B1020] border-b border-gray-100 pb-2">
                      {activeQuiz.title}
                    </h4>

                    {activeQuiz.questions.map((q: any, qIdx: number) => (
                      <div key={qIdx} className="space-y-2 text-xs">
                        <span className="font-bold text-gray-700 block">
                          {qIdx + 1}. {q.q}
                        </span>
                        <div className="space-y-1.5">
                          {q.options.map((opt: string, optIdx: number) => {
                            const isSelected = quizAnswers[qIdx] === optIdx;
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                                className={`w-full text-left p-2.5 rounded-lg border transition-colors ${
                                  isSelected 
                                    ? 'bg-[#4F7CFF]/10 border-[#4F7CFF] text-[#4F7CFF] font-semibold' 
                                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {quizResult ? (
                      <div className={`p-4 rounded-2xl text-center space-y-2 border ${
                        quizResult.passed ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'
                      }`}>
                        <span className="font-bold text-sm block">
                          Score: {quizResult.score}% — {quizResult.passed ? 'Checkpoint Passed! 🎉' : 'Needs Review'}
                        </span>
                        <p className="text-xs">
                          {quizResult.passed 
                            ? 'Excellent grasp of core system engineering principles.' 
                            : 'Review the module lessons and attempt the checkpoint again.'}
                        </p>
                        <button
                          onClick={handleStartQuiz}
                          className="mt-2 text-xs font-semibold underline"
                        >
                          Retake Checkpoint
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(quizAnswers).length < activeQuiz.questions.length}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0B1020] text-white font-bold text-xs hover:bg-gray-800 disabled:opacity-50 transition-colors"
                      >
                        Submit Answers
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Enroll in Another Program */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#0B1020]">Explore Additional Pathways</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Expand your skills across other technical tracks available in the Astra curriculum catalog.
                </p>

                <div className="space-y-2 pt-2">
                  {availablePrograms
                    .filter(p => !enrollments.some(e => e.program_id === p.id))
                    .slice(0, 3)
                    .map((prog) => (
                      <div key={prog.id} className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-2">
                        <div className="truncate">
                          <span className="block text-xs font-bold text-[#0B1020] truncate">{prog.title}</span>
                          <span className="text-[10px] text-gray-500">{prog.category}</span>
                        </div>
                        <button
                          onClick={() => handleEnrollNew(prog.id)}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white text-[11px] font-bold hover:opacity-95 shrink-0"
                        >
                          Enroll
                        </button>
                      </div>
                    ))}
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl p-8 border border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0B1020]">No active enrolled programs</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">Enroll in a program to begin working through learning modules.</p>
            <Link to="/programs" className="px-6 py-2.5 rounded-xl bg-[#0B1020] text-white font-bold text-xs">
              View Catalog
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};
