import type { ExperienceItem, Lang } from '../../types';
import { INK_TEXT, INK_TONE, INK_VIGNETTE, figureRuns, inkMonth, type InkTone } from '../../data/ink';
import InkArt from '../ink/InkArt';

export const TITLE = 'font-display leading-[1.02] text-[clamp(2.1rem,4.6vw,4.4rem)]';
const TITLE_LONG = 'font-display leading-[1.05] text-[clamp(1.9rem,3.4vw,3.5rem)]';
export const LEAD = 'n-muted max-w-[46rem] text-[clamp(1rem,1.5vw,1.35rem)] leading-relaxed';

/** A figure in Bodoni, with "+" and "→" in Geist (Bodoni's subset lacks them) */
export function Figure({ text }: { text: string }) {
  return (
    <>
      {figureRuns(text).map((r, i) =>
        r.sans ? <span key={i} className="font-sans text-[0.7em] font-light">{r.text}</span> : <span key={i}>{r.text}</span>,
      )}
    </>
  );
}

export function Wins({ wins, tone }: { wins: string[]; tone: InkTone }) {
  return (
    <ul className="mt-6 space-y-3 text-[clamp(1rem,1.45vw,1.3rem)] leading-snug">
      {wins.map(w => (
        <li key={w} className="grid grid-cols-[1.4rem_minmax(0,1fr)]">
          <span className={INK_TEXT[tone]} aria-hidden="true">–</span>
          <span className="n-text">{w}</span>
        </li>
      ))}
    </ul>
  );
}

export function RoleSheet({ e, lang }: { e: ExperienceItem; lang: Lang }) {
  const tone = INK_TONE[e.id] ?? 'blue';
  const art = INK_VIGNETTE[e.id];
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:gap-12">
      <div className="flex items-start gap-5 md:block">
        <p className={`font-display leading-none text-[clamp(3rem,7vw,6.5rem)] ${INK_TEXT[tone]}`}>{e.start.slice(0, 4)}</p>
        <div>
          <p className="n-muted text-sm md:mt-3">
            {inkMonth(e.start, lang)} – {inkMonth(e.end, lang)}
          </p>
          {art && <InkArt name={art} className={`mt-3 h-16 w-16 md:mt-6 md:h-28 md:w-28 ${INK_TEXT[tone]}`} />}
        </div>
      </div>
      <div className="min-w-0">
        {/* Long formal titles (the GNOC one runs past 70 characters) are set a size down */}
        <h2 className={e.role.length > 40 ? TITLE_LONG : TITLE}>{e.role}</h2>
        <p className="n-text mt-3 text-[clamp(1rem,1.4vw,1.25rem)]">{e.company}</p>
        {e.story && (
          <>
            <p className={`${LEAD} mt-6`}>{e.story.lead}</p>
            <Wins wins={e.story.wins} tone={tone} />
          </>
        )}
      </div>
    </div>
  );
}
