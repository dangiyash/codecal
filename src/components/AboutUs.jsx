import React, { useState } from 'react';
import { User, Globe, Share2, Github, Linkedin, Twitter, Mail, Code, Award, Check } from 'lucide-react';

export default function AboutUs() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'CodeCal | Coding Contests Calendar',
      text: 'Track live & upcoming competitive programming contests from CodeChef, HackerEarth, Topcoder, Codeforces, LeetCode and AtCoder!',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share error:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <div className="about-card">
        <div className="about-header">
          <img 
            src="/avatar-yash.jpg" 
            alt="Yash Avatar" 
            className="author-hero-img"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
            }}
          />
          <div className="author-details">
            <h2>Yash</h2>
            <p style={{ fontWeight: 600, color: 'var(--primary)' }}>Creator & Lead Developer of CodeCal</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Competitive Programmer & Full-Stack Architect</p>
          </div>
        </div>

        <div className="author-bio">
          <p>
            Hello! I am <strong>Yash</strong>, the creator and maintainer of <strong>CodeCal</strong>. 
            CodeCal was built to simplify the lives of competitive programmers, computer science students, and developers around the world 
            by providing a single unified hub for tracking live and upcoming contests, rated rounds, and hackathons across CodeChef, HackerEarth, Topcoder, Codeforces, LeetCode, and AtCoder.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={18} className="text-primary" /> Connect with Me
          </h3>

          <div className="social-grid">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Twitter size={18} />
              <span>Twitter / X</span>
            </a>
            <a href="mailto:yash@example.com" className="social-link">
              <Mail size={18} />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '10px' }}>
          <button 
            className="btn-primary" 
            onClick={handleShare} 
            style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '1rem' }}
          >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Share CodeCal App'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
