/**
 * Guilloché: the interlaced wave bands engraved on banknotes, here drawn as
 * plain SVG path data so the same frame renders in the PDF (react-pdf <Svg>)
 * and on the site (<svg>). Pure math, no randomness: identical every render.
 */

export interface RingOptions {
  /** Center and radii of the inner ellipse the band hugs */
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  /** Band width: how far the waves swing outward from the inner ellipse */
  width?: number;
  /** Interlaced strands; each is the same wave shifted in phase */
  strands?: number;
  /** Wave crests per turn */
  lobes?: number;
  /** Points per strand; 360 is smooth at print size */
  steps?: number;
}

function ellipsePoint(cx: number, cy: number, rx: number, ry: number, t: number, offset: number) {
  // Offset along the ellipse normal so the band keeps an even width on both axes
  const nx = Math.cos(t) * ry;
  const ny = Math.sin(t) * rx;
  const len = Math.hypot(nx, ny) || 1;
  return [cx + rx * Math.cos(t) + (nx / len) * offset, cy + ry * Math.sin(t) + (ny / len) * offset];
}

const f = (n: number) => Math.round(n * 100) / 100;

/** Strand paths of an elliptical guilloché band, plus its two edge lines. */
export function guillocheRing({ cx, cy, rx, ry, width = 6, strands = 5, lobes = 28, steps = 360 }: RingOptions) {
  const paths: string[] = [];
  for (let s = 0; s < strands; s++) {
    const phase = (s / strands) * Math.PI * 2;
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      // Two crossing waves give the woven look of a rose-engine cut
      const w = (width / 2) * (1 + 0.62 * Math.sin(lobes * t + phase) + 0.38 * Math.sin((lobes / 2) * t - phase));
      const [x, y] = ellipsePoint(cx, cy, rx, ry, t, Math.max(0, Math.min(width, w)));
      d += `${i === 0 ? 'M' : 'L'}${f(x)} ${f(y)}`;
    }
    paths.push(d + 'Z');
  }
  const edge = (offset: number) => {
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const [x, y] = ellipsePoint(cx, cy, rx, ry, (i / steps) * Math.PI * 2, offset);
      d += `${i === 0 ? 'M' : 'L'}${f(x)} ${f(y)}`;
    }
    return d + 'Z';
  };
  return { strands: paths, inner: edge(0), outer: edge(width + 1.2) };
}

/** A straight guilloché border: the same woven wave run along a line, for rules. */
export function guillocheRule(length: number, height = 5, strands = 3, period = 9) {
  const paths: string[] = [];
  const steps = Math.ceil(length / 1.5);
  for (let s = 0; s < strands; s++) {
    const phase = (s / strands) * Math.PI * 2;
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * length;
      const t = (x / period) * Math.PI * 2;
      const y = height / 2 + (height / 2) * (0.62 * Math.sin(t + phase) + 0.38 * Math.sin(t / 2 - phase));
      d += `${i === 0 ? 'M' : 'L'}${f(x)} ${f(y)}`;
    }
    paths.push(d);
  }
  return paths;
}
