import type { ExperienceItem, Lang } from '../../types';
import { INK_TEXT, INK_TONE, inkMonth } from '../../data/ink';
import InkArt from './InkArt';
import { roleStatus, statusLabel } from '../../utils/roleStatus';

type Props = {
  item: ExperienceItem;
  /** Engraving to stamp beside the year: only on the first role of each industry */
  art?: string | null;
  /** An earlier role at the same employer, right under the later one: a dashed rule ties them */
  continued?: boolean;
  lang: Lang;
  onOpen: (item: ExperienceItem) => void;
};

/**
 * One role in the resume ledger: the year in Bodoni on the left, the role and its
 * story on the right (one sentence of situation, then what changed). The whole row opens the detail; the real
 * control is the "details" button, stretched over the row for pointer users.
 */
export default function InkEntry({ item, art, continued = false, lang, onOpen }: Props) {
  const en = lang === 'en';
  const status = roleStatus(item);
  const label = statusLabel(item, lang);
  const ink = INK_TEXT[INK_TONE[item.id] ?? 'blue'];

  return (
    <article className={`group relative grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-4 border-t border-n-border py-6 ${continued ? 'border-dashed' : ''} transition-colors duration-300 hover:bg-n-hover sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-6 sm:px-2`}>
      <div>
        <p className={`font-display text-3xl leading-none sm:text-4xl ${ink}`}>{item.start.slice(0, 4)}</p>
        <p className="n-muted mt-2 text-xs leading-relaxed">
          {inkMonth(item.start, lang)}
          {status !== 'upcoming' && (
            <>
              {' –'}
              <br />
              {inkMonth(item.end, lang)}
            </>
          )}
        </p>
        {art && <InkArt name={art} className={`mt-3 h-11 w-11 sm:h-14 sm:w-14 ${ink}`} />}
      </div>

      <div className="min-w-0">
        <h3 className="n-text font-semibold leading-snug">{item.role}</h3>
        <p className="n-text mt-0.5 text-sm">{item.company}</p>
        <p className="n-muted mt-1 text-xs">
          {item.industry ? `${item.industry}. ` : ''}
          {item.location}
          {label && <span className={status === 'current' ? 'text-n-highlight' : 'n-text'}>. {label}</span>}
        </p>

        {item.story ? (
          <>
            <p className="n-muted mt-4 text-sm leading-relaxed">{item.story.lead}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {item.story.wins.map(w => (
                <li key={w} className="grid grid-cols-[1rem_minmax(0,1fr)] leading-relaxed">
                  <span className={ink} aria-hidden="true">–</span>
                  <span className="n-text">{w}</span>
                </li>
              ))}
            </ul>
          </>
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
