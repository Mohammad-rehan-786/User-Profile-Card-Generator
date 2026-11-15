import React from 'react';
import { 
  X, 
  Shield, 
  Zap, 
  Layers, 
  Download, 
  Database, 
  Code2, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import './AboutModal.css';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="badge-pill">About ProfileCraft</span>
            <h2 className="modal-heading">Digital Identity Generator</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="modal-body">
          <p className="modal-intro">
            <strong>ProfileCraft</strong> is a 100% backend-less, client-side React web application designed for professionals, engineers, and creators to design, preview, and export high-resolution digital identity cards in seconds.
          </p>

          <div className="modal-features-grid">
            <div className="modal-feature-box">
              <Zap size={22} className="box-icon icon-blue" />
              <h4>Instant Live Synchronization</h4>
              <p>Every keystroke in the form immediately renders into the glassmorphism profile card with zero input delay.</p>
            </div>

            <div className="modal-feature-box">
              <Shield size={22} className="box-icon icon-emerald" />
              <h4>Zero Backend & Absolute Privacy</h4>
              <p>All data stays inside your browser. No external databases, no tracker scripts, and no server telemetry.</p>
            </div>

            <div className="modal-feature-box">
              <Database size={22} className="box-icon icon-purple" />
              <h4>LocalStorage Persistence</h4>
              <p>Save unlimited cards directly to browser LocalStorage. Edit, search, manage, and retrieve your cards anytime.</p>
            </div>

            <div className="modal-feature-box">
              <Download size={22} className="box-icon icon-amber" />
              <h4>High-DPI 4K PNG Export</h4>
              <p>Render pixel-sharp PNG images using client-side canvas capture, ready for LinkedIn, GitHub, or resumes.</p>
            </div>
          </div>

          <div className="tech-stack-overview">
            <h4 className="tech-stack-title">
              <Code2 size={16} />
              <span>Technology Architecture</span>
            </h4>
            <div className="tech-pills">
              <span className="tech-pill">React 18</span>
              <span className="tech-pill">Vite</span>
              <span className="tech-pill">Modular CSS3</span>
              <span className="tech-pill">Lucide Icons</span>
              <span className="tech-pill">html2canvas</span>
              <span className="tech-pill">HTML5 Canvas</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
          >
            Got it, Let's Build!
          </button>
        </div>
      </div>
    </div>
  );
}
