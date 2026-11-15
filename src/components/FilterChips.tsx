import { useState } from 'react';

type Props = {
  /** Tags in display order (callers sort by relevance) */
  allTags: string[];
  activeTags: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
  /** How many chips show before "more"; active tags are always visible */
  collapsedCount?: number;
  labels?: {
    filterBy?: string;
    clear?: string;
    more?: (n: number) => string;
    less?: string;
  };
};

/* Same chip grammar as the Projects filter: pills, active = inverted ink. */
const CHIP = 'rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-n-accent';

export default function FilterChips({ allTags, activeTags, onToggle, onClear, collapsedCount = 18, labels }: Props) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = Math.max(0, allTags.length - collapsedCount);
  const visible = expanded
    ? allTags
    : allTags.filter((tag, i) => i < collapsedCount || activeTags.includes(tag));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="n-muted mr-1 text-xs">{labels?.filterBy ?? 'Filter by'}</span>

      {visible.map(tag => {
        const active = activeTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            type="button"
            aria-pressed={active}
            className={`${CHIP} ${active ? 'border-n-text bg-n-text text-n-bg' : 'n-border n-text n-hover'}`}
          >
            {tag}
          </button>
        );
      })}

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          className={`${CHIP} n-muted border-dashed border-n-border n-hover`}
        >
          {expanded ? (labels?.less ?? 'Show less') : (labels?.more ? labels.more(hiddenCount) : `+${hiddenCount} more`)}
        </button>
      )}

      {activeTags.length > 0 ? (
        <button onClick={onClear} type="button" className={`${CHIP} n-border n-muted n-hover`}>
          {labels?.clear ?? 'Clear'}
        </button>
      ) : null}
    </div>
  );
}
