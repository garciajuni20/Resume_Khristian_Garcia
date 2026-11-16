/**
 * The portfolio's sound engine: one Web Audio graph for everything audible.
 *
 *   music tracks (HTMLAudio → MediaElementSource → per-track gain) ─┐
 *                                                                   ├→ master → compressor → out
 *   synthesized effects (oscillators, noise) → sfx bus ─┬───────────┘
 *                                                       └→ reverb (procedural impulse) ┘
 *
 * Every effect is synthesized on the fly (nothing to download) and every pitch
 * comes from one pentatonic set, D F G A C. That set is both D minor and
 * F major pentatonic, which are the keys the page tracks were generated in
 * (scripts/encode-music.sh, docs/AI-MEDIA.md), so a click always lands in
 * harmony with whatever is playing.
 *
 * Framework-free on purpose: React (SoundContext) only flips `setEnabled` and
 * calls `playTrack` on route changes; components call `sfx()` for moments
 * that carry meaning (a form sent, a PDF ready, a dialog opening).
 */

export type Track = 'home' | 'resume' | 'projects' | 'flowber' | 'contact' | 'notfound';

export type Sfx =
  | 'hover' | 'tap' | 'key'
  | 'open' | 'close'
  | 'nav'
  | 'dark' | 'light'
  | 'lang'
  | 'on' | 'off'
  | 'success' | 'error'
  | 'chipOn' | 'chipOff'
  | 'print'
  | 'ink'
  | 'note';

export interface SfxOptions {
  /** 0..1 horizontal position on screen: taps climb the scale left to right */
  x?: number;
  /** Scale degree for 'note' and 'nav' (any integer, wraps into octaves) */
  degree?: number;
  /** Extra gain multiplier */
  gain?: number;
}

const BASE = `${import.meta.env.BASE_URL}audio/`;
const MUSIC_VOLUME = 0.42;
const SFX_VOLUME = 0.55;

/** D F G A C, as semitones above D */
const PENTA = [0, 3, 5, 7, 10];
const D4 = 293.66;

/** Frequency of a pentatonic scale degree (0 = D4, 5 = D5, -5 = D3…) */
export function degreeHz(degree: number): number {
  const oct = Math.floor(degree / PENTA.length);
  const step = PENTA[((degree % PENTA.length) + PENTA.length) % PENTA.length];
  return D4 * Math.pow(2, oct + step / 12);
}

/* ── Graph ──────────────────────────────────────────────────────────── */

let ctx: AudioContext | null = null;
let master: GainNode;
let musicBus: GainNode;
let sfxBus: GainNode;
let reverbSend: GainNode;
let noiseBuf: AudioBuffer;
let enabled = false;

