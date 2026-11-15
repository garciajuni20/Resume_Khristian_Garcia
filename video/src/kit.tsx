import React from 'react';
import { loadFont } from '@remotion/fonts';
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { guillocheRing, guillocheRule } from './guilloche';

loadFont({ family: 'Geist', url: staticFile('fonts/Geist-Variable.woff2'), weight: '100 800' });
loadFont({ family: 'Geist Mono', url: staticFile('fonts/GeistMono-Variable.woff2'), weight: '100 800' });
loadFont({ family: 'Bodoni Moda', url: staticFile('fonts/BodoniModa-400.ttf'), weight: '400' });
loadFont({ family: 'Bodoni Moda', url: staticFile('fonts/BodoniModa-500.ttf'), weight: '500' });

/** The site's "ink" palette: navy on paper, one ink per industry, gold only for today */
export const C = {
  paper: '#F5F6F8',
  ink: '#16213E',
  muted: '#4A5470',
  rule: 'rgba(22,33,62,0.18)',
  font: 'Geist, sans-serif',
  mono: '"Geist Mono", monospace',
  serif: '"Bodoni Moda", Didot, Georgia, serif',
} as const;

export type Tone = 'teal' | 'blue' | 'coral' | 'violet' | 'green' | 'gold';

export const INK: Record<Tone, string> = {
  teal: '#0B7A75',
  blue: '#1F4FA3',
  coral: '#C42B47',
  violet: '#6A3FA0',
  green: '#2E7D4A',
  gold: '#7A6600',
};

/** The five strands of every guilloché, in the order the site draws them */
export const STRANDS: Tone[] = ['teal', 'blue', 'coral', 'violet', 'green'];

/** Entrances: the site's cubic-bezier(0.23, 1, 0.32, 1) */
export const EASE = Easing.bezier(0.23, 1, 0.32, 1);

/** 0 → 1 over `dur` frames starting at `start`, eased */
export function useProgress(start: number, dur: number) {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE });
}

