import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { Announcement } from '../../types';

export const AnnouncementBar: React.FC = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    api.getAnnouncements(false)
      .then(res => {
        if (res.success && res.announcements && res.announcements.length > 0) {
          setAnnouncement(res.announcements[0]);
        }
      })
      .catch(() => {
        // Silently ignore if no announcement
      });
  }, []);

  if (!announcement || isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-[#0B1020] via-[#252B66] to-[#0B1020] text-white text-xs md:text-sm py-2 px-4 border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 mx-auto overflow-hidden text-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#4F7CFF]/20 text-[#8B5CF6] border border-[#4F7CFF]/30 shrink-0">
            <Sparkles className="w-3 h-3 text-[#4F7CFF]" />
            {announcement.badge}
          </span>
          <span className="truncate text-gray-200">
            {announcement.title}
          </span>
          {announcement.link_url && (
            <Link
              to={announcement.link_url}
              className="inline-flex items-center gap-1 font-medium text-[#4F7CFF] hover:text-[#8B5CF6] transition-colors underline underline-offset-4 shrink-0"
            >
              Explore
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10 shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
