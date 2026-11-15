import { useId, useMemo } from 'react';
import type { Lang } from '../../types';
import { INK_TEXT, INK_TONES, figureRuns, inkFigures, inkNotes } from '../../data/ink';
import { guillocheRing, guillocheRule } from '../../utils/guilloche';

/** A figure in Bodoni, with the glyphs Bodoni draws poorly set in Geist */
function Figure({ text }: { text: string }) {
  return (
    <>
      {figureRuns(text).map((r, i) =>
        r.sans ? <span key={i} className="font-sans text-[0.7em] font-light">{r.text}</span> : <span key={i}>{r.text}</span>,
      )}
    </>
  );
}

/**
 * "Verified" seal: a small guilloché stamp beside a figure's label. Hover or
 * keyboard focus (a tap on touch) shows where the number comes from; screen
 * readers get it as the control's description. On /resume it also jumps to the
 * numbered note.
 */
function Seal({ source, href, label, tone }: { source: string; href?: string; label: string; tone: string }) {
  const tip = useId();
  const ring = useMemo(() => guillocheRing({ cx: 10, cy: 10, rx: 7.2, ry: 7.2, width: 2.4, strands: 3, lobes: 16, steps: 160 }), []);
  const mark = (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" aria-hidden="true">
      {ring.strands.map((d, i) => <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth={0.45} />)}
      <path d="M6.6 10.3l2.2 2.2 4.6-4.9" fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const cls = `seal-btn inline-flex rounded-full n-focus ${tone}`;
  return (
    <span className="seal relative ml-1.5 inline-flex align-[-0.25em]">
      {href ? (
        <a href={href} className={cls} aria-describedby={tip} aria-label={label}>{mark}</a>
      ) : (
        <button type="button" className={cls} aria-describedby={tip} aria-label={label} data-sfx="none">{mark}</button>
      )}
      <span role="tooltip" id={tip} className="seal-tip n-text pointer-events-none absolute top-full -left-2 z-20 mt-2 w-64 max-w-[calc(100vw-3rem)] rounded-md border border-n-border bg-n-bg px-3 py-2 text-xs leading-relaxed shadow-sm">
        {source}
      </span>
    </span>
  );
}

/**
 * The three figures of the resume under a guilloché band in the five inks, the
 * same on Home and /resume. With `notes`, each figure links to its source note
 * (#nota-n), which only /resume prints.
 */
export default function InkFigures({ lang, notes = false, className = '' }: { lang: Lang; notes?: boolean; className?: string }) {
  const en = lang === 'en';
  const figures = inkFigures(lang);
  const sources = inkNotes(lang).map(n => n.replace(/[:\s]+$/, ''));
  const band = useMemo(() => guillocheRule(1400, 7, INK_TONES.length, 18), []);

  return (
    <div className={className}>
      <div className="h-[7px] overflow-hidden" aria-hidden="true">
        <svg width={1400} height={7} className="ink-thread block">
          {band.map((d, i) => (
            <path key={i} d={d} pathLength={1} fill="none" strokeWidth={0.7} style={{ stroke: `var(--ink-${INK_TONES[i]})` }} />
          ))}
        </svg>
      </div>
      <div className="grid border-b border-n-border sm:grid-cols-3">
        {figures.map((f, i) => (
          <div key={f.n} className={`py-5 sm:px-6 ${i === 0 ? 'sm:pl-0' : 'border-t border-n-border sm:border-t-0 sm:border-l'}`}>
            <p className={`font-display whitespace-nowrap text-4xl leading-none tabular-nums sm:text-[1.85rem] lg:text-[2.3rem] ${INK_TEXT[f.tone]}`}>
              <Figure text={f.value[0]} />
              {f.value[1] && (
                <>
                  <span className="n-muted mx-1.5 align-[0.12em] font-sans text-[0.55em]">
                    <span aria-hidden="true">→</span>
                    <span className="sr-only">{en ? ' to ' : ' a '}</span>
                  </span>
                  <Figure text={f.value[1]} />
                </>
              )}
              {notes && (
                <a href={`#nota-${f.n}`} className={`ml-1 align-super font-sans text-sm n-focus ${INK_TEXT[f.tone]}`} aria-label={en ? `Note ${f.n}` : `Nota ${f.n}`}>
                  {f.n}
                </a>
              )}
            </p>
            <p className="n-text mt-3 text-sm">
              {f.label}
              <Seal
                source={sources[f.n - 1]}
                href={notes ? `#nota-${f.n}` : undefined}
                label={en ? `Source of this figure` : `Fuente de esta cifra`}
                tone={INK_TEXT[f.tone]}
              />
            </p>
            <p className="n-muted mt-0.5 text-xs">{f.note}</p>
            {/* Shown only under UV light (UvMode): where the figure comes from */}
            <p className="uv-note mt-2 text-xs leading-relaxed">{sources[f.n - 1]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
