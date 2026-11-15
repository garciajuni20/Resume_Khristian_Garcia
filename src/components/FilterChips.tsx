type Props = {
  allTags: string[];
  activeTags: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
  labels?: {
    filterBy?: string;
    clear?: string;
  };
};

/* Same chip grammar as the Projects filter: pills, active = inverted ink. */
const CHIP = 'rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-accent)]';

export default function FilterChips({ allTags, activeTags, onToggle, onClear, labels }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="n-muted mr-1 text-xs">{labels?.filterBy ?? 'Filter by'}</span>

      {allTags.map(tag => {
        const active = activeTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            type="button"
            aria-pressed={active}
            className={`${CHIP} ${active ? 'border-[var(--n-text)] bg-[var(--n-text)] text-[var(--n-bg)]' : 'n-border n-text n-hover'}`}
          >
            {tag}
          </button>
        );
      })}

      {activeTags.length > 0 ? (
        <button onClick={onClear} type="button" className={`${CHIP} n-border n-muted n-hover`}>
          {labels?.clear ?? 'Clear'}
        </button>
      ) : null}
    </div>
  );
}
