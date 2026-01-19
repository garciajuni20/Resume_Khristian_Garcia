export default function Section({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}
