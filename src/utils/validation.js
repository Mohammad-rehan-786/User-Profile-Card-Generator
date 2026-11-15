/**
 * Validation utilities for ProfileCraft
 */

export const isValidEmail = (email) => {
  if (!email || !email.trim()) return true; // Optional field
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email.trim());
};

export const isValidUrl = (url) => {
  if (!url || !url.trim()) return true; // Optional field
  const trimmed = url.trim();
  // Allow data URIs or http/https URLs
  if (trimmed.startsWith('data:image/')) return true;
  try {
    const parsed = new URL(trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const normalizeUrl = (url) => {
  if (!url || !url.trim()) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export const validateProfile = (profile) => {
  const errors = {};

  // Full Name is strictly required
  if (!profile.fullName || !profile.fullName.trim()) {
    errors.fullName = 'Full Name is required.';
  } else if (profile.fullName.trim().length < 2) {
    errors.fullName = 'Full Name must be at least 2 characters.';
  } else if (profile.fullName.trim().length > 50) {
    errors.fullName = 'Full Name must be under 50 characters.';
  }

  // Professional Title
  if (profile.professionalTitle && profile.professionalTitle.trim().length > 60) {
    errors.professionalTitle = 'Title cannot exceed 60 characters.';
  }

  // Bio character limit (maximum 250 characters)
  if (profile.bio && profile.bio.length > 250) {
    errors.bio = `Bio exceeds 250 characters (${profile.bio.length}/250).`;
  }

  // Email format check
  if (profile.email && !isValidEmail(profile.email)) {
    errors.email = 'Please provide a valid email address (e.g. name@domain.com).';
  }

  // Image URL check
  if (profile.imageUrl && !isValidUrl(profile.imageUrl)) {
    errors.imageUrl = 'Please provide a valid image URL or image link.';
  }

  // LinkedIn check
  if (profile.linkedin && !isValidUrl(profile.linkedin)) {
    errors.linkedin = 'Please enter a valid LinkedIn URL.';
  }

  // GitHub check
  if (profile.github && !isValidUrl(profile.github)) {
    errors.github = 'Please enter a valid GitHub URL.';
  }

  // Portfolio check
  if (profile.portfolio && !isValidUrl(profile.portfolio)) {
    errors.portfolio = 'Please enter a valid website/portfolio URL.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Generates an SVG or URL for initials fallback avatar
 */
export const getInitials = (name) => {
  if (!name || !name.trim()) return 'PC';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
