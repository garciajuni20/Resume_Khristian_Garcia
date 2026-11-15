import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import type { ExperienceItem, Lang } from '../types';
import { FLUID } from '../utils/animations';
import { shortCompany } from '../utils/company';

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
      <span className="n-tag n-tag-yellow shrink-0 gap-1.5 self-start py-0.5 text-xs">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {lang === 'en' ? 'Now' : 'Ahora'}
      </span>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {current.map((e, i) => (
          <motion.li
            key={e.id}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: FLUID }}
            className="flex items-start gap-1.5 text-sm"
          >
            <Sparkles className="n-muted mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              <span className="n-text font-semibold">{e.role.replace(/\s*\(.*\)$/, '')}</span>
              <span className="n-muted"> · {shortCompany(e.company)} · {since(e.start, lang)}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
