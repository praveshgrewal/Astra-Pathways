import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Sparkles, Plus, Edit, Trash2, ArrowLeft, 
  HelpCircle, Megaphone, Eye, EyeOff, Save, X 
} from 'lucide-react';
import { api } from '../../services/api';
import { Blog, FAQ, Announcement } from '../../types';

export const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'blogs' | 'faqs'>('announcements');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [editingAnnouncement, setEditingAnnouncement] = useState<any | null>(null);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);

  const fetchContent = () => {
    setLoading(true);
    Promise.all([
      api.getAnnouncements(true),
      api.getBlogs({ all: true }),
      api.getFaqs()
    ]).then(([annRes, blogRes, faqRes]) => {
      if (annRes.success) setAnnouncements(annRes.announcements);
      if (blogRes.success) setBlogs(blogRes.blogs);
      if (faqRes.success) setFaqs(faqRes.faqs);
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Announcements CRUD
  const handleToggleAnnActive = async (ann: Announcement) => {
    try {
      await api.updateAnnouncement(ann.id, { is_active: !ann.is_active });
      fetchContent();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;
    try {
      if (editingAnnouncement.id) {
        await api.updateAnnouncement(editingAnnouncement.id, editingAnnouncement);
      } else {
        await api.createAnnouncement(editingAnnouncement);
      }
      setEditingAnnouncement(null);
      fetchContent();
    } catch (err: any) {
      alert(err.message || 'Error saving announcement');
    }
  };

  // Blog CRUD
  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await api.deleteBlog(id);
      fetchContent();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    const payload = {
      ...editingBlog,
      tags: editingBlog.tags_str ? editingBlog.tags_str.split(',').map((s: string) => s.trim()).filter(Boolean) : []
    };

    try {
      if (editingBlog.id) {
        await api.updateBlog(editingBlog.id, payload);
      } else {
        await api.createBlog(payload);
      }
      setEditingBlog(null);
      fetchContent();
    } catch (err: any) {
      alert(err.message || 'Error saving blog');
    }
  };

  // FAQ CRUD
  const handleDeleteFaq = async (id: string) => {
    if (!window.confirm('Delete this FAQ entry?')) return;
    try {
      await api.deleteFaq(id);
      fetchContent();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    try {
      if (editingFaq.id) {
        await api.updateFaq(editingFaq.id, editingFaq);
      } else {
        await api.createFaq(editingFaq);
      }
      setEditingFaq(null);
      fetchContent();
    } catch (err: any) {
      alert(err.message || 'Error saving FAQ');
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
            Content & Knowledgebase Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Maintain top announcement banners, educational articles, and FAQ knowledgebase.
          </p>
        </div>
      </section>

      {/* Main Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('announcements')}
            className={`py-3 px-6 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'announcements'
                ? 'border-[#4F7CFF] text-[#4F7CFF]'
                : 'border-transparent text-gray-500 hover:text-[#0B1020]'
            }`}
          >
            <Megaphone className="w-4 h-4" /> Announcements Bar
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`py-3 px-6 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'blogs'
                ? 'border-[#4F7CFF] text-[#4F7CFF]'
                : 'border-transparent text-gray-500 hover:text-[#0B1020]'
            }`}
          >
            <FileText className="w-4 h-4" /> Educational Articles
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`py-3 px-6 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'faqs'
                ? 'border-[#4F7CFF] text-[#4F7CFF]'
                : 'border-transparent text-gray-500 hover:text-[#0B1020]'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> FAQ Knowledgebase
          </button>
        </div>

        {/* TAB 1: ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">The latest active announcement appears at the very top of all website pages.</p>
              <button
                onClick={() => setEditingAnnouncement({ title: '', badge: 'New Update', link_url: '/programs', is_active: 1 })}
                className="px-4 py-2 rounded-xl bg-[#0B1020] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add Announcement
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6">Badge & Title</th>
                    <th className="py-4 px-6">Link URL</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {announcements.map((ann) => (
                    <tr key={ann.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-[10px] font-bold text-[#4F7CFF] bg-[#4F7CFF]/10 px-2 py-0.5 rounded mr-2">
                          {ann.badge}
                        </span>
                        <span className="font-semibold text-[#0B1020]">{ann.title}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">{ann.link_url || 'None'}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleAnnActive(ann)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            ann.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {ann.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setEditingAnnouncement(ann)}
                          className="p-1.5 text-gray-500 hover:text-[#4F7CFF]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: BLOGS */}
        {activeTab === 'blogs' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">Publish guides, technical tutorials, and career roadmaps.</p>
              <button
                onClick={() => setEditingBlog({
                  title: '',
                  category: 'Career Guidance',
                  read_time: '5 min read',
                  summary: '',
                  content: '',
                  author_name: 'Academic Strategy Team',
                  author_role: 'Curriculum & Pedagogy',
                  tags_str: 'Skill Development, Career Growth',
                  published: true
                })}
                className="px-4 py-2 rounded-xl bg-[#0B1020] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> New Article
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6">Title & Category</th>
                    <th className="py-4 px-6">Author</th>
                    <th className="py-4 px-6">Read Time</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {blogs.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-bold text-[#0B1020] text-sm block">{b.title}</span>
                        <span className="text-[11px] font-semibold text-[#4F7CFF]">{b.category}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 font-medium">{b.author_name}</td>
                      <td className="py-4 px-6 text-gray-500">{b.read_time}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingBlog({ ...b, tags_str: (b.tags || []).join(', ') })}
                            className="p-1.5 text-gray-500 hover:text-[#4F7CFF]"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(b.id)}
                            className="p-1.5 text-gray-500 hover:text-red-500"
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
          </div>
        )}

        {/* TAB 3: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">Provide transparent answers to common student inquiries.</p>
              <button
                onClick={() => setEditingFaq({ category: 'General Queries', question: '', answer: '', order_num: 0 })}
                className="px-4 py-2 rounded-xl bg-[#0B1020] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add FAQ
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Question</th>
                    <th className="py-4 px-6">Answer Preview</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {faqs.map((f) => (
                    <tr key={f.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#4F7CFF]">{f.category}</td>
                      <td className="py-4 px-6 font-semibold text-[#0B1020] max-w-xs">{f.question}</td>
                      <td className="py-4 px-6 text-gray-500 max-w-md truncate">{f.answer}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingFaq(f)}
                            className="p-1.5 text-gray-500 hover:text-[#4F7CFF]"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFaq(f.id)}
                            className="p-1.5 text-gray-500 hover:text-red-500"
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
          </div>
        )}

      </div>

      {/* Edit Announcement Modal */}
      {editingAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 shadow-2xl text-[#0B1020]">
            <h3 className="text-lg font-bold">Configure Announcement</h3>
            <form onSubmit={handleSaveAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Badge Text</label>
                <input
                  type="text"
                  required
                  value={editingAnnouncement.badge}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, badge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Announcement Message</label>
                <input
                  type="text"
                  required
                  value={editingAnnouncement.title}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Link URL</label>
                <input
                  type="text"
                  value={editingAnnouncement.link_url}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, link_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingAnnouncement(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1020] text-white font-bold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl text-[#0B1020] my-8">
            <h3 className="text-lg font-bold">Configure Educational Article</h3>
            <form onSubmit={handleSaveBlog} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Summary Quote</label>
                <input
                  type="text"
                  required
                  value={editingBlog.summary}
                  onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Article Content (Markdown supported)</label>
                <textarea
                  rows={8}
                  required
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 resize-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={editingBlog.tags_str}
                  onChange={(e) => setEditingBlog({ ...editingBlog, tags_str: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1020] text-white font-bold"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 space-y-4 shadow-2xl text-[#0B1020]">
            <h3 className="text-lg font-bold">Configure FAQ Entry</h3>
            <form onSubmit={handleSaveFaq} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={editingFaq.category}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white"
                >
                  <option value="Programs">Programs</option>
                  <option value="Admissions">Admissions</option>
                  <option value="Curriculum">Curriculum</option>
                  <option value="Learning Support">Learning Support</option>
                  <option value="Projects">Projects</option>
                  <option value="Career Guidance">Career Guidance</option>
                  <option value="General Queries">General Queries</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1020] text-white font-bold"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
