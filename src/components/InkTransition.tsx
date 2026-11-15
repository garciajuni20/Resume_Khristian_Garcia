import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
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
export const INK_TRANSITION_FRAMES = 40; // keep in step with index.css (.ink-transition)

export default function InkTransition() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);
  const ready = useRef(false);
  const sheet = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Fetch the strip once the first page has settled
  useEffect(() => {
    const id = window.setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        ready.current = true;
        setLoaded(true);
      };
      img.src = SRC;
    }, 1500);
    return () => window.clearTimeout(id);
  }, []);

  // Layout effect, and the class set on the element directly: the sheet is
  // painted in the same frame as the new page, so the page never flashes
  // uncovered before the ink starts. Restarting the class replays the bloom.
  useLayoutEffect(() => {
    if (pathname === previous.current) return;
    previous.current = pathname;
    document.documentElement.dataset.navigated = ''; // see .ink-print in index.css
    const el = sheet.current;
    if (!el || !ready.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.remove('is-running');
    void el.offsetWidth; // restart the animation when pages change mid-bloom
    el.classList.add('is-running');
    sfx('ink'); // no-op while sound is off
  }, [pathname]);

  // Until the strip is cached the sheet stays out of the page. After that it is
  // always laid out, parked on the last (fully clear) frame, so the browser
  // keeps the mask decoded and the first frame shows without a delay.
  if (!loaded) return null;
  const style = { '--ink-strip': `url(${SRC})`, '--ink-frames': INK_TRANSITION_FRAMES } as CSSProperties;
  return (
    <div
      ref={sheet}
      aria-hidden="true"
      className="ink-transition"
      style={style}
      onAnimationEnd={e => e.currentTarget.classList.remove('is-running')}
    />
  );
}