function makeImpulse(c: AudioContext, seconds: number, decay: number): AudioBuffer {
  const len = Math.floor(c.sampleRate * seconds);
  const buf = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

function graph(): AudioContext | null {
  if (ctx) return ctx;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx = new AC({ latencyHint: 'interactive' });

  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14;
  comp.knee.value = 12;
  comp.ratio.value = 3;
  comp.attack.value = 0.005;
  comp.release.value = 0.2;
  comp.connect(ctx.destination);

  master = ctx.createGain();
  master.gain.value = 1;
  master.connect(comp);

  musicBus = ctx.createGain();
  musicBus.gain.value = 0;
  musicBus.connect(master);

  sfxBus = ctx.createGain();
  sfxBus.gain.value = SFX_VOLUME;
  sfxBus.connect(master);

  const reverb = ctx.createConvolver();
  reverb.buffer = makeImpulse(ctx, 2.2, 3);
  const wet = ctx.createGain();
  wet.gain.value = 0.32;
  reverb.connect(wet).connect(master);
  reverbSend = ctx.createGain();
  reverbSend.gain.value = 1;
  reverbSend.connect(reverb);

  noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const n = noiseBuf.getChannelData(0);
  for (let i = 0; i < n.length; i++) n[i] = Math.random() * 2 - 1;

  return ctx;
}

/** Must run inside a user gesture the first time (autoplay policy). Resolves once the context runs. */
export function unlock(): Promise<void> {
  const c = graph();
  if (!c || c.state === 'running') return Promise.resolve();
  return c.resume().catch(() => { /* retried on the next gesture */ });
}

export function setEnabled(on: boolean): void {
  enabled = on;
  notify();
}

export function isEnabled(): boolean {
  return enabled;
}

function ready(): AudioContext | null {
  return enabled && ctx && ctx.state === 'running' ? ctx : null;
}

/* ── Music ──────────────────────────────────────────────────────────── */

interface Deck { el: HTMLAudioElement; gain: GainNode }
const decks = new Map<Track, Deck>();
let current: Track | null = null;
let musicLevel = 0;
let ducked = false;
let hidden = false;

function deck(t: Track): Deck | null {
  const c = graph();
  if (!c) return null;
  let d = decks.get(t);
  if (!d) {
    const el = new Audio(`${BASE}${t}.mp3`);
    el.loop = true;
    el.preload = 'auto';
    (['playing', 'pause', 'ended'] as const).forEach(e => el.addEventListener(e, notify));
    const gain = c.createGain();
    gain.gain.value = 0;
    c.createMediaElementSource(el).connect(gain).connect(musicBus);
    d = { el, gain };
    decks.set(t, d);
  }
  return d;
}

function ramp(p: AudioParam, to: number, seconds: number) {
  if (!ctx) return;
  const now = ctx.currentTime;
  p.cancelScheduledValues(now);
  p.setValueAtTime(p.value, now);
  // setTargetAtTime never reaches the value exactly; a time constant of 1/4 is ~98% at `seconds`
  p.setTargetAtTime(to, now, Math.max(0.01, seconds / 4));
}

function applyMusicLevel(seconds: number) {
  if (!ctx) return;
  const target = enabled && !ducked && !hidden ? musicLevel : 0;
  ramp(musicBus.gain, target, seconds);
}

/** Crossfade to a page's track. Safe to call when off: only remembers it. */
export function playTrack(t: Track, seconds = 1.8): void {
  const prev = current;
  current = t;
  if (!enabled || !ctx) return;
  if (prev === t && decks.get(t) && !decks.get(t)!.el.paused) return;
  const next = deck(t);
  if (!next) return;
  // Start the new track at its beginning only the first time: returning to a page continues it
  next.el.play().catch(() => { /* blocked until a gesture: SoundContext retries */ });
  ramp(next.gain.gain, 1, seconds);
  if (prev && prev !== t) {
    const old = decks.get(prev);
    if (old) {
      ramp(old.gain.gain, 0, seconds * 0.8);
      const el = old.el;
      window.setTimeout(() => { if (current !== prev) el.pause(); }, seconds * 1000 + 200);
    }
  }
}

/** Turn music up (on) or fade it out (off) */
export function setMusic(on: boolean, seconds = 1.6): void {
  musicLevel = on ? MUSIC_VOLUME : 0;
  if (!ctx) return;
  if (on && current) {
    const t = current;
    current = null; // force playTrack to (re)start
    playTrack(t, 0.05);
  }
  applyMusicLevel(seconds);
  if (!on) {
    window.setTimeout(() => {
      if (musicLevel === 0) decks.forEach(d => d.el.pause());
    }, seconds * 1000 + 200);
  }
}

/** Step aside for an audible video */
export function duck(on: boolean): void {
  ducked = on;
  notify();
  applyMusicLevel(on ? 0.4 : 1.8);
  const d = current && decks.get(current);
  if (d && !on && enabled && musicLevel > 0) d.el.play().catch(() => {});
}

/** Background tab: silent, and the element paused so it doesn't burn battery */
export function setHidden(h: boolean): void {
  hidden = h;
  notify();
  applyMusicLevel(h ? 0.25 : 1.2);
  const d = current && decks.get(current);
  if (!d) return;
  if (h) window.setTimeout(() => { if (hidden) d.el.pause(); }, 400);
  else if (enabled && musicLevel > 0 && !ducked) d.el.play().catch(() => {});
}

/** Whether the music deck is actually producing sound (drives the navbar bars) */
export function musicAudible(): boolean {
  const d = current && decks.get(current);
  return !!d && !d.el.paused && enabled && !ducked && !hidden && musicLevel > 0;
}

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach(cb => cb());
}

