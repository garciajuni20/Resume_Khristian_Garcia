import Container from "../components/Container"
import { useLang } from "../context/LanguageContext"
import { ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Home() {
  const { lang } = useLang()

  const t =
    lang === "en"
      ? {
          title: "Data + Full-Stack Portfolio",
          subtitle:
            "I build trusted data layers (Snowflake/SQL) and product-style interfaces (React/Tailwind). This site is a practical demo of both.",
          ctaPrimary: "View Interactive Resume",
          ctaSecondary: "See Projects",
          badges: ["Snowflake", "SQL", "Power BI", "React", "TypeScript", "Tailwind", "APIs"]
        }
      : {
          title: "Portafolio Data + Full-Stack",
          subtitle:
            "Construyo capas de datos confiables (Snowflake/SQL) y experiencias tipo producto (React/Tailwind). Este sitio demuestra ambos.",
          ctaPrimary: "Ver CV Interactivo",
          ctaSecondary: "Ver Proyectos",
          badges: ["Snowflake", "SQL", "Power BI", "React", "TypeScript", "Tailwind", "APIs"]
        }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <Container>
        <motion.div
          className="pt-10 pb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200">
              <Sparkles className="h-4 w-4" />
              <span>{lang === "en" ? "Portfolio" : "Portafolio"}</span>
            </div>

            <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">
              {t.title}
            </h1>

            <p className="mt-3 max-w-2xl text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {t.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {t.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700
                    dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800
                  dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                {t.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50
                  dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </main>
  )
}
