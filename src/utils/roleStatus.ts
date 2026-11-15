import type { ExperienceItem, Lang } from '../types';

export type RoleStatus = 'past' | 'current' | 'upcoming';

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/**
 * A role signed but not started yet (`startsOn` in the future) must not read as
 * "current": a recruiter who calls the week before would catch it. The check runs
 * at render time, so the label flips to "current" on its own on the start date
 * (the browser PDFs too; the files in job-search/ need `npm run pdf` again).
 */
export function roleStatus(item: Pick<ExperienceItem, 'end' | 'startsOn'>, today: Date = new Date()): RoleStatus {
  if (item.end !== 'present') return 'past';
  if (item.startsOn && new Date(`${item.startsOn}T00:00:00`) > today) return 'upcoming';
  return 'current';
}

/** "Starts Nov 23" / "Inicia el 23 nov" */
export function startsLabel(startsOn: string, lang: Lang): string {
  const [, m, d] = startsOn.split('-');
  const idx = parseInt(m, 10) - 1;
  const day = parseInt(d, 10);
  return lang === 'en' ? `Starts ${MONTHS_EN[idx]} ${day}` : `Inicia el ${day} ${MONTHS_ES[idx]}`;
}

/** The word after the role: "Current", "Starts Nov 23", or nothing */
export function statusLabel(item: Pick<ExperienceItem, 'end' | 'startsOn'>, lang: Lang): string | null {
  const s = roleStatus(item);
  if (s === 'current') return lang === 'en' ? 'Current' : 'Actual';
  if (s === 'upcoming' && item.startsOn) return startsLabel(item.startsOn, lang);
  return null;
}