/** Subscribe to anything that changes `musicAudible()` */
export function onMusicChange(cb: () => void): () => void {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

/* ── Synth voices ───────────────────────────────────────────────────── */

interface Voice {
  freq: number;
  at?: number;
  dur?: number;
  gain?: number;
  type?: OscillatorType;
  /** Partials as [ratio, relative gain]; bell-like when inharmonic */
  partials?: Array<[number, number]>;
  attack?: number;
  wet?: number;
  /** Lowpass cutoff in Hz */
  tone?: number;
  pan?: number;
  glideTo?: number;
}

function voice(c: AudioContext, v: Voice) {
  const t0 = c.currentTime + (v.at ?? 0);
  const dur = v.dur ?? 0.5;
  const out = c.createGain();
  const peak = v.gain ?? 0.2;
  const attack = v.attack ?? 0.004;
  out.gain.setValueAtTime(0.0001, t0);
  out.gain.exponentialRampToValueAtTime(peak, t0 + attack);
  out.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  let node: AudioNode = out;
  if (v.tone) {
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = v.tone;
    out.connect(lp);
    node = lp;
  }
  if (v.pan) {
    const p = c.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, v.pan));
    node.connect(p);
    node = p;
  }
  node.connect(sfxBus);
  if (v.wet) {
    const send = c.createGain();
    send.gain.value = v.wet;
    node.connect(send).connect(reverbSend);
  }

  for (const [ratio, g] of v.partials ?? [[1, 1]]) {
    const o = c.createOscillator();
    o.type = v.type ?? 'sine';
    o.frequency.setValueAtTime(v.freq * ratio, t0);
    if (v.glideTo) o.frequency.exponentialRampToValueAtTime(v.glideTo * ratio, t0 + dur * 0.6);
    const pg = c.createGain();
    // Higher partials die faster, like a struck bar
    pg.gain.setValueAtTime(g, t0);
    pg.gain.exponentialRampToValueAtTime(0.0001, t0 + dur / Math.max(1, ratio * 0.7));
    o.connect(pg).connect(out);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  }
}

function noise(c: AudioContext, o: { at?: number; dur: number; gain: number; from: number; to?: number; q?: number; type?: BiquadFilterType; wet?: number; pan?: number }) {
  const t0 = c.currentTime + (o.at ?? 0);
  const src = c.createBufferSource();
  src.buffer = noiseBuf;
  src.loop = true;
  const f = c.createBiquadFilter();
  f.type = o.type ?? 'bandpass';
  f.Q.value = o.q ?? 1.2;
  f.frequency.setValueAtTime(o.from, t0);
  if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, t0 + o.dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(o.gain, t0 + o.dur * 0.35);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
  let node: AudioNode = src.connect(f).connect(g);
  if (o.pan) {
    const p = c.createStereoPanner();
    p.pan.value = o.pan;
    node = node.connect(p);
  }
  node.connect(sfxBus);
  if (o.wet) {
    const s = c.createGain();
    s.gain.value = o.wet;
    node.connect(s).connect(reverbSend);
  }
  src.start(t0, Math.random() * 0.5);
  src.stop(t0 + o.dur + 0.05);
}

/** Marimba-ish: fundamental plus the 4x overtone a tuned bar rings at */
const MALLET: Array<[number, number]> = [[1, 1], [4, 0.18], [9.2, 0.04]];
/** Celesta-ish bell: inharmonic partials */
const BELL: Array<[number, number]> = [[1, 1], [2.76, 0.35], [5.4, 0.12], [8.93, 0.05]];
/** Glass: soft and pure */
const GLASS: Array<[number, number]> = [[1, 1], [2, 0.12], [3, 0.05]];

let lastHover = 0;
let lastKey = 0;
let keyStep = 0;

