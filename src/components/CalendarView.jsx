import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

export default function CalendarView({ contests, onToggleBookmark, bookmarks }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayContests, setSelectedDayContests] = useState([]);
  const [selectedDateStr, setSelectedDateStr] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDayClick = (dayNum) => {
    const targetDate = new Date(year, month, dayNum);
    const dateStr = targetDate.toDateString();

    const matches = contests.filter(c => {
      const start = new Date(c.startTime);
      return start.getFullYear() === year && start.getMonth() === month && start.getDate() === dayNum;
    });

    setSelectedDayContests(matches);
    setSelectedDateStr(`${monthNames[month]} ${dayNum}, ${year}`);
  };

  const dayCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    dayCells.push(<div key={`empty-${i}`} className="calendar-day-cell" style={{ opacity: 0.3 }} />);
  }

  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
    
    const dayContests = contests.filter(c => {
      const start = new Date(c.startTime);
      return start.getFullYear() === year && start.getMonth() === month && start.getDate() === day;
    });

    dayCells.push(
      <div 
        key={`day-${day}`} 
        className={`calendar-day-cell ${isToday ? 'today' : ''}`}
        onClick={() => handleDayClick(day)}
        style={{ cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="day-number">{day}</span>
          {dayContests.length > 0 && (
            <span style={{ fontSize: '0.65rem', background: 'var(--primary)', color: '#fff', padding: '1px 5px', borderRadius: '99px', fontWeight: 700 }}>
              {dayContests.length}
            </span>
          )}
        </div>
        
        <div>
          {dayContests.slice(0, 2).map((c, idx) => (
            <div 
              key={idx} 
              className="contest-dot" 
              style={{ backgroundColor: c.platform === 'CodeChef' ? '#D7A04A' : c.platform === 'Codeforces' ? '#1E88E5' : '#10b981' }} 
              title={`${c.platform}: ${c.name}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', background: 'var(--bg-card)', padding: '14px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarIcon size={20} className="text-primary" />
          {monthNames[month]} {year}
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-icon" onClick={prevMonth} aria-label="Previous Month">
            <ChevronLeft size={20} />
          </button>
          <button className="btn-icon" onClick={nextMonth} aria-label="Next Month">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
          <div key={i} className="calendar-day-header">{d}</div>
        ))}
        {dayCells}
      </div>

      {selectedDateStr && (
        <div style={{ marginTop: '20px', background: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>
            Contests on {selectedDateStr} ({selectedDayContests.length})
          </h3>
          {selectedDayContests.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedDayContests.map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{c.platform}</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{c.name}</h4>
                  </div>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                    View
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No contests scheduled on this date.</p>
          )}
        </div>
      )}
    </div>
  );
}
