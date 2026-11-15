import React from 'react';
import { CreditCard, Heart, ArrowUp, Github, Sparkles } from 'lucide-react';
import './Footer.css';

export default function Footer({ onNavigate, onOpenAbout }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand-column">
            <div className="brand-logo">
              <div className="logo-icon-wrapper">
                <CreditCard size={18} className="logo-icon" />
              </div>
              <span className="logo-name">
                Profile<span className="logo-highlight">Craft</span>
              </span>
            </div>
            <p className="footer-tagline">
              Create Your Identity. Design Your Profile.
            </p>
            <p className="footer-subtext">
              A modern, client-side digital identity generator built with React and glassmorphism styling.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-links-column">
              <h5 className="footer-col-title">Navigation</h5>
              <button type="button" className="footer-link-btn" onClick={() => onNavigate('hero')}>
                Home
              </button>
              <button type="button" className="footer-link-btn" onClick={() => onNavigate('create-profile')}>
                Create Profile
              </button>
              <button type="button" className="footer-link-btn" onClick={() => onNavigate('my-profiles')}>
                My Profiles
              </button>
              <button type="button" className="footer-link-btn" onClick={onOpenAbout}>
                About Project
              </button>
            </div>

            <div className="footer-links-column">
              <h5 className="footer-col-title">Features</h5>
              <span className="footer-static-link">Real-time Live Sync</span>
              <span className="footer-static-link">4K PNG Card Export</span>
              <span className="footer-static-link">LocalStorage Backup</span>
              <span className="footer-static-link">4 Glassmorphism Styles</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} ProfileCraft. Built with React, Vite & pure CSS.
          </p>

          <button
            type="button"
            className="scroll-to-top-btn"
            onClick={scrollToTop}
            title="Scroll to Top"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
