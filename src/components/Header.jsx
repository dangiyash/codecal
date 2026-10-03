import React from 'react';
import { Menu, Calendar, Moon, Sun, Bell, Bookmark } from 'lucide-react';

export default function Header({ onOpenDrawer, theme, onToggleTheme, activeTab, liveCount, bookmarkCount }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="btn-icon" onClick={onOpenDrawer} aria-label="Open Navigation Drawer">
          <Menu size={26} />
        </button>
        <div className="brand-title">
          <Calendar size={22} className="brand-icon" />
          <span>CodeCal</span>
          <span className="brand-badge">by Yash</span>
        </div>
      </div>

      <div className="header-actions">
        {liveCount > 0 && (
          <div className="badge-live" title={`${liveCount} Contests Live Right Now`}>
            <span className="pulse-dot"></span>
            <span>{liveCount} Live</span>
          </div>
        )}

        <button 
          className="btn-icon" 
          onClick={onToggleTheme} 
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
