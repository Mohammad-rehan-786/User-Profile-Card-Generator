import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ProfileForm from './components/ProfileForm/ProfileForm';
import ProfilePreview from './components/ProfilePreview/ProfilePreview';
import GeneratedProfile from './components/GeneratedProfile/GeneratedProfile';
import MyProfiles from './components/MyProfiles/MyProfiles';
import Footer from './components/Footer/Footer';
import AboutModal from './components/AboutModal/AboutModal';
import Toast from './components/Toast/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DEMO_PROFILES } from './utils/sampleData';
import './App.css';

const INITIAL_FORM_STATE = {
  fullName: '',
  professionalTitle: '',
  bio: '',
  email: '',
  location: '',
  imageUrl: '',
  skills: ['React', 'JavaScript', 'UI/UX Design'],
  linkedin: '',
  github: '',
  portfolio: '',
  template: 'cyber-glass',
  theme: 'electric-blue'
};

export default function App() {
  // Theme state (Dark default)
  const [theme, setTheme] = useLocalStorage('profilecraft_theme', 'dark');

  // Stored profiles list (seed with demo profiles on fresh start for immediate richness)
  const [profiles, setProfiles] = useLocalStorage('profilecraft_profiles', DEMO_PROFILES);

  // Active form data being edited/previewed
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // Generated / Selected profile in showcase
  const [generatedProfile, setGeneratedProfile] = useState(null);

  // Edit mode tracking
  const [editingId, setEditingId] = useState(null);

  // About Modal state
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Ref for the live preview card
  const livePreviewRef = useRef(null);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toast Helper
  const addToast = ({ type = 'info', title = '', message = '', duration = 4000 }) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Dark / Light Theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    addToast({
      type: 'info',
      title: 'Theme Changed',
      message: `Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme mode.`
    });
  };

  // Smooth Navigation Handler
  const handleNavigate = (target) => {
    let element = null;
    if (target === 'hero') {
      element = document.getElementById('hero');
    } else if (target === 'create-profile') {
      element = document.getElementById('create-profile-section');
    } else if (target === 'my-profiles') {
      element = document.getElementById('my-profiles-section');
    } else if (target === 'generated-profile') {
      element = document.getElementById('generated-profile-section');
    }

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate or Update Profile Action
  const handleGenerateProfile = (submittedData) => {
    const timestamp = new Date().toISOString();

    if (editingId) {
      // Update existing profile
      const updatedProfile = {
        ...submittedData,
        id: editingId,
        updatedAt: timestamp
      };

      setProfiles((prev) =>
        prev.map((p) => (p.id === editingId ? updatedProfile : p))
      );

      setGeneratedProfile(updatedProfile);
      setEditingId(null);

      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: `Changes saved for "${updatedProfile.fullName}".`
      });
    } else {
      // Create new profile with unique ID
      const newId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `profile_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

      const newProfile = {
        ...submittedData,
        id: newId,
        createdAt: timestamp
      };

      setProfiles((prev) => [newProfile, ...prev]);
      setGeneratedProfile(newProfile);

      addToast({
        type: 'success',
        title: 'Profile Created!',
        message: `Profile card for "${newProfile.fullName}" has been generated and saved.`
      });
    }

    // Scroll smoothly to the generated profile showcase
    setTimeout(() => {
      handleNavigate('generated-profile');
    }, 120);
  };

  // Edit an existing profile
  const handleEditProfile = (profileToEdit) => {
    setFormData({
      fullName: profileToEdit.fullName || '',
      professionalTitle: profileToEdit.professionalTitle || '',
      bio: profileToEdit.bio || '',
      email: profileToEdit.email || '',
      location: profileToEdit.location || '',
      imageUrl: profileToEdit.imageUrl || '',
      skills: profileToEdit.skills ? [...profileToEdit.skills] : [],
      linkedin: profileToEdit.linkedin || '',
      github: profileToEdit.github || '',
      portfolio: profileToEdit.portfolio || '',
      template: profileToEdit.template || 'cyber-glass',
      theme: profileToEdit.theme || 'electric-blue'
    });

    setEditingId(profileToEdit.id);
    handleNavigate('create-profile');

    addToast({
      type: 'info',
      title: 'Editing Mode',
      message: `Loaded profile "${profileToEdit.fullName}". Update fields and click Update Profile.`
    });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(INITIAL_FORM_STATE);
    addToast({
      type: 'info',
      title: 'Edit Cancelled',
      message: 'Returned to blank profile form.'
    });
  };

  // Delete profile from LocalStorage
  const handleDeleteProfile = (profileId) => {
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    if (generatedProfile?.id === profileId) {
      setGeneratedProfile(null);
    }
  };

  // Create new profile (clean form)
  const handleCreateNew = () => {
    setEditingId(null);
    setFormData(INITIAL_FORM_STATE);
    handleNavigate('create-profile');
    const nameInput = document.getElementById('fullName');
    if (nameInput) {
      nameInput.focus();
    }
  };

  // Select profile to view in showcase
  const handleSelectProfile = (profile) => {
    setGeneratedProfile(profile);
    handleNavigate('generated-profile');
  };

  // Load sample demo into form & preview
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
    setEditingId(null);
    handleNavigate('create-profile');
    addToast({
      type: 'success',
      title: 'Demo Loaded',
      message: 'Sample profile loaded into the editor and live preview.'
    });
  };

  // Load demo profiles into LocalStorage
  const handleLoadDemoProfiles = () => {
    setProfiles((prev) => {
      // Append demos that aren't already present by ID
      const nonExistingDemos = DEMO_PROFILES.filter(
        (demo) => !prev.some((p) => p.id === demo.id)
      );
      return [...nonExistingDemos, ...prev];
    });
    addToast({
      type: 'success',
      title: 'Sample Profiles Added',
      message: 'Sample cards are now accessible in My Profiles.'
    });
  };

  return (
    <div className="app-layout">
      {/* Navigation Bar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        profilesCount={profiles.length}
        onNavigate={handleNavigate}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      <main className="main-content">
        {/* Hero Section */}
        <Hero
          onStartCreating={() => handleNavigate('create-profile')}
          onLoadDemo={handleLoadDemo}
        />

        {/* Profile Creation Studio (Form + Live Preview Two-Column Section) */}
        <section id="create-profile-section" className="generator-studio-section">
          <div className="studio-container">
            {/* Section Header */}
            <div className="studio-header">
              <span className="badge-pill">Card Studio</span>
              <h2 className="studio-title">
                {editingId ? 'Edit Your Profile Card' : 'Design Your Profile Card'}
              </h2>
              <p className="studio-subtitle">
                Enter your professional details below. Watch your card materialize in real-time in the live preview.
              </p>
            </div>

            {/* Desktop Two-Column / Mobile Stacked Grid */}
            <div className="studio-workspace-grid">
              {/* Left Column: Profile Creation Form */}
              <div className="studio-form-column">
                <ProfileForm
                  formData={formData}
                  setFormData={setFormData}
                  onGenerate={handleGenerateProfile}
                  isEditing={!!editingId}
                  onCancelEdit={handleCancelEdit}
                />
              </div>

              {/* Right Column: Live Profile Preview (Sticky on desktop) */}
              <div className="studio-preview-column">
                <ProfilePreview
                  profile={formData}
                  cardRef={livePreviewRef}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Generated Profile Section (Displayed when a card is generated or selected) */}
        {generatedProfile && (
          <GeneratedProfile
            profile={generatedProfile}
            onEdit={handleEditProfile}
            onDelete={handleDeleteProfile}
            onCreateNew={handleCreateNew}
            addToast={addToast}
          />
        )}

        {/* My Profiles Section (LocalStorage Data Hub) */}
        <MyProfiles
          profiles={profiles}
          onSelectProfile={handleSelectProfile}
          onEditProfile={handleEditProfile}
          onDeleteProfile={handleDeleteProfile}
          onLoadDemoProfiles={handleLoadDemoProfiles}
          onCreateNew={handleCreateNew}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Global Toast Notification System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
