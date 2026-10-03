import React from 'react';
import { Settings as SettingsIcon, Moon, Sun, Monitor, Trash2, Bell } from 'lucide-react';

export default function SettingsView({ theme, onToggleTheme, showAd, onToggleAd, onClearBookmarks, bookmarkCount }) {
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SettingsIcon size={24} className="text-primary" />
          Settings & Preferences
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
          Customize your CodeCal app experience.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Theme Mode</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Toggle between Light and Slate Dark visual themes</p>
          </div>
          <button className="btn-secondary" onClick={onToggleTheme}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>AdMob Banner Simulation</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Show or hide the bottom ad banner bar (as in original CodeCal)</p>
          </div>
          <input 
            type="checkbox" 
            checked={showAd} 
            onChange={onToggleAd}
            style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--primary)' }}
          />
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Saved Contests</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>You currently have {bookmarkCount} bookmarked contest(s)</p>
          </div>
          <button 
            className="btn-secondary" 
            onClick={onClearBookmarks} 
            disabled={bookmarkCount === 0}
            style={{ color: bookmarkCount > 0 ? '#ef4444' : 'var(--text-muted)' }}
          >
            <Trash2 size={16} />
            <span>Clear Saved</span>
          </button>
        </div>
      </div>
    </div>
  );
}
