import { useEffect } from 'react';
import { sfx, type Sfx } from '../audio/engine';

/**
 * Gives every control on the site a voice without touching each component:
 * one set of delegated listeners on the document.
 *
 * - Pointer hover over a control: a faint glass tick (mouse only, throttled).
 * - Click or keyboard activation: a mallet note whose pitch follows the
 *   control's horizontal position, so a row of buttons plays up the scale
 *   left to right, like a marimba.
 * - Typing in a field: a soft key click.
 *
 * Overrides, on the element or any ancestor:
 *   data-sfx="none"            silent (the control has its own sound elsewhere)
 *   data-sfx="open" | "note:3" | any Sfx name, optionally "name:degree"
 *   data-sfx-hover="note:3"    a specific sound on hover instead of the tick
 *
 * Everything is a no-op while sound is off (the engine checks).
 */

const CONTROL = 'a[href], button, [role="button"], [role="option"], [role="tab"], summary, select, input[type="checkbox"], input[type="radio"]';

function parse(spec: string): [Sfx, number | undefined] {
  const [name, deg] = spec.split(':');
  return [name as Sfx, deg === undefined ? undefined : Number(deg)];
}

function xOf(el: Element): number {
  const r = el.getBoundingClientRect();
  return Math.min(1, Math.max(0, (r.left + r.width / 2) / window.innerWidth));
}

/** In-app route links (HashRouter): the page's arrival chime plays instead */
function isRouteLink(el: Element): boolean {
  if (!(el instanceof HTMLAnchorElement)) return false;
  const href = el.getAttribute('href') ?? '';
  return href.startsWith('#/') && !el.target;
}

export default function SoundEffects() {
  useEffect(() => {
    let lastHovered: Element | null = null;

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const target = e.target as Element | null;
      const el = target?.closest?.(`[data-sfx-hover], ${CONTROL}`);
      if (!el || el === lastHovered) return;
      lastHovered = el;
      if ((el as HTMLButtonElement).disabled) return;
      const spec = el.getAttribute('data-sfx-hover');
      if (spec === 'none') return;
      if (spec) {
        const [name, degree] = parse(spec);
        sfx(name, { degree, x: xOf(el) });
        return;
      }
      sfx('hover', { x: xOf(el) });
    };
    const onOut = (e: PointerEvent) => {
      const related = e.relatedTarget as Element | null;
      if (lastHovered && !(related && lastHovered.contains(related))) lastHovered = null;
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const override = target.closest('[data-sfx]');
      const control = target.closest(CONTROL);
      // An override only applies to the control it sits on or wraps
      if (override && (!control || override.contains(control) || control.contains(override))) {
        const spec = override.getAttribute('data-sfx')!;
        if (spec === 'none') return;
        const [name, degree] = parse(spec);
        sfx(name, { degree, x: xOf(override) });
        return;
      }
      if (!control || (control as HTMLButtonElement).disabled || isRouteLink(control)) return;
      sfx('tap', { x: xOf(control) });
    };

    const onInput = (e: Event) => {
      const t = e.target;
      if (t instanceof HTMLTextAreaElement || (t instanceof HTMLInputElement && /^(text|email|search|url|tel|)$/.test(t.type))) sfx('key');
    };

    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    document.addEventListener('click', onClick, { capture: true, passive: true });
    document.addEventListener('input', onInput, { passive: true });
    return () => {
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.removeEventListener('click', onClick, { capture: true });
      document.removeEventListener('input', onInput);
    };
  }, []);

  return null;
}
