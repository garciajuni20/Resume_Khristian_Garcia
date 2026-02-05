export type Lang = 'en' | 'es';
export type Theme = 'light' | 'dark';

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
}

export interface LanguageItem {
  language: string;
  level: string;
  proficiency: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  impact?: string;
  technologies: string[];
  role: string;
  duration: string;
  teamSize: string;
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
  resumePdfPath: string;
  links: LinkItem[];
  badges: string[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  education: EducationItem[];
  certifications?: CertificationItem[];
  projects?: ProjectItem[];
  languages?: LanguageItem[];
  tools?: Tools;
  metrics?: Metrics;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}