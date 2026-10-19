import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Layers, FileText, CheckCircle2, ArrowRight, 
  Sparkles, Mail, MessageSquare, Shield, Clock, PlusCircle 
} from 'lucide-react';
import { api } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAdminMetrics()
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
          <div className="w-10 h-10 border-4 border-[#8B5CF6] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-gray-600">Loading administrative metrics...</p>
        </div>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalLeads: 0,
    newLeads: 0,
    activePrograms: 0,
    publishedBlogs: 0,
    totalStudents: 0,
    totalSubmissions: 0
  };

  const recentActivity = data?.recentActivity || [];

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Header */}
      <section className="bg-[#0B1020] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30 mb-2">
              <Shield className="w-3.5 h-3.5" /> Operations Overview
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Astra Pathways Administration
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Live operational metrics, lead management, and curriculum control.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/admin/leads"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#4F7CFF]" /> Manage Enquiries
            </Link>
            <Link
              to="/admin/programs"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs hover:opacity-95 shadow-md shadow-[#4F7CFF]/20 flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" /> Programs & Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Enquiries</span>
              <div className="text-2xl font-black text-[#0B1020] mt-1">{metrics.totalLeads}</div>
              <span className="text-[11px] font-semibold text-[#4F7CFF]">{metrics.newLeads} awaiting contact</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Programs</span>
              <div className="text-2xl font-black text-[#8B5CF6] mt-1">{metrics.activePrograms}</div>
              <span className="text-[11px] font-medium text-gray-500">Published in catalog</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Registered Students</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">{metrics.totalStudents}</div>
              <span className="text-[11px] font-medium text-gray-500">Active learner accounts</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Project Submissions</span>
              <div className="text-2xl font-black text-amber-500 mt-1">{metrics.totalSubmissions}</div>
              <span className="text-[11px] font-medium text-gray-500">Completed assignments</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            to="/admin/leads"
            className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-[#4F7CFF] shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1020] group-hover:text-[#4F7CFF] transition-colors">Leads & Enquiries</h3>
            <p className="text-xs text-gray-500 mt-1">Review contact requests, status, and export CSV.</p>
          </Link>

          <Link
            to="/admin/programs"
            className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-[#8B5CF6] shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1020] group-hover:text-[#8B5CF6] transition-colors">Curriculum Manager</h3>
            <p className="text-xs text-gray-500 mt-1">Create, edit, and toggle public programs.</p>
          </Link>

          <Link
            to="/admin/content"
            className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1020] group-hover:text-emerald-600 transition-colors">Content & Announcements</h3>
            <p className="text-xs text-gray-500 mt-1">Manage announcements, blogs, and FAQs.</p>
          </Link>

          <Link
            to="/admin/students"
            className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1020] group-hover:text-cyan-600 transition-colors">Students & Reviews</h3>
            <p className="text-xs text-gray-500 mt-1">Review student submissions and assign grades.</p>
          </Link>
        </div>

        {/* Live Recent Activity Feed */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0B1020]">Recent Operational Activity</h2>
              <p className="text-xs text-gray-500 mt-0.5">Real events from database enquiries and project submissions.</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live DB Sync
            </span>
          </div>

          {recentActivity.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-6">No recent events logged.</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((act: any, idx: number) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-between gap-4 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      act.type === 'lead' ? 'bg-[#4F7CFF]/15 text-[#4F7CFF]' : 'bg-emerald-500/15 text-emerald-600'
                    }`}>
                      {act.type === 'lead' ? <Mail className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      {act.type === 'lead' ? (
                        <>
                          <span className="font-bold text-[#0B1020]">{act.name}</span> submitted an enquiry for{' '}
                          <span className="font-semibold text-[#4F7CFF]">{act.program_of_interest}</span>
                        </>
                      ) : (
                        <>
                          <span className="font-bold text-[#0B1020]">{act.student_name}</span> submitted project{' '}
                          <span className="font-semibold text-emerald-700">{act.title}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <span className="text-xs text-gray-400 shrink-0">
                    {new Date(act.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};
