import Container from "../components/Container"
import { useLang } from "../context/LanguageContext"
import { profileEN } from "../data/profile-en"
import { profileES } from "../data/profile-es"

export default function Contact() {
  const { lang } = useLang()
  const data = lang === "en" ? profileEN : profileES

  const t = lang === "en"
    ? {
        title: "Contact",
        subtitle: "Open to BI/Data roles and full-stack collaborations.",
        email: "Email",
        links: "Links"
      }
    : {
        title: "Contacto",
        subtitle: "Disponible para roles de BI/Datos y colaboraciones full-stack.",
        email: "Correo",
        links: "Enlaces"
      }

  return (
    <main className="min-h-screen bg-neutral-50">
      <Container>
        <div className="py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">{t.title}</h1>
          <p className="mt-2 text-neutral-700">{t.subtitle}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm text-neutral-500">{t.email}</div>
              <a className="mt-2 block text-lg font-semibold text-neutral-900" href={`mailto:${data.email}`}>
                {data.email}
              </a>
              <div className="mt-3 text-sm text-neutral-600">{data.phone}</div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm text-neutral-500">{t.links}</div>
              <div className="mt-3 flex flex-col gap-2">
                {data.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
