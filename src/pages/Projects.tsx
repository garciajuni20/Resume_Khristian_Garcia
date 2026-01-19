import Container from "../components/Container"
import Section from "../components/Section"
import { useLang } from "../context/LanguageContext"
import { Link } from "react-router-dom"

type Project = {
  titleEN: string
  titleES: string
  descriptionEN: string
  descriptionES: string
  tags: string[]
  links: { label: string; href: string }[]
}

const projects: Project[] = [
  {
    titleEN: "Interactive Resume (This Website)",
    titleES: "CV Interactivo (Este Sitio)",
    descriptionEN:
      "Portfolio-style resume with bilingual toggle, filters, skill meters and modal experience details. Built with React + Tailwind.",
    descriptionES:
      "CV estilo portafolio con toggle bilingüe, filtros, barras de skills y detalles en modal. Hecho con React + Tailwind.",
    tags: ["React", "Tailwind", "UI/UX", "GitHub Pages"],
    links: [{ label: "Repo", href: "https://github.com/garciajuni20/Resume_Khristian_Garcia" }]
  }
  // Aquí luego agregamos tus otros proyectos (Full Stack, APIs, etc.)
]

export default function Projects() {
  const { lang } = useLang()

  return (
    <main className="min-h-screen bg-neutral-50">
      <Container>
        <div className="py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
            {lang === "en" ? "Projects" : "Proyectos"}
          </h1>
          <p className="mt-2 text-neutral-700">
            {lang === "en"
              ? "Showcasing both data/BI and full-stack skills."
              : "Mostrando habilidades tanto de datos/BI como full-stack."}
          </p>

          <Section title={lang === "en" ? "Featured" : "Destacados"}>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((p) => (
                <div key={p.titleEN} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="text-lg font-semibold text-neutral-900">
                    {lang === "en" ? p.titleEN : p.titleES}
                  </div>
                  <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                    {lang === "en" ? p.descriptionEN : p.descriptionES}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                      >
                        {l.label}
                      </a>
                    ))}
                    <Link
                    to="/resume"
                    className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold !text-white hover:bg-neutral-800"
                    style={{ color: "white" }}
                    >
                    {lang === "en" ? "View Resume" : "Ver CV"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </Container>
    </main>
  )
}