/** A short fade-up, the site's section entrance */
export const Rise: React.FC<{ delay?: number; dur?: number; distance?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0,
  dur = 22,
  distance = 24,
  children,
  style,
}) => {
  const p = useProgress(delay, dur);
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * distance}px)`, ...style }}>{children}</div>;
};

/** Intaglio press: the plate prints top to bottom, once */
export const Press: React.FC<{ delay?: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0,
  dur = 34,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) });
  return <div style={{ clipPath: `inset(0 0 ${(1 - p) * 100}% 0)`, ...style }}>{children}</div>;
};

/** An engraving from video/public/ink (already printed in its ink on paper) */
export const Engraving: React.FC<{ name: string; width: number; delay?: number; dur?: number; style?: React.CSSProperties }> = ({ name, width, delay = 0, dur, style }) => (
  <Press delay={delay} dur={dur} style={{ width, flexShrink: 0, ...style }}>
    <Img src={staticFile(`ink/${name}.jpg`)} style={{ display: 'block', width: '100%' }} />
  </Press>
);

/** Paper with the double rule of a banknote frame */
export const Paper: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.paper }}>
    <div style={{ position: 'absolute', inset: 36, border: `1px solid ${C.rule}` }} />
    <div style={{ position: 'absolute', inset: 44, border: `1px solid ${C.rule}`, opacity: 0.6 }} />
  </AbsoluteFill>
);

/** Small label above a block: sentence case, with a hairline in front */
export const Eyebrow: React.FC<{ children: React.ReactNode; tone?: Tone; size?: number; style?: React.CSSProperties }> = ({ children, tone, size = 28, style }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontFamily: C.font, fontSize: size, fontWeight: 500, color: C.muted, ...style }}>
    <span style={{ width: 44, height: 2, background: tone ? INK[tone] : C.ink }} />
    {children}
  </div>
);

/**
 * A figure in Bodoni. Bodoni draws "+" as a hairline, and the font has no
 * arrow and no minus, so those glyphs are set in Geist (as on the site).
 */
export const Figure: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text
      .split(/([+→−])/)
      .filter(Boolean)
      .map((t, i) =>
        /^[+→−]$/.test(t) ? (
          <span
            key={i}
            style={{
              fontFamily: C.font,
              fontWeight: t === '−' ? 200 : 300,
              fontSize: t === '→' ? '0.55em' : t === '−' ? '1em' : '0.72em',
              margin: t === '→' ? '0 0.22em' : t === '−' ? '0 0.04em 0 0' : 0,
              verticalAlign: t === '→' ? '0.18em' : 0,
            }}
          >
            {t}
          </span>
        ) : (
          <span key={i}>{t}</span>
        ),
      )}
  </>
);

/** The guilloché band of the site, drawn in once like a security thread */
export const Thread: React.FC<{ width: number; height?: number; delay?: number; dur?: number; period?: number; opacity?: number }> = ({
  width,
  height = 10,
  delay = 0,
  dur = 40,
  period = 22,
  opacity = 1,
}) => {
  const p = useProgress(delay, dur);
  const paths = React.useMemo(() => guillocheRule(width, height, STRANDS.length, period), [width, height, period]);
  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible', opacity }}>
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength={1} fill="none" stroke={INK[STRANDS[i]]} strokeWidth={1.1} strokeDasharray={1} strokeDashoffset={1 - p} />
      ))}
    </svg>
  );
};

/** The banknote portrait window: duotone oval inside a guilloché ring in the five inks */
export const Portrait: React.FC<{ width: number; delay?: number }> = ({ width, delay = 0 }) => {
  const height = width * 1.25;
  const band = Math.round(width * 0.06);
  const pad = band + 6;
  const ring = React.useMemo(
    () => guillocheRing({ cx: width / 2 + pad, cy: height / 2 + pad, rx: width / 2 + 3, ry: height / 2 + 3, width: band, strands: 5, lobes: 36 }),
    [width, height, band, pad],
  );
  const draw = useProgress(delay + 6, 50);
  const photo = useProgress(delay, 30);
  return (
    <div style={{ position: 'relative', width: width + pad * 2, height: height + pad * 2, flexShrink: 0 }}>
      <Img
        src={staticFile('ink/portrait-oval.jpg')}
        style={{ position: 'absolute', left: pad, top: pad, width, height, opacity: photo, borderRadius: '50%' }}
      />
      <svg width={width + pad * 2} height={height + pad * 2} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <path d={ring.inner} fill="none" stroke={C.ink} strokeWidth={1} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        {ring.strands.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={INK[STRANDS[i]]} strokeWidth={1} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        ))}
        <path d={ring.outer} fill="none" stroke={C.ink} strokeWidth={1} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
      </svg>
    </div>
  );
};

/* ── Scene change: the site's ink drop, blooming over the previous scene ── */

/** Frames the bloom takes; the next scene's content follows the ink by LAG frames */
export const BLOOM = 16;
const LAG = 2;
export const BLOOM_TAIL = BLOOM + LAG;

const maskAt = (k: number): React.CSSProperties => {
  const url = `url(${staticFile('ink/bloom.webp')})`;
  const pos = `0 ${(k / 15) * 100}%`;
  return {
    WebkitMaskImage: url,
    maskImage: url,
    WebkitMaskSize: '100% 1600%',
    maskSize: '100% 1600%',
    WebkitMaskPosition: pos,
    maskPosition: pos,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
  };
};

const step = (f: number) => Math.max(0, Math.min(15, Math.floor((f / BLOOM) * 16)));

/**
 * A drop of navy ink lands and spreads until it covers the frame; the new
 * scene appears where the ink has landed, two frames behind it, so the
 * spreading edge reads as wet ink. 16 frames from the site's transition strip.
 */
export const Bloom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  if (frame >= BLOOM_TAIL) return <AbsoluteFill>{children}</AbsoluteFill>;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: C.ink, ...maskAt(step(frame)) }} />
      <AbsoluteFill style={maskAt(step(frame - LAG))}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Keeps the mask strip loaded: CSS masks are not awaited by the renderer, <Img> is */
export const PreloadBloom: React.FC = () => (
  <Img src={staticFile('ink/bloom.webp')} style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />
);
