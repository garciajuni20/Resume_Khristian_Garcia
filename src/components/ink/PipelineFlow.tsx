import { useEffect, useRef, useState, type CSSProperties } from 'react';

type Stage = { name: string; items: string[]; proof: string };

/**
 * The Alleviate data platform as an engraved pipe: sources, ingestion,
 * warehouse, transformation, consumption. When the diagram first comes into
 * view one drop of ink runs through it, stage by stage, and each valve fills as
 * the drop reaches it. Left to right on desktop, top to bottom on a phone.
 *
 * Every stage's tools and proof are plain text in the DOM (screen readers read
 * them in order); hovering or focusing a stage only inks its valve and proof.
 * The motion is CSS on transform/opacity (pipe-* in index.css), and with
 * reduced motion the pipe is simply printed full.
 */
export default function PipelineFlow({ stages, label }: { stages: Stage[]; label: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || run) return;
    if (!('IntersectionObserver' in window)) {
      const id = requestAnimationFrame(() => setRun(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      hits => {
        if (hits.some(h => h.isIntersecting)) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [run]);

  return (
    <ol ref={ref} aria-label={label} data-run={run || undefined} className="pipe mt-8 grid text-ink-blue lg:grid-cols-5">
      {stages.map((s, i) => (
        <li
          key={s.name}
          tabIndex={0}
          style={{ '--i': i } as CSSProperties}
          className="pipe-stage group relative pb-8 pl-9 outline-none lg:pb-0 lg:pl-0 lg:pr-6 lg:pt-10"
        >
          <span className="pipe-node" aria-hidden="true" />
          {i < stages.length - 1 && (
            <span className="pipe-seg" aria-hidden="true">
              <span className="pipe-fill" />
              <span className="pipe-carrier">
                <span className="pipe-drop" />
              </span>
            </span>
          )}
          <p className="font-display text-xl leading-tight decoration-current underline-offset-4 group-hover:underline group-focus-visible:underline">
            {s.name}
          </p>
          <p className="n-text mt-2 text-sm font-medium">{s.items[0]}</p>
          {s.items.length > 1 && <p className="n-muted mt-1 text-sm leading-relaxed">{s.items.slice(1).join(', ')}</p>}
          <p className="pipe-proof n-muted mt-3 border-t border-n-border pt-2 text-sm leading-snug">{s.proof}</p>
        </li>
      ))}
    </ol>
  );
}
