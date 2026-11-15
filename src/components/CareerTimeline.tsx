import { motion, useReducedMotion } from 'framer-motion';
import type { ExperienceItem, Lang } from '../types';
import { shortCompany } from '../utils/company';
import { FLUID } from '../utils/animations';
import { INK_TONE } from '../data/ink';

/**
 * Career map: one bar per role on a shared month scale, so overlapping roles
 * (the promotion, the part-time AI role, the side venture) read at a glance.
 * Set in ink like the rest of the resume: bars are engraved hatching
 * in the ink of each role's industry (`.ink-hatch`), the roles held today
 * are outlined in gold, the colour of the "today" line.
 * With sound on, each bar rings one note up the scale, oldest first: sweeping
 * the pointer across the map plays the career as a rising melody.
 */

function months(value: string, now: Date): number {
  if (value === 'present' || value === 'actual') return now.getFullYear() * 12 + now.getMonth();
  const [y, m] = value.split('-').map(Number);
  return y * 12 + (m - 1);
}

type Props = {
  experience: ExperienceItem[];
  lang: Lang;
  onOpen: (item: ExperienceItem) => void;
};

export default function CareerTimeline({ experience, lang, onOpen }: Props) {
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
    <div className="border-t border-n-border pt-5">
      <div>
        <h3 className="font-display n-text text-2xl">{t.title}</h3>
        <p className="n-muted mt-1 text-sm">{t.sub}</p>
      </div>

      <div className="relative mt-6 overflow-hidden">
        {/* Year grid */}
        <div className="relative h-5">
          {years.map((y, i) => (
            <span
              key={y}
              className={`n-muted absolute top-0 text-[11px] tabular-nums ${i === 0 ? '' : i === years.length - 1 ? '-translate-x-full' : '-translate-x-1/2'}`}
              style={{ left: `${pct(y * 12)}%` }}
            >
              {/* Two digits on phones: the first and last pairs of years collide otherwise */}
              <span className="sm:hidden" aria-hidden="true">’{String(y).slice(2)}</span>
              <span className="sr-only sm:not-sr-only">{y}</span>
            </span>
          ))}
        </div>
        <div className="relative space-y-2 border-t border-n-border pt-3">
          {years.map(y => (
            <span key={y} className="pointer-events-none absolute bottom-0 top-0 w-px bg-n-border" style={{ left: `${pct(y * 12)}%` }} aria-hidden="true" />
          ))}
          {/* Today */}
          <span
            className="pointer-events-none absolute bottom-0 top-0 z-10 w-px border-l border-dashed border-n-highlight"
            style={{ left: `${pct(nowM)}%` }}
            aria-hidden="true"
          >
            <span className="absolute -top-1 right-1 whitespace-nowrap px-1 text-[10px] font-semibold text-n-highlight">{t.now}</span>
          </span>

          {rows.map((e, i) => {
            const s = months(e.start, now);
            const en = Math.max(months(e.end, now), s + 1);
            const left = pct(s);
            const width = pct(en) - left;
            const current = e.end === 'present';
            const wide = width > 22;
            const label = `${e.role.replace(/\s*\(.*\)$/, '').split(' — ')[0]} · ${shortCompany(e.company)}`;
            return (
              <div key={e.id} className="relative h-8">
                <motion.button
                  type="button"
                  onClick={() => onOpen(e)}
                  data-sfx="none"
                  data-sfx-hover={`note:${i}`}
                  aria-label={wide ? undefined : `${t.open} ${e.role}, ${e.company}`}
                  initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, delay: i * 0.06, ease: FLUID }}
                  className={`ink-hatch n-text absolute top-0 flex h-8 origin-left items-center overflow-hidden rounded-sm border px-2 text-left text-xs font-semibold transition-colors duration-300 hover:bg-n-hover n-focus ${current ? 'outline outline-1 outline-offset-1 outline-n-highlight' : ''}`}
                  style={{ left: `${left}%`, width: `${width}%`, minWidth: 10, '--tone': `var(--ink-${INK_TONE[e.id] ?? 'blue'})` } as React.CSSProperties}
                >
                  {wide && (
                    <span className="truncate">
                      <span className="sr-only">{t.open} </span>
                      {label}
                    </span>
                  )}
                </motion.button>
                {!wide && (
                  <span
                    className={`n-text pointer-events-none absolute top-0 flex h-8 min-w-0 items-center text-xs font-semibold ${left + width > 50 ? 'justify-end pr-2' : 'pl-2'}`}
                    style={left + width > 50 ? { left: 0, right: `${100 - left}%` } : { left: `${left + width}%`, right: 0 }}
                  >
                    {/* Pinned to the free side of the bar and truncated, so it never runs off the chart */}
                    <span className="truncate">{label}</span>
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
