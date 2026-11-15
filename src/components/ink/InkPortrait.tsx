import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { useMotionValueEvent, useReducedMotion, useSpring } from 'framer-motion';
import { guillocheRing } from '../../utils/guilloche';
import { INK_TONES } from '../../data/ink';

/** Press-and-hold time, and how long a fine pointer must rest, before the light comes on */
const HOLD_MS = 350;
const REST_MS = 600;
const SPRING = { stiffness: 170, damping: 22, mass: 0.6 };

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * The portrait in a guilloché oval, like the portrait window of a banknote.
 * The frame is drawn in currentColor; the photo is a duotone already cut to an
 * oval (scripts/ink-assets.py).
 *
 * Held against the light: press and hold (or rest a mouse on it) and a soft
 * light spot follows the pointer, the paper brightens inside it and a
 * watermark appears there, the KG initials and the year the career started.
 * Decorative only: no tab stop, the image alt carries the meaning.
 */
export default function InkPortrait({ alt, width = 136, className = '' }: { alt: string; width?: number; className?: string }) {
  const height = Math.round(width * 1.25);
  const band = Math.max(3, Math.round(width / 18));
  const inset = band + 2;
  const ring = useMemo(
    () => guillocheRing({ cx: width / 2, cy: height / 2, rx: width / 2 - inset, ry: height / 2 - inset, width: band, strands: 5, lobes: 34 }),
    [width, height, band, inset],
  );

  const reduce = useReducedMotion();
  const [lit, setLit] = useState(false);
  const layer = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  // The light spot position in % of the window, eased by a spring
  const x = useSpring(50, SPRING);
  const y = useSpring(45, SPRING);
  // Written on the layer itself, so only that element restyles
  useMotionValueEvent(x, 'change', v => layer.current?.style.setProperty('--wx', `${v}%`));
  useMotionValueEvent(y, 'change', v => layer.current?.style.setProperty('--wy', `${v}%`));

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const aim = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce) return; // reduced motion: the light stays centred, no following
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    if (!lit) {
      // Light comes on where the pointer is, not sliding in from the last spot
      x.jump(px);
      y.jump(py);
    }
    x.set(px);
    y.set(py);
  };

  const later = (ms: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLit(true), ms);
  };
  const off = () => {
    window.clearTimeout(timer.current);
    setLit(false);
  };

  return (
    <div
      className={`watermark-host relative shrink-0 ${className}`}
      style={{ width, height }}
      onPointerDown={e => {
        aim(e);
        later(HOLD_MS);
      }}
      onPointerMove={e => {
        aim(e);
        // A mouse resting still lights it; any movement restarts the wait until lit
        if (e.pointerType === 'mouse' && !lit && finePointer()) later(REST_MS);
      }}
      onPointerUp={e => {
        if (e.pointerType !== 'mouse') off();
      }}
      onPointerLeave={off}
      onPointerCancel={off}
      onContextMenu={e => {
        if (lit) e.preventDefault();
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}ink/portrait-oval.webp`}
        alt={alt}
        width={480}
        height={600}
        draggable={false}
        className="absolute object-cover"
        style={{ top: inset, left: inset, width: width - inset * 2, height: height - inset * 2 }}
      />
      <div
        ref={layer}
        aria-hidden="true"
        data-lit={lit || undefined}
        className="watermark-layer absolute rounded-[50%]"
        style={{ top: inset, left: inset, width: width - inset * 2, height: height - inset * 2 }}
      >
        <span className="watermark-mark font-display" style={{ fontSize: Math.round(width * 0.42) }}>
          KG
          <span className="watermark-year" style={{ fontSize: Math.round(width * 0.14) }}>2019</span>
        </span>
      </div>
      <svg aria-hidden="true" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="pointer-events-none absolute inset-0 overflow-visible">
        <g fill="none" stroke="currentColor">
          {/* Five strands, one per industry ink: the career woven around the portrait */}
          {ring.strands.map((d, i) => (
            <path key={i} d={d} strokeWidth={0.6} style={{ stroke: `var(--ink-${INK_TONES[i % INK_TONES.length]})` }} />
          ))}
          <path d={ring.inner} strokeWidth={0.9} />
          <path d={ring.outer} strokeWidth={0.9} />
        </g>
      </svg>
    </div>
  );
}
