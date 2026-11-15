import type { Lang } from '../types';

/**
 * Shared copy and art for the "ink" resume (PDF src/pdf/CVCreative.tsx and the
 * /resume page), so the figures, their footnotes and the engravings are the same
 * everywhere. Numbers come from the profiles; nothing here is new data.
 */

/** Engraved vignette per role, by the industry it belongs to (public/ink/<name>.webp) */
export const INK_VIGNETTE: Record<string, string> = {
  'idt-gnoc': 'ink-remesas',
  'icon-it': 'ink-fintech',
  'alleviate-mid': 'ink-fintech',
  'alleviate-de': 'ink-fintech',
  'flowber-freelance': 'ink-barberia',
  'usac-teaching': 'ink-educacion',
  'virtrify-ai': 'ink-bienestar',
};

/**
 * Banknotes give each denomination its own ink; the resume gives each industry
 * one. The same five inks are the five strands of the portrait's guilloché.
 * Gold is reserved for "today". All pass WCAG AA as text on their ground.
 */
export type InkTone = 'teal' | 'blue' | 'coral' | 'violet' | 'green';

export const INK_TONES: InkTone[] = ['teal', 'blue', 'coral', 'violet', 'green'];

export const INK_TONE: Record<string, InkTone> = {
  'idt-gnoc': 'teal', // remittances
  'icon-it': 'blue', // US fintech
  'alleviate-mid': 'blue',
  'alleviate-de': 'blue',
  'flowber-freelance': 'coral', // barbershop
  'usac-teaching': 'violet', // education
  'virtrify-ai': 'green', // wellness
};

/** Ink and engraving per project, by the industry it was built for; the rest print in the text ink */
export const PROJECT_INK: Record<string, { tone: InkTone; art: string }> = {
  'alleviate-platform': { tone: 'blue', art: 'ink-fintech' },
  'flowber-barberia': { tone: 'coral', art: 'ink-barberia' },
  'virtrify-ai-ops': { tone: 'green', art: 'ink-bienestar' },
  'fortran-peg-parser': { tone: 'violet', art: 'ink-educacion' },
  'bd2-suficiencia': { tone: 'violet', art: 'ink-educacion' },
  'compilers-phase1': { tone: 'violet', art: 'ink-educacion' },
};

/** Print values, for the PDF (light paper). The site reads --ink-* from index.css. */
export const INK_HEX: Record<InkTone | 'gold', string> = {
  teal: '#0B7A75',
  blue: '#1F4FA3',
  coral: '#C42B47',
  violet: '#6A3FA0',
  green: '#2E7D4A',
  gold: '#7A6600',
};

/** Tailwind classes per tone, spelled out so the scanner sees them */
export const INK_TEXT: Record<InkTone, string> = {
  teal: 'text-ink-teal',
  blue: 'text-ink-blue',
  coral: 'text-ink-coral',
  violet: 'text-ink-violet',
  green: 'text-ink-green',
};

/** Short names for the career route, oldest first */
export const INK_ROUTE: Record<string, { en: string; es: string; at: string }> = {
  'idt-gnoc': { en: 'NOC analyst, 24/7', es: 'Analista NOC 24/7', at: 'IDT, Red Chapina' },
  'icon-it': { en: 'IT support engineer', es: 'Ingeniero de soporte TI', at: 'Alleviate' },
  'alleviate-mid': { en: 'BI analyst, first hire', es: 'Analista de BI, primera contratación', at: 'Alleviate' },
  'flowber-freelance': { en: 'Architect and sole engineer', es: 'Arquitecto e ingeniero único', at: 'Flowber' },
  'usac-teaching': { en: 'Academic instructor', es: 'Instructor académico', at: 'USAC' },
  'alleviate-de': { en: 'Data engineer', es: 'Ingeniero de datos', at: 'Alleviate' },
  'virtrify-ai': { en: 'AI implementation engineer', es: 'AI Implementation Engineer', at: 'Virtrify' },
};

export interface InkFigure {
  /** One value, or a before/after pair drawn with an arrow between */
  value: [string] | [string, string];
  /** Footnote number */
  n: number;
  /** Ink of the industry the number comes from */
  tone: InkTone;
  label: string;
  note: string;
}

export function inkFigures(lang: Lang): InkFigure[] {
  const en = lang === 'en';
  return [
    { value: ['85%', '99.5%'], n: 1, tone: 'blue', label: en ? 'data accuracy' : 'precisión de datos', note: en ? 'financial reporting, 5 departments' : 'reportes financieros, 5 departamentos' },
    { value: en ? ['2+ days', '30 min'] : ['2+ días', '30 min'], n: 2, tone: 'blue', label: en ? 'reporting cycle' : 'ciclo de reportes', note: en ? 'now under 30 minutes, SQL and dbt pipelines' : 'hoy menos de 30 minutos, pipelines SQL y dbt' },
    { value: ['160+'], n: 3, tone: 'coral', label: en ? 'appointments in production' : 'citas en producción', note: en ? 'Flowber, built end to end' : 'Flowber, construido de punta a punta' },
  ];
}

/**
 * Bodoni draws "+" as a hairline that disappears at display size and the subset
 * has no arrow, so figures are split into runs and those glyphs are set in Geist.
 */
export function figureRuns(text: string): Array<{ text: string; sans: boolean }> {
  return text
    .split(/([+→])/)
    .filter(Boolean)
    .map(t => ({ text: t, sans: t === '+' || t === '→' }));
}

export const FLOWBER_CASE_URL = 'https://garciajuni20.github.io/Resume_Khristian_Garcia/#/flowber';

/** Where each figure comes from. The last one ends with the case-study link. */
export function inkNotes(lang: Lang): string[] {
  return lang === 'en'
    ? [
        'Alleviate Financial Solutions (US fintech), Snowflake analytical layer I designed as the first BI hire, Nov 2023 to Oct 2026.',
        'Same account: SQL/dbt pipelines on Snowflake and Power BI dashboards replacing manual Excel reporting.',
        'Flowber, a barbershop platform in production since 2024. Case study with architecture and numbers: ',
      ]
    : [
        'Alleviate Financial Solutions (fintech de EE. UU.), capa analítica en Snowflake que diseñé como primera contratación de BI, nov 2023 a oct 2026.',
        'Misma cuenta: pipelines SQL/dbt sobre Snowflake y dashboards de Power BI que reemplazaron reportes manuales en Excel.',
        'Flowber, plataforma de una barbería en producción desde 2024. Caso de estudio con arquitectura y cifras: ',
      ];
}

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** "2023-11" -> "Nov 2023", "present" -> "today". No Intl, so every render matches. */
export function inkMonth(value: string, lang: Lang): string {
  if (value === 'present' || value === 'actual') return lang === 'en' ? 'today' : 'hoy';
  const idx = parseInt(value.split('-')[1], 10) - 1;
  return `${(lang === 'en' ? MONTHS_EN : MONTHS_ES)[idx] ?? ''} ${value.slice(0, 4)}`;
}

/** Achievements the figures don't already state, and only the ones carrying a number */
export function inkAchievements(all: string[], max = 3): string[] {
  return all.filter(a => /\d/.test(a) && !/99[.,]5|30 min/.test(a)).slice(0, max);
}
