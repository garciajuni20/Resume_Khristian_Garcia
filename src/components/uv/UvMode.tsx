import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { UvContext } from './uvContext';
import UvFibers from './UvFibers';

const KEY = 'portfolio_uv';

function readSaved(): boolean {
  try {
    return sessionStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
}

/** Typing in a field must never flip the mode */
function isEditable(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
}

/**
 * UV light mode, like a banknote under ultraviolet light: the paper turns a
 * little violet, fluorescent fibers appear and the hidden source notes
 * (`.uv-note`) show up. State lives on <html data-uv="on"> so plain CSS can
 * react; kept for the session only. Shortcut: `u`, or the footer button.
 */
export default function UvMode({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(readSaved);
  const toggle = useCallback(() => setOn(v => !v), []);

  useEffect(() => {
    const root = document.documentElement;
    if (on) root.dataset.uv = 'on';
    else delete root.dataset.uv;
    try {
      sessionStorage.setItem(KEY, on ? 'on' : 'off');
    } catch {
      /* private mode: the choice just isn't kept */
    }
  }, [on]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'u' || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable(e.target)) return;
      toggle();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [toggle]);

  const value = useMemo(() => ({ on, toggle }), [on, toggle]);
  return (
    <UvContext.Provider value={value}>
      {children}
      {on && <UvFibers />}
    </UvContext.Provider>
  );
}
