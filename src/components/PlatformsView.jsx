import React from 'react';
import { ExternalLink, Layers, CheckCircle } from 'lucide-react';
import { PLATFORMS } from '../services/contestApi';

export default function PlatformsView({ contests }) {
  const platformsList = Object.values(PLATFORMS);

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Layers size={24} className="text-primary" />
          Supported Coding Platforms
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
          CodeCal automatically syncs live contest schedules from the top competitive programming ecosystems.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {platformsList.map(platform => {
          const platformContests = contests.filter(c => c.platform.toLowerCase() === platform.name.toLowerCase());
          const liveNowCount = platformContests.filter(c => {
            const now = new Date().getTime();
            const start = new Date(c.startTime).getTime();
            const end = new Date(c.endTime).getTime();
            return now >= start && now <= end;
          }).length;

          return (
            <div 
              key={platform.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div 
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      background: platform.badgeBg,
                      color: platform.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.1rem'
                    }}
                  >
                    {platform.name.substring(0, 2).toUpperCase()}
                  </div>
                  {liveNowCount > 0 && (
                    <span className="badge-live">
                      <span className="pulse-dot"></span> {liveNowCount} Live
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{platform.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Active Contests Tracked: <strong style={{ color: 'var(--primary)' }}>{platformContests.length}</strong>
                </p>
              </div>

              <a 
                href={platform.officialUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ justifyContent: 'center' }}
              >
                <span>Visit Official Platform</span>
                <ExternalLink size={14} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
