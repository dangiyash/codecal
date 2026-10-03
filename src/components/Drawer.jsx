import React from 'react';
import { Home, Bookmark, Calendar as CalendarIcon, Layers, User, Settings, X, ExternalLink } from 'lucide-react';

export default function Drawer({ isOpen, onClose, activeTab, onSelectTab, theme }) {
  const menuItems = [
    { id: 'home', label: 'Contest Feed', icon: Home },
    { id: 'bookmarks', label: 'Saved Contests', icon: Bookmark },
    { id: 'calendar', label: 'Calendar Grid', icon: CalendarIcon },
    { id: 'platforms', label: 'Platforms Directory', icon: Layers },
    { id: 'about', label: 'About Author', icon: User },
    { id: 'settings', label: 'App Settings', icon: Settings },
  ];

  return (
    <>
      <div 
        className={`drawer-backdrop ${isOpen ? 'active' : ''}`} 
        onClick={onClose} 
      />
      
      <aside className={`drawer-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.8 }}>
              CodeCal Navigation
            </span>
            <button className="btn-icon" onClick={onClose} style={{ color: '#fff' }}>
              <X size={20} />
            </button>
          </div>

          <div className="drawer-user-card" onClick={() => { onSelectTab('about'); onClose(); }} style={{ cursor: 'pointer' }}>
            <img 
              src="/avatar-yash.jpg" 
              alt="Yash Avatar" 
              className="user-avatar"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
              }}
            />
            <div className="user-info">
              <h3>Yash</h3>
              <p>Author & Lead Developer</p>
            </div>
          </div>
        </div>

        <nav className="drawer-menu">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`drawer-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="drawer-footer">
          <span>CodeCal v2.0.0</span>
          <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Authored by Yash</span>
        </div>
      </aside>
    </>
  );
}
