import React from 'react';
import { Phone, Shield, BookOpen, Heart, Mail } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Overview */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                CS
              </div>
              <span>CampusSphere</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official collegiate resource portal serving undergraduate and graduate scholars. Curated past papers, verified lecture notes, semester calendars, and student advocacy.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              University Academic Term 2026–2027
            </div>
          </div>

          {/* Col 2: Academic Sections */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Academic Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('resources')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lecture Notes & Transcripts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('resources')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Past Examination Papers & Rubrics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('calendar')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Academic Deadlines & Timetable
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('events')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Campus Symposia & Workshops
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Student Information & Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive GPA & Grade Target Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  24/7 Library & Study Pod Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Counseling & Psychological Wellness
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  IT Helpdesk & Software Licensing
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Urgent Helpline & Emergency Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Campus 24/7 Emergency Contacts
            </h4>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-medium">Campus Safety Escort:</span>
                <span className="font-mono text-indigo-400 font-bold">+1 (555) 019-9111</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-medium">24/7 Crisis Counselor:</span>
                <span className="font-mono text-emerald-400 font-bold">+1 (555) 019-4888</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-medium">Main Library Desk:</span>
                <span className="font-mono text-slate-400">+1 (555) 019-4820</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 CampusSphere Student Portal. Developed for University Academic Community.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400">Academic Integrity Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400">Student Disability Services</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400">Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
