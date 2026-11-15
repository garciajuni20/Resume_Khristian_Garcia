import { useMemo } from 'react';
import { guillocheRing } from '../../utils/guilloche';

/**
 * The portrait in a guilloché oval, like the portrait window of a banknote.
 * The frame is drawn in currentColor; the photo is a duotone already cut to an
 * oval (scripts/ink-assets.py).
 */
export default function InkPortrait({ alt, width = 136, className = '' }: { alt: string; width?: number; className?: string }) {
  const height = Math.round(width * 1.25);
  const band = Math.max(3, Math.round(width / 18));
  const inset = band + 2;
  const ring = useMemo(
    () => guillocheRing({ cx: width / 2, cy: height / 2, rx: width / 2 - inset, ry: height / 2 - inset, width: band, strands: 5, lobes: 34 }),
    [width, height, band, inset],
  );
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width, height }}>
      <img
        src={`${import.meta.env.BASE_URL}ink/portrait-oval.webp`}
        alt={alt}
        width={480}
        height={600}
        className="absolute object-cover"
        style={{ top: inset, left: inset, width: width - inset * 2, height: height - inset * 2 }}
      />
      <svg aria-hidden="true" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 overflow-visible">
        <g fill="none" stroke="currentColor">
          {ring.strands.map((d, i) => (
            <path key={i} d={d} strokeWidth={0.5} opacity={0.85} />
          ))}
          <path d={ring.inner} strokeWidth={0.9} />
          <path d={ring.outer} strokeWidth={0.9} />
        </g>
      </svg>
    </div>
  );
}
