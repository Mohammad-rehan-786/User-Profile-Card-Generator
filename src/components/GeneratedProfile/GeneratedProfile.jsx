import React, { useRef, useState } from 'react';
import { 
  Download, 
  Copy, 
  Edit3, 
  Trash2, 
  PlusCircle, 
  Check, 
  Sparkles,
  Share2,
  Loader2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import ProfileCard from '../ProfileCard/ProfileCard';
import './GeneratedProfile.css';

export default function GeneratedProfile({
  profile,
  onEdit,
  onDelete,
  onCreateNew,
  addToast
}) {
  const cardExportRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!profile) return null;

  // 1. Download as PNG using html2canvas
  const handleDownloadPng = async () => {
    if (!cardExportRef.current) return;

    try {
      setIsExporting(true);
      addToast({
        type: 'info',
        title: 'Rendering Card',
        message: 'Generating high-resolution PNG image...'
      });

      // Wait a tick for any font/image to settle
      await new Promise((resolve) => setTimeout(resolve, 150));

      const canvas = await html2canvas(cardExportRef.current, {
        scale: 2, // 2x retina crisp quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const fileName = `${(profile.fullName || 'profile')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')}-card.png`;

      const downloadLink = document.createElement('a');
      downloadLink.href = image;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      addToast({
        type: 'success',
        title: 'Download Complete',
        message: `Saved as ${fileName}`
      });
    } catch (error) {
      console.error('[ProfileCraft] PNG Export Error:', error);
      addToast({
        type: 'error',
        title: 'Export Failed',
        message: 'Could not export card as image. Check browser image permissions.'
      });
    } finally {
      setIsExporting(false);
    }
  };

  // 2. Copy Profile Information
  const handleCopyDetails = async () => {
    try {
      const skillsStr = (profile.skills && profile.skills.length > 0)
        ? profile.skills.join(', ')
        : 'None specified';

      const textSummary = [
        `=== ${profile.fullName} ===`,
        profile.professionalTitle || '',
        profile.location ? `📍 ${profile.location}` : '',
        profile.email ? `✉️ ${profile.email}` : '',
        '',
        `Bio:`,
        profile.bio || 'N/A',
        '',
        `Core Competencies:`,
        skillsStr,
        '',
        `Links:`,
        profile.linkedin ? `- LinkedIn: ${profile.linkedin}` : '',
        profile.github ? `- GitHub: ${profile.github}` : '',
        profile.portfolio ? `- Portfolio: ${profile.portfolio}` : '',
        '',
        `Generated with ProfileCraft (ProfileCraft – User Profile Card Generator)`
      ].filter(Boolean).join('\n');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textSummary);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textSummary;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

      addToast({
        type: 'success',
        title: 'Copied to Clipboard',
        message: 'Profile details copied in formatted text.'
      });
    } catch (err) {
      console.error('[ProfileCraft] Copy error:', err);
      addToast({
        type: 'error',
        title: 'Copy Failed',
        message: 'Unable to access clipboard.'
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete profile for "${profile.fullName}"?`)) {
      onDelete(profile.id);
      addToast({
        type: 'info',
        title: 'Profile Deleted',
        message: `Profile "${profile.fullName}" has been removed.`
      });
    }
  };

  return (
    <section id="generated-profile-section" className="generated-profile-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="badge-pill">
            <Sparkles size={12} />
            <span>Profile Ready</span>
          </div>
          <h2 className="section-title">Your Digital Identity Card</h2>
          <p className="section-subtitle">
            Export, share, or store your personalized card. High-resolution vector ready.
          </p>
        </div>

        {/* Card Showcase Viewport */}
        <div className="generated-card-showcase">
          <div className="card-container-glow">
            <ProfileCard ref={cardExportRef} profile={profile} />
          </div>
        </div>

        {/* Prominent Action Bar */}
        <div className="card-actions-bar glass-panel animate-fade-in">
          <button
            type="button"
            className="btn btn-primary action-btn-highlight"
            onClick={handleDownloadPng}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 size={18} className="spin-slow" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download size={18} />
                <span>Download as PNG</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCopyDetails}
          >
            {copied ? <Check size={18} className="text-success" /> : <Copy size={18} />}
            <span>{copied ? 'Copied Details!' : 'Copy Profile Info'}</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onEdit(profile)}
          >
            <Edit3 size={18} />
            <span>Edit Profile</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCreateNew}
          >
            <PlusCircle size={18} />
            <span>Create New Profile</span>
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            title="Delete from My Profiles"
          >
            <Trash2 size={18} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </section>
  );
}
