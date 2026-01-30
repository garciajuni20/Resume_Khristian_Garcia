import Container from "../components/Container"
import { useLang } from "../context/LanguageContext"
import { profileEN } from "../data/profile-en"
import { profileES } from "../data/profile-es"

export default function Home() {
  const { lang } = useLang()
  const data = lang === "en" ? profileEN : profileES

  const t =
    lang === "en"
      ? {
          title: "Portfolio",
          subtitle:
            "Full-stack mindset with a data/BI foundation. This site is a living project and evolves over time.",
          ctaResume: "Open Interactive Resume",
          ctaProjects: "View Projects"
        }
      : {
          title: "Portafolio",
          subtitle:
            "Mentalidad full-stack con base sólida en datos/BI. Este sitio es un proyecto vivo y mejora constantemente.",
          ctaResume: "Abrir CV Interactivo",
          ctaProjects: "Ver Proyectos"
        }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <Container>
        <div className="py-10">
          <div className="grid gap-6 sm:grid-cols-[1fr_220px] sm:items-start">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">{t.subtitle}</p>

              <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <div className="text-lg font-semibold">{data.name}</div>
                <div className="text-sm text-neutral-700 dark:text-neutral-300">{data.headline}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{data.location}</div>

                <p className="mt-4 text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                  {data.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="#/resume"
                    className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                  >
                    {t.ctaResume}
                  </a>

                  <a
                    href="#/projects"
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
                  >
                    {t.ctaProjects}
                  </a>
                </div>
              </div>
            </div>

            {/* Photo (fix cropping) */}
            <div className="sm:justify-self-end">
              <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <div className="rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-950">
                  <img
                    src={data.photoUrl}
                    alt="profile"
                    className="w-full aspect-square sm:aspect-[4/5] object-contain sm:object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
