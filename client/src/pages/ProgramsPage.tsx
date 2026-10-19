import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Filter, CheckCircle2, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { api } from '../services/api';
import { Program } from '../types';

interface ProgramsPageProps {
  onOpenAdvisorModal: (programTitle?: string) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onOpenAdvisorModal }) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.getCategories()
      .then(res => {
        if (res.success && res.categories) setCategories(res.categories);
      })
      .catch(() => {});
  }, []);

  const fetchPrograms = () => {
    setLoading(true);
    api.getPrograms({
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      level: selectedLevel !== 'All' ? selectedLevel : undefined,
      search: searchQuery.trim() || undefined
    })
      .then(res => {
        if (res.success) setPrograms(res.programs);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPrograms();
  }, [selectedCategory, selectedLevel]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPrograms();
  };

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24">
      {/* Header Banner */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F7CFF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#4F7CFF] border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Practical Engineering Curricula
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Explore Learning Pathways
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Deliberately structured technical programs combining conceptual rigor, hands-on laboratory exercises, and real-world project deliverables.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mt-8 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search programs, topics, or skills (e.g. React, Python, Cloud)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#4F7CFF] text-sm backdrop-blur-md"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-sm hover:opacity-95 shadow-md shadow-[#4F7CFF]/20 shrink-0"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Filter Controls */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#0B1020] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Level:
              </span>
              <div className="flex gap-1.5">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      selectedLevel === lvl
                        ? 'bg-[#4F7CFF] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
          <span>
            Showing <strong className="text-[#0B1020]">{programs.length}</strong> learning programs
          </span>
          {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#4F7CFF] hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Programs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-white border border-gray-200 animate-pulse p-6 space-y-4" />
            ))}
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 p-8 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#0B1020]">No programs match your criteria</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 mb-6 leading-relaxed">
              Try adjusting your search terms or selecting a different category filter to explore our curriculum catalog.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#4F7CFF]/40 transition-all duration-300 flex flex-col justify-between p-6 group"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-[#4F7CFF] bg-[#4F7CFF]/10 px-2.5 py-1 rounded-md">
                      {prog.category}
                    </span>
                    {prog.featured && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-[#0B1020] mb-2.5 group-hover:text-[#4F7CFF] transition-colors leading-snug">
                    <Link to={`/programs/${prog.id}`}>
                      {prog.title}
                    </Link>
                  </h2>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">
                    {prog.short_description}
                  </p>

                  {/* Key Skills */}
                  <div className="mb-5">
                    <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Skills & Tools:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.skills_covered.slice(0, 5).map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Program stats highlights */}
                  <div className="space-y-1.5 py-3 border-t border-gray-100 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7CFF] shrink-0" />
                      <span>{prog.curriculum_modules.length} Core Modules & Guided Labs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                      <span>{prog.sample_projects.length} Real-World Portfolio Projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Level: {prog.level}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-3 mt-6">
                  <Link
                    to={`/programs/${prog.id}`}
                    className="text-center py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0B1020] font-semibold text-xs transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => onOpenAdvisorModal(prog.title)}
                    className="text-center py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md shadow-[#4F7CFF]/15"
                  >
                    Enquire Now
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
