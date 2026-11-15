import { useEffect, useRef } from 'react';
import type { Lang } from '../types';

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window { turnstile?: TurnstileApi }
}

/** Public site key, set at build time in Cloudflare Pages (VITE_TURNSTILE_SITE_KEY) */
export const TURNSTILE_SITE_KEY: string | undefined = import.meta.env.VITE_TURNSTILE_SITE_KEY;

let loading: Promise<void> | null = null;
function loadScript(): Promise<void> {
  loading ??= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('turnstile'));
    document.head.appendChild(s);
  });
  return loading;
}

/**
 * Cloudflare Turnstile: a bot check that usually passes without asking the
 * visitor anything. Renders only when a site key is configured.
 */
export default function Turnstile({ lang, onToken, resetKey }: { lang: Lang; onToken: (t: string) => void; resetKey: number }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const tokenCb = useRef(onToken);
  useEffect(() => { tokenCb.current = onToken; }, [onToken]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !box.current) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !box.current || !window.turnstile) return;
        widget.current = window.turnstile.render(box.current, {
          sitekey: TURNSTILE_SITE_KEY,
          language: lang,
          theme: 'auto',
          size: 'flexible',
          callback: (t: string) => tokenCb.current(t),
          'expired-callback': () => tokenCb.current(''),
        });
      })
      .catch(() => { /* the server rejects the message, the form shows its error */ });
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [lang]);

  // A new token after each send
  useEffect(() => {
    if (resetKey > 0 && widget.current) window.turnstile?.reset(widget.current);
  }, [resetKey]);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={box} className="min-h-[65px]" />;
}
