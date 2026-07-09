export type Lang = 'en' | 'es';
export type Theme = 'light' | 'dark';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  tags?: string[];
  bullets?: string[];
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface EducationItem {
  institution: string;
  degree: string;
  area: string;
  end: string;
  highlights?: string[];
}

export interface LinkItem {
  label: string;
  href: string;
  icon?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  skills: string[];
  verified?: boolean;
  type: 'professional' | 'academic' | 'training';
}

export interface LanguageItem {
  language: string;
  level: string;
  proficiency: number;
}

export type ProjectCategory = 'data' | 'web' | 'cloud' | 'architecture' | 'academic';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  impact?: string;
  technologies: string[];
  role: string;
  duration: string;
  teamSize: string;
  category: ProjectCategory;
  links?: { github?: string; live?: string };
  featured?: boolean;
  gradient?: string;
  /** Internal route to a dedicated case-study page */
  caseStudyPath?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  relationship: string;
  rating: number;
}

export interface SkillCategoryItem {
  id: 'data' | 'bi' | 'cloud' | 'dev' | 'systems' | 'tools';
  title: string;
  skills: string[];
  level: 'advanced' | 'intermediate' | 'beginner';
}

export interface Tools {
  dataEngineering: string[];
  biAnalytics: string[];
  cloudDevOps: string[];
  fullStack: string[];
  methodologies: string[];
}

export interface Metrics {
  yearsExperience: number;
  yearsBI: number;
  dashboardsDelivered: number;
  sqlModels: number;
  kpisTracked: number;
  liveApps: number;
  projectsCompleted: number;
  technologies: number;
  certifications: number;
  clientsServed: number;
  dataProcessed: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  photoUrl: string;
  links: LinkItem[];
  badges: string[];
  keyAchievements: string[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  languages: LanguageItem[];
  tools: Tools;
  metrics: Metrics;
  testimonials: TestimonialItem[];
  skillCategories: SkillCategoryItem[];
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}