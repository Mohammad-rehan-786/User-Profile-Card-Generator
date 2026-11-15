import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  FileText, 
  Mail, 
  MapPin, 
  Image as ImageIcon, 
  Linkedin, 
  Github, 
  Globe, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Palette, 
  Layers,
  AlertCircle
} from 'lucide-react';
import SkillInput from '../SkillInput/SkillInput';
import { CARD_TEMPLATES, ACCENT_THEMES, AVATAR_PRESETS, DEMO_PROFILES } from '../../utils/sampleData';
import { validateProfile } from '../../utils/validation';
import './ProfileForm.css';

export default function ProfileForm({
  formData,
  setFormData,
  onGenerate,
  isEditing = false,
  onCancelEdit = null
}) {
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'appearance'

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    // Clear field-specific error as user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all form fields?')) {
      setFormData({
        fullName: '',
        professionalTitle: '',
        bio: '',
        email: '',
        location: '',
        imageUrl: '',
        skills: [],
        linkedin: '',
        github: '',
        portfolio: '',
        template: 'cyber-glass',
        theme: 'electric-blue'
      });
      setErrors({});
    }
  };

  const handleLoadDemo = () => {
    const demo = DEMO_PROFILES[0];
    setFormData({
      fullName: demo.fullName,
      professionalTitle: demo.professionalTitle,
      bio: demo.bio,
      email: demo.email,
      location: demo.location,
      imageUrl: demo.imageUrl,
      skills: [...demo.skills],
      linkedin: demo.linkedin,
      github: demo.github,
      portfolio: demo.portfolio,
      template: demo.template,
      theme: demo.theme
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateProfile(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      // Auto switch to info tab if errors are there
      setActiveTab('info');
      // Find first error and scroll to it
      const firstErrorKey = Object.keys(validation.errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorKey}"]`);
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }

    setErrors({});
    onGenerate(formData);
  };

  const bioLength = formData.bio ? formData.bio.length : 0;
  const isBioNearLimit = bioLength > 220;
  const isBioOverLimit = bioLength > 250;

  return (
    <div className="profile-form-wrapper glass-panel">
      {/* Form Tabs */}
      <div className="form-tabs-header">
        <button
          type="button"
          className={`form-tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <User size={16} />
          <span>Profile Info</span>
          {Object.keys(errors).length > 0 && <span className="tab-error-indicator" />}
        </button>
        <button
          type="button"
          className={`form-tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
          onClick={() => setActiveTab('appearance')}
        >
          <Palette size={16} />
          <span>Styles & Theme</span>
        </button>
      </div>

      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        {activeTab === 'info' ? (
          <div className="form-tab-content animate-fade-in">
            {/* Quick Demo Loader Pill */}
            <div className="form-quick-actions">
              <span className="quick-action-text">Need inspiration?</span>
              <button
                type="button"
                className="btn-link-action"
                onClick={handleLoadDemo}
              >
                <Sparkles size={14} />
                <span>Fill Sample Profile</span>
              </button>
            </div>

            {/* Field: Full Name (Required) */}
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                <span className="label-text">Full Name</span>
                <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                  placeholder="e.g. Alex Morgan"
                  value={formData.fullName || ''}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  required
                />
              </div>
              {errors.fullName && (
                <div className="field-error-text">
                  <AlertCircle size={13} />
                  <span>{errors.fullName}</span>
                </div>
              )}
            </div>

            {/* Field: Professional Title */}
            <div className="form-group">
              <label htmlFor="professionalTitle" className="form-label">
                <span className="label-text">Professional Title</span>
              </label>
              <div className="input-with-icon">
                <Briefcase size={18} className="input-icon" />
                <input
                  id="professionalTitle"
                  name="professionalTitle"
                  type="text"
                  className={`form-input ${errors.professionalTitle ? 'input-error' : ''}`}
                  placeholder="e.g. Senior Frontend Architect / Product Designer"
                  value={formData.professionalTitle || ''}
                  onChange={(e) => handleChange('professionalTitle', e.target.value)}
                />
              </div>
              {errors.professionalTitle && (
                <div className="field-error-text">
                  <AlertCircle size={13} />
                  <span>{errors.professionalTitle}</span>
                </div>
              )}
            </div>

            {/* Field: Short Bio (With Char Counter) */}
            <div className="form-group">
              <div className="label-with-counter">
                <label htmlFor="bio" className="form-label">
                  <span className="label-text">Short Bio</span>
                </label>
                <span className={`char-counter ${isBioOverLimit ? 'counter-danger' : isBioNearLimit ? 'counter-warning' : ''}`}>
                  {bioLength}/250
                </span>
              </div>
              <div className="textarea-wrapper">
                <FileText size={18} className="textarea-icon" />
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  className={`form-textarea ${errors.bio ? 'input-error' : ''}`}
                  placeholder="Share a short, compelling bio highlighting your core strengths, achievements, and career focus..."
                  value={formData.bio || ''}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  maxLength={260}
                />
              </div>
              {errors.bio && (
                <div className="field-error-text">
                  <AlertCircle size={13} />
                  <span>{errors.bio}</span>
                </div>
              )}
            </div>

            {/* Two Column Row: Email & Location */}
            <div className="form-row-two-col">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <span className="label-text">Email Address</span>
                </label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="alex@domain.com"
                    value={formData.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                {errors.email && (
                  <div className="field-error-text">
                    <AlertCircle size={13} />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="location" className="form-label">
                  <span className="label-text">Location</span>
                </label>
                <div className="input-with-icon">
                  <MapPin size={18} className="input-icon" />
                  <input
                    id="location"
                    name="location"
                    type="text"
                    className="form-input"
                    placeholder="e.g. San Francisco, CA"
                    value={formData.location || ''}
                    onChange={(e) => handleChange('location', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Field: Profile Image URL + Presets */}
            <div className="form-group">
              <label htmlFor="imageUrl" className="form-label">
                <span className="label-text">Profile Image URL</span>
              </label>
              <div className="input-with-icon">
                <ImageIcon size={18} className="input-icon" />
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  className={`form-input ${errors.imageUrl ? 'input-error' : ''}`}
                  placeholder="https://example.com/your-photo.jpg"
                  value={formData.imageUrl || ''}
                  onChange={(e) => handleChange('imageUrl', e.target.value)}
                />
              </div>
              {errors.imageUrl && (
                <div className="field-error-text">
                  <AlertCircle size={13} />
                  <span>{errors.imageUrl}</span>
                </div>
              )}

              {/* Quick Avatar Presets */}
              <div className="avatar-presets-wrapper">
                <span className="presets-label">Or pick a demo photo:</span>
                <div className="preset-buttons-row">
                  {AVATAR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      className={`preset-avatar-btn ${formData.imageUrl === preset.url ? 'active' : ''}`}
                      onClick={() => handleChange('imageUrl', preset.url)}
                      title={`Use ${preset.label}`}
                    >
                      <img src={preset.url} alt={preset.label} className="preset-thumbnail" />
                      <span>{preset.label.split(' ')[0]}</span>
                    </button>
                  ))}
                  {formData.imageUrl && (
                    <button
                      type="button"
                      className="preset-clear-btn"
                      onClick={() => handleChange('imageUrl', '')}
                      title="Clear image (use initials avatar)"
                    >
                      Use Initials
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Field: Skills */}
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Skills & Technologies</span>
              </label>
              <SkillInput
                skills={formData.skills || []}
                onChange={(updatedSkills) => handleChange('skills', updatedSkills)}
              />
            </div>

            {/* Professional Social Links */}
            <div className="form-section-divider">
              <span>Professional Links</span>
            </div>

            <div className="form-group">
              <label htmlFor="linkedin" className="form-label">
                <span className="label-text">LinkedIn Profile</span>
              </label>
              <div className="input-with-icon">
                <Linkedin size={18} className="input-icon" />
                <input
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  className={`form-input ${errors.linkedin ? 'input-error' : ''}`}
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedin || ''}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                />
              </div>
              {errors.linkedin && (
                <div className="field-error-text">
                  <AlertCircle size={13} />
                  <span>{errors.linkedin}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="github" className="form-label">
                <span className="label-text">GitHub Profile</span>
              </label>
              <div className="input-with-icon">
                <Github size={18} className="input-icon" />
                <input
                  id="github"
                  name="github"
                  type="text"
                  className={`form-input ${errors.github ? 'input-error' : ''}`}
                  placeholder="https://github.com/username"
                  value={formData.github || ''}
                  onChange={(e) => handleChange('github', e.target.value)}
                />
              </div>
              {errors.github && (
                <div className="field-error-text">
                  <AlertCircle size={13} />
                  <span>{errors.github}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="portfolio" className="form-label">
                <span className="label-text">Portfolio / Website</span>
              </label>
              <div className="input-with-icon">
                <Globe size={18} className="input-icon" />
                <input
                  id="portfolio"
                  name="portfolio"
                  type="text"
                  className={`form-input ${errors.portfolio ? 'input-error' : ''}`}
                  placeholder="https://yourportfolio.dev"
                  value={formData.portfolio || ''}
                  onChange={(e) => handleChange('portfolio', e.target.value)}
                />
              </div>
              {errors.portfolio && (
                <div className="field-error-text">
                  <AlertCircle size={13} />
                  <span>{errors.portfolio}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Appearance & Styles Tab */
          <div className="form-tab-content animate-fade-in">
            {/* Card Template Picker */}
            <div className="appearance-group">
              <div className="appearance-header">
                <Layers size={18} className="appearance-icon" />
                <div>
                  <h3 className="appearance-title">Card Template</h3>
                  <p className="appearance-sub">Select the visual framework for your profile card</p>
                </div>
              </div>

              <div className="templates-selector-grid">
                {CARD_TEMPLATES.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    className={`template-option-card ${(formData.template || 'cyber-glass') === tmpl.id ? 'active' : ''}`}
                    onClick={() => handleChange('template', tmpl.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleChange('template', tmpl.id);
                      }
                    }}
                  >
                    <div className="template-option-top">
                      <span className="template-name">{tmpl.name}</span>
                      <span className="template-badge">{tmpl.badge}</span>
                    </div>
                    <p className="template-desc">{tmpl.description}</p>
                    <div className="template-radio-circle" />
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Theme Picker */}
            <div className="appearance-group">
              <div className="appearance-header">
                <Palette size={18} className="appearance-icon" />
                <div>
                  <h3 className="appearance-title">Accent Theme</h3>
                  <p className="appearance-sub">Customize glowing accents, badges, and button highlights</p>
                </div>
              </div>

              <div className="themes-selector-grid">
                {ACCENT_THEMES.map((thm) => (
                  <button
                    key={thm.id}
                    type="button"
                    className={`theme-color-button ${(formData.theme || 'electric-blue') === thm.id ? 'active' : ''}`}
                    onClick={() => handleChange('theme', thm.id)}
                  >
                    <span 
                      className="color-swatch-circle"
                      style={{ background: thm.gradient }}
                    />
                    <span className="theme-name">{thm.name}</span>
                    {(formData.theme || 'electric-blue') === thm.id && (
                      <CheckCircle2 size={16} className="theme-check-icon" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Form Actions Footer */}
        <div className="form-actions-footer">
          <div className="actions-left">
            <button
              type="button"
              className="btn btn-secondary btn-clear"
              onClick={handleClear}
              title="Reset all inputs"
            >
              <RotateCcw size={16} />
              <span>Clear Form</span>
            </button>
          </div>

          <div className="actions-right">
            {isEditing && onCancelEdit && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={onCancelEdit}
              >
                Cancel Edit
              </button>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-generate"
            >
              <Sparkles size={18} />
              <span>{isEditing ? 'Update Profile' : 'Generate Profile'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
