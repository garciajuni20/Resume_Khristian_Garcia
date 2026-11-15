import { useMemo } from 'react';
import type { Lang } from '../../types';
import { INK_TEXT, INK_TONES, figureRuns, inkFigures } from '../../data/ink';
import { guillocheRule } from '../../utils/guilloche';

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
 * The three figures of the resume under a guilloché band in the five inks, the
 * same on Home and /resume. With `notes`, each figure links to its source note
 * (#nota-n), which only /resume prints.
 */
export default function InkFigures({ lang, notes = false, className = '' }: { lang: Lang; notes?: boolean; className?: string }) {
  const en = lang === 'en';
  const figures = inkFigures(lang);
  const band = useMemo(() => guillocheRule(1400, 7, INK_TONES.length, 18), []);

  return (
    <div className={className}>
      <div className="h-[7px] overflow-hidden" aria-hidden="true">
        <svg width={1400} height={7} className="block">
          {band.map((d, i) => (
            <path key={i} d={d} fill="none" strokeWidth={0.7} style={{ stroke: `var(--ink-${INK_TONES[i]})` }} />
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
            <p className="n-text mt-3 text-sm">{f.label}</p>
            <p className="n-muted mt-0.5 text-xs">{f.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
