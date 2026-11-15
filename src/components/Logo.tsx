/**
 * KG monogram. The K's arms point into an open G; the G's bar is the only
 * accent. Drawn with strokes so it stays crisp from 16 px (favicon) to print.
 * `public/favicon.svg` is the same geometry on a dark tile; keep them in sync.
 */
export function Mark({ size = 24, className = '', title }: { size?: number; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke="currentColor"
      strokeWidth={6.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title && <title>{title}</title>}
      {/* K */}
      <path d="M12 16v32M12 32l12.5-12M12 32l12.5 12" />
      {/* G */}
      <path d="M48.5 21A15 15 0 1 0 53 33" />
      <path d="M53 33H41" stroke="var(--n-accent-2, #E94560)" />
    </svg>
  );
}

/** Mark + name lockup for the navbar and footer. */
export function Wordmark({ name, compact = false }: { name: string; compact?: boolean }) {
  return (
    <span className="n-text inline-flex items-center gap-2.5">
      <Mark size={26} />
      <span className={`font-semibold tracking-tight ${compact ? 'hidden sm:inline' : ''}`}>{name}</span>
    </span>
  );
}
