import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, Plus, Edit, Trash2, CheckCircle2, XCircle, 
  Sparkles, ArrowLeft, Eye, EyeOff, Save, X 
} from 'lucide-react';
import { api } from '../../services/api';
import { Program } from '../../types';

export const AdminPrograms: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [editingProgram, setEditingProgram] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPrograms = () => {
    setLoading(true);
    api.getPrograms({ all: true })
      .then(res => {
        if (res.success) setPrograms(res.programs);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleToggleFeatured = async (p: Program) => {
    try {
      await api.updateProgram(p.id, { featured: !p.featured });
      fetchPrograms();
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePublished = async (p: Program) => {
    try {
      await api.updateProgram(p.id, { published: !p.published });
      fetchPrograms();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    try {
      await api.deleteProgram(id);
      fetchPrograms();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEdit = (p: Program) => {
    setIsNew(false);
    setEditingProgram({
      ...p,
      skills_covered_str: (p.skills_covered || []).join(', '),
      tools_technologies_str: (p.tools_technologies || []).join(', ')
    });
  };

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingProgram({
      title: '',
      category: 'Full-Stack Web Development',
      level: 'Beginner to Intermediate',
      short_description: '',
      full_overview: '',
      who_is_it_for: ['Motivated learners looking for practical skills'],
      prerequisites: ['Basic computer comfort'],
      learning_objectives: ['Master core architectural fundamentals'],
      skills_covered_str: 'React, TypeScript, Node.js',
      tools_technologies_str: 'React, TypeScript, Vite',
      curriculum_modules: [
        {
          title: 'Module 1: Foundations',
          description: 'Introduction to foundational patterns and labs.',
          topics: ['Development Environment Setup', 'Core Syntax & Types']
        }
      ],
      sample_projects: [
        {
          title: 'Capstone Full-Stack Project',
          description: 'Production-ready web application with tests and deployment.',
          tags: ['React', 'Node.js']
        }
      ],
      learning_methodology: 'Interactive guided labs and milestone project reviews.',
      mentorship_support: 'Weekly mentor office hours and code feedback.',
      assessment_approach: 'Continuous rubric evaluation on project submissions.',
      career_pathways: ['Software Engineer', 'Technical Specialist'],
      placement_support_info: 'Resume coaching and mock technical interview support is provided.',
      learning_format: 'Interactive Online Learning',
      featured: false,
      published: true
    });
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram) return;

    const payload = {
      ...editingProgram,
      skills_covered: editingProgram.skills_covered_str
        ? editingProgram.skills_covered_str.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
      tools_technologies: editingProgram.tools_technologies_str
        ? editingProgram.tools_technologies_str.split(',').map((s: string) => s.trim()).filter(Boolean)
        : []
    };

    try {
      if (isNew) {
        await api.createProgram(payload);
      } else {
        await api.updateProgram(editingProgram.id, payload);
      }
      setEditingProgram(null);
      fetchPrograms();
    } catch (err: any) {
      alert(err.message || 'Error saving program');
    }
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
              Curriculum & Programs Manager
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Configure track syllabi, learning modules, sample projects, and visibility.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs hover:opacity-95 shadow-md shadow-[#4F7CFF]/20 flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" /> Create New Program
          </button>
        </div>
      </section>

      {/* Main Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-gray-400">Loading programs...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6">Program Title & Category</th>
                    <th className="py-4 px-6">Level</th>
                    <th className="py-4 px-6">Modules & Projects</th>
                    <th className="py-4 px-6">Featured</th>
                    <th className="py-4 px-6">Published</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {programs.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#0B1020] text-sm">{p.title}</div>
                        <span className="text-[11px] font-semibold text-[#4F7CFF]">{p.category}</span>
                      </td>

                      <td className="py-4 px-6 text-gray-600 font-medium">
                        {p.level}
                      </td>

                      <td className="py-4 px-6 text-gray-600">
                        {p.curriculum_modules?.length || 0} Modules · {p.sample_projects?.length || 0} Projects
                      </td>

                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleFeatured(p)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            p.featured 
                              ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {p.featured ? 'Featured' : 'Standard'}
                        </button>
                      </td>

                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleTogglePublished(p)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${
                            p.published 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {p.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {p.published ? 'Published' : 'Hidden'}
                        </button>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/programs/${p.id}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-gray-500 hover:text-[#4F7CFF] hover:bg-gray-100"
                            title="Preview public page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-[#8B5CF6] hover:bg-gray-100"
                            title="Edit program"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-500 hover:bg-gray-100"
                            title="Delete program"
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

      {/* Program Editor Modal */}
      {editingProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 text-[#0B1020]">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-wider">
                  {isNew ? 'New Pathway Track' : 'Edit Program'}
                </span>
                <h3 className="text-xl font-bold text-[#0B1020]">
                  {editingProgram.title || 'Untitled Curriculum'}
                </h3>
              </div>
              <button
                onClick={() => setEditingProgram(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Program Title</label>
                  <input
                    type="text"
                    required
                    value={editingProgram.title}
                    onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={editingProgram.category}
                    onChange={(e) => setEditingProgram({ ...editingProgram, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none bg-white"
                  >
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="Artificial Intelligence and Machine Learning">Artificial Intelligence & ML</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cloud Computing and DevOps">Cloud Computing & DevOps</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Experience Level</label>
                  <input
                    type="text"
                    value={editingProgram.level}
                    onChange={(e) => setEditingProgram({ ...editingProgram, level: e.target.value })}
                    placeholder="e.g. Beginner to Intermediate"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Learning Format</label>
                  <input
                    type="text"
                    value={editingProgram.learning_format}
                    onChange={(e) => setEditingProgram({ ...editingProgram, learning_format: e.target.value })}
                    placeholder="e.g. Interactive Online Learning"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Short Description (Catalog Cards)</label>
                <textarea
                  rows={2}
                  required
                  value={editingProgram.short_description}
                  onChange={(e) => setEditingProgram({ ...editingProgram, short_description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Curriculum Overview</label>
                <textarea
                  rows={4}
                  required
                  value={editingProgram.full_overview}
                  onChange={(e) => setEditingProgram({ ...editingProgram, full_overview: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Skills Covered (comma separated)</label>
                  <input
                    type="text"
                    value={editingProgram.skills_covered_str}
                    onChange={(e) => setEditingProgram({ ...editingProgram, skills_covered_str: e.target.value })}
                    placeholder="TypeScript, React, Node.js, SQL"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tools & Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={editingProgram.tools_technologies_str}
                    onChange={(e) => setEditingProgram({ ...editingProgram, tools_technologies_str: e.target.value })}
                    placeholder="React, Docker, Vite, Git"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#4F7CFF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editingProgram.featured}
                    onChange={(e) => setEditingProgram({ ...editingProgram, featured: e.target.checked })}
                    className="rounded text-[#4F7CFF]"
                  />
                  <span>Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editingProgram.published}
                    onChange={(e) => setEditingProgram({ ...editingProgram, published: e.target.checked })}
                    className="rounded text-[#4F7CFF]"
                  />
                  <span>Publicly Visible</span>
                </label>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
                <strong>Compliance Reminder:</strong> Astra Pathways policy prohibits displaying course fees, salary statistics, or placement guarantee claims anywhere on the website.
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingProgram(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#0B1020] hover:bg-gray-800 text-white font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Save Program
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
