import React from 'react';
import { BookOpen, Bookmark, Moon, Sun, Search, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
  onOpenSavedDrawer: () => void;
  isDark: boolean;
  toggleDark: () => void;
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSavedDrawer,
  isDark,
  toggleDark,
  onOpenUpload,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-indigo-700 transition-colors">
              CS
            </div>
            <span>CampusSphere</span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('overview')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'overview'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : ''
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'resources'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : ''
              }`}
            >
              Academic Resources
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'calendar'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : ''
              }`}
            >
              Academic Calendar
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'events'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : ''
              }`}
            >
              Campus Events
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'services'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : ''
              }`}
            >
              Student Services
            </button>
          </nav>

          {/* Zone 3: 1 primary action lockup */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleDark}
              aria-label="Toggle visual theme"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenUpload}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Share Notes</span>
            </button>

            <button
              onClick={onOpenSavedDrawer}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Study Desk</span>
              {savedCount > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-white text-indigo-600 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="md:hidden flex items-center gap-4 py-2.5 overflow-x-auto text-xs font-medium border-t border-slate-100 dark:border-slate-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`whitespace-nowrap px-1 py-0.5 ${
              activeTab === 'overview'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`whitespace-nowrap px-1 py-0.5 ${
              activeTab === 'resources'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`whitespace-nowrap px-1 py-0.5 ${
              activeTab === 'calendar'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`whitespace-nowrap px-1 py-0.5 ${
              activeTab === 'events'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`whitespace-nowrap px-1 py-0.5 ${
              activeTab === 'services'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Services & Tools
          </button>
        </div>
      </div>
    </header>
  );
};
