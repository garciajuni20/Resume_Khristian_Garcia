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
}

export interface LinkItem {
  label: string;
  href: string;
  icon?: string;
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
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}