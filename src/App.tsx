/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { CalendarSection } from './components/CalendarSection';
import { EventsSection } from './components/EventsSection';
import { StudentToolsSection } from './components/StudentToolsSection';
import { UploadResourceModal } from './components/UploadResourceModal';
import { MyStudyListDrawer } from './components/MyStudyListDrawer';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { Footer } from './components/Footer';
import {
  INITIAL_RESOURCES,
  INITIAL_ANNOUNCEMENTS,
  ResourceItem,
  AnnouncementItem,
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'calendar' | 'events' | 'services'>('overview');
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [announcements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  
  // Bookmarks & RSVPs
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['res-1', 'res-2']);
  const [rsvpdEventIds, setRsvpdEventIds] = useState<string[]>(['ev-1']);

  // Modals & Drawers
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [modalPreviewResource, setModalPreviewResource] = useState<ResourceItem | null>(null);

  // Search & Filters shared with Hero
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Visual Theme (Dark / Light)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cs_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('cs_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('cs_theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(prev => !prev);

  // Bookmark toggle
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // RSVP toggle
  const handleToggleRsvp = (id: string) => {
    setRsvpdEventIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Add contributed resource
  const handleAddResource = (newResource: ResourceItem) => {
    setResources(prev => [newResource, ...prev]);
    // Also auto-select and focus resources tab
    setActiveTab('resources');
  };

  // Direct tab navigation with scroll
  const handleNavigateTab = (tab: string, catFilter?: string) => {
    setActiveTab(tab as any);
    if (catFilter) {
      setCategoryFilter(catFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Search from Hero
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('resources');
  };

  // Filtered saved resources for drawer
  const savedResources = resources.filter(r => bookmarkedIds.includes(r.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(t) => handleNavigateTab(t)}
        savedCount={bookmarkedIds.length}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        isDark={isDark}
        toggleDark={toggleDark}
        onOpenUpload={() => setIsUploadModalOpen(true)}
      />

      <main className="flex-1">
        {/* TAB: OVERVIEW (Homepage with Hero, Urgent Bulletins, and Quick Sections) */}
        {activeTab === 'overview' && (
          <>
            <Hero
              onSearch={handleSearch}
              onNavigateTab={handleNavigateTab}
              onOpenGpaCalc={() => handleNavigateTab('services')}
              totalResourcesCount={resources.length}
            />

            <AnnouncementsSection
              announcements={announcements}
              onNavigateTab={handleNavigateTab}
            />

            <ResourcesSection
              resources={resources}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              onOpenUpload={() => setIsUploadModalOpen(true)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />

            <CalendarSection
              onSelectResourceSearch={(term) => {
                setSearchQuery(term);
                handleNavigateTab('resources');
              }}
            />

            <EventsSection
              rsvpdEventIds={rsvpdEventIds}
              onToggleRsvp={handleToggleRsvp}
            />

            <StudentToolsSection />
          </>
        )}

        {/* TAB: ACADEMIC RESOURCES ONLY */}
        {activeTab === 'resources' && (
          <div className="pt-2">
            <ResourcesSection
              resources={resources}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              onOpenUpload={() => setIsUploadModalOpen(true)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          </div>
        )}

        {/* TAB: ACADEMIC CALENDAR & DEADLINES */}
        {activeTab === 'calendar' && (
          <div className="pt-2">
            <CalendarSection
              onSelectResourceSearch={(term) => {
                setSearchQuery(term);
                handleNavigateTab('resources');
              }}
            />
          </div>
        )}

        {/* TAB: CAMPUS EVENTS */}
        {activeTab === 'events' && (
          <div className="pt-2">
            <EventsSection
              rsvpdEventIds={rsvpdEventIds}
              onToggleRsvp={handleToggleRsvp}
            />
          </div>
        )}

        {/* TAB: STUDENT SERVICES & TOOLS */}
        {activeTab === 'services' && (
          <div className="pt-2">
            <StudentToolsSection />
          </div>
        )}
      </main>

      {/* Study Desk Side Drawer */}
      <MyStudyListDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedResources={savedResources}
        onRemoveBookmark={handleToggleBookmark}
        onPreviewResource={(res) => setModalPreviewResource(res)}
        rsvpdEventIds={rsvpdEventIds}
        onToggleRsvp={handleToggleRsvp}
      />

      {/* Upload / Contribute Modal */}
      <UploadResourceModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddResource={handleAddResource}
      />

      {/* Detail Document Preview Modal (when opened from study desk) */}
      {modalPreviewResource && (
        <ResourceDetailModal
          resource={modalPreviewResource}
          onClose={() => setModalPreviewResource(null)}
          isBookmarked={bookmarkedIds.includes(modalPreviewResource.id)}
          onToggleBookmark={handleToggleBookmark}
          onDownload={(res) => {
            const blob = new Blob([res.summary], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${res.courseCode}_Notes.txt`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        />
      )}

      {/* Footer */}
      <Footer onNavigateTab={handleNavigateTab} />

    </div>
  );
}
