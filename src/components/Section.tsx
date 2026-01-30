import type { ReactNode } from "react"

type Props = {
  title: string
  children: ReactNode
}

export default function Section({ title, children }: Props) {
  return (
    <section className="mt-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      </div>

      <div className="mt-4">{children}</div>
    </section>
  )
}
