/**
 * Verifies the EN and ES profiles stay structurally identical (same ids, same
 * number of bullets/tags/items), so neither language silently loses content.
 * Run: npx tsx --tsconfig tsconfig.app.json scripts/check-i18n.ts
 */
import { profileEN } from '../src/data/profile-en';
import { profileES } from '../src/data/profile-es';
import { flowberContent } from '../src/data/flowber';

const problems: string[] = [];

function walk(en: unknown, es: unknown, path: string) {
  if (Array.isArray(en) || Array.isArray(es)) {
    if (!Array.isArray(en) || !Array.isArray(es)) return problems.push(`${path}: array vs non-array`);
    if (en.length !== es.length) problems.push(`${path}: EN ${en.length} items vs ES ${es.length}`);
    en.forEach((v, i) => walk(v, es[i], `${path}[${i}]`));
    return;
  }
  if (en && typeof en === 'object') {
    if (!es || typeof es !== 'object') return problems.push(`${path}: object vs ${typeof es}`);
    const ek = Object.keys(en as object), sk = Object.keys(es as object);
    for (const k of ek) if (!sk.includes(k)) problems.push(`${path}.${k}: missing in ES`);
    for (const k of sk) if (!ek.includes(k)) problems.push(`${path}.${k}: missing in EN`);
    for (const k of ek) if (sk.includes(k)) walk((en as Record<string, unknown>)[k], (es as Record<string, unknown>)[k], `${path}.${k}`);
    return;
  }
  if (typeof en !== typeof es) problems.push(`${path}: ${typeof en} vs ${typeof es}`);
  // Ids, dates, numbers, enums and URLs must match exactly across languages
  const key = path.split('.').pop()?.replace(/\[\d+\]$/, '') ?? '';
  const exactKeys = ['id', 'start', 'end', 'years', 'proficiency', 'href', 'value', 'decimals', 'color', 'rating', 'featured', 'category', 'gradient', 'caseStudyPath', 'photoUrl', 'email', 'phone', 'icon', 'desktop', 'mobile'];
  const isEnum = typeof en === 'number' || typeof en === 'boolean' || (typeof en === 'string' && (/^https?:/.test(en) || ['done', 'live', 'advanced', 'intermediate', 'beginner'].includes(en)));
  if ((exactKeys.includes(key) || isEnum) && en !== es) problems.push(`${path}: "${String(en)}" vs "${String(es)}"`);
}

walk(profileEN, profileES, 'profile');
walk(flowberContent.en, flowberContent.es, 'flowber');
console.log(problems.length ? problems.join('\n') : 'EN/ES parity OK');
process.exit(problems.length ? 1 : 0);
