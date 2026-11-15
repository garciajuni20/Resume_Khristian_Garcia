/** Small seeded PRNG: the same fibers on every visit and every render */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Fiber = { d: string; tone: 0 | 1 | 2 };

/** Short curved strokes scattered like the security fibers in banknote paper */
const FIBERS: Fiber[] = (() => {
  const rand = mulberry32(2019);
  return Array.from({ length: 40 }, () => {
    const x = rand() * 1000;
    const y = rand() * 1000;
    const len = 18 + rand() * 30;
    const a = rand() * Math.PI * 2;
    const bend = (rand() - 0.5) * len * 0.9;
    const x2 = x + Math.cos(a) * len;
    const y2 = y + Math.sin(a) * len;
    const cx = (x + x2) / 2 - Math.sin(a) * bend;
    const cy = (y + y2) / 2 + Math.cos(a) * bend;
    return { d: `M${x.toFixed(1)} ${y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`, tone: Math.floor(rand() * 3) as 0 | 1 | 2 };
  });
})();

/**
 * The fluorescent fibers that only UV light reveals. Fixed over the viewport,
 * never catches the pointer, hidden from assistive technology.
 */
export default function UvFibers() {
  return (
    <svg aria-hidden="true" className="uv-fibers" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
      {FIBERS.map((f, i) => (
        <path key={i} d={f.d} className={`uv-fiber uv-fiber-${f.tone}`} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
