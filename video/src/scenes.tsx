import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import type { Copy } from './copy';
import { C, EASE, Engraving, Eyebrow, Figure, INK, Paper, Portrait, Press, Rise, Thread, useProgress } from './kit';

export const DUR = { intro: 165, numbers: 150, timeline: 700, showcase: 300, stack: 180, outro: 210 } as const;

/** A thin vertical rule between items on one line, instead of pills */
const Sep: React.FC<{ height?: number }> = ({ height = 26 }) => <span style={{ display: 'inline-block', width: 1, height, background: C.rule, flexShrink: 0, verticalAlign: 'middle' }} />;

/* ── 1. Intro: the banknote header — engraving, portrait window, name ───── */
export const Intro: React.FC<{ c: Copy }> = ({ c }) => {
  const frame = useCurrentFrame();
  const [first, ...rest] = c.name.split(' ');
  const lines = [first, rest.join(' ')];
  let idx = 0;
  return (
    <AbsoluteFill>
      <Paper />
      {/* Antigua engraving, its left side dissolving into the paper for the name */}
      <Engraving name="ink-hero" width={1150} dur={46} style={{ position: 'absolute', right: 60, top: 70 }} />

      <div style={{ position: 'absolute', left: 140, top: 236, display: 'flex', alignItems: 'center', gap: 56 }}>
        <Portrait width={280} delay={4} />
        <div>
          <Rise delay={8}>
            <Eyebrow tone="blue">{c.tag}</Eyebrow>
          </Rise>
          <div style={{ fontFamily: C.serif, fontSize: 150, lineHeight: 0.98, color: C.ink, marginTop: 20 }}>
            {lines.map(line => (
              <div key={line} style={{ display: 'flex' }}>
                {line.split('').map(ch => {
                  const i = idx++;
                  const p = interpolate(frame, [14 + i * 2, 36 + i * 2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE });
                  return (
                    <span key={i} style={{ opacity: p, transform: `translateY(${(1 - p) * 28}px)`, whiteSpace: 'pre' }}>
                      {ch}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 140, top: 734, width: 1640 }}>
        <Thread width={1640} delay={40} dur={44} />
        <Rise delay={52}>
          <div style={{ fontFamily: C.font, fontSize: 46, fontWeight: 500, color: C.ink, marginTop: 34, letterSpacing: -0.5 }}>{c.headline}</div>
        </Rise>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 26 }}>
          {c.roles.map((r, i) => (
            <React.Fragment key={r}>
              {i > 0 && (
                <Rise delay={70 + i * 6} distance={0}>
                  <Sep />
                </Rise>
              )}
              <Rise delay={70 + i * 6} distance={14}>
                <span style={{ fontFamily: C.font, fontSize: 30, color: C.muted }}>{r}</span>
              </Rise>
            </React.Fragment>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── 2. Numbers: three figures printed in Bodoni ─────────────────────────── */
export const Numbers: React.FC<{ c: Copy }> = ({ c }) => (
  <AbsoluteFill>
    <Paper />
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', fontFamily: C.font, color: C.ink }}>
      <Rise>
        <Eyebrow tone="blue">{c.numbersTitle}</Eyebrow>
      </Rise>
      <div style={{ marginTop: 44 }}>
        <Thread width={1380} delay={6} dur={40} />
      </div>
      <div style={{ display: 'flex', marginTop: 56 }}>
        {c.numbers.map((n, i) => (
          <div key={n.label} style={{ width: 460, textAlign: 'center', borderLeft: i ? `1px solid ${C.rule}` : 'none' }}>
            <Press delay={14 + i * 10} dur={26}>
              <div style={{ fontFamily: C.serif, fontSize: 230, lineHeight: 1.05, fontVariantNumeric: 'lining-nums' }}>
                <Figure text={`${n.value}${n.suffix}`} />
              </div>
            </Press>
            <Rise delay={26 + i * 10} distance={14}>
              <div style={{ fontSize: 36, color: C.muted, marginTop: 14 }}>{n.label}</div>
            </Rise>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

/* ── 3. Timeline: a camera slides from stop to stop ─────────────────────── */
const STOP_START = 40;
const CARD_W = 1600;
const CARD_GAP = 160;

export const Timeline: React.FC<{ c: Copy }> = ({ c }) => {
  const frame = useCurrentFrame();
  const n = c.stops.length;
  // Each stop gets an equal share of the scene, whatever the number of stops
  const STOP_LEN = Math.floor((DUR.timeline - STOP_START) / n);

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
  const cam = interpolate(frame, keys, vals, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE });
  const line = interpolate(frame, [STOP_START - 20, STOP_START + (n - 1) * STOP_LEN], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const active = Math.min(n - 1, Math.max(0, Math.round(cam)));

  return (
    <AbsoluteFill>
      <Paper />
      <AbsoluteFill style={{ fontFamily: C.font, color: C.ink }}>
        <Rise style={{ position: 'absolute', top: 100, left: 160 }}>
          <Eyebrow tone="blue">{c.timelineTitle}</Eyebrow>
        </Rise>

        {/* Track with one node per stop, each in the ink of its industry */}
        <div style={{ position: 'absolute', top: 200, left: 160, right: 160, height: 2 }}>
          <div style={{ position: 'absolute', inset: 0, background: C.rule }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${line * 100}%`, background: C.ink }} />
          {c.stops.map((s, i) => {
            const left = (i / (n - 1)) * 100;
            const on = i <= active;
            const last = i === n - 1;
            return (
              <div key={s.year} style={{ position: 'absolute', left: `${left}%`, top: -10, transform: 'translateX(-50%)', textAlign: 'center' }}>
                <div style={{ width: 22, height: 22, borderRadius: 11, boxSizing: 'border-box', background: on ? INK[s.tone] : C.paper, border: `2px solid ${INK[s.tone]}`, margin: '0 auto' }} />
                <div style={{ fontFamily: C.serif, fontWeight: 500, fontSize: 36, marginTop: 12, color: i === active ? C.ink : C.muted }}>{s.year}</div>
                {last && <div style={{ fontSize: 20, fontWeight: 500, color: INK.gold, marginTop: 2 }}>{c.today}</div>}
              </div>
            );
          })}
        </div>

        {/* Plates strip */}
        <div style={{ position: 'absolute', top: 350, left: (1920 - CARD_W) / 2, width: CARD_W, height: 600 }}>
          <div style={{ display: 'flex', transform: `translateX(${-cam * (CARD_W + CARD_GAP)}px)` }}>
            {c.stops.map((s, i) => {
              const arrive = STOP_START + i * STOP_LEN;
              const local = frame - arrive;
              const dist = Math.abs(cam - i);
              const last = i === n - 1;
              const two = s.art.length > 1;
              return (
                <div
                  key={s.year}
                  style={{
                    width: CARD_W,
                    marginRight: CARD_GAP,
                    flexShrink: 0,
                    opacity: interpolate(dist, [0, 1], [1, 0.1], { extrapolateRight: 'clamp' }),
                    display: 'flex',
                    alignItems: 'center',
                    gap: 64,
                    height: 560,
                  }}
                >
                  {/* The engraving of the industry prints as the camera arrives */}
                  <div style={{ width: 420, flexShrink: 0, display: 'flex', flexDirection: two ? 'column' : 'row', alignItems: 'center', gap: 20 }}>
                    {s.art.map((a, ai) => (
                      <Engraving key={a} name={a} width={two ? 250 : 420} delay={arrive - 20 + ai * 10} dur={30} />
                    ))}
                  </div>

                  <div style={{ width: 520, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 22 }}>
                      <div style={{ fontFamily: C.serif, fontSize: 140, lineHeight: 1, color: INK[s.tone] }}>{s.year}</div>
                      {last && <div style={{ fontSize: 32, fontWeight: 500, color: INK.gold }}>{c.today}</div>}
                    </div>
                    <Eyebrow tone={s.tone} size={28} style={{ marginTop: 26, color: INK[s.tone] }}>
                      {s.industry}
                    </Eyebrow>
                    <div style={{ fontSize: 58, fontWeight: 600, letterSpacing: -1.5, marginTop: 22, lineHeight: 1.06 }}>{s.company}</div>
                    <div style={{ fontSize: 32, color: C.muted, marginTop: 16, lineHeight: 1.3 }}>{s.role}</div>
                  </div>

                  <div style={{ flex: 1, alignSelf: 'stretch', borderLeft: `1px solid ${C.rule}`, paddingLeft: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 56 }}>
                    {s.metrics.map((m, mi) => {
                      const p = interpolate(local, [10 + mi * 10, 34 + mi * 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE });
                      return (
                        <div key={m.label} style={{ opacity: p, transform: `translateY(${(1 - p) * 18}px)` }}>
                          <div style={{ fontFamily: C.serif, fontSize: 68, lineHeight: 1, whiteSpace: 'nowrap', fontVariantNumeric: 'lining-nums' }}>
                            <Figure text={m.value} />
                          </div>
                          <div style={{ fontSize: 30, color: C.muted, marginTop: 14, lineHeight: 1.3 }}>{m.label}</div>
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
    </AbsoluteFill>
  );
};

/* ── 4. Flowber showcase: the product, framed like a proof ─────────────── */
export const Showcase: React.FC<{ c: Copy }> = ({ c }) => {
  const frame = useCurrentFrame();
  const phone = useProgress(40, 34);
  const drift = interpolate(frame, [0, DUR.showcase], [0, -24]);
  return (
    <AbsoluteFill>
      <Paper />
      <AbsoluteFill style={{ fontFamily: C.font, color: C.ink }}>
        <div style={{ position: 'absolute', left: 140, top: 0, bottom: 0, width: 680, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Engraving name="ink-barberia" width={120} dur={30} />
          <Rise delay={6} style={{ marginTop: 22 }}>
            <Eyebrow tone="coral" size={26}>
              {c.showcaseEyebrow}
            </Eyebrow>
          </Rise>
          <Rise delay={12}>
            <div style={{ fontFamily: C.serif, fontSize: 64, lineHeight: 1.06, marginTop: 22 }}>{c.showcaseTitle}</div>
          </Rise>
          <Rise delay={20}>
            <div style={{ fontSize: 30, color: C.muted, marginTop: 22, lineHeight: 1.4 }}>{c.showcaseBody}</div>
          </Rise>
          <div style={{ marginTop: 36 }}>
            {c.chips.map((chip, i) => (
              <Rise key={chip} delay={60 + i * 12} distance={14}>
                <div style={{ fontSize: 28, padding: '11px 0', borderTop: `1px solid ${C.rule}`, borderBottom: i === c.chips.length - 1 ? `1px solid ${C.rule}` : 'none', display: 'flex', gap: 18, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: C.serif, fontWeight: 500, fontSize: 36, color: INK.coral, width: 26 }}>{i + 1}</span>
                  {chip}
                </div>
              </Rise>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', left: 880, right: 140, top: 0, bottom: 0, display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', transform: `translateY(${drift}px)` }}>
            <Press delay={10} dur={40}>
              <div style={{ border: `1px solid ${C.ink}`, background: C.paper }}>
                <div style={{ padding: '12px 18px', borderBottom: `1px solid ${C.ink}`, fontFamily: C.mono, fontSize: 18, color: C.muted }}>flowber-barberia.pages.dev</div>
                <Img src={staticFile('img/home-desktop.webp')} style={{ display: 'block', width: '100%' }} />
              </div>
            </Press>
            <div
              style={{
                position: 'absolute',
                right: -30,
                bottom: -80,
                width: 230,
                borderRadius: 30,
                border: `2px solid ${C.ink}`,
                background: C.paper,
                overflow: 'hidden',
                transform: `translateY(${(1 - phone) * 220}px)`,
                opacity: phone,
              }}
            >
              <Img src={staticFile('img/home-mobile.webp')} style={{ display: 'block', width: '100%' }} />
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ── 5. Stack ──────────────────────────────────────────────────────────── */
export const Stack: React.FC<{ c: Copy }> = ({ c }) => (
  <AbsoluteFill>
    <Paper />
    <AbsoluteFill style={{ fontFamily: C.font, color: C.ink, padding: '0 160px', justifyContent: 'center' }}>
      <Rise>
        <Eyebrow tone="blue">{c.stackTitle}</Eyebrow>
      </Rise>
      <div style={{ marginTop: 40 }}>
        <Thread width={1600} delay={4} dur={40} />
      </div>
      <div style={{ display: 'flex', gap: 64, marginTop: 56 }}>
        {c.stack.map((col, ci) => (
          <div key={col.title} style={{ flex: 1 }}>
            <Rise delay={6 + ci * 8}>
              <div style={{ fontFamily: C.serif, fontSize: 52, lineHeight: 1.1, paddingBottom: 18, borderBottom: `1px solid ${C.ink}` }}>{col.title}</div>
            </Rise>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 28 }}>
              {col.items.map((it, i) => (
                <Rise key={it} delay={16 + ci * 8 + i * 6} distance={14}>
                  <div style={{ fontSize: 34, color: C.ink }}>{it}</div>
                </Rise>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

/* ── 6. Outro: the portrait window again, and where to write ────────────── */
export const Outro: React.FC<{ c: Copy }> = ({ c }) => (
  <AbsoluteFill>
    <Paper />
    <AbsoluteFill style={{ fontFamily: C.font, color: C.ink, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Portrait width={220} delay={0} />
      <Rise delay={14}>
        <div style={{ fontFamily: C.serif, fontSize: 96, lineHeight: 1.05, marginTop: 40 }}>{c.outroTitle}</div>
      </Rise>
      <Rise delay={24}>
        <div style={{ fontSize: 36, color: C.muted, marginTop: 20 }}>{c.outroLine}</div>
      </Rise>
      <Rise delay={36}>
        <div style={{ display: 'flex', gap: 32, marginTop: 48, justifyContent: 'center', alignItems: 'center', fontFamily: C.mono, fontSize: 32 }}>
          <span>{c.email}</span>
          <Sep height={34} />
          <span>{c.site}</span>
        </div>
      </Rise>
      <div style={{ marginTop: 50 }}>
        <Thread width={900} delay={44} dur={44} />
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
