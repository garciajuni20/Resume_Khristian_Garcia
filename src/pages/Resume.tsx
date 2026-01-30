import { useMemo, useState } from "react"
import Container from "../components/Container"
import Section from "../components/Section"
import FilterChips from "../components/FilterChips"
import SkillMeter from "../components/SkillMeter"
import ExperienceCard from "../components/ExperienceCard"
import { profileEN } from "../data/profile-en"
import { profileES } from "../data/profile-es"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

type Lang = "en" | "es"

export default function ResumePage() {
  const [lang, setLang] = useState<Lang>("en")
  const data = lang === "en" ? profileEN : profileES

  const labels = lang === "en"
    ? {
        pageTitle: "Interactive Resume",
        subtitle: "A product-style resume to demonstrate full-stack mindset (UI + data + structure).",
        filterBy: "Filter by",
        clear: "Clear",
        skills: "Skills",
        education: "Education",
        download: "Download PDF",
        details: "Details",
        close: "Close"
      }
    : {
        pageTitle: "CV Interactivo",
        subtitle: "Un CV estilo producto para demostrar mentalidad full-stack (UI + datos + estructura).",
        filterBy: "Filtrar por",
        clear: "Limpiar",
        skills: "Habilidades",
        education: "Educación",
        download: "Descargar PDF",
        details: "Detalles",
        close: "Cerrar"
      }

  // Tags dinámicos de tu experiencia
  const allTags = useMemo(() => {
    const set = new Set<string>()
    data.experience.forEach((e) => (e.tags ?? []).forEach((t) => set.add(t)))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [data])

  const [activeTags, setActiveTags] = useState<string[]>([])
  const [selected, setSelected] = useState<any | null>(null)

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  function clearTags() {
    setActiveTags([])
  }

  const filteredExperience = useMemo(() => {
    if (activeTags.length === 0) return data.experience
    return data.experience.filter((e) => (e.tags ?? []).some((t) => activeTags.includes(t)))
  }, [data, activeTags])

  return (
      <main className="min-h-screen bg-neutral-50">
        <Container>
        <div className="py-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {labels.pageTitle}
            </h1>
            <p className="mt-1 text-sm text-neutral-600">{labels.subtitle}</p>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-1">
            <button
              onClick={() => setLang("en")}
              className={[
                "px-3 py-1.5 text-xs rounded-lg transition",
                lang === "en" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50"
              ].join(" ")}
            >
              EN
            </button>
            <button
              onClick={() => setLang("es")}
              className={[
                "px-3 py-1.5 text-xs rounded-lg transition",
                lang === "es" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50"
              ].join(" ")}
            >
              ES
            </button>
          </div>
        </div>

        {/* Top card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="grid gap-6 sm:grid-cols-[1fr_180px] sm:items-start">
            <div>
              <div className="text-lg font-semibold">{data.name}</div>
              <div className="text-sm text-neutral-700">{data.headline}</div>
              <div className="text-xs text-neutral-500 mt-1">{data.location}</div>

              <p className="mt-4 text-sm text-neutral-700 leading-relaxed">
                {data.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={data.resumePdfPath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold !text-white shadow-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                  style={{ color: "white" }}
                >
                  {labels.download}
                </a>

                {data.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="sm:justify-self-end">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-2">
                <img
              src={data.photoUrl}
              alt="Profile photo"
              className="w-full aspect-square rounded-xl object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        <Section title={lang === "en" ? "Experience" : "Experiencia"}>
          <FilterChips
            allTags={allTags}
            activeTags={activeTags}
            onToggle={toggleTag}
            onClear={clearTags}
            labels={{ filterBy: labels.filterBy, clear: labels.clear }}
          />

          <div className="mt-6 grid gap-4">
            {filteredExperience.map((e) => (
              <ExperienceCard key={e.id} item={e as any} onOpen={setSelected} />
            ))}
          </div>
        </Section>

        <Section title={labels.skills}>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.skills.map((s) => (
              <SkillMeter key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        </Section>

        <Section title={labels.education}>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            {data.education.map((ed, i) => (
              <div key={i}>
                <div className="font-semibold">{ed.institution}</div>
                <div className="text-sm text-neutral-700">
                  {ed.degree} — {ed.area}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {lang === "en" ? "End:" : "Fin:"} {ed.end}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Modal */}
        <AnimatePresence>
          {selected ? (
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 p-4 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="w-full max-w-2xl rounded-2xl bg-white border border-neutral-200 p-6"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">{selected.role}</div>
                    <div className="text-sm text-neutral-700">{selected.company}</div>
                    <div className="text-xs text-neutral-500 mt-1">{selected.location}</div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-xl border border-neutral-200 p-2 hover:bg-neutral-50"
                    aria-label={labels.close}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {selected.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selected.tags.map((t: string) => (
                      <span key={t} className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                {selected.bullets?.length ? (
                  <ul className="mt-5 list-disc pl-5 text-sm text-neutral-700 space-y-1">
                    {selected.bullets.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </main>
  )
}
