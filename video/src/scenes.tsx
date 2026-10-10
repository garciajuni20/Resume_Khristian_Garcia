import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import type { Copy } from './copy';
import { C, Chip, Count, FLUID, Grid, Rise, SceneFade, usePop, useProgress } from './kit';

export const DUR = { intro: 165, numbers: 150, timeline: 600, showcase: 300, stack: 180, outro: 210 } as const;

/* ── 1. Intro: portrait reveal + name letter by letter ─────────────────── */
export const Intro: React.FC<{ c: Copy }> = ({ c }) => {
  const frame = useCurrentFrame();
  const reveal = useProgress(0, 36);
  const photoZoom = interpolate(frame, [0, DUR.intro], [1.12, 1.0], { extrapolateRight: 'clamp' });
  return (
    <SceneFade duration={DUR.intro}>
      <Grid />
      <AbsoluteFill style={{ flexDirection: 'row', alignItems: 'center', padding: '0 150px', gap: 110, fontFamily: C.font }}>
        <div
          style={{
            width: 420,
            height: 600,
            borderRadius: 28,
            overflow: 'hidden',
            flexShrink: 0,
            clipPath: `inset(${(1 - reveal) * 50}% 0 ${(1 - reveal) * 50}% 0 round 28px)`,
            boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
          }}
        >
          <Img src={staticFile('img/khristian-portrait.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${photoZoom})` }} />
        </div>
        <div style={{ color: C.text }}>
          <Rise delay={10}>
            <div style={{ fontFamily: C.mono, fontSize: 26, color: C.muted, letterSpacing: 3, textTransform: 'uppercase' }}>{c.tag}</div>
          </Rise>
          <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: -4, lineHeight: 1, marginTop: 26, display: 'flex' }}>
            {c.name.split('').map((ch, i) => {
              const p = interpolate(frame, [16 + i * 2, 40 + i * 2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: FLUID });
              return (
                <span key={i} style={{ opacity: p, transform: `translateY(${(1 - p) * 60}px)`, filter: `blur(${(1 - p) * 12}px)`, whiteSpace: 'pre' }}>
                  {ch}
                </span>
              );
            })}
          </div>
          <Rise delay={52}>
            <div style={{ fontSize: 40, color: C.accent, fontWeight: 500, marginTop: 30, textWrap: 'balance' } as React.CSSProperties}>{c.headline}</div>
          </Rise>
          <div style={{ display: 'flex', gap: 16, marginTop: 44 }}>
            {c.roles.map((r, i) => (
              <Rise key={r} delay={72 + i * 8} distance={24}>
                <Chip>{r}</Chip>
              </Rise>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ── 2. Numbers ─────────────────────────────────────────────────────────── */
export const Numbers: React.FC<{ c: Copy }> = ({ c }) => (
  <SceneFade duration={DUR.numbers}>
    <Grid />
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', fontFamily: C.font, color: C.text }}>
      <Rise>
        <div style={{ fontFamily: C.mono, fontSize: 28, color: C.muted, letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center' }}>{c.numbersTitle}</div>
      </Rise>
      <div style={{ display: 'flex', gap: 120, marginTop: 60 }}>
        {c.numbers.map((n, i) => (
          <Rise key={n.label} delay={10 + i * 10}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 220, fontWeight: 700, letterSpacing: -8, lineHeight: 1 }}>
                <Count value={n.value} suffix={n.suffix} start={14 + i * 10} />
              </div>
              <div style={{ fontSize: 36, color: C.muted, marginTop: 16 }}>{n.label}</div>
            </div>
          </Rise>
        ))}
      </div>
    </AbsoluteFill>
  </SceneFade>
);

/* ── 3. Timeline: a camera slides from stop to stop ─────────────────────── */
const STOP_START = 40;
const STOP_LEN = 140;
const CARD_W = 1400;

export const Timeline: React.FC<{ c: Copy }> = ({ c }) => {
  const frame = useCurrentFrame();
  const n = c.stops.length;

  // Camera position (in cards) with an eased move between consecutive stops
  const keys: number[] = [];
  const vals: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = STOP_START + i * STOP_LEN;
    if (i > 0) {
      keys.push(t - 24);
      vals.push(i - 1);
    }
    keys.push(t);
    vals.push(i);
  }
  const cam = interpolate(frame, keys, vals, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: FLUID });
  const line = interpolate(frame, [STOP_START - 20, STOP_START + (n - 1) * STOP_LEN], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const active = Math.min(n - 1, Math.max(0, Math.round(cam)));

  return (
    <SceneFade duration={DUR.timeline}>
      <Grid />
      <AbsoluteFill style={{ fontFamily: C.font, color: C.text }}>
        <Rise style={{ position: 'absolute', top: 90, left: 160 }}>
          <div style={{ fontFamily: C.mono, fontSize: 28, color: C.muted, letterSpacing: 3, textTransform: 'uppercase' }}>{c.timelineTitle}</div>
        </Rise>

        {/* Track with one node per stop */}
        <div style={{ position: 'absolute', top: 180, left: 160, right: 160, height: 4 }}>
          <div style={{ position: 'absolute', inset: 0, background: C.border, borderRadius: 2 }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${line * 100}%`, background: C.accent, borderRadius: 2 }} />
          {c.stops.map((s, i) => {
            const left = (i / (n - 1)) * 100;
            const on = i <= active;
            return (
              <div key={s.year} style={{ position: 'absolute', left: `${left}%`, top: -14, transform: 'translateX(-50%)', textAlign: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: 16, background: on ? s.color : C.bg, border: `4px solid ${on ? s.color : C.muted}`, margin: '0 auto', boxShadow: i === active ? `0 0 30px ${s.color}` : 'none' }} />
                <div style={{ fontFamily: C.mono, fontSize: 24, marginTop: 14, color: i === active ? C.text : C.muted }}>{s.year}</div>
              </div>
            );
          })}
        </div>

        {/* Cards strip */}
        <div style={{ position: 'absolute', top: 320, left: (1920 - CARD_W) / 2, width: CARD_W, height: 600, overflow: 'visible' }}>
          <div style={{ display: 'flex', transform: `translateX(${-cam * (CARD_W + 120)}px)` }}>
            {c.stops.map((s, i) => {
              const local = frame - (STOP_START + i * STOP_LEN);
              const dist = Math.abs(cam - i);
              return (
                <div
                  key={s.year}
                  style={{
                    width: CARD_W,
                    marginRight: 120,
                    flexShrink: 0,
                    opacity: interpolate(dist, [0, 1], [1, 0.15], { extrapolateRight: 'clamp' }),
                    transform: `scale(${interpolate(dist, [0, 1], [1, 0.9], { extrapolateRight: 'clamp' })})`,
                    border: `1px solid ${C.border}`,
                    borderRadius: 32,
                    background: C.surface,
                    padding: '64px 72px',
                    display: 'flex',
                    gap: 80,
                  }}
                >
                  <div style={{ flex: 1.2 }}>
                    <div style={{ fontFamily: C.mono, fontSize: 120, fontWeight: 600, color: s.color, lineHeight: 1 }}>{s.year}</div>
                    <div style={{ marginTop: 36 }}>
                      <Chip color={s.color}>{s.industry}</Chip>
                    </div>
                    <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2, marginTop: 30, lineHeight: 1.05 }}>{s.company}</div>
                    <div style={{ fontSize: 34, color: C.muted, marginTop: 18 }}>{s.role}</div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 54 }}>
                    {s.metrics.map((m, mi) => {
                      const p = interpolate(local, [14 + mi * 10, 40 + mi * 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: FLUID });
                      return (
                        <div key={m.label} style={{ opacity: p, transform: `translateX(${(1 - p) * 60}px)` }}>
                          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{m.value}</div>
                          <div style={{ fontSize: 30, color: C.muted, marginTop: 12 }}>{m.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ── 4. Flowber showcase: laptop-style tilt + phone ─────────────────────── */
export const Showcase: React.FC<{ c: Copy }> = ({ c }) => {
  const frame = useCurrentFrame();
  const tilt = useProgress(10, 50);
  const phone = useProgress(34, 40);
  const drift = interpolate(frame, [0, DUR.showcase], [0, -30]);
  return (
    <SceneFade duration={DUR.showcase}>
      <Grid />
      <AbsoluteFill style={{ fontFamily: C.font, color: C.text, flexDirection: 'row', alignItems: 'center', padding: '0 120px', gap: 80 }}>
        <div style={{ width: 640, flexShrink: 0 }}>
          <Rise>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <Img src={staticFile('img/logo-mark.webp')} style={{ width: 64, height: 64, borderRadius: 14 }} />
              <div style={{ fontFamily: C.mono, fontSize: 22, color: C.muted, letterSpacing: 2, textTransform: 'uppercase' }}>{c.showcaseEyebrow}</div>
            </div>
          </Rise>
          <Rise delay={8}>
            <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, marginTop: 30 }}>{c.showcaseTitle}</div>
          </Rise>
          <Rise delay={16}>
            <div style={{ fontSize: 32, color: C.muted, marginTop: 24, lineHeight: 1.35 }}>{c.showcaseBody}</div>
          </Rise>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 40, alignItems: 'flex-start' }}>
            {c.chips.map((chip, i) => {
              const pop = usePop(60 + i * 14);
              return (
                <div key={chip} style={{ transform: `scale(${pop})`, transformOrigin: 'left center', opacity: Math.min(1, pop * 1.5) }}>
                  <Chip color={['#9A6DD7', '#E255A1', '#4DAB9A', '#529CCA'][i % 4]} size={28}>
                    {chip}
                  </Chip>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ position: 'relative', flex: 1, perspective: 2000, transform: `translateY(${drift}px)` }}>
          <div
            style={{
              borderRadius: 22,
              overflow: 'hidden',
              border: `1px solid ${C.border}`,
              background: C.surface,
              boxShadow: '0 50px 140px rgba(0,0,0,0.7)',
              transform: `rotateX(${(1 - tilt) * 32}deg) scale(${0.86 + tilt * 0.14})`,
              transformOrigin: 'center bottom',
              opacity: tilt,
            }}
          >
            <div style={{ display: 'flex', gap: 10, padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map(col => (
                <span key={col} style={{ width: 14, height: 14, borderRadius: 7, background: col }} />
              ))}
              <span style={{ marginLeft: 16, fontFamily: C.mono, fontSize: 18, color: C.muted }}>flowber-barberia.pages.dev</span>
            </div>
            <Img src={staticFile('img/home-desktop.webp')} style={{ display: 'block', width: '100%' }} />
          </div>
          <div
            style={{
              position: 'absolute',
              right: -30,
              bottom: -80,
              width: 250,
              borderRadius: 40,
              border: '8px solid #2A2A2A',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
              transform: `translateY(${(1 - phone) * 260}px)`,
              opacity: phone,
            }}
          >
            <Img src={staticFile('img/home-mobile.webp')} style={{ display: 'block', width: '100%' }} />
          </div>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

/* ── 5. Stack ──────────────────────────────────────────────────────────── */
export const Stack: React.FC<{ c: Copy }> = ({ c }) => (
  <SceneFade duration={DUR.stack}>
    <Grid />
    <AbsoluteFill style={{ fontFamily: C.font, color: C.text, padding: '120px 160px' }}>
      <Rise>
        <div style={{ fontFamily: C.mono, fontSize: 28, color: C.muted, letterSpacing: 3, textTransform: 'uppercase' }}>{c.stackTitle}</div>
      </Rise>
      <div style={{ display: 'flex', gap: 60, marginTop: 70 }}>
        {c.stack.map((col, ci) => (
          <div key={col.title} style={{ flex: 1 }}>
            <Rise delay={6 + ci * 8}>
              <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: -1, paddingBottom: 20, borderBottom: `1px solid ${C.border}` }}>{col.title}</div>
            </Rise>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30 }}>
              {col.items.map((it, i) => (
                <Rise key={it} delay={16 + ci * 8 + i * 6} distance={24}>
                  <div style={{ fontSize: 36, color: i % 2 ? C.muted : C.text }}>{it}</div>
                </Rise>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </SceneFade>
);

/* ── 6. Outro ──────────────────────────────────────────────────────────── */
export const Outro: React.FC<{ c: Copy }> = ({ c }) => {
  const frame = useCurrentFrame();
  const pop = usePop(4);
  return (
    <AbsoluteFill>
      <Grid />
      <AbsoluteFill style={{ fontFamily: C.font, color: C.text, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: 260, height: 260, transform: `scale(${pop})` }}>
          <div
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              background: `conic-gradient(from ${frame * 3}deg, #529CCA, #9A6DD7, #FFA344, #4DAB9A, #529CCA)`,
            }}
          />
          <Img
            src={staticFile('img/khristian-square.jpg')}
            style={{ position: 'absolute', inset: 0, width: 260, height: 260, borderRadius: '50%', objectFit: 'cover', border: `8px solid ${C.bg}` }}
          />
        </div>
        <Rise delay={14}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, marginTop: 50 }}>{c.outroTitle}</div>
        </Rise>
        <Rise delay={24}>
          <div style={{ fontSize: 36, color: C.muted, marginTop: 20 }}>{c.outroLine}</div>
        </Rise>
        <Rise delay={36}>
          <div style={{ display: 'flex', gap: 24, marginTop: 50, justifyContent: 'center' }}>
            <Chip size={30}>{c.email}</Chip>
            <Chip size={30}>{c.site}</Chip>
          </div>
        </Rise>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