/** Play an interface sound. No-op while sound is off or the context is asleep. */
export function sfx(name: Sfx, opts: SfxOptions = {}): void {
  const c = ready();
  if (!c) return;
  const g = opts.gain ?? 1;
  const xDeg = opts.x === undefined ? 2 : Math.round(opts.x * 9);
  const pan = opts.x === undefined ? 0 : (opts.x - 0.5) * 0.8;

  switch (name) {
    case 'hover': {
      const now = performance.now();
      if (now - lastHover < 70) return;
      lastHover = now;
      voice(c, { freq: degreeHz(10 + (xDeg % 5)), dur: 0.09, gain: 0.035 * g, partials: GLASS, tone: 6000, pan });
      return;
    }
    case 'tap':
      voice(c, { freq: degreeHz(3 + xDeg), dur: 0.45, gain: 0.16 * g, partials: MALLET, wet: 0.25, tone: 5000, pan });
      noise(c, { dur: 0.03, gain: 0.04 * g, from: 3500, q: 0.8, pan });
      return;
    case 'key': {
      const now = performance.now();
      if (now - lastKey < 35) return;
      lastKey = now;
      keyStep = (keyStep + 1 + Math.floor(Math.random() * 2)) % 5;
      noise(c, { dur: 0.025, gain: 0.05 * g, from: 2600 + Math.random() * 1200, q: 2.5 });
      voice(c, { freq: degreeHz(10 + keyStep), dur: 0.06, gain: 0.018 * g, partials: GLASS, tone: 7000 });
      return;
    }
    case 'open':
      noise(c, { dur: 0.32, gain: 0.07 * g, from: 500, to: 4200, q: 1.4, wet: 0.4 });
      voice(c, { freq: degreeHz(5), at: 0.06, dur: 0.9, gain: 0.12 * g, partials: BELL, wet: 0.5 });
      voice(c, { freq: degreeHz(8), at: 0.12, dur: 1.1, gain: 0.08 * g, partials: BELL, wet: 0.6 });
      return;
    case 'close':
      noise(c, { dur: 0.26, gain: 0.05 * g, from: 3200, to: 500, q: 1.4, wet: 0.3 });
      voice(c, { freq: degreeHz(4), dur: 0.5, gain: 0.08 * g, partials: MALLET, wet: 0.3 });
      return;
    case 'nav': {
      // A small arpeggio rooted on the page's own degree: every page has its own chime
      const r = opts.degree ?? 0;
      [0, 2, 4].forEach((s, i) =>
        voice(c, { freq: degreeHz(5 + r + s), at: i * 0.075, dur: 1.4, gain: (0.1 - i * 0.02) * g, partials: BELL, wet: 0.55, tone: 7000 }));
      noise(c, { dur: 0.5, gain: 0.025 * g, from: 6000, to: 9000, q: 0.7, type: 'highpass', wet: 0.6 });
      return;
    }
    case 'dark':
      // Dusk: down the scale, a filter closing over it
      [7, 4, 2, 0].forEach((d, i) =>
        voice(c, { freq: degreeHz(d), at: i * 0.07, dur: 1.2, gain: 0.1 * g, partials: GLASS, wet: 0.6, tone: 2400 - i * 400 }));
      voice(c, { freq: degreeHz(-5), at: 0.28, dur: 1.6, gain: 0.07 * g, attack: 0.08, wet: 0.5 });
      return;
    case 'light':
      // Dawn: up the scale, brightening
      [0, 2, 4, 7].forEach((d, i) =>
        voice(c, { freq: degreeHz(d + 3), at: i * 0.07, dur: 1.1, gain: 0.09 * g, partials: BELL, wet: 0.55, tone: 3500 + i * 1500 }));
      noise(c, { at: 0.2, dur: 0.6, gain: 0.02 * g, from: 7000, to: 11000, type: 'highpass', wet: 0.7 });
      return;
    case 'lang': {
      const es = (opts.degree ?? 0) > 0;
      const [a, b] = es ? [4, 6] : [6, 4];
      voice(c, { freq: degreeHz(a), dur: 0.4, gain: 0.12 * g, partials: MALLET, wet: 0.3 });
      voice(c, { freq: degreeHz(b), at: 0.09, dur: 0.6, gain: 0.12 * g, partials: MALLET, wet: 0.35 });
      return;
    }
    case 'on':
      // The welcome bloom: D minor 9 rolled up, with a soft swell under it
      [0, 2, 4, 6, 8, 10].forEach((d, i) =>
        voice(c, { freq: degreeHz(d), at: i * 0.06, dur: 1.8, gain: (0.11 - i * 0.012) * g, partials: BELL, wet: 0.7, tone: 8000 }));
      voice(c, { freq: degreeHz(-5), dur: 2.2, gain: 0.08 * g, attack: 0.3, wet: 0.6, tone: 900 });
      return;
    case 'off':
      voice(c, { freq: degreeHz(4), dur: 0.5, gain: 0.1 * g, partials: GLASS, wet: 0.4 });
      voice(c, { freq: degreeHz(0), at: 0.1, dur: 0.8, gain: 0.09 * g, partials: GLASS, wet: 0.5 });
      return;
    case 'success':
      // F major resolving upward (F A C F): a door opening
      [1, 3, 4, 6].forEach((d, i) =>
        voice(c, { freq: degreeHz(d + 5), at: i * 0.09, dur: 1.6, gain: 0.11 * g, partials: BELL, wet: 0.6, tone: 9000 }));
      voice(c, { freq: degreeHz(1), dur: 1.8, gain: 0.08 * g, attack: 0.05, partials: MALLET, wet: 0.4 });
      return;
    case 'error':
      voice(c, { freq: degreeHz(1), dur: 0.35, gain: 0.12 * g, type: 'triangle', tone: 900, wet: 0.2 });
      voice(c, { freq: degreeHz(1) * Math.pow(2, -1 / 12), at: 0.16, dur: 0.5, gain: 0.12 * g, type: 'triangle', tone: 700, wet: 0.2 });
      return;
    case 'chipOn':
      voice(c, { freq: degreeHz(6 + (xDeg % 5)), dur: 0.35, gain: 0.1 * g, partials: MALLET, wet: 0.25, pan });
      voice(c, { freq: degreeHz(8 + (xDeg % 5)), at: 0.05, dur: 0.4, gain: 0.07 * g, partials: MALLET, wet: 0.3, pan });
      return;
    case 'chipOff':
      voice(c, { freq: degreeHz(6 + (xDeg % 5)), dur: 0.35, gain: 0.08 * g, partials: MALLET, wet: 0.2, pan });
      voice(c, { freq: degreeHz(4 + (xDeg % 5)), at: 0.05, dur: 0.35, gain: 0.06 * g, partials: MALLET, wet: 0.2, pan });
      return;
    case 'print':
      // The engraving printing in: a plate pressing paper, then a low struck bell
      noise(c, { dur: 1.5, gain: 0.05 * g, from: 900, to: 5000, q: 0.6, wet: 0.4 });
      noise(c, { at: 0.1, dur: 1.2, gain: 0.03 * g, from: 7000, to: 3000, type: 'highpass', q: 0.5, wet: 0.5 });
      voice(c, { freq: degreeHz(-5), at: 0.05, dur: 2.6, gain: 0.1 * g, partials: BELL, wet: 0.7, tone: 3000 });
      voice(c, { freq: degreeHz(2), at: 1.2, dur: 2, gain: 0.06 * g, partials: BELL, wet: 0.8 });
      return;
    case 'ink':
      // A drop landing on wet paper and soaking outward: a soft tap, then a
      // muffled bloom closing down, on the root so it sits under the page chime
      noise(c, { dur: 0.05, gain: 0.05 * g, from: 1800, q: 1.2 });
      noise(c, { at: 0.03, dur: 0.6, gain: 0.035 * g, from: 2400, to: 380, q: 0.7, wet: 0.35 });
      voice(c, { freq: degreeHz(-5), at: 0.02, dur: 0.9, gain: 0.06 * g, partials: MALLET, wet: 0.45, tone: 1400 });
      return;
    case 'note':
      voice(c, { freq: degreeHz(opts.degree ?? 0), dur: 0.7, gain: 0.11 * g, partials: MALLET, wet: 0.35, tone: 6000, pan });
      return;
  }
}

// Dev only: audition any sound from the console, e.g. sfx('success'), sfx('note', { degree: 7 })
if (import.meta.env.DEV && typeof window !== 'undefined') Object.assign(window, { sfx, degreeHz });
