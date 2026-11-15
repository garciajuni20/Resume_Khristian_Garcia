import { motion } from 'framer-motion';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import type { ExperienceItem, Lang } from '../types';
import { FLUID } from '../utils/animations';
import { shortCompany } from '../utils/company';
import { roleStatus, startsLabel } from '../utils/roleStatus';

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function since(start: string, lang: Lang): string {
  const [y, m] = start.split('-');
  const idx = parseInt(m, 10) - 1;
  const month = (lang === 'en' ? MONTHS_EN : MONTHS_ES)[idx] ?? '';
  return lang === 'en' ? `since ${month} ${y}` : `desde ${month} ${y}`;
}

/** The roles held right now, in one line: promotion, part-time AI role, and the side venture read together. */
export default function NowStrip({ lang, className = '' }: { lang: Lang; className?: string }) {
  const data = lang === 'en' ? profileEN : profileES;
  const current: ExperienceItem[] = data.experience.filter(e => e.end === 'present');
  if (current.length === 0) return null;

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-start ${className}`}>
      <span className="font-display shrink-0 text-lg leading-tight text-n-highlight">{lang === 'en' ? 'Now' : 'Hoy'}</span>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {current.map((e, i) => (
          <motion.li
            key={e.id}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: FLUID }}
            className="text-sm"
          >
            <span>
              <span className="n-text font-semibold">{e.role.replace(/\s*\(.*\)$/, '')}</span>
              <span className="n-muted">
                {' '}· {shortCompany(e.company)} ·{' '}
                {roleStatus(e) === 'upcoming' && e.startsOn ? startsLabel(e.startsOn, lang).toLowerCase() : since(e.start, lang)}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
