import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, CheckCircle2, Clock, ArrowLeft, Send, 
  ExternalLink, AlertCircle, Award, Sparkles, MessageSquare 
} from 'lucide-react';
import { api } from '../../services/api';
import { StudentAssignment } from '../../types';

export const StudentAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [selectedAsg, setSelectedAsg] = useState<StudentAssignment | null>(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAssignments = () => {
    setLoading(true);
    api.getStudentAssignments()
      .then(res => {
        if (res.success && res.assignments) {
          setAssignments(res.assignments);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleOpenSubmit = (asg: StudentAssignment) => {
    setSelectedAsg(asg);
    setSubmissionLink(asg.submission_link || '');
    setNotes(asg.notes || '');
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsg) return;
    setSubmitting(true);
    setErrorMsg('');

    try {
      await api.submitAssignment(selectedAsg.id, {
        submission_link: submissionLink,
        notes
      });
      setSuccessMsg('Milestone successfully submitted for instructor review!');
      fetchAssignments();
      setTimeout(() => {
        setSelectedAsg(null);
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit milestone project');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Header */}
      <section className="bg-[#0B1020] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/student/dashboard" className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Practical Milestone Deliverables
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Submit your repository links, view instructor code reviews, and track evaluation scores.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-28 rounded-2xl bg-white border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : assignments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl p-8 border border-gray-200 max-w-lg mx-auto">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0B1020]">No Assignments Active</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">Enroll in a program to unlock practical milestones.</p>
            <Link to="/programs" className="px-5 py-2.5 rounded-xl bg-[#0B1020] text-white font-bold text-xs">
              View Programs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      asg.status === 'Reviewed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : asg.status === 'Submitted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {asg.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {asg.program_title}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B1020] leading-snug">
                    {asg.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {asg.description}
                  </p>

                  {/* Submission link if already submitted */}
                  {asg.submission_link && (
                    <div className="flex items-center gap-2 text-xs pt-1">
                      <span className="text-gray-400 font-medium">Submission URL:</span>
                      <a
                        href={asg.submission_link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#4F7CFF] font-semibold hover:underline flex items-center gap-1"
                      >
                        {asg.submission_link} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  {/* Instructor Feedback Box */}
                  {asg.feedback && (
                    <div className="mt-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span>Instructor Code Review</span>
                        {asg.score && <span className="text-emerald-700 font-extrabold">{asg.score}</span>}
                      </div>
                      <p className="leading-relaxed">{asg.feedback}</p>
                    </div>
                  )}
                </div>

                {/* Action button */}
                <div className="shrink-0">
                  <button
                    onClick={() => handleOpenSubmit(asg)}
                    className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs hover:opacity-95 shadow-md shadow-[#4F7CFF]/15 transition-all"
                  >
                    {asg.status === 'Pending' ? 'Submit Project' : 'Update Submission'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submission Modal Dialog */}
      {selectedAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-[#0B1020] border border-white/15 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-2xl relative"
            role="dialog"
            aria-modal="true"
          >
            <div>
              <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-wider block mb-1">
                Project Milestone Submission
              </span>
              <h2 className="text-xl font-bold text-white">{selectedAsg.title}</h2>
              <p className="text-xs text-gray-400 mt-1">{selectedAsg.program_title}</p>
            </div>

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  GitHub Repository or Live Deployment URL <span className="text-[#4F7CFF]">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/project-repo"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-white text-xs placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Implementation Notes & Architecture Details (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your design choices, test coverage, or any challenges overcome..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#4F7CFF] focus:outline-none focus:ring-1 focus:ring-[#4F7CFF] text-white text-xs placeholder-gray-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedAsg(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md shadow-[#4F7CFF]/25"
                >
                  {submitting ? (
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Submit for Review
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
