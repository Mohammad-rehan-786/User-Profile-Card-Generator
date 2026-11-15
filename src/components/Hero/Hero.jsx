import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  PlayCircle, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Download,
  Database
} from 'lucide-react';
import ProfileCard from '../ProfileCard/ProfileCard';
import { DEMO_PROFILES } from '../../utils/sampleData';
import './Hero.css';

export default function Hero({ onStartCreating, onLoadDemo }) {
  const showcaseProfile = DEMO_PROFILES[0];

  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        {/* Left Column: Headlines & CTA */}
        <div className="hero-content">
          <div className="badge-pill animate-fade-in">
            <Sparkles size={13} className="hero-badge-sparkle" />
            <span>Next-Gen Profile Card Studio</span>
          </div>

          <h1 className="hero-heading animate-fade-in">
            Create Your <br />
            <span className="hero-gradient-text">Digital Identity</span>
          </h1>

          <p className="hero-subtitle animate-fade-in">
            Build a beautiful professional profile card in seconds. Choose from multiple glassmorphism themes, sync live changes, and export crisp 4K PNGs for resumes, portfolio sites, and social networks.
          </p>

          {/* Action Buttons */}
          <div className="hero-cta-group animate-fade-in">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onStartCreating}
            >
              <span>Create Your Profile</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={onLoadDemo}
            >
              <PlayCircle size={18} />
              <span>View Demo</span>
            </button>
          </div>

          {/* Feature Highlights Pills */}
          <div className="hero-features-list animate-fade-in">
            <div className="hero-feature-item">
              <ShieldCheck size={16} className="feature-icon" />
              <span>100% Client-Side & Private</span>
            </div>
            <div className="hero-feature-item">
              <Database size={16} className="feature-icon" />
              <span>LocalStorage Persistence</span>
            </div>
            <div className="hero-feature-item">
              <Download size={16} className="feature-icon" />
              <span>High-Res PNG Export</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Interactive Preview Card */}
        <div className="hero-preview-column animate-fade-in">
          {/* Floating Feature Badges */}
          <div className="floating-badge badge-top-right">
            <Zap size={14} className="badge-icon-yellow" />
            <span>Real-time Live Sync</span>
          </div>

          <div className="floating-badge badge-bottom-left">
            <Layers size={14} className="badge-icon-blue" />
            <span>4 Premium Templates</span>
          </div>

          {/* The Showcase Card */}
          <div className="hero-card-viewport">
            <ProfileCard profile={showcaseProfile} isPreview={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
