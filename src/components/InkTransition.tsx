import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import { sfx } from '../audio/engine';

/**
 * Page change as ink on paper: a sheet in the page's paper colour covers the new
 * page, and a drop of ink blooms through it until the page is fully printed.
 * The bloom is a real ink drop filmed by Wan 2.2 on this machine, cut into
 * frames and baked into one mask strip (scripts/ink-transition.py), so the
 * browser only steps a mask position: no video, no canvas, no main-thread work.
 * Skipped with reduced motion, on the first load, and until the strip is cached.
 */
const SRC = `${import.meta.env.BASE_URL}ink/transition.webp`;
export const INK_TRANSITION_FRAMES = 16;

export default function InkTransition() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);
  const ready = useRef(false);
  const [run, setRun] = useState(0);

  // Fetch the strip once the first page has settled
  useEffect(() => {
    const id = window.setTimeout(() => {
      const img = new Image();
      img.onload = () => { ready.current = true; };
      img.src = SRC;
    }, 1500);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (pathname === previous.current) return;
    previous.current = pathname;
    if (!ready.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const frame = requestAnimationFrame(() => {
      setRun(n => n + 1);
      sfx('ink'); // no-op while sound is off
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  if (!run) return null;
  const style = { '--ink-strip': `url(${SRC})`, '--ink-frames': INK_TRANSITION_FRAMES } as CSSProperties;
  return <div key={run} aria-hidden="true" className="ink-transition" style={style} onAnimationEnd={() => setRun(0)} />;
}
