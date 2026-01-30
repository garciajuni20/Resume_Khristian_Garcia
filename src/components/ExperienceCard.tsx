import { motion } from "framer-motion"

type Experience = {
  id: string
  company: string
  role: string
  start: string
  end: string
  location?: string
  tags?: string[]
  bullets?: string[]
}

type Props = {
  item: Experience
  onOpen: (item: Experience) => void
  lang: "en" | "es"
}

function formatDate(d: string, lang: "en" | "es") {
  if (!d || d === "present") return lang === "en" ? "Present" : "Actual"

  const [y, m] = d.split("-")
  if (!m) return y

  const monthsEN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const monthsES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]

  const mm = Number(m)
  if (!mm || mm < 1 || mm > 12) return d

  return `${(lang === "en" ? monthsEN : monthsES)[mm - 1]} ${y}`
}

export default function ExperienceCard({ item, onOpen, lang }: Props) {
  return (
    <motion.button
      onClick={() => onOpen(item)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="text-left w-full rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
      type="button"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{item.role}</div>
          <div className="text-sm text-neutral-700 dark:text-neutral-300">{item.company}</div>
          {item.location ? (
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{item.location}</div>
          ) : null}

          {item.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="text-xs text-neutral-600 dark:text-neutral-400 sm:text-right">
          {formatDate(item.start, lang)} — {formatDate(item.end, lang)}
        </div>
      </div>

      {item.bullets?.length ? (
        <ul className="mt-4 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-200 space-y-1">
          {item.bullets.slice(0, 2).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 text-xs text-neutral-600 dark:text-neutral-300 underline">
        {lang === "en" ? "Click to view details" : "Click para ver detalles"}
      </div>
    </motion.button>
  )
}
