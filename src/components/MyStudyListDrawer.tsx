import React, { useState } from 'react';
import { X, Bookmark, Download, Eye, Trash2, Calendar, FileText, Check, Plus } from 'lucide-react';
import { ResourceItem, CampusEvent, CAMPUS_EVENTS } from '../data/mockData';

interface MyStudyListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedResources: ResourceItem[];
  onRemoveBookmark: (id: string) => void;
  onPreviewResource: (resource: ResourceItem) => void;
  rsvpdEventIds: string[];
  onToggleRsvp: (id: string) => void;
}

export const MyStudyListDrawer: React.FC<MyStudyListDrawerProps> = ({
  isOpen,
  onClose,
  savedResources,
  onRemoveBookmark,
  onPreviewResource,
  rsvpdEventIds,
  onToggleRsvp,
}) => {
  const [activeTab, setActiveTab] = useState<'resources' | 'events' | 'notes'>('resources');
  const [quickNotes, setQuickNotes] = useState<string[]>(() => {
    return [
      'CS201 Midterm Exam: Thursday Nov 12, Hall B, Seat #42. Bring university ID card.',
      'Check Dr. Elena Rostova office hours (Tuesday 2-4 PM) for Green Theorem question.'
    ];
  });
  const [newNoteInput, setNewNoteInput] = useState('');

  if (!isOpen) return null;

  const rsvpdEvents = CAMPUS_EVENTS.filter(e => rsvpdEventIds.includes(e.id));

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteInput.trim()) {
      setQuickNotes(prev => [newNoteInput.trim(), ...prev]);
      setNewNoteInput('');
    }
  };

  const handleRemoveNote = (idx: number) => {
    setQuickNotes(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                My Study Desk
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close drawer"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-semibold px-4 pt-2 gap-4">
            <button
              onClick={() => setActiveTab('resources')}
              className={`pb-2.5 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'resources'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Saved Materials ({savedResources.length})
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`pb-2.5 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'events'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              RSVP'd Events ({rsvpdEvents.length})
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`pb-2.5 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'notes'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Quick Notes ({quickNotes.length})
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* TAB 1: Saved Resources */}
            {activeTab === 'resources' && (
              <>
                {savedResources.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400">
                    <Bookmark className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700 dark:text-slate-300">No saved resources yet.</p>
                    <p className="mt-1">Click the bookmark icon on any past paper or lecture note to pin it here for quick access during finals.</p>
                  </div>
                ) : (
                  savedResources.map(res => (
                    <div
                      key={res.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">{res.courseCode}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{res.fileSize}</span>
                      </div>

                      <h4 className="font-bold text-slate-900 dark:text-white leading-snug">
                        {res.title}
                      </h4>

                      <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate">
                        {res.courseName} · {res.term}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60">
                        <button
                          onClick={() => {
                            onPreviewResource(res);
                            onClose();
                          }}
                          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Preview Notes</span>
                        </button>

                        <button
                          onClick={() => onRemoveBookmark(res.id)}
                          aria-label="Remove saved resource"
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* TAB 2: RSVP'd Events */}
            {activeTab === 'events' && (
              <>
                {rsvpdEvents.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700 dark:text-slate-300">No event registrations.</p>
                    <p className="mt-1">Browse the Campus Events section and reserve spots for guest seminars, career fairs, and hackathons.</p>
                  </div>
                ) : (
                  rsvpdEvents.map(evt => (
                    <div
                      key={evt.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{evt.category}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Registered</span>
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 dark:text-white leading-snug">
                        {evt.title}
                      </h4>

                      <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                        {evt.date} · {evt.time}
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60">
                        <span className="text-[11px] text-slate-500 truncate max-w-[200px]">
                          {evt.location}
                        </span>

                        <button
                          onClick={() => onToggleRsvp(evt.id)}
                          className="text-xs text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                        >
                          Cancel RSVP
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* TAB 3: Quick Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteInput}
                    onChange={(e) => setNewNoteInput(e.target.value)}
                    placeholder="Add reminder or exam room note..."
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                    aria-label="Add note"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>

                <div className="space-y-2.5">
                  {quickNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/40 rounded-xl text-xs text-amber-950 dark:text-amber-200 flex items-start justify-between gap-2"
                    >
                      <p className="leading-relaxed flex-1">{note}</p>
                      <button
                        onClick={() => handleRemoveNote(idx)}
                        aria-label="Delete note"
                        className="text-amber-600 hover:text-rose-600 shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center text-xs text-slate-500 dark:text-slate-400">
            Saved items persist across your current study session.
          </div>

        </div>
      </div>
    </div>
  );
};
