import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Clock, Calendar, User, Share2, Tag, 
  Check, ArrowRight, BookOpen, AlertCircle 
} from 'lucide-react';
import { api } from '../services/api';
import { Blog } from '../types';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getBlog(slug)
      .then(res => {
        if (res.success && res.blog) {
          setBlog(res.blog);
          api.getBlogs({ category: res.blog.category })
            .then(relRes => {
              if (relRes.success) {
                setRelated(relRes.blogs.filter((b: Blog) => b.slug !== slug).slice(0, 2));
              }
            })
            .catch(() => {});
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FC] py-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#4F7CFF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-gray-600">Loading guide...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#F5F7FC] py-24 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-3xl border border-gray-200 max-w-md mx-auto shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#0B1020]">Article Not Found</h2>
          <p className="text-sm text-gray-600 mt-2 mb-6">The article you requested could not be located.</p>
          <Link
            to="/resources"
            className="px-6 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      
      {/* Header Banner */}
      <section className="bg-[#0B1020] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-[#4F7CFF]/15 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Resources & Articles
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-[#4F7CFF] bg-[#4F7CFF]/15 px-3 py-1 rounded-full border border-[#4F7CFF]/30">
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" /> {blog.read_time}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center font-bold text-white text-xs">
                {blog.author_name.charAt(0)}
              </div>
              <div>
                <span className="block font-semibold text-white">{blog.author_name}</span>
                <span className="text-gray-400">{blog.author_role}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors flex items-center gap-1.5 font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? 'Link Copied!' : 'Share Article'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Article Content Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        <article className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-sm space-y-8">
          
          {/* Summary Callout */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#4F7CFF]/10 to-[#8B5CF6]/10 border border-[#4F7CFF]/20 text-sm text-gray-700 italic leading-relaxed">
            "{blog.summary}"
          </div>

          {/* Formatted Content */}
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-gray-700 leading-relaxed space-y-6">
            {blog.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-[#0B1020] pt-4 pb-1 border-b border-gray-100">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={idx} className="space-y-1.5 pl-4 list-disc">
                    {items.map((it, iIdx) => (
                      <li key={iIdx}>{it.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-gray-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Topics:
            </span>
            {blog.tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-lg bg-gray-100 text-gray-700">
                {tag}
              </span>
            ))}
          </div>

        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-14 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-[#0B1020] mb-6">Related Learning Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <div key={rel.id} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#4F7CFF] bg-[#4F7CFF]/10 px-2 py-0.5 rounded">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-bold text-[#0B1020] mt-2 mb-2 leading-snug">{rel.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{rel.summary}</p>
                  </div>
                  <Link
                    to={`/resources/${rel.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F7CFF] hover:text-[#8B5CF6] mt-4"
                  >
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
