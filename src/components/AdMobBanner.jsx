import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

export default function AdMobBanner({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="admob-container">
      <div className="ad-text">
        <span className="ad-badge">AD</span>
        <span>🔥 Join CodeChef Starters & Codeforces Round this weekend!</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <a 
          href="https://codeforces.com/contests" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#60a5fa', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}
        >
          <span>Practice Now</span>
          <ExternalLink size={12} />
        </a>
        <button className="ad-close" onClick={onClose} aria-label="Close Ad Banner">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
