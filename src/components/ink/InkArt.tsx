import type { CSSProperties } from 'react';

/**
 * One of the engravings in public/ink, printed in the current text color through
 * a CSS mask (see `.ink-art` in index.css), so a single file serves both themes.
 * Decorative: the words next to it carry the meaning.
 */
export default function InkArt({ name, className = '' }: { name: string; className?: string }) {
  const style = { '--ink': `url(${import.meta.env.BASE_URL}ink/${name}.webp)` } as CSSProperties;
  return <span aria-hidden="true" className={`ink-art block ${className}`} style={style} />;
}
