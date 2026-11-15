import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { Lang, ProfileData } from '../../types';
import { sfx } from '../../audio/engine';
import { buildSlides } from './slides';

/**
 * Interview mode (/resume?present): the resume as seven printed sheets, one idea
 * each, for sharing a screen on a call. Every word comes from the profile data.
 * Between sheets the same filmed ink drop as the page change (InkTransition)
 * blooms through a sheet of paper; with reduced motion the sheet just changes.
 */
const STRIP = `${import.meta.env.BASE_URL}ink/splash.webp`;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Props = { data: ProfileData; lang: Lang; onClose: () => void };

export default function Presentation({ data, lang, onClose }: Props) {
  const en = lang === 'en';
  const slides = useMemo(() => buildSlides(data, lang), [data, lang]);
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [bloom, setBloom] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stripReady = useRef(false);
  const touchX = useRef<number | null>(null);

  const t = en
    ? { label: `Presentation: ${data.name}`, exit: 'Exit presentation', prev: 'Previous slide', next: 'Next slide', of: 'of', slide: 'slide', hint: 'Arrow keys or swipe to move, Esc to exit' }
    : { label: `Presentación: ${data.name}`, exit: 'Salir de la presentación', prev: 'Diapositiva anterior', next: 'Diapositiva siguiente', of: 'de', slide: 'diapositiva', hint: 'Flechas o deslizar para avanzar, Esc para salir' };

  const go = useCallback(
    (to: number) => {
      const next = Math.max(0, Math.min(total - 1, to));
      if (next === index) return;
      setIndex(next);
      if (stripReady.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setBloom(n => n + 1);
        sfx('ink'); // no-op while sound is off
      }
      dialogRef.current?.querySelector('[data-present-scroll]')?.scrollTo({ top: 0 });
    },
    [index, total],
  );

  // Fetch the ink strip (usually already cached by the page transition)
  useEffect(() => {
    const img = new Image();
    img.onload = () => { stripReady.current = true; };
    img.src = STRIP;
  }, []);

  // Full screen when the browser allows it (it needs a click: from a shared link it
  // simply stays a full-window overlay). Leaving full screen with the browser's own
  // control closes the presentation too.
  useEffect(() => {
    const el = dialogRef.current;
    let entered = false;
    const onChange = () => {
      if (document.fullscreenElement) entered = true;
      else if (entered) onClose();
    };
    document.addEventListener('fullscreenchange', onChange);
    if (el?.requestFullscreen && document.fullscreenEnabled && !document.fullscreenElement) {
      el.requestFullscreen().catch(() => { /* not allowed without a gesture: stay an overlay */ });
    }
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, [onClose]);

  // Modal: lock the page behind, move focus in, give it back on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    sfx('open');
    return () => {
      document.body.style.overflow = overflow;
      sfx('close');
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const onControl = (e.target as HTMLElement | null)?.closest?.('a, button');
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onClose();
          return;
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          go(index + 1);
          return;
        case ' ':
          if (onControl) return; // Space presses the focused button or link
          e.preventDefault();
          go(index + (e.shiftKey ? -1 : 1));
          return;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          go(index - 1);
          return;
        case 'Home':
          e.preventDefault();
          go(0);
          return;
        case 'End':
          e.preventDefault();
          go(total - 1);
          return;
        case 'Tab': {
          const nodes = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(n => n.offsetParent !== null);
          if (!nodes.length) return;
          const first = nodes[0];
          const last = nodes[nodes.length - 1];
          const active = document.activeElement;
          if (e.shiftKey && (active === first || active === dialogRef.current)) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [go, index, total, onClose]);

  const slide = slides[index];
  const inkStyle = { '--ink-splash': `url(${STRIP})` } as CSSProperties;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.label}
      tabIndex={-1}
      className="present fixed inset-0 z-[80] flex flex-col bg-n-bg text-n-text outline-none"
      onTouchStart={e => { touchX.current = e.touches[0]?.clientX ?? null; }}
      onTouchEnd={e => {
        const start = touchX.current;
        touchX.current = null;
        const end = e.changedTouches[0]?.clientX;
        if (start === null || end === undefined) return;
        const dx = end - start;
        if (Math.abs(dx) > 56) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <header className="flex items-center justify-between gap-4 border-b border-n-border px-4 py-2.5 sm:px-8">
        <p className="font-display truncate text-lg">Khristian Garcia</p>
        <p className="n-muted hidden text-xs md:block">{t.hint}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.exit}
          className="n-text -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-n-hover n-focus"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>

      <div className="relative min-h-0 flex-1">
        <div data-present-scroll className="present-stage absolute inset-0 overflow-y-auto overscroll-contain">
          <section
            key={index}
            aria-roledescription={t.slide}
            aria-label={`${index + 1} ${t.of} ${total}`}
            className="present-slide mx-auto flex min-h-full w-full max-w-[84rem] flex-col justify-center px-5 py-8 sm:px-10 md:px-14 md:py-7"
          >
            {slide.body}
          </section>
        </div>
        {bloom > 0 && (
          <div key={bloom} aria-hidden="true" className="ink-sheet present-ink" style={inkStyle} onAnimationEnd={() => setBloom(0)} />
        )}
      </div>

      <footer className="flex items-center justify-between gap-4 border-t border-n-border px-4 py-2.5 sm:px-8">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label={t.prev}
          className="n-text inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-n-hover disabled:opacity-30 n-focus"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className="font-display text-lg tabular-nums" aria-hidden="true">
          {index + 1} <span className="n-muted font-sans text-sm">/ {total}</span>
        </p>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
          aria-label={t.next}
          className="n-text inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-n-hover disabled:opacity-30 n-focus"
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </footer>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {`${slide.title}, ${index + 1} ${t.of} ${total}`}
      </p>
    </div>
  );
}
