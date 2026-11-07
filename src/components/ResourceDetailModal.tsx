import React from 'react';
import { X, Download, Bookmark, FileText, Check, Star, ExternalLink } from 'lucide-react';
import { ResourceItem } from '../data/mockData';

interface ResourceDetailModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onDownload: (resource: ResourceItem) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onDownload,
}) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            {/* Unboxed metadata with typographic separators */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2 flex-wrap">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{resource.courseCode}</span>
              <span aria-hidden="true">·</span>
              <span>{resource.courseName}</span>
              <span aria-hidden="true">·</span>
              <span>{resource.term}</span>
              <span aria-hidden="true">·</span>
              <span>{resource.yearLevel}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {resource.title}
            </h2>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Instructor: <span className="font-medium text-slate-700 dark:text-slate-300">{resource.lecturer}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              Department of {resource.department}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* File Quick Specs Strip */}
          <div className="grid grid-cols-4 gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 text-center">
            <div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Format</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{resource.fileType}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Pages</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 tabular-nums">{resource.pages} pgs</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">File Size</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{resource.fileSize}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Student Rating</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 tabular-nums flex items-center justify-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{resource.rating} / 5.0</span>
              </div>
            </div>
          </div>

          {/* Document Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Academic Overview & Purpose
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {resource.summary}
            </p>
          </div>

          {/* Key Syllabus Topics */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Key Examination & Syllabus Topics Covered
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {resource.keyTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Document Sample / Excerpt Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Sample Excerpt & Content Preview
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">Excerpt Pages 1–{resource.previewContent.length}</span>
            </div>
            <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2.5 border border-slate-800">
              <div className="text-slate-400 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>[DOCUMENT PREVIEW: {resource.courseCode}_{resource.category.toUpperCase()}.{resource.fileType.toLowerCase()}]</span>
                <span className="text-emerald-400">VERIFIED OFFICIAL</span>
              </div>
              {resource.previewContent.map((line, idx) => (
                <p key={idx} className="leading-relaxed text-slate-300">
                  {line}
                </p>
              ))}
              <div className="pt-2 text-slate-500 italic text-[11px]">
                ... full content ({resource.pages} pages) available in downloaded document file.
              </div>
            </div>
          </div>

          {/* Academic Integrity Notice */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl text-xs text-amber-800 dark:text-amber-300">
            <span className="font-semibold block mb-0.5">Academic Integrity & Fair Use Notice:</span>
            Materials are compiled for personal revision, exam preparation, and supplementary study under university fair use guidelines. Do not redistribute during active timed examinations.
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => onToggleBookmark(resource.id)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700'
                : 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Saved to Study Desk' : 'Save to Study Desk'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => onDownload(resource)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File ({resource.fileSize})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
