import React, { useState } from 'react';
import { Calculator, CheckSquare, Plus, Trash2, Phone, Mail, Clock, MapPin, Copy, Check, ShieldAlert, HeartPulse, Laptop, GraduationCap } from 'lucide-react';
import { CAMPUS_SERVICES, STUDY_TIPS_GUIDES } from '../data/mockData';

interface CourseEntry {
  id: string;
  code: string;
  name: string;
  credits: number;
  grade: string;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D': 1.0,
  'F': 0.0
};

export const StudentToolsSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'services' | 'survival'>('calculator');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // GPA Calculator State
  const [courses, setCourses] = useState<CourseEntry[]>([
    { id: '1', code: 'CS201', name: 'Data Structures & Algorithms', credits: 4, grade: 'A' },
    { id: '2', code: 'MATH215', name: 'Multivariable Calculus', credits: 4, grade: 'A-' },
    { id: '3', code: 'BIO110', name: 'Molecular Cell Biology', credits: 3, grade: 'B+' },
    { id: '4', code: 'ECON102', name: 'Macroeconomics', credits: 3, grade: 'A' },
  ]);

  // Revision checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'guide-1-0': true,
    'guide-2-0': true,
  });

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddCourse = () => {
    const newId = String(Date.now());
    setCourses(prev => [
      ...prev,
      { id: newId, code: 'NEW101', name: 'Elective Module', credits: 3, grade: 'A' }
    ]);
  };

  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const handleUpdateCourse = (id: string, field: keyof CourseEntry, value: any) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // Calculate GPA
  const totalCredits = courses.reduce((sum, c) => sum + Number(c.credits), 0);
  const totalPoints = courses.reduce((sum, c) => sum + (Number(c.credits) * (GRADE_POINTS[c.grade] ?? 0)), 0);
  const calculatedGpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  const getAcademicStanding = (gpa: number) => {
    if (gpa >= 3.8) return { label: "Chancellor's High Honors", color: "text-emerald-600 dark:text-emerald-400" };
    if (gpa >= 3.5) return { label: "Dean's Honor Roll", color: "text-indigo-600 dark:text-indigo-400" };
    if (gpa >= 3.0) return { label: "Good Academic Standing", color: "text-sky-600 dark:text-sky-400" };
    if (gpa >= 2.0) return { label: "Satisfactory Standing", color: "text-amber-600 dark:text-amber-400" };
    return { label: "Academic Warning", color: "text-rose-600 dark:text-rose-400" };
  };

  const standing = getAcademicStanding(parseFloat(calculatedGpa));

  const copyContact = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedPhone(id);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  return (
    <section id="services" className="py-12 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Sub-Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Student Support Services</span>
              <span aria-hidden="true">·</span>
              <span>Academic Tooling & Assistance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Student Information & Academic Tools
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Calculate expected semester GPAs, access campus support departments, and follow evidence-based revision protocols.
            </p>
          </div>

          {/* Sub-tab navigation */}
          <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setActiveSubTab('calculator')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeSubTab === 'calculator'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              GPA Calculator
            </button>
            <button
              onClick={() => setActiveSubTab('services')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeSubTab === 'services'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Campus Services Directory
            </button>
            <button
              onClick={() => setActiveSubTab('survival')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeSubTab === 'survival'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Revision Survival Checklists
            </button>
          </div>
        </div>

        {/* SUBTAB 1: GPA & Grade Calculator */}
        {activeSubTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Courses Form (8 cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Semester Course Modules
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Input your registered modules, credit weights, and expected letter grades.
                  </p>
                </div>

                <button
                  onClick={handleAddCourse}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Module</span>
                </button>
              </div>

              {/* Course rows table */}
              <div className="space-y-3">
                {courses.map((course, idx) => (
                  <div
                    key={course.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 grid grid-cols-12 gap-2 sm:gap-3 items-center"
                  >
                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-0.5">Code</label>
                      <input
                        type="text"
                        value={course.code}
                        onChange={(e) => handleUpdateCourse(course.id, 'code', e.target.value)}
                        className="w-full px-2 py-1 text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="col-span-5 sm:col-span-5">
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-0.5">Module Name</label>
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => handleUpdateCourse(course.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white truncate"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-0.5">Credits</label>
                      <select
                        value={course.credits}
                        onChange={(e) => handleUpdateCourse(course.id, 'credits', Number(e.target.value))}
                        className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white font-mono"
                      >
                        {[1, 2, 3, 4, 5, 6].map(c => (
                          <option key={c} value={c}>{c} Cr</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-0.5">Grade</label>
                      <select
                        value={course.grade}
                        onChange={(e) => handleUpdateCourse(course.id, 'grade', e.target.value)}
                        className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white font-bold"
                      >
                        {Object.keys(GRADE_POINTS).map(g => (
                          <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-12 sm:col-span-1 flex justify-end">
                      <button
                        onClick={() => handleRemoveCourse(course.id)}
                        disabled={courses.length <= 1}
                        aria-label="Delete course"
                        className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-20 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Calculated Summary Card (4 cols) */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Projected GPA Performance
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Semester Standing
                </h3>
              </div>

              {/* Large GPA Display */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-center">
                <div className="text-xs text-slate-500 dark:text-slate-400">Cumulative GPA</div>
                <div className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-1 font-mono tabular-nums">
                  {calculatedGpa}
                </div>
                <div className={`mt-2 text-xs font-bold ${standing.color}`}>
                  {standing.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Based on standard 4.0 weighted collegiate scale
                </div>
              </div>

              {/* Metrics Breakdown */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Total Semester Credit Units:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums">{totalCredits} credits</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Total Quality Points Earned:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono tabular-nums">{totalPoints.toFixed(1)} pts</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Graduation Requirement Threshold:</span>
                  <span className="font-medium text-slate-900 dark:text-white font-mono">2.00 Minimum</span>
                </div>
              </div>

              <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200/80 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200">
                <span className="font-bold block mb-1">Honors Advisory:</span>
                Students maintaining a GPA $\ge$ 3.50 with a minimum of 12 letter-graded credit hours qualify for departmental honors and priority registration.
              </div>
            </div>

          </div>
        )}

        {/* SUBTAB 2: Campus Services Directory */}
        {activeSubTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPUS_SERVICES.map(service => (
              <div
                key={service.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{service.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {service.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {service.urgentNote && (
                    <div className="mt-3 p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg text-xs text-amber-800 dark:text-amber-300">
                      {service.urgentNote}
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{service.location}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{service.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Controls */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => copyContact(service.phone, service.id)}
                    className="flex-1 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedPhone === service.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Phone className="w-3 h-3 text-slate-400" />}
                    <span>{copiedPhone === service.id ? 'Copied' : service.phone}</span>
                  </button>

                  <a
                    href={`mailto:${service.email}`}
                    className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    title={`Email ${service.email}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUBTAB 3: Revision Survival Checklists */}
        {activeSubTab === 'survival' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDY_TIPS_GUIDES.map(guide => (
              <div
                key={guide.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{guide.category}</span>
                    <span>{guide.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {guide.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {guide.summary}
                  </p>

                  {/* Checklist items */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Action Checklist:
                    </div>
                    {guide.checklist.map((step, idx) => {
                      const itemKey = `${guide.id}-${idx}`;
                      const isChecked = !!checkedItems[itemKey];

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleCheck(itemKey)}
                          className="flex items-start gap-2.5 text-xs cursor-pointer group select-none"
                        >
                          <div className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-indigo-600 border-indigo-600 text-white'
                              : 'border-slate-300 dark:border-slate-700 group-hover:border-indigo-400'
                          }`}>
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span className={`leading-snug transition-colors ${
                            isChecked
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-700 dark:text-slate-200'
                          }`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  Tip: Complete and cross off all 4 items before taking mock past papers.
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
