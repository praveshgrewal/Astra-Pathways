import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, BookOpen, Clock, Tag, ArrowRight, User } from 'lucide-react';
import { api } from '../services/api';
import { Blog } from '../types';

export const ResourcesPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Career Guidance', 'Technology Explainers', 'Tutorials', 'Education'];

  const fetchBlogs = () => {
    setLoading(true);
    api.getBlogs({
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      search: searchQuery.trim() || undefined
    })
      .then(res => {
        if (res.success) setBlogs(res.blogs);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-[#4F7CFF]/15 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#4F7CFF] border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Educational Guides & Knowledge
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Resources, Tutorials & Insights
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Practical articles, architecture deep-dives, career strategies, and educational roadmaps curated by the Astra Pathways faculty.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mt-8 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles, roadmaps, or technical topics..."
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
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0B1020] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-white border border-gray-200 animate-pulse p-6" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 p-8 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#0B1020]">No articles found</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 mb-6">
              Try adjusting your search query or selecting a different category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <article
                key={b.id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-[#4F7CFF]/40 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6">
                  
                  {/* Category and Read Time */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="font-bold text-[#4F7CFF] bg-[#4F7CFF]/10 px-2.5 py-0.5 rounded-md">
                      {b.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {b.read_time}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-[#0B1020] mb-3 group-hover:text-[#4F7CFF] transition-colors leading-snug">
                    <Link to={`/resources/${b.slug}`}>
                      {b.title}
                    </Link>
                  </h2>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">
                    {b.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {b.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-medium">{b.author_name}</span>
                  </div>
                  <Link
                    to={`/resources/${b.slug}`}
                    className="font-bold text-[#4F7CFF] group-hover:text-[#8B5CF6] flex items-center gap-1 transition-colors"
                  >
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
