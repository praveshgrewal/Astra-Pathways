import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, XCircle, DollarSign, Scale, MessageSquare, 
  UserPlus, HelpCircle, Compass, Search, ArrowRight, ShieldCheck, Clock, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { api } from '../../services/api';

export const FormsHubPage: React.FC = () => {
  const [lookupRef, setLookupRef] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<any | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<'All' | 'Academic' | 'Financial' | 'Support'>('All');

  const formsList = [
    {
      id: 'cancellation',
      title: 'Program Cancellation Form',
      category: 'Financial',
      description: 'Submit an official withdrawal notice to cancel your cohort seat, pause recurring billing, or terminate an enrollment agreement.',
      link: '/forms/cancellation',
      icon: XCircle,
      sla: '1 Business Day',
      badge: 'Academic & Billing',
      color: '#EF4444'
    },
    {
      id: 'refund',
      title: 'Tuition Refund Request Form',
      category: 'Financial',
      description: 'Request financial reimbursement under the 72-hour full refund window or the 90-day pro-rated formula with 10% administrative fee.',
      link: '/forms/refund',
      icon: DollarSign,
      sla: '3 Business Days (Disbursement 7–10 days)',
      badge: 'Finance Operations',
      color: '#10B981'
    },
    {
      id: 'complaint',
      title: 'Complaint & Dispute Form',
      category: 'Support',
      description: 'Initiate formal informal dispute resolution (Section 14.2) for academic grievances, instructor conduct, or billing discrepancies.',
      link: '/forms/complaint',
      icon: Scale,
      sla: 'Within 15 Business Days',
      badge: 'Legal & Executive Review',
      color: '#F59E0B'
    },
    {
      id: 'inquiry',
      title: 'Program Inquiry Form',
      category: 'Academic',
      description: 'Speak with an admissions advisor regarding course prerequisites, curriculum pacing, capstone projects, and installment plans.',
      link: '/forms/inquiry',
      icon: MessageSquare,
      sla: 'Within 24 Hours',
      badge: 'Admissions Advisory',
      color: '#3B82F6'
    },
    {
      id: 'enrollment',
      title: 'Student Enrollment Form',
      category: 'Academic',
      description: 'Complete official candidate registration, select cohort start terms, accept legal terms, and submit tuition preferences.',
      link: '/forms/enrollment',
      icon: UserPlus,
      sla: 'Immediate Confirmation & 24h Portal Setup',
      badge: 'Official Registrar',
      color: '#8B5CF6'
    },
    {
      id: 'query',
      title: 'General Support & Query Form',
      category: 'Support',
      description: 'Ask specific questions about assignments, LMS portal access, schedule flexibility, or certificate verification.',
      link: '/forms/query',
      icon: HelpCircle,
      sla: '24–48 Hours',
      badge: 'Student Helpdesk',
      color: '#06B6D4'
    },
    {
      id: 'placement',
      title: 'Placement Assistance Form',
      category: 'Academic',
      description: 'Apply for 1-on-1 resume reviews, GitHub portfolio critique, mock technical coding simulations, and job-search mentorship.',
      link: '/forms/placement-assistance',
      icon: Compass,
      sla: '2 Business Days Assignment',
      badge: 'Career Acceleration',
      color: '#6366F1'
    }
  ];

  const filteredForms = filterCategory === 'All' 
    ? formsList 
    : formsList.filter(f => f.category === filterCategory);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupRef.trim()) return;

    setLookupLoading(true);
    setLookupError(null);
    setLookupResult(null);

    try {
      const res = await api.lookupSubmission(lookupRef.trim());
      if (res.success && res.submission) {
        setLookupResult(res.submission);
      } else {
        setLookupError(res.message || 'Reference number not found.');
      }
    } catch (err: any) {
      setLookupError(err.message || 'Unable to find a submission with this reference code.');
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      {/* Hero Banner */}
      <div className="bg-[#0B1020] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[350px] bg-gradient-to-tr from-[#4F7CFF]/15 via-[#8B5CF6]/15 to-transparent blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#4F7CFF] border border-white/10 mb-4">
            <FileText className="w-3.5 h-3.5" />
            Official Student Services
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto">
            Student Forms & Requests Hub
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Access official forms for program enrollment, inquiries, tuition refunds, cohort cancellations, dispute filings, and career placement support.
          </p>

          {/* Quick Reference Tracker Bar */}
          <div className="mt-8 max-w-xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl">
            <form onSubmit={handleLookup} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={lookupRef}
                  onChange={e => setLookupRef(e.target.value)}
                  placeholder="Check Ticket Status: e.g. REF-CAN-2026-..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 text-[#0B1020] text-xs sm:text-sm font-medium placeholder-gray-500 focus:outline-none focus:bg-white"
                />
              </div>
              <button
                type="submit"
                disabled={lookupLoading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all shrink-0"
              >
                {lookupLoading ? 'Searching...' : 'Track Status'}
              </button>
            </form>
          </div>

          {/* Lookup Result Card */}
          {lookupResult && (
            <div className="mt-4 max-w-xl mx-auto p-4 rounded-2xl bg-white text-[#0B1020] text-left shadow-xl border border-emerald-300 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Ticket #{lookupResult.reference_number}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3 h-3" /> Status: {lookupResult.status}
                </span>
              </div>
              <div className="pt-2 text-xs text-gray-700 grid grid-cols-2 gap-2">
                <div><strong>Student:</strong> {lookupResult.full_name}</div>
                <div><strong>Form:</strong> {lookupResult.form_type}</div>
                <div><strong>Program:</strong> {lookupResult.program_name || 'General'}</div>
                <div><strong>Submitted:</strong> {new Date(lookupResult.created_at).toLocaleDateString()}</div>
              </div>
            </div>
          )}

          {lookupError && (
            <div className="mt-4 max-w-xl mx-auto p-3 rounded-xl bg-red-900/60 border border-red-500/50 text-xs text-red-200 text-left flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{lookupError}</span>
            </div>
          )}

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(['All', 'Academic', 'Financial', 'Support'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterCategory === cat
                  ? 'bg-[#0B1020] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat === 'All' ? 'All 7 Forms' : `${cat} Forms`}
            </button>
          ))}
        </div>

        {/* 7 Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-7 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                      Form 0{idx + 1}
                    </span>
                    <h2 className="text-xl font-bold text-[#0B1020] group-hover:text-[#4F7CFF] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Response SLA: <strong>{item.sla}</strong></span>
                  </div>
                  <Link
                    to={item.link}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0B1020] text-white text-xs font-bold hover:bg-gray-800 transition-all group-hover:bg-gradient-to-r group-hover:from-[#4F7CFF] group-hover:to-[#8B5CF6]"
                  >
                    Open Form <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal Cross-Reference Banner */}
        <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg font-bold text-[#0B1020]">Governing Legal Policies & Protections</h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
              All student requests submitted through these forms are evaluated strictly against our published Terms and Conditions, Dispute and Charge Resolution Policy, and Refund & Cancellation Policy.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/terms"
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/refunds"
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              to="/dispute-resolution"
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#4F7CFF] bg-[#4F7CFF]/10 hover:bg-[#4F7CFF]/15 transition-colors"
            >
              Dispute Resolution
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
