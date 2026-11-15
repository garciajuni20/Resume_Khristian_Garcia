import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import { sfx } from '../audio/engine';

/**
 * Page change as ink on paper: a sheet in the page's paper colour covers the new
 * page, and a drop of ink blooms through it until the page is fully printed.
 * The ink is the splash a real drop left on paper, filmed by Wan 2.2 on this
 * machine (scripts/ink-splash.py): one 26 KB mask the browser grows smoothly,
 * no video, no canvas, no main-thread work.
 * Skipped with reduced motion, on the first load, and until the strip is cached.
 */
export const INK_SPLASH = `${import.meta.env.BASE_URL}ink/splash.webp`;
const SRC = INK_SPLASH;

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
  // always laid out, parked fully grown (the sheet clear), so the browser
  // keeps the mask decoded and the bloom starts without a delay.
  if (!loaded) return null;
  const style = { '--ink-splash': `url(${SRC})` } as CSSProperties;
  return (
    <div
      ref={sheet}
      aria-hidden="true"
      className="ink-sheet ink-transition"
      style={style}
      onAnimationEnd={e => e.currentTarget.classList.remove('is-running')}
    />
  );
}
