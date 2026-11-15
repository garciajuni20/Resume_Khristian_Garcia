import type { ReactNode } from 'react';

import { slugify } from '../utils/slug';

type Props = {
  title: string;
  /** One line under the heading; keep it factual */
  intro?: string;
  /** Right-aligned detail, e.g. a count */
  aside?: ReactNode;
  children: ReactNode;
};

/**
 * Page section with a Notion-style heading: hover anchor, optional intro and
 * aside. The `data-outline` attribute is what PageOutline reads to build the
 * "On this page" list, so every Section is automatically navigable.
 */
export default function Section({ title, intro, aside, children }: Props) {
  const id = slugify(title);
  return (
    <section id={id} data-outline={title} className="mt-14 scroll-mt-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="group n-text text-2xl font-semibold tracking-tight">
            <a href={`#${id}`} className="relative" onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span className="n-muted absolute -left-6 top-0 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inline" aria-hidden="true">#</span>
              {title}
            </a>
          </h2>
          {intro && <p className="n-muted mt-1 text-sm">{intro}</p>}
        </div>
        {aside && <div className="n-muted shrink-0 font-mono-geist text-xs">{aside}</div>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
