import React, { useState } from 'react';
import { X, Upload, Check, AlertCircle } from 'lucide-react';
import { ResourceItem } from '../data/mockData';

interface UploadResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddResource: (newResource: ResourceItem) => void;
}

export const UploadResourceModal: React.FC<UploadResourceModalProps> = ({
  isOpen,
  onClose,
  onAddResource,
}) => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [yearLevel, setYearLevel] = useState<'Year 1' | 'Year 2' | 'Year 3' | 'Year 4' | 'Postgraduate'>('Year 2');
  const [category, setCategory] = useState<'lecture-notes' | 'past-papers' | 'revision-guides' | 'formula-sheets' | 'lab-manuals'>('lecture-notes');
  const [term, setTerm] = useState('Fall 2026');
  const [lecturer, setLecturer] = useState('');
  const [summary, setSummary] = useState('');
  const [keyTopicsInput, setKeyTopicsInput] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode.trim() || !courseName.trim() || !title.trim() || !summary.trim()) {
      setErrorMessage('Please fill out all required fields (Course Code, Name, Title, and Summary).');
      return;
    }

    const topics = keyTopicsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const newResource: ResourceItem = {
      id: `res-user-${Date.now()}`,
      title: title.trim(),
      courseCode: courseCode.trim().toUpperCase(),
      courseName: courseName.trim(),
      department,
      yearLevel,
      category,
      term,
      lecturer: lecturer.trim() || 'Faculty Department Staff',
      fileType: 'PDF',
      fileSize: '3.4 MB',
      pages: 24,
      downloadsCount: 1,
      rating: 5.0,
      summary: summary.trim(),
      keyTopics: topics.length > 0 ? topics : ['Course Core Concepts', 'Exam Review', 'Practice Problems'],
      previewContent: [
        `Verified student upload for ${courseCode.trim().toUpperCase()}: ${title.trim()}`,
        `Comprehensive peer study notes authored for ${term}.`,
        `Summary overview: ${summary.trim()}`
      ]
    };

    onAddResource(newResource);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Contribute Academic Resources
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Share your revision notes, past paper solutions, or lecture summaries with fellow students.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Course Code *
              </label>
              <input
                type="text"
                placeholder="e.g. CS201, BIO110"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white uppercase font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Course Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Data Structures & Algorithms"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Resource Document Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Midterm Comprehensive Study Guide & Formula Cheat Sheet"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="lecture-notes">Lecture Notes</option>
                <option value="past-papers">Past Paper / Soln</option>
                <option value="revision-guides">Revision Guide</option>
                <option value="formula-sheets">Formula Sheet</option>
                <option value="lab-manuals">Lab Manual</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Year Level
              </label>
              <select
                value={yearLevel}
                onChange={(e) => setYearLevel(e.target.value as any)}
                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic Term
              </label>
              <input
                type="text"
                placeholder="e.g. Fall 2026"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Faculty / Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="Computer Science & Engineering">Computer Science & Eng</option>
                <option value="Mathematics & Physical Sciences">Math & Physical Sciences</option>
                <option value="Biological & Health Sciences">Biological & Health</option>
                <option value="Business & Economics">Business & Economics</option>
                <option value="Law & Governance">Law & Governance</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Lecturer / Professor
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Vance"
                value={lecturer}
                onChange={(e) => setLecturer(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Summary Description *
            </label>
            <textarea
              rows={3}
              placeholder="Provide a concise 2-3 sentence overview of what is covered in this resource and how it helps students prepare..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Key Syllabus Topics (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Asymptotic Notation, Red-Black Trees, Dijkstra Algorithm"
              value={keyTopicsInput}
              onChange={(e) => setKeyTopicsInput(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          {/* Upload Dropzone Simulator */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Document File (PDF / DOCX / ZIP)
            </label>
            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mb-1" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {fileName ? `Selected: ${fileName}` : 'Choose PDF file or drag & drop'}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">Maximum file size: 25 MB</span>
              <input type="file" onChange={handleSimulateFileSelect} className="hidden" accept=".pdf,.docx,.zip,.txt" />
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm cursor-pointer"
            >
              Publish to Repository
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
