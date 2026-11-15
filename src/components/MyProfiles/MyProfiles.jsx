import React, { useState } from 'react';
import { 
  FolderHeart, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus, 
  Calendar, 
  MapPin, 
  Download,
  Sparkles,
  Inbox
} from 'lucide-react';
import { getInitials } from '../../utils/validation';
import './MyProfiles.css';

export default function MyProfiles({
  profiles = [],
  onSelectProfile,
  onEditProfile,
  onDeleteProfile,
  onLoadDemoProfiles,
  onCreateNew
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTemplate, setFilterTemplate] = useState('all');

  // Filter profiles based on search and template filter
  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch = 
      (profile.fullName && profile.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (profile.professionalTitle && profile.professionalTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (profile.skills && profile.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesTemplate = filterTemplate === 'all' || profile.template === filterTemplate;

    return matchesSearch && matchesTemplate;
  });

  return (
    <section id="my-profiles-section" className="my-profiles-section">
      <div className="my-profiles-container">
        {/* Header */}
        <div className="my-profiles-header">
          <div className="header-left">
            <div className="badge-pill">
              <FolderHeart size={13} />
              <span>LocalStorage Hub</span>
            </div>
            <h2 className="my-profiles-title">My Saved Profiles</h2>
            <p className="my-profiles-sub">
              Manage all generated digital cards stored securely on your browser.
            </p>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onCreateNew}
            >
              <Plus size={16} />
              <span>Create Profile</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        {profiles.length > 0 && (
          <div className="profiles-toolbar glass-panel">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, role, or skill (e.g. React, Engineer)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="filter-stats">
              <span className="stats-pill">
                {filteredProfiles.length} of {profiles.length} profiles
              </span>
            </div>
          </div>
        )}

        {/* Profiles Grid / List */}
        {profiles.length === 0 ? (
          /* Empty State */
          <div className="empty-state-card glass-panel animate-fade-in">
            <div className="empty-state-icon-wrapper">
              <Inbox size={48} className="empty-icon" />
            </div>
            <h3 className="empty-state-title">No Profiles Generated Yet</h3>
            <p className="empty-state-desc">
              Your generated profile cards will be automatically stored in your browser's LocalStorage. Create your first profile or load sample profiles to get started.
            </p>
            <div className="empty-state-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onCreateNew}
              >
                <Plus size={16} />
                <span>Create Your First Profile</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onLoadDemoProfiles}
              >
                <Sparkles size={16} />
                <span>Load Sample Profiles</span>
              </button>
            </div>
          </div>
        ) : filteredProfiles.length === 0 ? (
          /* Search No Match */
          <div className="empty-search-card glass-panel">
            <Search size={32} className="empty-search-icon" />
            <h4>No profiles match "{searchQuery}"</h4>
            <p>Try refining your search keywords or clear filters.</p>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => setSearchQuery('')}
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="profiles-grid">
            {filteredProfiles.map((profile) => (
              <ProfileItemCard
                key={profile.id}
                profile={profile}
                onSelect={() => onSelectProfile(profile)}
                onEdit={() => onEditProfile(profile)}
                onDelete={() => onDeleteProfile(profile.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProfileItemCard({ profile, onSelect, onEdit, onDelete }) {
  const [imgErr, setImgErr] = useState(false);
  const initials = getInitials(profile.fullName);

  return (
    <div className="profile-item-card glass-panel animate-fade-in">
      <div className="item-card-top">
        <div className="item-avatar-box">
          {!profile.imageUrl || imgErr ? (
            <div className="item-avatar-fallback">{initials}</div>
          ) : (
            <img
              src={profile.imageUrl}
              alt={profile.fullName}
              className="item-avatar-img"
              onError={() => setImgErr(true)}
            />
          )}
        </div>

        <div className="item-title-meta">
          <h3 className="item-full-name">{profile.fullName || 'Untitled Profile'}</h3>
          <p className="item-pro-title">{profile.professionalTitle || 'No title set'}</p>
        </div>
      </div>

      {profile.bio && (
        <p className="item-bio-snippet">{profile.bio}</p>
      )}

      {profile.location && (
        <div className="item-location-badge">
          <MapPin size={13} />
          <span>{profile.location}</span>
        </div>
      )}

      {profile.skills && profile.skills.length > 0 && (
        <div className="item-skills-chips">
          {profile.skills.slice(0, 4).map((s, i) => (
            <span key={i} className="item-skill-chip">{s}</span>
          ))}
          {profile.skills.length > 4 && (
            <span className="item-skill-more">+{profile.skills.length - 4}</span>
          )}
        </div>
      )}

      <div className="item-card-footer">
        <div className="item-date">
          <Calendar size={12} />
          <span>
            {profile.createdAt 
              ? new Date(profile.createdAt).toLocaleDateString() 
              : 'Recent'}
          </span>
        </div>

        <div className="item-card-actions">
          <button
            type="button"
            className="btn-action-icon btn-view"
            onClick={onSelect}
            title="View Profile Card"
            aria-label="View Profile Card"
          >
            <Eye size={15} />
            <span>View</span>
          </button>

          <button
            type="button"
            className="btn-action-icon btn-edit"
            onClick={onEdit}
            title="Edit Profile"
            aria-label="Edit Profile"
          >
            <Edit3 size={15} />
            <span>Edit</span>
          </button>

          <button
            type="button"
            className="btn-action-icon btn-delete"
            onClick={onDelete}
            title="Delete Profile"
            aria-label="Delete Profile"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
