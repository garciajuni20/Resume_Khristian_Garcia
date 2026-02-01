type Props = {
  allTags: string[]
  activeTags: string[]
  onToggle: (tag: string) => void
  onClear: () => void
  labels?: {
    filterBy?: string
    clear?: string
  }
}

export default function FilterChips({
  allTags,
  activeTags,
  onToggle,
  onClear,
  labels
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-neutral-600 dark:text-neutral-300 mr-1">
        {labels?.filterBy ?? "Filter by"}
      </span>

      {allTags.map((tag) => {
        const active = activeTags.includes(tag)
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            type="button"
            className={[
              "rounded-full px-3 py-1 text-xs border transition",
              active
                ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white"
                : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-800"
            ].join(" ")}
          >
            {tag}
          </button>
        )
      })}

      {activeTags.length > 0 ? (
        <button
          onClick={onClear}
          type="button"
          className="rounded-full px-3 py-1 text-xs border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          {labels?.clear ?? "Clear"}
        </button>
      ) : null}
    </div>
  )
}
