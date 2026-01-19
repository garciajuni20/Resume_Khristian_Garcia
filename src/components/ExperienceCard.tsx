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

function formatDate(d: string) {
  if (!d || d === "present") return "Present"
  const [y, m] = d.split("-")
  if (!m) return y
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const mm = Number(m)
  if (!mm || mm < 1 || mm > 12) return d
  return `${months[mm - 1]} ${y}`
}

export default function ExperienceCard({
  item,
  onOpen
}: {
  item: Experience
  onOpen: (item: Experience) => void
}) {
  return (
    <motion.button
      onClick={() => onOpen(item)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="text-left w-full rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-sm"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-base font-semibold">{item.role}</div>
          <div className="text-sm text-neutral-700">{item.company}</div>
          {item.location ? <div className="text-xs text-neutral-500 mt-1">{item.location}</div> : null}

          {item.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="text-xs text-neutral-600 sm:text-right">
          {formatDate(item.start)} — {formatDate(item.end)}
        </div>
      </div>

      {item.bullets?.length ? (
        <ul className="mt-4 list-disc pl-5 text-sm text-neutral-700 space-y-1">
          {item.bullets.slice(0, 2).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 text-xs text-neutral-600 underline">
        Click to view details
      </div>
    </motion.button>
  )
}
