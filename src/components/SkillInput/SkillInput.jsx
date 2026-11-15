import React, { useState } from 'react';
import { Plus, X, Sparkles, AlertCircle } from 'lucide-react';
import { SUGGESTED_SKILLS } from '../../utils/sampleData';
import './SkillInput.css';

export default function SkillInput({ skills = [], onChange }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || inputValue).trim();
    if (!trimmed) return;

    // Check duplicate (case-insensitive)
    const exists = skills.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      setError(`"${trimmed}" is already added.`);
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (skills.length >= 15) {
      setError('Maximum 15 skills allowed.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const updated = [...skills, trimmed];
    onChange(updated);
    setInputValue('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    onChange(updated);
  };

  // Filter suggested skills that aren't already added
  const availableSuggestions = SUGGESTED_SKILLS.filter(
    (suggested) => !skills.some((s) => s.toLowerCase() === suggested.toLowerCase())
  ).slice(0, 8);

  return (
    <div className="skill-input-container">
      <div className="skill-field-wrapper">
        <div className="skill-input-box">
          <input
            type="text"
            className="skill-text-input"
            placeholder="Type skill & press Enter (e.g. React, UI/UX, Python)"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="btn btn-sm btn-primary skill-add-btn"
            onClick={() => handleAddSkill()}
            disabled={!inputValue.trim()}
            aria-label="Add skill"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>

        {error && (
          <div className="skill-error-message">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Active Skills Tag List */}
      <div className="skills-tags-list">
        {skills.length === 0 ? (
          <div className="skills-empty-hint">
            <span>No skills added yet. Select from quick suggestions below or type above.</span>
          </div>
        ) : (
          skills.map((skill, index) => (
            <span key={`${skill}-${index}`} className="skill-tag-pill animate-fade-in">
              <span className="skill-tag-name">{skill}</span>
              <button
                type="button"
                className="skill-remove-btn"
                onClick={() => handleRemoveSkill(skill)}
                aria-label={`Remove ${skill}`}
                title={`Remove ${skill}`}
              >
                <X size={13} />
              </button>
            </span>
          ))
        )}
      </div>

      {/* Quick Suggestions */}
      {availableSuggestions.length > 0 && (
        <div className="skill-suggestions-wrapper">
          <div className="suggestions-header">
            <Sparkles size={13} className="sparkle-icon" />
            <span>Quick Suggestions:</span>
          </div>
          <div className="suggestions-chips">
            {availableSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="suggestion-chip"
                onClick={() => handleAddSkill(suggestion)}
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
