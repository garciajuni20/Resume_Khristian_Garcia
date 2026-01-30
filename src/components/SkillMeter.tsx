import { motion } from "framer-motion"

type Props = {
  name: string
  level: number // 0-100
}

export default function SkillMeter({ name, level }: Props) {
  const safe = Math.max(0, Math.min(100, level))

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center justify-between gap-3">
        <div className="font-medium text-neutral-900 dark:text-neutral-100">{name}</div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">{safe}%</div>
      </div>

      <div className="mt-3 h-2.5 w-full rounded-full bg-neutral-100 overflow-hidden dark:bg-neutral-800">
        <motion.div
          className="h-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100"
          initial={{ width: 0 }}
          animate={{ width: `${safe}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
