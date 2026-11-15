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
  /** Exact start date (YYYY-MM-DD) of a role signed but not begun; until then it reads "Starts…", not "Current" */
  startsOn?: string;
  /** Business domain of the employer (e.g. debt consolidation, remittances) */
  industry?: string;
  tags?: string[];
  bullets?: string[];
  /** The role told the way a person would: what the situation was, then what changed */
  story?: Story;
}

export interface Story {
  /** One plain sentence: the situation or the scope, no label */
  lead: string;
  /** Two or three results, verb first, measured where there is a measure */
  wins: string[];
}

/** One stage of the career told as a story: what I did, what it taught, the proof */
export interface ArcAct {
  period: string;
  title: string;
  text: string;
  proof: string;
}

export interface WorkflowStep {
  title: string;
  text: string;
}

export interface SkillItem {
  name: string;
  level: number;
  years?: number;
}

export interface EducationItem {
  institution: string;
  degree: string;
  area: string;
  end: string;
  /** Explicit completion wording (e.g. coursework closed) shown instead of the generic "Expected" label */
  status?: string;
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
  /** Year the work started, set in Bodoni in the register; omitted when not on record */
  year?: string;
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
}

export interface SkillCategoryItem {
  id: 'ba' | 'data' | 'bi' | 'integration' | 'ai' | 'docs' | 'tech';
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

export interface ProfileData {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  /** Tighter 3-sentence version used by the PDF templates; falls back to `summary` */
  summaryShort?: string;
  photoUrl: string;
  links: LinkItem[];
  badges: string[];
  keyAchievements: string[];
  experience: ExperienceItem[];
  /** The career in three stages, the thread a recruiter should come away with */
  arc?: { title: string; intro: string; acts: ArcAct[] };
  skills: SkillItem[];
  education: EducationItem[];
  certifications?: CertificationItem[];
  projects: ProjectItem[];
  /** "How I work": the method behind every role, shown on the resume */
  workflow?: { title: string; intro: string; steps: WorkflowStep[] };
  languages: LanguageItem[];
  tools: Tools;
  testimonials: TestimonialItem[];
  skillCategories: SkillCategoryItem[];
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}