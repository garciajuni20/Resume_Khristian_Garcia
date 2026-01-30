import Container from "../components/Container"
import { useLang } from "../context/LanguageContext"

export default function Projects() {
  const { lang } = useLang()

  const t =
    lang === "en"
      ? {
          title: "Projects",
          subtitle: "A few projects to demonstrate full-stack + data skills.",
          resumeProject: "Interactive Resume Portfolio",
          resumeDesc:
            "React + TypeScript + Tailwind portfolio with language + theme toggles, filters, and structured resume content.",
          viewRepo: "View Repository"
        }
      : {
          title: "Proyectos",
          subtitle: "Algunos proyectos para demostrar habilidades full-stack + datos.",
          resumeProject: "Portafolio CV Interactivo",
          resumeDesc:
            "Portafolio en React + TypeScript + Tailwind con toggle de idioma + tema, filtros y CV estructurado.",
          viewRepo: "Ver Repositorio"
        }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <Container>
        <div className="py-10">
          <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">{t.subtitle}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="text-lg font-semibold">{t.resumeProject}</div>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-200">{t.resumeDesc}</p>

              <a
                className="mt-4 inline-flex rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
                href="https://github.com/garciajuni20/Resume_Khristian_Garcia"
                target="_blank"
                rel="noreferrer"
              >
                {t.viewRepo}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
