import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Download, Bookmark, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { PLATFORMS, downloadIcsFile, getGoogleCalendarUrl } from '../services/contestApi';

export default function ContestCard({ contest, isBookmarked, onToggleBookmark }) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [status, setStatus] = useState('UPCOMING'); // LIVE, UPCOMING, ENDED

  const platformInfo = Object.values(PLATFORMS).find(p => p.name === contest.platform) || {
    name: contest.platform,
    color: '#3b82f6',
    email: contest.email
  };

  useEffect(() => {
    function calculateTime() {
      const now = new Date().getTime();
      const start = new Date(contest.startTime).getTime();
      const end = new Date(contest.endTime).getTime();

      if (now >= start && now <= end) {
        setStatus('LIVE');
        const diff = end - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(`Ends in ${hours}h ${mins}m ${secs}s`);
      } else if (now < start) {
        setStatus('UPCOMING');
        const diff = start - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeRemaining(`Starts in ${days}d ${hours}h`);
        } else {
          setTimeRemaining(`Starts in ${hours}h ${mins}m ${secs}s`);
        }
      } else {
        setStatus('ENDED');
        setTimeRemaining('Contest Ended');
      }
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [contest.startTime, contest.endTime]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDurationString = () => {
    const start = new Date(contest.startTime).getTime();
    const end = new Date(contest.endTime).getTime();
    const durationHours = ((end - start) / (1000 * 60 * 60)).toFixed(1);
    return `${durationHours} hrs`;
  };

  return (
    <div className={`contest-card ${status === 'LIVE' ? 'live-border' : ''}`}>
      <div 
        className="contest-logo-box" 
        style={{ borderColor: platformInfo.color, backgroundColor: platformInfo.badgeBg || 'var(--bg-main)' }}
      >
        <span style={{ color: platformInfo.color, fontWeight: 700 }}>
          {contest.platform.substring(0, 2).toUpperCase()}
        </span>
      </div>

      <div className="contest-info">
        <div className="card-header-line">
          <div>
            <span 
              style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                color: platformInfo.color, 
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {contest.platform}
            </span>
            <h3 className="contest-title">{contest.name}</h3>
          </div>

          <button 
            className="btn-icon" 
            onClick={() => onToggleBookmark(contest.id)}
            title={isBookmarked ? 'Remove Bookmark' : 'Save Contest'}
            style={{ color: isBookmarked ? '#f59e0b' : 'var(--text-muted)' }}
          >
            <Bookmark size={20} fill={isBookmarked ? '#f59e0b' : 'none'} />
          </button>
        </div>

        <div className="meta-row">
          {status === 'LIVE' && (
            <div className="badge-live">
              <span className="pulse-dot"></span>
              <span>LIVE NOW</span>
            </div>
          )}

          {status === 'UPCOMING' && (
            <div className="badge-upcoming">
              <span>UPCOMING</span>
            </div>
          )}

          {status === 'ENDED' && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              PASSED
            </div>
          )}

          <div className="countdown-box">
            <Clock size={14} />
            <span>{timeRemaining}</span>
          </div>

          <div className="meta-item">
            <Calendar size={14} />
            <span>{formatDate(contest.startTime)}</span>
          </div>

          <div className="meta-item">
            <span>Duration: {getDurationString()}</span>
          </div>
        </div>

        <div className="card-actions">
          <div className="action-btns-left">
            <button 
              className="btn-secondary" 
              onClick={() => window.open(getGoogleCalendarUrl(contest), '_blank')}
              title="Add to Google Calendar"
            >
              <Calendar size={14} />
              <span>G-Cal</span>
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => downloadIcsFile(contest)}
              title="Download iCal (.ics) Event"
            >
              <Download size={14} />
              <span>.ICS</span>
            </button>
          </div>

          <a 
            href={contest.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
          >
            <span>Enter Contest</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
