import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, CheckCircle2, Clock, Award, ArrowRight, 
  Sparkles, Layers, FileText, ChevronRight, Laptop, LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStudentDashboard()
      .then(res => {
        if (res.success) setData(res);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FC] py-20 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#4F7CFF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-gray-600">Loading student dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalEnrollments: 0,
    avgProgress: 0,
    submittedAssignments: 0,
    pendingAssignments: 0
  };

  const enrollments = data?.enrollments || [];
  const recentAssignments = data?.recentAssignments || [];

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Student Welcome Header */}
      <section className="bg-[#0B1020] text-white py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F7CFF]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#4F7CFF] border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              Student Learning Portal
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Welcome back, {user?.name || 'Learner'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">
              Track your program progress, laboratory milestones, and mentor feedback.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/programs"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-colors"
            >
              Explore Catalog
            </Link>
            <Link
              to="/student/programs"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs hover:opacity-95 shadow-md shadow-[#4F7CFF]/20 transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" /> My Learning Modules
            </Link>
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Enrolled Programs</span>
              <div className="text-2xl font-black text-[#0B1020] mt-1">{stats.totalEnrollments}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Progress</span>
              <div className="text-2xl font-black text-[#8B5CF6] mt-1">{stats.avgProgress}%</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Submitted Projects</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">{stats.submittedAssignments}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Milestones</span>
              <div className="text-2xl font-black text-amber-500 mt-1">{stats.pendingAssignments}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Enrolled Programs Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0B1020]">My Enrolled Programs</h2>
              <p className="text-xs text-gray-500 mt-0.5">Resume your active curriculum pathways and module labs.</p>
            </div>
            <Link
              to="/student/programs"
              className="text-xs font-bold text-[#4F7CFF] hover:text-[#8B5CF6] flex items-center gap-1"
            >
              View Detailed Curriculum <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl p-6">
              <Laptop className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-600">You are not currently enrolled in any programs.</p>
              <p className="text-xs text-gray-400 mt-1 mb-4">Browse our catalog to begin learning practical technical skills.</p>
              <Link
                to="/programs"
                className="px-5 py-2 rounded-xl bg-[#0B1020] text-white text-xs font-semibold hover:bg-gray-800"
              >
                Browse Programs
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrollments.map((enr: any) => (
                <div 
                  key={enr.id}
                  className="p-6 rounded-2xl bg-gray-50/70 border border-gray-200 hover:border-[#4F7CFF]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-[#4F7CFF]">{enr.program_category}</span>
                      <span className="text-gray-500 font-medium">Level: {enr.program_level}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0B1020] mb-4">
                      {enr.program_title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mb-6">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-600">Curriculum Completion</span>
                        <span className="text-[#8B5CF6] font-extrabold">{enr.progress_percent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(5, enr.progress_percent)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <Link
                      to={`/programs/${enr.program_id}`}
                      className="text-xs font-medium text-gray-500 hover:text-[#0B1020]"
                    >
                      Program Overview
                    </Link>
                    <Link
                      to="/student/programs"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs hover:opacity-95 shadow-sm inline-flex items-center gap-1.5"
                    >
                      Continue Learning <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Milestone Assignments & Submissions */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0B1020]">Recent Milestone Deliverables</h2>
              <p className="text-xs text-gray-500 mt-0.5">Submit GitHub repositories or live URLs for mentor review.</p>
            </div>
            <Link
              to="/student/assignments"
              className="text-xs font-bold text-[#4F7CFF] hover:text-[#8B5CF6] flex items-center gap-1"
            >
              All Assignments <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentAssignments.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">No assignments currently queued.</p>
          ) : (
            <div className="space-y-3">
              {recentAssignments.map((asg: any) => (
                <div 
                  key={asg.id}
                  className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
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
                      <span className="text-xs text-gray-400 font-medium">{asg.program_title}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0B1020]">{asg.title}</h4>
                    {asg.feedback && (
                      <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100 mt-2">
                        <strong className="font-semibold">Mentor Feedback:</strong> {asg.feedback} {asg.score && `(Score: ${asg.score})`}
                      </p>
                    )}
                  </div>

                  <Link
                    to="/student/assignments"
                    className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#0B1020] hover:bg-gray-100 transition-colors shrink-0 text-center"
                  >
                    {asg.status === 'Pending' ? 'Submit Work' : 'View Submission'}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};
