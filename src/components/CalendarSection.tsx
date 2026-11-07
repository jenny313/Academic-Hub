import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CalendarEvent, CALENDAR_EVENTS } from '../data/mockData';

interface CalendarSectionProps {
  onSelectResourceSearch?: (term: string) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({ onSelectResourceSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'exam' | 'deadline' | 'holiday' | 'milestone'>('all');
  const [viewMode, setViewMode] = useState<'month' | 'timeline'>('month');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(1); // 0 = Oct, 1 = Nov 2026, 2 = Dec 2026, 3 = Jan 2027
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-10');
  const [icsExported, setIcsExported] = useState(false);

  const monthsData = [
    { name: 'October 2026', year: 2026, month: 9, days: 31, startDay: 4 }, // Thu = 4
    { name: 'November 2026', year: 2026, month: 10, days: 30, startDay: 0 }, // Sun = 0
    { name: 'December 2026', year: 2026, month: 11, days: 31, startDay: 2 }, // Tue = 2
    { name: 'January 2027', year: 2027, month: 0, days: 31, startDay: 5 }  // Fri = 5
  ];

  const currentMonth = monthsData[currentMonthIndex];

  const filteredEvents = CALENDAR_EVENTS.filter(evt => {
    if (selectedCategory === 'all') return true;
    return evt.category === selectedCategory;
  });

  // Events on currently selected date
  const selectedDateEvents = CALENDAR_EVENTS.filter(evt => {
    if (evt.date === selectedDate) return true;
    if (evt.endDate && selectedDate >= evt.date && selectedDate <= evt.endDate) return true;
    return false;
  });

  // Generate .ics calendar download
  const handleExportICS = () => {
    let icsString = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CampusSphere//University Academic Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ].join('\r\n');

    CALENDAR_EVENTS.forEach(evt => {
      const dtStart = evt.date.replace(/-/g, '');
      const dtEnd = (evt.endDate || evt.date).replace(/-/g, '');
      icsString += '\r\n' + [
        'BEGIN:VEVENT',
        `UID:${evt.id}@campussphere.edu`,
        `DTSTAMP:${dtStart}T090000Z`,
        `DTSTART;VALUE=DATE:${dtStart}`,
        `DTEND;VALUE=DATE:${dtEnd}`,
        `SUMMARY:${evt.title}`,
        `DESCRIPTION:${evt.description}`,
        `LOCATION:${evt.location || 'University Campus'}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      ].join('\r\n');
    });

    icsString += '\r\nEND:VCALENDAR';

    const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `University_Academic_Calendar_${currentMonth.year}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIcsExported(true);
    setTimeout(() => setIcsExported(false), 3500);
  };

  const getDayEvents = (dayNum: number) => {
    const mm = String(currentMonth.month + 1).padStart(2, '0');
    const dd = String(dayNum).padStart(2, '0');
    const dateStr = `${currentMonth.year}-${mm}-${dd}`;
    return CALENDAR_EVENTS.filter(evt => {
      if (evt.date === dateStr) return true;
      if (evt.endDate && dateStr >= evt.date && dateStr <= evt.endDate) return true;
      return false;
    });
  };

  return (
    <section id="calendar" className="py-12 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Academic Timetable</span>
              <span aria-hidden="true">·</span>
              <span>Semester Milestones</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Academic Calendar & Key Deadlines
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Track university examination periods, drop/add deadlines, grade submissions, and recess dates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportICS}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{icsExported ? 'Calendar Downloaded (.ics)!' : 'Export to iCal / Google'}</span>
            </button>
          </div>
        </div>

        {/* Filters and View Toggle Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Dates' },
              { id: 'exam', label: 'Examinations' },
              { id: 'deadline', label: 'Academic Deadlines' },
              { id: 'holiday', label: 'Holidays & Recesses' },
              { id: 'milestone', label: 'Milestones' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Switcher: Monthly Grid vs List */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'month'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Month View
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Timeline List
            </button>
          </div>
        </div>

        {/* View Mode 1: Month Calendar Matrix */}
        {viewMode === 'month' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Calendar Grid (8 cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              
              {/* Month Header Navigation */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>{currentMonth.name}</span>
                </h3>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentMonthIndex === 0}
                    onClick={() => setCurrentMonthIndex(prev => prev - 1)}
                    aria-label="Previous month"
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={currentMonthIndex === monthsData.length - 1}
                    onClick={() => setCurrentMonthIndex(prev => prev + 1)}
                    aria-label="Next month"
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day of week headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="py-1">{d}</div>
                ))}
              </div>

              {/* Days Matrix */}
              <div className="grid grid-cols-7 gap-1.5">
                {/* Empty offset padding cells */}
                {Array.from({ length: currentMonth.startDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-14 sm:h-16 rounded-xl bg-slate-50/50 dark:bg-slate-800/20 opacity-40" />
                ))}

                {/* Day cells */}
                {Array.from({ length: currentMonth.days }).map((_, i) => {
                  const dayNum = i + 1;
                  const mm = String(currentMonth.month + 1).padStart(2, '0');
                  const dd = String(dayNum).padStart(2, '0');
                  const dateStr = `${currentMonth.year}-${mm}-${dd}`;
                  const eventsOnThisDay = getDayEvents(dayNum);
                  const isSelected = selectedDate === dateStr;
                  const isToday = dateStr === '2026-11-07';

                  return (
                    <button
                      key={dayNum}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`h-14 sm:h-16 p-1.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer relative group ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                          : isToday
                          ? 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/80 font-bold'
                          : 'border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs tabular-nums font-mono ${
                          isSelected
                            ? 'font-bold text-indigo-700 dark:text-indigo-300'
                            : isToday
                            ? 'font-bold text-slate-900 dark:text-white'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {dayNum}
                        </span>

                        {isToday && (
                          <span className="text-[9px] font-semibold text-indigo-600 dark:text-indigo-400">Today</span>
                        )}
                      </div>

                      {/* Event indicators */}
                      <div className="flex items-center gap-1 overflow-hidden w-full">
                        {eventsOnThisDay.slice(0, 2).map((ev, idx) => (
                          <span
                            key={idx}
                            title={ev.title}
                            className={`w-full h-1.5 rounded-full ${
                              ev.category === 'exam'
                                ? 'bg-rose-500'
                                : ev.category === 'deadline'
                                ? 'bg-amber-500'
                                : ev.category === 'holiday'
                                ? 'bg-emerald-500'
                                : 'bg-indigo-500'
                            }`}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legend Strip */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 flex-wrap gap-3">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Category Guide:</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Examinations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Submission Deadlines</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Holidays & Recesses</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span>Academic Milestones</span>
                </div>
              </div>

            </div>

            {/* Selected Date Agenda Details (4 cols) */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="uppercase font-semibold tracking-wider">Date Schedule</span>
                  <span className="font-mono tabular-nums">{selectedDate}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </h3>

                <div className="mt-4 space-y-3">
                  {selectedDateEvents.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                      <p className="font-medium text-slate-700 dark:text-slate-300">No scheduled exams or deadlines on this date.</p>
                      <p className="mt-1">Standard lecture timetable and library hours apply.</p>
                    </div>
                  ) : (
                    selectedDateEvents.map(evt => (
                      <div
                        key={evt.id}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {evt.title}
                          </span>
                        </div>

                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {evt.category.toUpperCase()} · {evt.affectedPrograms || 'Campus-wide'}
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {evt.description}
                        </p>

                        {evt.location && (
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{evt.location}</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Study Tip Box for this Date */}
              <div className="mt-6 p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-xl text-xs text-indigo-900 dark:text-indigo-200">
                <span className="font-bold block mb-1">Academic Preparation Tip:</span>
                Past examination papers for all core modules are accessible in the Academic Resources tab. Check solutions early to identify topic gaps.
              </div>
            </div>

          </div>
        )}

        {/* View Mode 2: Timeline List */}
        {viewMode === 'timeline' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
            {filteredEvents.map(evt => (
              <div key={evt.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="space-y-1 max-w-2xl">
                  {/* Unboxed metadata (NO PILLS) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{evt.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{evt.date}{evt.endDate ? ` to ${evt.endDate}` : ''}</span>
                    <span aria-hidden="true">·</span>
                    <span>{evt.affectedPrograms || 'All Faculties'}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {evt.description}
                  </p>

                  {evt.location && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.location}</span>
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedDate(evt.date);
                      setViewMode('month');
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    View on Grid
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
