import type { ArcAct, Lang } from '../../types';
import { INK_TEXT, type InkTone } from '../../data/ink';
import InkArt from './InkArt';

type Props = {
  arc: { title: string; intro: string; acts: ArcAct[] };
  lang: Lang;
};

/** Each stage is stamped with the engraving and the ink of the role it grew from */
const STAGE_ART: Array<{ art: string; tone: InkTone }> = [
  { art: 'ink-remesas', tone: 'teal' },
  { art: 'ink-bi', tone: 'blue' },
  { art: 'ink-data', tone: 'blue' },
];

/**
 * The career told as three stages (kept running, measured, built) so a recruiter
 * reads the thread before the ledger: what each stage was, what it taught, and
 * the proof. Copy lives in profile-*.ts (`arc`).
 */
export default function CareerArc({ arc, lang }: Props) {
  const today = lang === 'en' ? 'today' : 'hoy';
  return (
    <section id="arc" data-outline={arc.title} className="mt-14 scroll-mt-24" aria-labelledby="arc-title">
      <h2 id="arc-title" className="font-display n-text text-3xl">{arc.title}</h2>
      <p className="n-muted mt-1 max-w-xl text-sm">{arc.intro}</p>
      <ol className="mt-6 grid border-t border-n-border md:grid-cols-3">
        {arc.acts.map((act, i) => {
          const stage = STAGE_ART[i] ?? STAGE_ART[STAGE_ART.length - 1];
          const ink = INK_TEXT[stage.tone];
          const last = i === arc.acts.length - 1;
          return (
            <li key={act.title} className={`relative py-6 md:pr-6 ${i > 0 ? 'border-t border-n-border md:border-l md:border-t-0 md:pl-6' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <p className="n-muted text-xs tabular-nums">
                  {act.period}
                  {last && <span className="text-n-highlight"> {today}</span>}
                </p>
                <InkArt name={stage.art} className={`h-14 w-14 shrink-0 ${ink}`} />
              </div>
              <h3 className="font-display n-text -mt-4 text-2xl leading-tight">{act.title}</h3>
              <p className="n-muted mt-3 text-sm leading-relaxed">{act.text}</p>
              <p className={`mt-4 border-t border-n-border pt-3 text-sm leading-snug ${ink}`}>{act.proof}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
