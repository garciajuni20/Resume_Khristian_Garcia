import { motion } from "framer-motion"

type Lang = "en" | "es"

type Item = {
  id: string
  role: string
  company: string
  location: string
  start: string
  end: string
  tags?: string[]
  bullets?: string[]
}

type Props = {
  item: Item
  onOpen: (item: Item) => void
  lang: Lang
}

export default function ExperienceCard({ item, onOpen, lang }: Props) {
  const dateLabel = lang === "en" ? `${item.start} — ${item.end}` : `${item.start} — ${item.end}`

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      className="w-full text-left rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition
                 dark:border-neutral-800 dark:bg-neutral-900"
      whileHover={{ y: -1 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold">{item.role}</div>
          <div className="text-sm text-neutral-700 dark:text-neutral-200">{item.company}</div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{item.location}</div>
        </div>

        <div className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">{dateLabel}</div>
      </div>

      {item.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 dark:bg-neutral-950 dark:text-neutral-200"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {item.bullets?.length ? (
        <ul className="mt-4 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-200 space-y-1">
          {item.bullets.slice(0, 2).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}
    </motion.button>
  )
}
