import React, { useState } from 'react';
import { Search, BookMarked, FileText, Calendar, Calculator, Sparkles, ArrowRight } from 'lucide-react';
import heroCampusImg from '../assets/images/hero_university_campus_1794039637741.jpg';

interface HeroProps {
  onSearch: (query: string) => void;
  onNavigateTab: (tab: string, categoryFilter?: string) => void;
  onOpenGpaCalc: () => void;
  totalResourcesCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onNavigateTab,
  onOpenGpaCalc,
  totalResourcesCount,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      onNavigateTab('resources');
    }
  };

  const quickSearch = (term: string) => {
    setSearchInput(term);
    onSearch(term);
    onNavigateTab('resources');
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Headline, Search, & Navigation */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Unboxed collegiate status kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3 tracking-wide uppercase">
                <span>Fall Semester 2026</span>
                <span aria-hidden="true">·</span>
                <span>Week 8 Revision & Assessment Hub</span>
                <span aria-hidden="true">·</span>
                <span>Active</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
                University Academic Resources & Student Nexus
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Access verified lecture notes, past exam papers with rubrics, interactive semester calendars, and essential campus student services in one clean portal.
              </p>

              {/* Central Search Form */}
              <form onSubmit={handleSearchSubmit} className="mt-6">
                <div className="relative flex items-center shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search by course code, topic, or lecturer (e.g. CS201, Calculus, BIO110)..."
                    className="w-full pl-11 pr-28 py-3.5 text-sm sm:text-base bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Find Notes
                  </button>
                </div>
              </form>

              {/* Quick Keywords */}
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                <span className="font-medium text-slate-700 dark:text-slate-300">Popular searches:</span>
                <button
                  onClick={() => quickSearch('CS201')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 underline underline-offset-2 cursor-pointer"
                >
                  CS201 Algorithms
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => quickSearch('MATH215')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 underline underline-offset-2 cursor-pointer"
                >
                  MATH215 Past Papers
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => quickSearch('Biochemistry')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 underline underline-offset-2 cursor-pointer"
                >
                  Biochemistry Revision
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => quickSearch('Corporate Finance')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 underline underline-offset-2 cursor-pointer"
                >
                  FIN301 Formulas
                </button>
              </div>
            </div>

            {/* Quick-action feature row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <button
                onClick={() => onNavigateTab('resources', 'lecture-notes')}
                className="p-3 text-left bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50/60 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 transition-colors group cursor-pointer"
              >
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">Lecture Notes</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Syllabi & slides</div>
              </button>

              <button
                onClick={() => onNavigateTab('resources', 'past-papers')}
                className="p-3 text-left bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50/60 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 transition-colors group cursor-pointer"
              >
                <BookMarked className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">Past Papers</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Exam solutions</div>
              </button>

              <button
                onClick={() => onNavigateTab('calendar')}
                className="p-3 text-left bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50/60 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 transition-colors group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">Key Deadlines</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Midterms & recess</div>
              </button>

              <button
                onClick={onOpenGpaCalc}
                className="p-3 text-left bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50/60 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 transition-colors group cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">GPA Calculator</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Target predictor</div>
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Campus Photo Card */}
          <div className="lg:col-span-5 relative flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex-1 min-h-[300px] lg:min-h-[420px] bg-slate-100 dark:bg-slate-800">
              <img
                src={heroCampusImg}
                alt="University library study commons with students studying"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-xs font-semibold tracking-wide uppercase text-indigo-300 mb-1">
                  Campus Facilities Spotlight
                </div>
                <h3 className="text-lg font-bold">William James Main Library</h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  Operating 24/7 throughout Midterm examination season with bookable collaborative study pods on Floors 2 & 3.
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/20">
                  <span className="tabular-nums font-mono">1,450+ Verified Academic Files</span>
                  <button
                    onClick={() => onNavigateTab('services')}
                    className="inline-flex items-center gap-1 text-white hover:text-indigo-200 font-semibold cursor-pointer"
                  >
                    <span>View Desks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
