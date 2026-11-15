import { useEffect, useState } from 'react';
import type { Lang } from '../types';

type Entry = { id: string; title: string };

/**
 * "On this page" rail (Notion's table of contents). Reads every
 * `<section data-outline>` after render, highlights the one in view and
 * scrolls smoothly on click. Desktop only; on smaller screens the headings
 * themselves are the navigation.
 */
export default function PageOutline({ lang }: { lang: Lang }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    // Sections render in the same pass as this rail; read them on the next frame so the
    // DOM is complete and the update is asynchronous (no cascading render).
    let io: IntersectionObserver | undefined;
    const frame = requestAnimationFrame(() => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('section[data-outline]'));
      setEntries(nodes.map(n => ({ id: n.id, title: n.dataset.outline ?? n.id })));
      if (nodes.length === 0) return;
      io = new IntersectionObserver(
      hits => {
        // The topmost visible section wins; keep the previous one when nothing is visible
        const visible = hits.filter(h => h.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive((visible[0].target as HTMLElement).id);
      },
        { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
      );
      nodes.forEach(n => io?.observe(n));
    });
    return () => {
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, [lang]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label={lang === 'en' ? 'On this page' : 'En esta página'} className="hidden xl:block">
      <div className="fixed right-[max(1rem,calc((100vw-72rem)/2-11rem))] top-28 w-40">
        <p className="n-muted mb-2 font-mono-geist text-[10px] uppercase tracking-wider">{lang === 'en' ? 'On this page' : 'En esta página'}</p>
        <ol className="n-border space-y-0.5 border-l">
          {entries.map(e => {
            const isActive = e.id === active;
            return (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={ev => { ev.preventDefault(); document.getElementById(e.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className={`-ml-px block border-l py-1 pl-3 text-xs transition-colors duration-200 ${
                    isActive ? 'n-text border-n-text font-semibold' : 'n-muted border-transparent hover:text-n-text'
                  }`}
                >
                  {e.title}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
