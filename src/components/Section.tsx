import { motion } from "framer-motion"

export default function Section({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      className="mt-10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </motion.section>
  )
}
