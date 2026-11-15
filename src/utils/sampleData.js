/**
 * Sample profiles, avatar presets, skill catalogs, and styling presets for ProfileCraft
 */

export const CARD_TEMPLATES = [
  {
    id: 'cyber-glass',
    name: 'Cyber Glass',
    description: 'Frosted glass with glowing accents and sleek modern depth',
    badge: 'Popular'
  },
  {
    id: 'modern-minimalist',
    name: 'Clean Minimalist',
    description: 'Crisp borders, balanced whitespace, and editorial typography',
    badge: 'Clean'
  },
  {
    id: 'executive-gradient',
    name: 'Executive Dark',
    description: 'Deep midnight mesh with sophisticated luxury framing',
    badge: 'Pro'
  },
  {
    id: 'aurora-hologram',
    name: 'Aurora Glow',
    description: 'Vibrant edge highlights and soft ambient luminescent glow',
    badge: 'Vibrant'
  }
];

export const ACCENT_THEMES = [
  {
    id: 'electric-blue',
    name: 'Electric Blue',
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    glow: 'rgba(59, 130, 246, 0.35)'
  },
  {
    id: 'emerald-cyan',
    name: 'Emerald Cyber',
    primary: '#10b981',
    secondary: '#06b6d4',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    glow: 'rgba(16, 185, 129, 0.35)'
  },
  {
    id: 'sunset-rose',
    name: 'Sunset Rose',
    primary: '#f43f5e',
    secondary: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)',
    glow: 'rgba(244, 63, 94, 0.35)'
  },
  {
    id: 'violet-pulse',
    name: 'Neon Violet',
    primary: '#a855f7',
    secondary: '#ec4899',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    glow: 'rgba(168, 85, 247, 0.35)'
  },
  {
    id: 'midnight-silver',
    name: 'Monochrome Silver',
    primary: '#e2e8f0',
    secondary: '#64748b',
    gradient: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
    glow: 'rgba(226, 232, 240, 0.25)'
  }
];

export const SUGGESTED_SKILLS = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Next.js',
  'Python',
  'UI/UX Design',
  'Figma',
  'GraphQL',
  'Docker',
  'Tailwind CSS',
  'AWS',
  'PostgreSQL',
  'Git',
  'REST APIs'
];

export const AVATAR_PRESETS = [
  {
    id: 'dev-1',
    label: 'Alex (Tech)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80'
  },
  {
    id: 'dev-2',
    label: 'Sophia (Design)',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80'
  },
  {
    id: 'dev-3',
    label: 'Marcus (Architect)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80'
  },
  {
    id: 'dev-4',
    label: 'Elena (Lead)',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80'
  }
];

export const DEMO_PROFILES = [
  {
    id: 'demo-profile-1',
    fullName: 'Sarah Jenkins',
    professionalTitle: 'Senior Full-Stack Engineer & Cloud Architect',
    bio: 'Passionate about distributed systems, resilient microservices, and crafting pixel-perfect interfaces with React & modern web standards.',
    email: 'sarah.jenkins@devcraft.io',
    location: 'San Francisco, CA',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
    skills: ['React', 'TypeScript', 'Node.js', 'Kubernetes', 'GraphQL', 'AWS', 'System Design'],
    linkedin: 'https://linkedin.com/in/sarahjenkins-dev',
    github: 'https://github.com/sarahjenkins',
    portfolio: 'https://sarahjenkins.io',
    template: 'cyber-glass',
    theme: 'electric-blue',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'demo-profile-2',
    fullName: 'David Vance',
    professionalTitle: 'Lead Product Designer & Design Systems Lead',
    bio: 'Bridging the gap between human intuition and elegant code. 8+ years designing SaaS tools with high conversion and delightful micro-interactions.',
    email: 'david.vance@designspace.co',
    location: 'Berlin, Germany',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    skills: ['UI/UX Design', 'Design Systems', 'Figma', 'Prototyping', 'User Research', 'React UI'],
    linkedin: 'https://linkedin.com/in/davidvance-design',
    github: 'https://github.com/davidvance',
    portfolio: 'https://davidvance.design',
    template: 'executive-gradient',
    theme: 'emerald-cyan',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];
