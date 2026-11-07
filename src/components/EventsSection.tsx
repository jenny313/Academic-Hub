import React, { useState } from 'react';
import { Calendar, MapPin, Users, Check, Clock, Sparkles, Filter, Share2 } from 'lucide-react';
import { CampusEvent, CAMPUS_EVENTS } from '../data/mockData';
import campusAuditoriumImg from '../assets/images/campus_event_gathering_1794039639002.jpg';

interface EventsSectionProps {
  rsvpdEventIds: string[];
  onToggleRsvp: (id: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  rsvpdEventIds,
  onToggleRsvp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [shareToast, setShareToast] = useState<string | null>(null);

  const categories = ['All', 'Career', 'Academic', 'Wellness', 'Tech', 'Sports'];

  const filteredEvents = CAMPUS_EVENTS.filter(evt => {
    if (selectedCategory === 'All') return true;
    return evt.category === selectedCategory;
  });

  const handleShare = (event: CampusEvent) => {
    navigator.clipboard?.writeText(`Join me at "${event.title}" on ${event.date} at ${event.location}!`);
    setShareToast(`Copied event details: ${event.title}`);
    setTimeout(() => setShareToast(null), 3000);
  };

  return (
    <section id="events" className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Student Engagement</span>
              <span aria-hidden="true">·</span>
              <span>Campus Life & Professional Growth</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Upcoming University Events & Symposia
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Discover guest keynotes, career networking fairs, academic hackathons, and student union activities.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Share notification toast */}
        {shareToast && (
          <div className="mb-6 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-800 dark:text-indigo-300 rounded-xl flex items-center justify-between animate-in fade-in">
            <span>{shareToast}</span>
            <span className="text-[11px] text-indigo-500">Copied to clipboard</span>
          </div>
        )}

        {/* Featured Campus Gathering Hero Card with Generated Image */}
        <div className="mb-8 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl overflow-hidden relative border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-lg">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <span>Featured University Summit</span>
              <span aria-hidden="true">·</span>
              <span>Great Hall & Live Stream</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Annual Tech & Engineering Career Networking Symposium
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Meet recruiters from 65+ companies, attend resume workshops, and participate in direct on-site interview screenings. Over 380 university scholars have registered.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Wednesday, Nov 12 · 10:00 AM – 4:00 PM</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Student Union Great Hall</span>
              </span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onToggleRsvp('ev-1')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                  rsvpdEventIds.includes('ev-1')
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {rsvpdEventIds.includes('ev-1') ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>You're Registered (RSVP Confirmed)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Reserve Free Student Spot</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleShare(CAMPUS_EVENTS[0])}
                className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Share event"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl overflow-hidden aspect-4/3 max-h-72 shadow-md">
            <img
              src={campusAuditoriumImg}
              alt="Students gathered in bright university auditorium for lecture"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredEvents.map(evt => {
            const isRsvpd = rsvpdEventIds.includes(evt.id);
            const currentRsvps = evt.rsvps + (isRsvpd ? 1 : 0);
            const spotsLeft = Math.max(0, evt.capacity - currentRsvps);

            return (
              <div
                key={evt.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Unboxed Metadata (NO PILLS) */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{evt.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{evt.venueType}</span>
                    </div>
                    <span className="tabular-nums font-mono text-[11px]">{spotsLeft} spots remaining</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
                    {evt.title}
                  </h3>

                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Host: <span className="font-medium text-slate-700 dark:text-slate-300">{evt.host}</span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>

                  {/* Date & Location Rows */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.date} · {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>

                  {/* Unboxed Tags */}
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
                    {evt.tags.map((tag, i) => (
                      <span key={i} className="text-[11px]">
                        {i > 0 && <span className="mr-1.5">·</span>}
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Users className="w-3.5 h-3.5" />
                    <span className="tabular-nums font-mono">{currentRsvps} / {evt.capacity} attending</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare(evt)}
                      aria-label="Share event"
                      className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onToggleRsvp(evt.id)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs ${
                        isRsvpd
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isRsvpd ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Registered</span>
                        </>
                      ) : (
                        <span>RSVP Spot</span>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
