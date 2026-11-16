import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { useHydrated } from '../utils/useHydrated';
import { useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useLang } from './LanguageContext';
import * as audio from '../audio/engine';
import type { Track } from '../audio/engine';

/**
 * Site-wide sound: a melody per page plus interface effects (src/audio/engine.ts).
 *
 * Off until the visitor turns it on (browsers block audible autoplay, and a
 * recruiter at the office should never be surprised); no audio file is
 * downloaded before that. Each page has its own track, crossfaded on
 * navigation, all in one key so the change feels like a new movement rather
 * than a new song. Music steps aside while any audible video plays (the career
 * film) and while the tab is hidden.
 */

const KEY = 'portfolio_sound';
const HINT_KEY = 'portfolio_sound_hint';

/** Page → track, and the scale degree its navigation chime is rooted on */
const PAGES: Record<string, { track: Track; degree: number }> = {
  '/': { track: 'home', degree: 0 },
  '/resume': { track: 'resume', degree: 1 },
  '/projects': { track: 'projects', degree: 2 },
  '/flowber': { track: 'flowber', degree: 3 },
  '/alleviate': { track: 'projects', degree: 2 },
  '/contact': { track: 'contact', degree: 4 },
};
const LOST = { track: 'notfound' as Track, degree: -2 };

interface SoundContextValue {
  on: boolean;
  /** Music is actually audible right now (on, not ducked, not paused by the browser) */
  playing: boolean;
  toggle: () => void;
  /** First visit and no choice made yet: show the invitation */
  showHint: boolean;
  dismissHint: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

function read(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function write(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* private mode: preference just isn't kept */ }
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(() => read(KEY) === 'on');
  const [showHint, setShowHint] = useState(() => read(KEY) === null && read(HINT_KEY) === null);
  const playing = useSyncExternalStore(audio.onMusicChange, audio.musicAudible, () => false);
  // Mirror of `on` for the global listeners; written where `on` changes, never during render
  const onRef = useRef(on);
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const { lang } = useLang();
  const page = PAGES[pathname] ?? LOST;

  const start = useCallback((seconds = 1.6) => {
    const woke = audio.unlock();
    audio.setEnabled(true);
    audio.setMusic(true, seconds);
    return woke;
  }, []);

  const toggle = useCallback(() => {
    const next = !onRef.current;
    onRef.current = next;
    setOn(next);
    write(KEY, next ? 'on' : 'off');
    setShowHint(false);
    // unlock() inside the click handler itself: iOS Safari only allows it there
    if (next) {
      start().then(() => audio.sfx('on'));
    } else {
      audio.sfx('off');
      audio.setMusic(false, 0.9);
      window.setTimeout(() => { if (!onRef.current) audio.setEnabled(false); }, 900);
    }
    window.gtag?.('event', 'sound_toggle', { state: next ? 'on' : 'off' });
  }, [start]);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    write(HINT_KEY, 'seen');
  }, []);

  // Saved "on" from an earlier visit: start on the first gesture of this one
  useEffect(() => {
    if (!on) return;
    const kick = () => { if (onRef.current) start(2.4); };
    const opts = { once: true, capture: true } as const;
    window.addEventListener('pointerdown', kick, opts);
    window.addEventListener('keydown', kick, opts);
    return () => {
      window.removeEventListener('pointerdown', kick, opts);
      window.removeEventListener('keydown', kick, opts);
    };
  }, [on, start]);

  // Each page its own melody, and its own chime on arrival
  const firstPage = useRef(true);
  useEffect(() => {
    audio.playTrack(page.track);
    if (firstPage.current) { firstPage.current = false; return; }
    audio.sfx('nav', { degree: page.degree });
  }, [page.track, page.degree]);

  // Theme and language each have a voice (skipped on first render)
  const prevTheme = useRef(theme);
  useEffect(() => {
    if (prevTheme.current === theme) return;
    prevTheme.current = theme;
    audio.sfx(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);
  const prevLang = useRef(lang);
  useEffect(() => {
    if (prevLang.current === lang) return;
    prevLang.current = lang;
    audio.sfx('lang', { degree: lang === 'es' ? 1 : 0 });
  }, [lang]);

  // Step aside for audible videos; come back when they stop
  useEffect(() => {
    const isAudible = (t: EventTarget | null): t is HTMLVideoElement =>
      t instanceof HTMLVideoElement && !t.muted;
    const onPlay = (e: Event) => { if (isAudible(e.target)) audio.duck(true); };
    const onStop = (e: Event) => { if (isAudible(e.target)) audio.duck(false); };
    document.addEventListener('play', onPlay, true);
    document.addEventListener('pause', onStop, true);
    document.addEventListener('ended', onStop, true);
    return () => {
      document.removeEventListener('play', onPlay, true);
      document.removeEventListener('pause', onStop, true);
      document.removeEventListener('ended', onStop, true);
    };
  }, []);

  // Silent in background tabs
  useEffect(() => {
    const onVis = () => audio.setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => () => { audio.setMusic(false, 0.1); audio.setEnabled(false); }, []);

  // The saved choice shows once hydrated: the prerendered HTML has sound off and no hint
  const hydrated = useHydrated();
  const value = useMemo(
    () => ({ on: hydrated && on, playing, toggle, showHint: hydrated && showHint, dismissHint }),
    [hydrated, on, playing, toggle, showHint, dismissHint],
  );
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}
