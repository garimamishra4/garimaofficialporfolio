export type ThemeType = 'cyber-amethyst' | 'midnight-rose';

export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  text: string;
  accent1: string; // Purple (#9D4EDD) or Magenta (#FF007F)
  accent2: string; // Mint (#00FFCC) or Lavender (#D8B4F8)
  themeName: string;
}

export interface SkillItem {
  name: string;
  category: 'languages' | 'frontend' | 'database' | 'software';
  iconName: string; // Will match Lucide icons or text fallback
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date: string;
  badge: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CertificateDoc {
  id: string;
  title: string;
  issuer: string;
  year: string;
  gradient: string;
}
