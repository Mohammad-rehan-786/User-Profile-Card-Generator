# ProfileCraft – Premium User Profile Card Generator

> **Create Your Identity. Design Your Profile.**

ProfileCraft is a modern, responsive, 100% backend-less web application engineered with React.js, Vite, and modular CSS. It allows developers, designers, and tech professionals to design, preview in real time, and export high-resolution digital identity profile cards in seconds.

---

## 🌟 Key Highlights

- **100% Client-Side & Backend-Less**: Zero Node.js/Express server or external databases required. All state logic and persistence are managed purely via React hooks and browser `LocalStorage`.
- **Pure Modular CSS**: Built from scratch using native CSS variables, glassmorphism filters, responsive grid/flexbox layouts, and zero Tailwind or CSS-in-JS bloat.
- **Real-Time Live Synchronization**: Form inputs immediately reflect on the live profile card with instantaneous visual feedback.
- **High-DPI 4K PNG Export**: Export clean, vector-sharp PNG profile cards via `html2canvas` with retina 2x scaling.
- **Multiple Design Templates & Themes**:
  - **Templates**: *Cyber Glass*, *Clean Minimalist*, *Executive Dark*, *Aurora Glow*.
  - **Accent Themes**: *Electric Blue*, *Emerald Cyber*, *Sunset Rose*, *Neon Violet*, *Monochrome Silver*.
- **Comprehensive Validation**: Name constraints, live 250-character bio counter, email regex validation, URL sanity checking, and duplicate skill prevention.
- **LocalStorage Data Hub**: Store, search, view, edit, and delete multiple profile cards across browser sessions.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 18 (ES6+) | Functional components, hooks, controlled forms |
| **Build Tool** | Vite 6 | Lightning-fast HMR and optimized production bundle |
| **Styling** | Native Modular CSS3 | CSS Variables, Glassmorphism, animations, responsive design |
| **Icons** | Lucide React | High-quality, consistent iconography |
| **Export Engine**| html2canvas | Client-side DOM to canvas PNG export with CORS support |
| **Storage** | Web LocalStorage API | Resilient JSON serialization and cross-tab sync |

---

## 📁 Project Architecture

```
profilecraft/
├── index.html                     # Entry HTML with typography & SEO metadata
├── package.json                   # Dependencies & npm scripts
├── vite.config.js                 # Vite bundler configuration
├── src/
│   ├── main.jsx                   # React root entry point
│   ├── App.jsx                    # Core application layout & orchestration
│   ├── App.css                    # App workspace grid & layout styles
│   ├── index.css                  # Global design tokens, themes & resets
│   │
│   ├── components/
│   │   ├── Navbar/                # Responsive navigation & theme switcher
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Hero/                  # Hero section with 3D card showcase
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.css
│   │   ├── ProfileForm/           # Controlled input form with character counter
│   │   │   ├── ProfileForm.jsx
│   │   │   └── ProfileForm.css
│   │   ├── ProfileCard/           # The core visual glassmorphic card component
│   │   │   ├── ProfileCard.jsx
│   │   │   └── ProfileCard.css
│   │   ├── ProfilePreview/        # Sticky desktop / responsive mobile live preview
│   │   │   ├── ProfilePreview.jsx
│   │   │   └── ProfilePreview.css
│   │   ├── SkillInput/            # Dynamic skill tag creator with duplicate checks
│   │   │   ├── SkillInput.jsx
│   │   │   └── SkillInput.css
│   │   ├── GeneratedProfile/      # Final card showcase with PNG download & actions
│   │   │   ├── GeneratedProfile.jsx
│   │   │   └── GeneratedProfile.css
│   │   ├── MyProfiles/            # LocalStorage gallery with search & card management
│   │   │   ├── MyProfiles.jsx
│   │   │   └── MyProfiles.css
│   │   ├── Toast/                 # Non-blocking animated toast notifications
│   │   │   ├── Toast.jsx
│   │   │   └── Toast.css
│   │   ├── AboutModal/            # Architectural breakdown & project details modal
│   │   │   ├── AboutModal.jsx
│   │   │   └── AboutModal.css
│   │   └── Footer/                # Responsive footer with quick navigation links
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js     # Custom resilient storage hook
│   │
│   └── utils/
│       ├── validation.js          # Field validation rules, regex & fallback avatar
│       └── sampleData.js          # Demo profiles, templates, themes & presets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18.x or newer recommended)
- npm or pnpm package manager

### 1. Installation

Clone or open the project folder in your terminal:

```bash
cd "card generator"
npm install
```

### 2. Run the Development Server

Start the local Vite development server:

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### 3. Build for Production

Generate optimized static assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🧪 Testing Instructions

Verify all interactive features step by step:

1. **Form Validation**:
   - Leave the "Full Name" field empty and click **Generate Profile**.
   - Confirm that an inline error message appears and the tab highlights the error.
2. **Real-time Live Sync**:
   - Type in the Name, Title, and Bio fields.
   - Confirm the preview card updates instantly on every keystroke.
3. **Bio Character Counter**:
   - Type in the bio textarea.
   - Confirm the live character counter reflects `X/250` and shifts warning color above 220 characters.
4. **Dynamic Skills Input**:
   - Type a new skill name and press `Enter` or click `Add`.
   - Click one of the quick suggestions (e.g. `React`, `TypeScript`).
   - Try typing an existing skill; verify that duplicate prevention displays an alert.
   - Click the `x` on any skill tag to remove it.
5. **Fallback Avatar & Image Handling**:
   - Clear the image URL to see the fallback initials avatar.
   - Select one of the quick demo photo chips to test instant image rendering.
   - Provide an invalid image link; verify that it gracefully falls back without broken images.
6. **PNG Download**:
   - Click **Generate Profile**.
   - Click **Download as PNG** in the action bar.
   - Confirm that a crisp, high-resolution PNG image downloads automatically.
7. **Copy Profile Information**:
   - Click **Copy Profile Info**.
   - Verify that formatted text is copied to clipboard and a success toast appears.
8. **LocalStorage Persistence**:
   - Refresh the page (`F5`).
   - Scroll to **My Profiles** and verify your created profile cards remain saved.
   - Test the Search input by filtering by name or skill.
9. **Dark / Light Theme Toggle**:
   - Click the Sun/Moon toggle in the navigation bar to switch between Dark and Light mode.
   - Confirm smooth color transitions and contrast across all elements.

---

## 🌐 GitHub Pages Deployment Instructions

To deploy ProfileCraft to GitHub Pages:

1. In `vite.config.js`, set `base` to your repository name:
   ```javascript
   export default defineConfig({
     base: '/profilecraft/', // Replace with your repository name
     plugins: [react()],
   });
   ```

2. Install `gh-pages` as a development dependency:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. Run the deploy command:
   ```bash
   npm run deploy
   ```

5. In your GitHub repository settings, go to **Pages** and ensure the source is set to the `gh-pages` branch. Your site will be live at `https://<your-username>.github.io/<repo-name>/`!

---

## 📄 License

MIT License. Free for educational, portfolio, and commercial demonstration purposes.
