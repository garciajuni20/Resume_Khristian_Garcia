import React from 'react';
import { loadFont } from '@remotion/fonts';
import { AbsoluteFill, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

loadFont({ family: 'Geist', url: staticFile('fonts/Geist-Variable.woff2'), weight: '100 800' });
loadFont({ family: 'Geist Mono', url: staticFile('fonts/GeistMono-Variable.woff2'), weight: '100 800' });

export const C = {
  bg: '#111111',
  surface: '#1C1C1C',
  border: 'rgba(255,255,255,0.10)',
  text: '#F2F2F0',
  muted: '#9B9B9B',
  accent: '#529CCA',
  font: 'Geist, sans-serif',
  mono: '"Geist Mono", monospace',
} as const;

/** Mass-and-spring curve shared with the website */
export const FLUID = Easing.bezier(0.32, 0.72, 0, 1);

/** 0 → 1 over `dur` frames starting at `start`, eased */
export function useProgress(start: number, dur: number) {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: FLUID });
}

/** Heavy fade-up with blur, the same reveal the site uses */
export const Rise: React.FC<{ delay?: number; dur?: number; distance?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0,
  dur = 24,
  distance = 40,
  children,
  style,
}) => {
  const p = useProgress(delay, dur);
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * distance}px)`, filter: `blur(${(1 - p) * 10}px)`, ...style }}>
      {children}
    </div>
  );
};

/** Fades the whole scene out over its last frames so cuts feel continuous */
export const SceneFade: React.FC<{ duration: number; children: React.ReactNode }> = ({ duration, children }) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [duration - 12, duration], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const zoom = interpolate(frame, [duration - 12, duration], [1, 0.97], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ opacity: out, transform: `scale(${zoom})` }}>{children}</AbsoluteFill>;
};

/** Dot grid backdrop that drifts slowly */
export const Grid: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.09) 1.4px, transparent 1.4px)',
        backgroundSize: '36px 36px',
        backgroundPosition: `${frame * 0.25}px ${frame * 0.15}px`,
      }}
    />
  );
};

/** Animated counter */
export const Count: React.FC<{ value: number; suffix?: string; start: number; dur?: number }> = ({ value, suffix = '', start, dur = 40 }) => {
  const p = useProgress(start, dur);
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {Math.round(value * p)}
      {suffix}
    </span>
  );
};

/** Spring pop for small elements */
export function usePop(delay: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } });
}

export const Chip: React.FC<{ children: React.ReactNode; color?: string; size?: number }> = ({ children, color, size = 26 }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 20px',
      borderRadius: 10,
      border: `1px solid ${C.border}`,
      background: C.surface,
      color: C.text,
      fontSize: size,
      fontWeight: 500,
      whiteSpace: 'nowrap',
    }}
  >
    {color && <span style={{ width: 12, height: 12, borderRadius: 6, background: color }} />}
    {children}
  </span>
);
