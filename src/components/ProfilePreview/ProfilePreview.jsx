import React from 'react';
import { Eye, Sparkles, RefreshCw } from 'lucide-react';
import ProfileCard from '../ProfileCard/ProfileCard';
import './ProfilePreview.css';

export default function ProfilePreview({ profile, cardRef }) {
  return (
    <div className="profile-preview-wrapper">
      <div className="preview-header">
        <div className="preview-title-group">
          <div className="preview-live-dot" />
          <span className="preview-title">Live Preview</span>
        </div>
        <div className="preview-badges">
          <span className="preview-sync-badge">
            <RefreshCw size={12} className="spin-slow" />
            <span>Real-time Sync</span>
          </span>
        </div>
      </div>

      <div className="preview-card-viewport">
        <ProfileCard 
          ref={cardRef} 
          profile={profile} 
          isPreview={true} 
        />
      </div>

      <div className="preview-footer-hint">
        <Sparkles size={14} className="preview-hint-icon" />
        <span>Cards are rendered vector-sharp and ready for 4K PNG export.</span>
      </div>
    </div>
  );
}
