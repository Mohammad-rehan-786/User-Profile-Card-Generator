import React, { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  PlusCircle, 
  FolderHeart, 
  Info,
  CreditCard
} from 'lucide-react';
import './Navbar.css';

export default function Navbar({
  theme,
  toggleTheme,
  profilesCount = 0,
  onNavigate,
  onOpenAbout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          className="brand-logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
        >
          <div className="logo-icon-wrapper">
            <CreditCard size={20} className="logo-icon" />
          </div>
          <div className="logo-text-group">
            <span className="logo-name">
              Profile<span className="logo-highlight">Craft</span>
            </span>
            <span className="logo-badge">PRO</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => handleNavClick('hero')}
          >
            Home
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => handleNavClick('create-profile')}
          >
            Create Profile
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => handleNavClick('my-profiles')}
          >
            <span>My Profiles</span>
            {profilesCount > 0 && (
              <span className="nav-badge-count">{profilesCount}</span>
            )}
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
          >
            About
          </button>
        </nav>

        {/* Actions (Theme Toggle & CTA) */}
        <div className="navbar-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={19} className="theme-icon sun-icon" />
            ) : (
              <Moon size={19} className="theme-icon moon-icon" />
            )}
          </button>

          {/* Create CTA Button */}
          <button
            type="button"
            className="btn btn-primary btn-sm nav-cta-btn"
            onClick={() => handleNavClick('create-profile')}
          >
            <PlusCircle size={15} />
            <span>New Card</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <nav className="mobile-nav-links">
            <button
              type="button"
              className="mobile-link"
              onClick={() => handleNavClick('hero')}
            >
              Home
            </button>
            <button
              type="button"
              className="mobile-link"
              onClick={() => handleNavClick('create-profile')}
            >
              Create Profile
            </button>
            <button
              type="button"
              className="mobile-link"
              onClick={() => handleNavClick('my-profiles')}
            >
              <div className="mobile-link-badge-row">
                <span>My Profiles</span>
                {profilesCount > 0 && (
                  <span className="nav-badge-count">{profilesCount}</span>
                )}
              </div>
            </button>
            <button
              type="button"
              className="mobile-link"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
            >
              About ProfileCraft
            </button>
          </nav>

          <div className="mobile-drawer-footer">
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => handleNavClick('create-profile')}
            >
              <PlusCircle size={16} />
              <span>Generate Profile Card</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
