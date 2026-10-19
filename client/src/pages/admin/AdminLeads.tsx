import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Download, Search, Filter, ArrowLeft, Trash2, 
  Edit3, CheckCircle2, Clock, Phone, MessageSquare, Shield 
} from 'lucide-react';
import { api } from '../../services/api';
import { Lead } from '../../types';

export const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [loading, setLoading] = useState(true);

  const statuses = ['All', 'New', 'Contacted', 'Follow-up', 'Qualified', 'Closed'];

  const fetchLeads = () => {
    setLoading(true);
    api.getLeads({
      status: statusFilter !== 'All' ? statusFilter : undefined,
      search: searchQuery.trim() || undefined
    })
      .then(res => {
        if (res.success) {
          setLeads(res.leads);
          setCounts(res.counts || {});
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await api.updateLead(leadId, { status: newStatus });
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      await api.updateLead(selectedLead.id, {
        notes,
        assigned_to: assignedTo,
        follow_up_date: followUpDate
      });
      setSelectedLead(null);
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      await api.deleteLead(leadId);
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const openNotesModal = (lead: Lead) => {
    setSelectedLead(lead);
    setNotes(lead.notes || '');
    setAssignedTo(lead.assigned_to || '');
    setFollowUpDate(lead.follow_up_date || '');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Header */}
      <section className="bg-[#0B1020] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link to="/admin/dashboard" className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Lead & Enquiry Management
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Track prospective student requests, update contact statuses, and export records.
            </p>
          </div>

          <a
            href={api.exportLeadsUrl()}
            target="_blank"
            rel="noreferrer"
            download="astra_pathways_leads.csv"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs hover:opacity-95 shadow-md shadow-[#4F7CFF]/20 flex items-center gap-2 self-start md:self-auto"
          >
            <Download className="w-4 h-4" /> Export Leads to CSV
          </a>
        </div>
      </section>

      {/* Main Table Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? 'bg-[#0B1020] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {st} {counts[st] !== undefined && `(${counts[st]})`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4F7CFF] w-64"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-[#0B1020] text-white text-xs font-semibold hover:bg-gray-800"
            >
              Search
            </button>
          </form>

        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-gray-400">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="p-16 text-center text-xs text-gray-500">
              No enquiry records found matching current criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6">Name & Contact</th>
                    <th className="py-4 px-6">Program of Interest</th>
                    <th className="py-4 px-6">Experience Level</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Date Received</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#0B1020] text-sm">{lead.name}</div>
                        <div className="text-gray-500 flex items-center gap-2 mt-0.5">
                          <span>{lead.email}</span>
                          {lead.phone && <span>· {lead.phone}</span>}
                        </div>
                      </td>

                      <td className="py-4 px-6 font-semibold text-[#4F7CFF]">
                        {lead.program_of_interest || 'General Inquiry'}
                      </td>

                      <td className="py-4 px-6 text-gray-600">
                        {lead.current_experience}
                      </td>

                      <td className="py-4 px-6">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                            lead.status === 'New'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : lead.status === 'Contacted'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : lead.status === 'Follow-up'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : lead.status === 'Qualified'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>

                      <td className="py-4 px-6 text-gray-400">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openNotesModal(lead)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-[#4F7CFF] hover:bg-gray-100 transition-colors"
                            title="Notes and follow-up"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-500 hover:bg-gray-100 transition-colors"
                            title="Delete lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Internal Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-[#0B1020]">
            <div>
              <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-wider block mb-1">
                Advisory Internal Log
              </span>
              <h3 className="text-xl font-bold text-[#0B1020]">{selectedLead.name}</h3>
              <p className="text-xs text-gray-500">{selectedLead.email} · {selectedLead.program_of_interest}</p>
            </div>

            {selectedLead.message && (
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 italic">
                <span className="font-bold text-gray-500 not-italic block mb-1">Student's Initial Message:</span>
                "{selectedLead.message}"
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Assigned Advisor
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maya Lin"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#4F7CFF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Scheduled Follow-up Date
                </label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#4F7CFF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Internal Notes & Conversation Summary
                </label>
                <textarea
                  rows={4}
                  placeholder="Record summary of consultation, prerequisites verified, student timeline..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#4F7CFF] focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-5 py-2 rounded-xl bg-[#0B1020] hover:bg-gray-800 text-white font-bold text-xs transition-colors"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
