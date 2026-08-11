import type { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  featured: boolean;
  features: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  image?: string;
  link?: string;
  category?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company?: string;
  period?: string;
  location?: string;
  contributions: string[];
}

export interface ResumeInfo {
  url?: string;
  label?: string;
  updated?: string;
}

export type LoadStatus = 'loading' | 'ready' | 'error';

export interface PortfolioData {
  projects: Project[];
  certificates: Certificate[];
  experience: ExperienceItem[];
  resume: ResumeInfo;
  status: LoadStatus;
  error?: string;
  reload: () => void;
}

export interface NavLink {
  label: string;
  to: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  display: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
  icon: LucideIcon;
}