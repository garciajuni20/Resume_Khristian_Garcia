/**
 * KG monogram. Two separate letters (a gap keeps them readable at 16 px); the
 * G's bar is the only accent. Drawn with strokes so it stays crisp from 16 px (favicon) to print.
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
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title && <title>{title}</title>}
      {/* K */}
      <path d="M8 17v30M8 34l13-17M13.5 27l8.5 20" />
      {/* G: its own space to the right of the K, never touching it */}
      <path d="M52.5 23A12.5 12.5 0 1 0 56 33" />
      <path d="M56 33H45" stroke="var(--n-accent-2, #E94560)" />
    </svg>
  );
}

/** Mark + name lockup for the navbar and footer. */
export function Wordmark({ name, compact = false }: { name: string; compact?: boolean }) {
  return (
    <span className="n-text inline-flex items-center gap-2.5">
      <Mark size={30} />
      <span className={`font-semibold tracking-tight ${compact ? 'hidden sm:inline' : ''}`}>{name}</span>
    </span>
  );
}
