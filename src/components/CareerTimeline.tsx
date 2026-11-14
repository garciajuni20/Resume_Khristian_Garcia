import { motion, useReducedMotion } from 'framer-motion';
import type { ExperienceItem, Lang } from '../types';
import { shortCompany } from '../utils/company';
import { FLUID } from '../utils/animations';

/**
 * Career map: one bar per role on a shared month scale, so overlapping roles
 * (the promotion, the part-time AI role, the side venture) read at a glance.
 * Colors follow the industry order used by the profile card tags.
 */

const TONES = ['blue', 'purple', 'orange', 'green', 'pink'] as const;
const BAR: Record<(typeof TONES)[number], string> = {
  blue: '#2383E2',
  purple: '#9065B0',
  orange: '#D9730D',
  green: '#448361',
  pink: '#C14C8A',
};

function months(value: string, now: Date): number {
  if (value === 'present' || value === 'actual') return now.getFullYear() * 12 + now.getMonth();
  const [y, m] = value.split('-').map(Number);
  return y * 12 + (m - 1);
}

type Props = {
  experience: ExperienceItem[];
  industries: string[];
  lang: Lang;
  onOpen: (item: ExperienceItem) => void;
};

export default function CareerTimeline({ experience, industries, lang, onOpen }: Props) {
  const reduce = useReducedMotion();
  const now = new Date();
  const nowM = months('present', now);
  const starts = experience.map(e => months(e.start, now));
  const minYear = Math.floor(Math.min(...starts) / 12);
  const maxYear = now.getFullYear() + 1;
  const span = (maxYear - minYear) * 12;
  const pct = (m: number) => ((m - minYear * 12) / span) * 100;

  const rows = [...experience].sort((a, b) => a.start.localeCompare(b.start));
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
  const t = lang === 'en'
    ? { title: 'Career map', sub: 'Every role on one scale; bars that overlap are roles I hold at the same time.', now: 'Now', open: 'Open details for' }
    : { title: 'Mapa de carrera', sub: 'Todos los roles en una misma escala; las barras que se traslapan son roles simultáneos.', now: 'Hoy', open: 'Abrir detalles de' };

  return (
    <div className="n-border rounded-2xl border bg-[var(--n-bg)] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="n-text text-lg font-semibold tracking-tight">{t.title}</h3>
          <p className="n-muted mt-1 text-sm">{t.sub}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5" aria-label={lang === 'en' ? 'Industries' : 'Industrias'}>
          {industries.map((ind, i) => (
            <li key={ind} className={`n-tag n-tag-${TONES[i % TONES.length]} text-xs`}>{ind}</li>
          ))}
        </ul>
      </div>

      <div className="relative mt-6 overflow-hidden">
        {/* Year grid */}
        <div className="relative h-5">
          {years.map((y, i) => (
            <span
              key={y}
              className={`n-muted absolute top-0 font-mono-geist text-[11px] ${i === 0 ? '' : i === years.length - 1 ? '-translate-x-full' : '-translate-x-1/2'}`}
              style={{ left: `${pct(y * 12)}%` }}
            >
              {y}
            </span>
          ))}
        </div>
        <div className="relative space-y-2 border-t border-[var(--n-border)] pt-3">
          {years.map(y => (
            <span key={y} className="pointer-events-none absolute bottom-0 top-0 w-px bg-[var(--n-border)]" style={{ left: `${pct(y * 12)}%` }} aria-hidden="true" />
          ))}
          {/* Today */}
          <span
            className="pointer-events-none absolute bottom-0 top-0 z-10 w-px border-l border-dashed border-[var(--n-accent)]"
            style={{ left: `${pct(nowM)}%` }}
            aria-hidden="true"
          >
            <span className="absolute -top-1 right-1 whitespace-nowrap rounded px-1 font-mono-geist text-[10px] font-semibold text-[var(--n-accent)]">{t.now}</span>
          </span>

          {rows.map((e, i) => {
            const s = months(e.start, now);
            const en = Math.max(months(e.end, now), s + 1);
            const left = pct(s);
            const width = pct(en) - left;
            const tone = TONES[Math.max(0, industries.indexOf(e.industry ?? '')) % TONES.length];
            const wide = width > 22;
            const label = `${e.role.replace(/\s*\(.*\)$/, '').split(' — ')[0]} · ${shortCompany(e.company)}`;
            return (
              <div key={e.id} className="relative h-8">
                <motion.button
                  type="button"
                  onClick={() => onOpen(e)}
                  aria-label={`${t.open} ${e.role}, ${e.company}`}
                  initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, delay: i * 0.06, ease: FLUID }}
                  className="absolute top-0 flex h-8 origin-left items-center overflow-hidden rounded-md px-2 text-left text-xs font-semibold text-white shadow-sm transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-accent)]"
                  style={{ left: `${left}%`, width: `${width}%`, backgroundColor: BAR[tone], minWidth: 10 }}
                >
                  {wide && <span className="truncate">{label}</span>}
                </motion.button>
                {!wide && (
                  <span
                    className="n-text pointer-events-none absolute top-0 flex h-8 items-center whitespace-nowrap pl-2 text-xs font-semibold"
                    style={left + width > 70 ? { right: `${100 - left}%`, paddingRight: 8, paddingLeft: 0 } : { left: `${left + width}%` }}
                  >
                    {label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
