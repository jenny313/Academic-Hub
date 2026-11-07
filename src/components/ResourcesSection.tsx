import React, { useState, useMemo } from 'react';
import { Search, Download, Bookmark, Eye, Filter, Sparkles, BookOpen, FileCheck, Layers, Share2, Check } from 'lucide-react';
import { ResourceItem } from '../data/mockData';
import { ResourceDetailModal } from './ResourceDetailModal';
import studyDeskImg from '../assets/images/academic_study_desk_1794039638685.jpg';

interface ResourcesSectionProps {
  resources: ResourceItem[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onOpenUpload: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  resources,
  bookmarkedIds,
  onToggleBookmark,
  onOpenUpload,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
}) => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [sortBy, setSortBy] = useState<'downloads' | 'rating' | 'alphabetical'>('downloads');
  const [previewResource, setPreviewResource] = useState<ResourceItem | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const departments = [
    'All',
    'Computer Science & Engineering',
    'Mathematics & Physical Sciences',
    'Biological & Health Sciences',
    'Business & Economics',
    'Law & Governance'
  ];

  const yearLevels = ['All', 'Year 1', 'Year 2', 'Year 3', 'Year 4'];

  const categoryTabs = [
    { id: 'all', label: 'All Resources' },
    { id: 'lecture-notes', label: 'Lecture Notes' },
    { id: 'past-papers', label: 'Past Papers & Solutions' },
    { id: 'revision-guides', label: 'Revision Guides' },
    { id: 'formula-sheets', label: 'Formula Sheets' },
    { id: 'lab-manuals', label: 'Lab Manuals' }
  ];

  // Filtering logic
  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      // Category match
      if (categoryFilter !== 'all' && res.category !== categoryFilter) return false;

      // Department match
      if (selectedDept !== 'All' && res.department !== selectedDept) return false;

      // Year match
      if (selectedYear !== 'All' && res.yearLevel !== selectedYear) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesCode = res.courseCode.toLowerCase().includes(q);
        const matchesName = res.courseName.toLowerCase().includes(q);
        const matchesTitle = res.title.toLowerCase().includes(q);
        const matchesLecturer = res.lecturer.toLowerCase().includes(q);
        const matchesTopic = res.keyTopics.some(t => t.toLowerCase().includes(q));
        if (!matchesCode && !matchesName && !matchesTitle && !matchesLecturer && !matchesTopic) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'downloads') return b.downloadsCount - a.downloadsCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.courseCode.localeCompare(b.courseCode);
    });
  }, [resources, categoryFilter, selectedDept, selectedYear, searchQuery, sortBy]);

  // Real simulated file download
  const handleDownload = (resource: ResourceItem) => {
    const fileContent = `========================================================
CAMPUSSPHERE ACADEMIC RESOURCE ARCHIVE
Course: ${resource.courseCode} - ${resource.courseName}
Title: ${resource.title}
Faculty: ${resource.department} (${resource.yearLevel})
Term: ${resource.term} | Instructor: ${resource.lecturer}
========================================================

DOCUMENT OVERVIEW:
${resource.summary}

KEY EXAMINATION TOPICS:
${resource.keyTopics.map((topic, i) => `  ${i + 1}. ${topic}`).join('\n')}

SAMPLE STUDY NOTES & EXCERPTS:
${resource.previewContent.map((line, i) => `[Section ${i + 1}] ${line}`).join('\n\n')}

--------------------------------------------------------
Downloaded on: ${new Date().toLocaleDateString()}
CampusSphere Academic Repository - For Student Educational Use Only.
========================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource.courseCode}_${resource.category}_${resource.term.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessToast(`Downloaded: ${resource.courseCode} - ${resource.title}`);
    setTimeout(() => setDownloadSuccessToast(null), 4000);
  };

  const handleShare = (resource: ResourceItem) => {
    const textToCopy = `Check out ${resource.courseCode} (${resource.title}) on CampusSphere!`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(resource.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="resources" className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Academic Repository</span>
              <span aria-hidden="true">·</span>
              <span>Peer-Reviewed Materials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Lecture Notes, Past Papers & Revision Kits
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Browse course packs, official exam marking rubrics, and high-yield revision summaries across all university faculties.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenUpload}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contribute Notes</span>
            </button>
          </div>
        </div>

        {/* Filter Bar: Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto scrollbar-none mb-6">
          {categoryTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                categoryFilter === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Multi-Dimensional Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 mb-8">
          
          {/* Search Input */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Filter by keyword or code
            </label>
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. CS201, Algorithms..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Department Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Academic Faculty / Department
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Year Level Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Year Level
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {yearLevels.map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>

          {/* Sort By Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Sort Order
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="downloads">Most Downloaded</option>
              <option value="rating">Highest Rated by Students</option>
              <option value="alphabetical">Course Code (A–Z)</option>
            </select>
          </div>

        </div>

        {/* Download Feedback Notification */}
        {downloadSuccessToast && (
          <div className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 rounded-xl flex items-center justify-between animate-in fade-in">
            <span className="font-medium flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {downloadSuccessToast}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Saved to browser downloads</span>
          </div>
        )}

        {/* Results Count & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            Showing <span className="font-bold text-slate-900 dark:text-white tabular-nums">{filteredResources.length}</span> academic resources
            {selectedDept !== 'All' && ` · ${selectedDept}`}
            {selectedYear !== 'All' && ` · ${selectedYear}`}
          </div>
          {(selectedDept !== 'All' || selectedYear !== 'All' || searchQuery !== '' || categoryFilter !== 'all') && (
            <button
              onClick={() => {
                setSelectedDept('All');
                setSelectedYear('All');
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No matching resources found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your course code search or resetting department and year level filters.
            </p>
            <button
              onClick={() => {
                setSelectedDept('All');
                setSelectedYear('All');
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
            >
              View All Resources
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => {
              const isBookmarked = bookmarkedIds.includes(resource.id);

              return (
                <div
                  key={resource.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Unboxed Metadata Header (NO PILLS) */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                      <div className="flex items-center gap-1.5 font-medium flex-wrap">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">{resource.courseCode}</span>
                        <span aria-hidden="true">·</span>
                        <span>{resource.yearLevel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{resource.term}</span>
                      </div>
                      <span className="tabular-nums font-mono text-[11px] text-slate-400">{resource.fileSize}</span>
                    </div>

                    {/* Resource Title */}
                    <h3
                      onClick={() => setPreviewResource(resource)}
                      className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-2"
                    >
                      {resource.title}
                    </h3>

                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                      {resource.courseName} · {resource.lecturer}
                    </div>

                    {/* Summary text */}
                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {resource.summary}
                    </p>

                    {/* Key Topics List (Unboxed subtle text list) */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                        Core Syllabus Topics:
                      </div>
                      <div className="flex flex-wrap gap-1 text-xs text-slate-600 dark:text-slate-300">
                        {resource.keyTopics.slice(0, 3).map((topic, idx) => (
                          <span key={idx} className="inline-flex items-center text-[11px]">
                            {idx > 0 && <span className="mx-1 text-slate-400" aria-hidden="true">/</span>}
                            <span>{topic}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    
                    {/* Left: Quick metadata info */}
                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <span className="tabular-nums font-mono">{resource.downloadsCount.toLocaleString()} dl</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums font-mono">{resource.pages} pgs</span>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleShare(resource)}
                        title="Copy share link"
                        aria-label="Share resource"
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        {copiedId === resource.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => onToggleBookmark(resource.id)}
                        title={isBookmarked ? 'Remove from Study Desk' : 'Bookmark resource'}
                        aria-label="Bookmark resource"
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                            : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => setPreviewResource(resource)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => handleDownload(resource)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-xs active:scale-95"
                      >
                        <Download className="w-3 h-3" />
                        <span>Get</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Editorial Study Guide Spotlight Banner with Generated Visual */}
        <div className="mt-14 p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 rounded-xl overflow-hidden aspect-4/3 max-h-56 bg-slate-200 dark:bg-slate-700 shadow-xs">
            <img
              src={studyDeskImg}
              alt="Student study desk with revision notebook and laptop"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:col-span-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                Student Revision Strategy Guide
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                How to Maximize Past Paper Revisions for Midterms
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Cognitive psychology studies demonstrate that testing yourself under simulated exam conditions beats passive re-reading by 3.5×. Download past papers at least two weeks before your exam date and log every missed problem into an error review notebook.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <button
                onClick={() => setCategoryFilter('past-papers')}
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                View all Past Papers with Solutions →
              </button>
            </div>
          </div>
        </div>

        {/* Document Detail Preview Modal */}
        <ResourceDetailModal
          resource={previewResource}
          onClose={() => setPreviewResource(null)}
          isBookmarked={previewResource ? bookmarkedIds.includes(previewResource.id) : false}
          onToggleBookmark={onToggleBookmark}
          onDownload={handleDownload}
        />

      </div>
    </section>
  );
};
