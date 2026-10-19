import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, HelpCircle, ChevronDown, ChevronUp, MessageSquare, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { FAQ } from '../types';

interface FaqPageProps {
  onOpenAdvisorModal: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenAdvisorModal }) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Programs',
    'Admissions',
    'Curriculum',
    'Learning Support',
    'Projects',
    'Career Guidance',
    'General Queries'
  ];

  const fetchFaqs = () => {
    setLoading(true);
    api.getFaqs({
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      search: searchQuery.trim() || undefined
    })
      .then(res => {
        if (res.success && res.faqs) {
          setFaqs(res.faqs);
          if (res.faqs.length > 0) setOpenId(res.faqs[0].id);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFaqs();
  }, [selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFaqs();
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-[#4F7CFF]/15 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#4F7CFF] border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Clear Answers
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Find answers to common questions about our technical curricula, lab projects, admissions, and career support services.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-8 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions (e.g. prerequisites, projects, mentorship)..."
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Category Pills */}
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

        {/* FAQ Accordion List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-20 rounded-2xl bg-white border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 max-w-md mx-auto">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#0B1020]">No questions found</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">Try a different search term or category.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#0B1020] text-white text-xs font-semibold"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base text-[#0B1020] hover:text-[#4F7CFF] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#4F7CFF] bg-[#4F7CFF]/10 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                      <span>{faq.question}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#4F7CFF] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still Have Questions Box */}
        <div className="mt-14 p-8 rounded-3xl bg-[#0B1020] text-white text-center space-y-4">
          <h3 className="text-xl font-bold">Still have questions?</h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
            Our academic advisors can guide you through course selection, syllabus reviews, and lab prerequisites.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenAdvisorModal}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-md shadow-[#4F7CFF]/20 inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Speak With an Advisor
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
