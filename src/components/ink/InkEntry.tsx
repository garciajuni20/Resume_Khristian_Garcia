import type { ExperienceItem, Lang } from '../../types';
import { inkMonth } from '../../data/ink';
import InkArt from './InkArt';

type Props = {
  item: ExperienceItem;
  /** Engraving to stamp beside the year: only on the first role of each industry */
  art?: string | null;
  lang: Lang;
  onOpen: (item: ExperienceItem) => void;
};

/**
 * One role in the resume ledger: the year in Bodoni on the left, the role and its
 * context, how and result on the right. The whole row opens the detail; the real
 * control is the "details" button, stretched over the row for pointer users.
 */
export default function InkEntry({ item, art, lang, onOpen }: Props) {
  const en = lang === 'en';
  const now = item.end === 'present';
  const beats = item.approach
    ? ([
        [en ? 'Context' : 'Contexto', item.approach.context, false],
        [en ? 'How' : 'Cómo', item.approach.how, false],
        [item.approach.planned ? (en ? 'Goal' : 'Meta') : en ? 'Result' : 'Resultado', item.approach.result, true],
      ] as const)
    : null;

  return (
    <article className="group relative grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-4 border-t border-n-border py-6 transition-colors duration-300 hover:bg-n-hover sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-6 sm:px-2">
      <div>
        <p className="font-display text-3xl leading-none sm:text-4xl">{item.start.slice(0, 4)}</p>
        <p className="n-muted mt-2 text-xs leading-relaxed">
          {inkMonth(item.start, lang)} –<br />
          {inkMonth(item.end, lang)}
        </p>
        {art && <InkArt name={art} className="mt-3 h-11 w-11 sm:h-14 sm:w-14" />}
      </div>

      <div className="min-w-0">
        <h3 className="n-text font-semibold leading-snug">{item.role}</h3>
        <p className="n-text mt-0.5 text-sm">{item.company}</p>
        <p className="n-muted mt-1 text-xs">
          {item.industry ? `${item.industry}. ` : ''}
          {item.location}
          {now && <span className="text-n-accent-2">. {en ? 'Current' : 'Actual'}</span>}
        </p>

        {beats ? (
          <dl className="mt-4 grid gap-y-2 text-sm sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-x-4">
            {beats.map(([label, text, result]) => (
              <div key={label} className="contents">
                <dt className={`text-xs font-medium sm:pt-0.5 ${result ? 'text-n-accent-2' : 'n-muted'}`}>{label}</dt>
                <dd className="n-text mb-1 leading-relaxed sm:mb-0">{text}</dd>
              </div>
            ))}
          </dl>
        ) : (
          item.bullets?.[0] && <p className="n-text mt-4 text-sm leading-relaxed">{item.bullets[0]}</p>
        )}

        <button
          type="button"
          onClick={() => onOpen(item)}
          data-sfx="none"
          className="n-muted mt-4 text-xs underline decoration-n-border underline-offset-4 transition-colors duration-300 after:absolute after:inset-0 group-hover:text-n-text group-hover:decoration-current n-focus"
        >
          {en ? 'Details' : 'Ver detalle'}
          <span className="sr-only">: {item.role}, {item.company}</span>
        </button>
      </div>
    </article>
  );
}
