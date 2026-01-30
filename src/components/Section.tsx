import { ReactNode } from "react"
import { motion } from "framer-motion"

export default function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>
        <div className="mt-4">{children}</div>
      </motion.div>
    </section>
  )
}
