import React, { useState } from 'react';
import { Bell, AlertCircle, ChevronRight, CheckCircle2, Pin } from 'lucide-react';
import { AnnouncementItem } from '../data/mockData';

interface AnnouncementsSectionProps {
  announcements: AnnouncementItem[];
  onNavigateTab: (tab: string) => void;
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  announcements,
  onNavigateTab,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Urgent' | 'Academic' | 'Administrative' | 'Campus Life'>('All');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);

  const filtered = announcements.filter(item => {
    if (selectedFilter === 'All') return true;
    return item.category === selectedFilter;
  });

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Campus Bulletins</span>
              <span aria-hidden="true">·</span>
              <span>Official University Notices</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Announcements & Urgent Alerts
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg overflow-x-auto scrollbar-none">
            {(['All', 'Urgent', 'Academic', 'Administrative', 'Campus Life'] as const).map(category => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedFilter === category
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Announcements List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedAnnouncement(item)}
              className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    {item.isPinned && (
                      <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                        <Pin className="w-3 h-3" />
                        <span>Pinned</span>
                      </span>
                    )}
                    {item.isPinned && <span aria-hidden="true">·</span>}
                    <span className={item.category === 'Urgent' ? 'text-rose-600 dark:text-rose-400 font-semibold' : ''}>
                      {item.category} Notice
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.department}</span>
                  </div>
                  <span className="tabular-nums font-mono text-[11px]">{item.date}</span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {item.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1">
                  <span>Read Full Notice</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>

                {item.actionLabel && (
                  <span className="text-slate-500 dark:text-slate-400">
                    {item.actionLabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing announcement in detail */}
        {selectedAnnouncement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">{selectedAnnouncement.category} Bulletin</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedAnnouncement.department}</span>
                </div>
                <span className="font-mono text-xs">{selectedAnnouncement.date}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedAnnouncement.title}
              </h3>

              <div className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
                <p>{selectedAnnouncement.content}</p>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">Official Student Advisory:</span>
                  Please check your university student portal and webmail for individual timetable adjustments or faculty advising forms associated with this notice.
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
                {selectedAnnouncement.actionLabel && (
                  <button
                    onClick={() => {
                      setSelectedAnnouncement(null);
                      if (selectedAnnouncement.category === 'Academic') onNavigateTab('calendar');
                      else onNavigateTab('services');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {selectedAnnouncement.actionLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
