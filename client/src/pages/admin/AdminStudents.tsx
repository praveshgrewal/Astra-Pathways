import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, CheckCircle2, Clock, ArrowLeft, ExternalLink, 
  Award, Edit3, MessageSquare, Shield, X 
} from 'lucide-react';
import { api } from '../../services/api';

export const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedAsg, setSelectedAsg] = useState<any | null>(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState('');
  const [status, setStatus] = useState('Reviewed');
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      api.getAdminStudents(),
      api.getAdminAssignments()
    ]).then(([studRes, asgRes]) => {
      if (studRes.success) setStudents(studRes.students);
      if (asgRes.success) setAssignments(asgRes.assignments);
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openReviewModal = (asg: any) => {
    setSelectedAsg(asg);
    setFeedback(asg.feedback || '');
    setScore(asg.score || '95 / 100');
    setStatus(asg.status || 'Reviewed');
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsg) return;

    try {
      await api.reviewAssignment(selectedAsg.id, {
        feedback,
        score,
        status
      });
      setSelectedAsg(null);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Error saving review');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Header */}
      <section className="bg-[#0B1020] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/admin/dashboard" className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Student Directory & Assignment Reviews
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review submitted student projects, provide code evaluations, and track enrolled learners.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* SECTION 1: ASSIGNMENT REVIEW QUEUE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0B1020]">Project Submissions Queue</h2>
              <p className="text-xs text-gray-500">Student milestone projects awaiting or completed review.</p>
            </div>
            <span className="text-xs font-semibold text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">
              {assignments.length} Total Milestones
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-10 text-center text-xs text-gray-400">Loading assignments...</div>
            ) : assignments.length === 0 ? (
              <div className="p-10 text-center text-xs text-gray-500">No project submissions recorded yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                    <tr>
                      <th className="py-4 px-6">Student & Track</th>
                      <th className="py-4 px-6">Milestone Title</th>
                      <th className="py-4 px-6">Submission URL</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6">Score</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {assignments.map((asg) => (
                      <tr key={asg.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-bold text-[#0B1020] text-sm block">{asg.student_name}</span>
                          <span className="text-[11px] text-gray-500">{asg.program_title}</span>
                        </td>

                        <td className="py-4 px-6 font-semibold text-gray-800 max-w-xs">
                          {asg.title}
                        </td>

                        <td className="py-4 px-6">
                          {asg.submission_link ? (
                            <a
                              href={asg.submission_link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#4F7CFF] font-semibold hover:underline flex items-center gap-1"
                            >
                              View Work <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-gray-400 italic">Not submitted yet</span>
                          )}
                        </td>

                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            asg.status === 'Reviewed' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : asg.status === 'Submitted' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {asg.status}
                          </span>
                        </td>

                        <td className="py-4 px-6 font-bold text-gray-700">
                          {asg.score || '—'}
                        </td>

                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => openReviewModal(asg)}
                            className="px-3 py-1.5 rounded-lg bg-[#0B1020] text-white text-xs font-semibold hover:bg-gray-800"
                          >
                            Review & Grade
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: REGISTERED STUDENTS DIRECTORY */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0B1020]">Registered Students Directory</h2>
              <p className="text-xs text-gray-500">Learners registered across Astra Pathways tracks.</p>
            </div>
            <span className="text-xs font-semibold text-gray-500">
              {students.length} Registered Learners
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6">Student Name</th>
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">Phone Number</th>
                    <th className="py-4 px-6">Enrolled Tracks</th>
                    <th className="py-4 px-6">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#0B1020] text-sm">
                        {st.name}
                      </td>
                      <td className="py-4 px-6 text-gray-600 font-medium">
                        {st.email}
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        {st.phone || '—'}
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-extrabold text-[#4F7CFF]">
                          {st.enrolled_count} Program{st.enrolled_count === 1 ? '' : 's'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        {new Date(st.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>

      {/* Review Modal Dialog */}
      {selectedAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-[#0B1020]">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-wider block">
                  Project Code Review
                </span>
                <h3 className="text-lg font-bold text-[#0B1020]">{selectedAsg.title}</h3>
                <p className="text-xs text-gray-500">Student: {selectedAsg.student_name} ({selectedAsg.student_email})</p>
              </div>
              <button onClick={() => setSelectedAsg(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedAsg.submission_link && (
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                <span className="font-semibold text-gray-600 block mb-1">Submitted Repository:</span>
                <a
                  href={selectedAsg.submission_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4F7CFF] font-bold hover:underline flex items-center gap-1"
                >
                  {selectedAsg.submission_link} <ExternalLink className="w-3.5 h-3.5" />
                </a>
                {selectedAsg.notes && (
                  <p className="text-gray-600 mt-2 italic">Student notes: "{selectedAsg.notes}"</p>
                )}
              </div>
            )}

            <form onSubmit={handleSaveReview} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
                  >
                    <option value="Reviewed">Reviewed & Approved</option>
                    <option value="Submitted">In Review</option>
                    <option value="Pending">Needs Resubmission</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Score / Evaluation</label>
                  <input
                    type="text"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="e.g. 96 / 100"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Instructor Feedback & Code Quality Critique
                </label>
                <textarea
                  rows={4}
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide constructive feedback on TypeScript types, architecture, test coverage, and documentation..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedAsg(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold shadow-md"
                >
                  Publish Review to Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
