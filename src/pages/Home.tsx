import Container from "../components/Container"
import { useLang } from "../context/LanguageContext"
import { profileEN } from "../data/profile-en"
import { profileES } from "../data/profile-es"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Home() {
  const { lang } = useLang()
  const data = lang === "en" ? profileEN : profileES

  const t =
    lang === "en"
      ? {
          title: "Portfolio",
          subtitle:
            "Full-stack mindset with a strong Data/BI foundation. This site is a living project—clean UI, structured content, and real engineering.",
          ctaResume: "Open Interactive Resume",
          ctaProjects: "View Projects"
        }
      : {
          title: "Portafolio",
          subtitle:
            "Mentalidad full-stack con base sólida en Datos/BI. Este sitio es un proyecto vivo—UI limpia, contenido estructurado y enfoque real de ingeniería.",
          ctaResume: "Abrir CV Interactivo",
          ctaProjects: "Ver Proyectos"
        }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <Container>
        <div className="py-12">
          <motion.div
            className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">
                  {data.location}
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
                  {t.title} — {data.name}
                </h1>
                <p className="mt-2 text-neutral-700 dark:text-neutral-200">
                  {data.headline}
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {t.subtitle}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(data.badges ?? []).slice(0, 6).map((b: string) => (
                    <span
                      key={b}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/resume"
                    className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                  >
                    {t.ctaResume}
                  </Link>

                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
                  >
                    {t.ctaProjects}
                  </Link>
                </div>
              </div>

              <div className="sm:w-52">
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-2 dark:border-neutral-800 dark:bg-neutral-950">
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <img
                      src={data.photoUrl}
                      alt="profile"
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  )
}
