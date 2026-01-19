import Container from "../components/Container"
import { useLang } from "../context/LanguageContext"
import { profileEN } from "../data/profile-en"
import { profileES } from "../data/profile-es"
import { Link } from "react-router-dom"

export default function Home() {
  const { lang } = useLang()
  const data = lang === "en" ? profileEN : profileES

  const t = lang === "en"
    ? {
        title: "Full-Stack & Data Portfolio",
        subtitle:
          "I build reliable data foundations (Snowflake/SQL) and ship clean interfaces (React) that make insights usable.",
        cta1: "View Interactive Resume",
        cta2: "See Projects",
        what: "What I do",
        cards: [
          { title: "Data & BI", body: "Modeling, unified sources of truth, KPI layers, dashboards (Power BI/Tableau)." },
          { title: "Automation", body: "Process automation with Microsoft ecosystem and workflow optimization." },
          { title: "Full-Stack", body: "React UI + clean architecture mindset. Building product-like experiences." }
        ]
      }
    : {
        title: "Portafolio Full-Stack & Datos",
        subtitle:
          "Construyo bases de datos confiables (Snowflake/SQL) y desarrollo interfaces limpias (React) para convertir insights en producto.",
        cta1: "Ver CV Interactivo",
        cta2: "Ver Proyectos",
        what: "Lo que hago",
        cards: [
          { title: "Datos & BI", body: "Modelado, fuentes únicas de verdad, KPIs, dashboards (Power BI/Tableau)." },
          { title: "Automatización", body: "Automatización de procesos con ecosistema Microsoft y optimización de flujos." },
          { title: "Full-Stack", body: "UI en React + mentalidad de arquitectura limpia. Experiencias tipo producto." }
        ]
      }

  return (
    <main className="min-h-screen bg-neutral-50">
      <Container>
        <div className="py-12">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="grid gap-8 sm:grid-cols-[1fr_220px] sm:items-start">
              <div>
                <p className="text-sm text-neutral-600">{data.location}</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">
                  {t.title}
                </h1>
                <p className="mt-3 text-neutral-700 leading-relaxed">{t.subtitle}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                <Link
                to="/resume"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold !text-white hover:bg-neutral-800"
                style={{ color: "white" }}
                >
                {t.cta1}
                </Link>
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    {t.cta2}
                  </Link>
                </div>
              </div>

              <div className="sm:justify-self-end">
                <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-2">
                  <img
                    src={data.photoUrl}
                    alt="profile"
                    className="h-52 w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-semibold text-neutral-900">{t.what}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {t.cards.map((c) => (
                  <div key={c.title} className="rounded-2xl border border-neutral-200 bg-white p-5">
                    <div className="font-semibold text-neutral-900">{c.title}</div>
                    <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-neutral-500">
            {lang === "en"
              ? "This site is built with React + Tailwind and deployed on GitHub Pages."
              : "Este sitio está hecho con React + Tailwind y desplegado en GitHub Pages."}
          </p>
        </div>
      </Container>
    </main>
  )
}
