import type { ExperienceItem } from '../types';
import { shortCompany } from './company';

/**
 * Reverse-chronological by start month, the order recruiters expect: the years
 * down the ledger only ever go back in time. Ties keep the data order, so the
 * main job stays above a part-time one that starts the same month.
 */
export function orderExperience(experience: ExperienceItem[]): ExperienceItem[] {
  return [...experience].sort((a, b) => b.start.localeCompare(a.start));
}

export type EmployerPosition = {
  /** Number of consecutive roles at this employer, on the first of them (0 elsewhere) */
  runLength: number;
  /** An earlier role at the same employer, listed right under the later one */
  continued: boolean;
};

/** For each role, where it sits in a run of consecutive roles at one employer */
export function employerPositions(ordered: ExperienceItem[]): Map<string, EmployerPosition> {
  const out = new Map<string, EmployerPosition>();
  ordered.forEach((e, i) => {
    const k = shortCompany(e.company);
    const continued = i > 0 && shortCompany(ordered[i - 1].company) === k;
    let runLength = 0;
    if (!continued) {
      runLength = 1;
      while (i + runLength < ordered.length && shortCompany(ordered[i + runLength].company) === k) runLength++;
    }
    out.set(e.id, { runLength, continued });
  });
  return out;
}
