import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, RefreshCw, AlertCircle } from 'lucide-react';
import ContestCard from './ContestCard';
import { PLATFORMS } from '../services/contestApi';

export default function ContestList({ contests, bookmarks, onToggleBookmark, onRefresh, isLoading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL'); // ALL, LIVE, UPCOMING, BOOKMARKED
  const [selectedPlatform, setSelectedPlatform] = useState('ALL');
  const [sortBy, setSortBy] = useState('time'); // 'time' | 'name' | 'platform'

  const filteredContests = useMemo(() => {
    return contests.filter(contest => {
      // Search filter
      const matchesSearch = contest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            contest.platform.toLowerCase().includes(searchQuery.toLowerCase());

      // Platform filter
      const matchesPlatform = selectedPlatform === 'ALL' || contest.platform.toLowerCase() === selectedPlatform.toLowerCase();

      // Status filter
      const now = new Date().getTime();
      const start = new Date(contest.startTime).getTime();
      const end = new Date(contest.endTime).getTime();

      let matchesStatus = true;
      if (selectedStatus === 'LIVE') {
        matchesStatus = now >= start && now <= end;
      } else if (selectedStatus === 'UPCOMING') {
        matchesStatus = now < start;
      } else if (selectedStatus === 'BOOKMARKED') {
        matchesStatus = bookmarks.includes(contest.id);
      }

      return matchesSearch && matchesPlatform && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'platform') return a.platform.localeCompare(b.platform);
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
  }, [contests, searchQuery, selectedStatus, selectedPlatform, sortBy, bookmarks]);

  const platformKeys = Object.values(PLATFORMS);

  return (
    <div>
      <div className="feed-controls">
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="search-box" style={{ flex: 1 }}>
            <Search size={18} className="search-icon" />
            <input 
              type="text"
              placeholder="Search contests, hackathons, or platforms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button 
            className="btn-secondary" 
            onClick={onRefresh} 
            disabled={isLoading}
            title="Refresh Contests"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Status Filter Chips */}
        <div className="filter-row">
          <button 
            className={`chip-btn ${selectedStatus === 'ALL' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('ALL')}
          >
            All Contests ({contests.length})
          </button>
          <button 
            className={`chip-btn ${selectedStatus === 'LIVE' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('LIVE')}
          >
            🔴 Live Now
          </button>
          <button 
            className={`chip-btn ${selectedStatus === 'UPCOMING' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('UPCOMING')}
          >
            ⏳ Upcoming
          </button>
          <button 
            className={`chip-btn ${selectedStatus === 'BOOKMARKED' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('BOOKMARKED')}
          >
            ⭐ Saved ({bookmarks.length})
          </button>
        </div>

        {/* Platform Filter Chips */}
        <div className="filter-row" style={{ paddingTop: '2px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Layers size={14} /> Platforms:
          </span>
          <button 
            className={`chip-btn ${selectedPlatform === 'ALL' ? 'active' : ''}`}
            onClick={() => setSelectedPlatform('ALL')}
          >
            All
          </button>
          {platformKeys.map(p => (
            <button 
              key={p.id}
              className={`chip-btn ${selectedPlatform === p.name ? 'active' : ''}`}
              onClick={() => setSelectedPlatform(p.name)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Feed List */}
      <div className="contest-list">
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 12px' }} />
            <p>Fetching latest contests from live servers...</p>
          </div>
        ) : filteredContests.length > 0 ? (
          filteredContests.map(contest => (
            <ContestCard 
              key={contest.id}
              contest={contest}
              isBookmarked={bookmarks.includes(contest.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <AlertCircle size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>No Contests Found</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
              Try adjusting your search query or platform filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
