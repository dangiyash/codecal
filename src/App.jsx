import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import ContestList from './components/ContestList';
import CalendarView from './components/CalendarView';
import PlatformsView from './components/PlatformsView';
import AboutUs from './components/AboutUs';
import SettingsView from './components/SettingsView';
import AdMobBanner from './components/AdMobBanner';
import { fetchLiveContests } from './services/contestApi';

export default function App() {
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('codecal_theme') || 'dark';
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('codecal_bookmarks');
    return saved ? JSON.parse(saved) : ['cc-starters-150', 'cf-div2-980'];
  });

  const [showAd, setShowAd] = useState(() => {
    const saved = localStorage.getItem('codecal_show_ad');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('codecal_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('codecal_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('codecal_show_ad', JSON.stringify(showAd));
  }, [showAd]);

  const loadContestsData = async () => {
    setIsLoading(true);
    const data = await fetchLiveContests();
    setContests(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadContestsData();
  }, []);

  const toggleBookmark = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Count live contests
  const liveCount = contests.filter(c => {
    const now = new Date().getTime();
    const start = new Date(c.startTime).getTime();
    const end = new Date(c.endTime).getTime();
    return now >= start && now <= end;
  }).length;

  return (
    <div className="app-container">
      <Header 
        onOpenDrawer={() => setIsDrawerOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        activeTab={activeTab}
        liveCount={liveCount}
        bookmarkCount={bookmarks.length}
      />

      <Drawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
        theme={theme}
      />

      <main className="app-body">
        {activeTab === 'home' && (
          <ContestList 
            contests={contests}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onRefresh={loadContestsData}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'bookmarks' && (
          <ContestList 
            contests={contests.filter(c => bookmarks.includes(c.id))}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onRefresh={loadContestsData}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView 
            contests={contests}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {activeTab === 'platforms' && (
          <PlatformsView 
            contests={contests}
          />
        )}

        {activeTab === 'about' && (
          <AboutUs />
        )}

        {activeTab === 'settings' && (
          <SettingsView 
            theme={theme}
            onToggleTheme={toggleTheme}
            showAd={showAd}
            onToggleAd={() => setShowAd(!showAd)}
            onClearBookmarks={clearBookmarks}
            bookmarkCount={bookmarks.length}
          />
        )}
      </main>

      <AdMobBanner visible={showAd} onClose={() => setShowAd(false)} />
    </div>
  );
}
