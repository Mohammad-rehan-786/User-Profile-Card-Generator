import React, { useState, forwardRef } from 'react';
import { 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe, 
  CheckCircle, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { getInitials, normalizeUrl } from '../../utils/validation';
import './ProfileCard.css';

const ProfileCard = forwardRef(({ profile, className = '', isPreview = false }, ref) => {
  const [imageError, setImageError] = useState(false);

  // Destructure profile data with graceful defaults
  const {
    fullName = 'Your Full Name',
    professionalTitle = 'Professional Title / Role',
    bio = 'Share a short, compelling bio highlighting your passion, expertise, and what drives your work every day.',
    email = '',
    location = '',
    imageUrl = '',
    skills = ['React', 'JavaScript', 'UI/UX Design'],
    linkedin = '',
    github = '',
    portfolio = '',
    template = 'cyber-glass',
    theme = 'electric-blue',
    createdAt = null
  } = profile || {};

  const initials = getInitials(fullName);
  const showFallbackAvatar = !imageUrl || imageError;

  return (
    <div 
      ref={ref} 
      className={`profile-card template-${template} theme-${theme} ${className}`}
      data-template={template}
      data-theme-accent={theme}
    >
      {/* Dynamic Background Effects */}
      <div className="card-ambient-glow" aria-hidden="true" />
      <div className="card-grid-pattern" aria-hidden="true" />

      {/* Card Header & Avatar Section */}
      <div className="card-header-section">
        <div className="card-banner-pattern" aria-hidden="true" />
        
        <div className="avatar-container">
          <div className="avatar-frame">
            {showFallbackAvatar ? (
              <div className="avatar-fallback" aria-label={fullName}>
                <span className="avatar-initials">{initials}</span>
              </div>
            ) : (
              <img
                src={imageUrl}
                alt={fullName}
                className="avatar-image"
                onError={() => setImageError(true)}
                crossOrigin="anonymous"
              />
            )}
            <span className="avatar-status-dot" title="Active / Open to opportunities" />
          </div>
        </div>

        {/* Verification & Pro Tag */}
        <div className="card-badge-row">
          <span className="card-pro-badge">
            <Sparkles size={11} />
            <span>ProfileCraft</span>
          </span>
        </div>
      </div>

      {/* Personal Identity Section */}
      <div className="card-identity-section">
        <div className="card-name-row">
          <h2 className="card-full-name">{fullName || 'Your Name'}</h2>
          <CheckCircle className="verified-icon" size={18} title="Verified Professional" />
        </div>

        <p className="card-professional-title">
          {professionalTitle || 'Software Engineer / Creative Developer'}
        </p>

        {/* Bio */}
        <div className="card-bio-wrapper">
          <p className="card-bio-text">
            {bio || 'Write a brief summary of your skills, achievements, or current focus.'}
          </p>
        </div>

        {/* Contact & Meta Badges (Email & Location) */}
        {(email || location) && (
          <div className="card-meta-row">
            {location && (
              <div className="meta-badge" title={`Location: ${location}`}>
                <MapPin size={14} className="meta-icon" />
                <span className="meta-text">{location}</span>
              </div>
            )}
            {email && (
              <a 
                href={`mailto:${email}`} 
                className="meta-badge meta-link" 
                title={`Email ${email}`}
              >
                <Mail size={14} className="meta-icon" />
                <span className="meta-text">{email}</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Skills Pill Tags Section */}
      {skills && skills.length > 0 && (
        <div className="card-skills-section">
          <div className="skills-section-label">Core Competencies</div>
          <div className="card-skills-grid">
            {skills.map((skill, index) => (
              <span key={`${skill}-${index}`} className="card-skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Professional Links / Social Handles */}
      {(linkedin || github || portfolio) && (
        <div className="card-social-section">
          <div className="social-links-row">
            {linkedin && (
              <a
                href={normalizeUrl(linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn social-linkedin"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
                <span className="social-label">LinkedIn</span>
                <ExternalLink size={12} className="external-indicator" />
              </a>
            )}

            {github && (
              <a
                href={normalizeUrl(github)}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn social-github"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
                <span className="social-label">GitHub</span>
                <ExternalLink size={12} className="external-indicator" />
              </a>
            )}

            {portfolio && (
              <a
                href={normalizeUrl(portfolio)}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn social-portfolio"
                title="Portfolio / Website"
                aria-label="Portfolio / Website"
              >
                <Globe size={18} />
                <span className="social-label">Portfolio</span>
                <ExternalLink size={12} className="external-indicator" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Card Footer */}
      <div className="card-footer-section">
        <span className="card-footer-branding">ProfileCraft Digital ID</span>
        {createdAt && (
          <span className="card-footer-date">
            {new Date(createdAt).toLocaleDateString(undefined, { 
              month: 'short', 
              year: 'numeric' 
            })}
          </span>
        )}
      </div>
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;
