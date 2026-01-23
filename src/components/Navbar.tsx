import { NavLink } from "react-router-dom"
import { useLang } from "../context/LanguageContext"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const linkBase =
  "inline-flex items-center justify-center px-3 py-2 rounded-xl text-sm font-semibold transition " +
  "focus:outline-none focus:ring-2 focus:ring-neutral-300"

function navClass(isActive: boolean) {
  return [
    linkBase,
    isActive
      ? "bg-neutral-900 text-white shadow-sm"
      : "bg-white text-neutral-700 hover:bg-neutral-100"
  ].join(" ")
}

export default function Navbar() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)

  // Cerrar menú al cambiar tamaño a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false) // sm breakpoint
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Cerrar menú al navegar
  const close = () => setOpen(false)

  const labels = lang === "en"
    ? { home: "Home", resume: "Resume", projects: "Projects", contact: "Contact" }
    : { home: "Inicio", resume: "CV", projects: "Proyectos", contact: "Contacto" }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-3">
          <NavLink to="/" className="font-semibold tracking-tight text-neutral-900">
            Khristian Garcia
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-2">
            <NavLink to="/" end className={({ isActive }) => navClass(isActive)}>
              {labels.home}
            </NavLink>
            <NavLink to="/resume" className={({ isActive }) => navClass(isActive)}>
              {labels.resume}
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => navClass(isActive)}>
              {labels.projects}
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => navClass(isActive)}>
              {labels.contact}
            </NavLink>

            {/* Toggle desktop */}
            <div className="ml-2 flex items-center rounded-xl border border-neutral-200 bg-white p-1">
              <button
                onClick={() => setLang("en")}
                className={[
                  "px-3 py-1.5 text-xs rounded-lg transition font-semibold",
                  lang === "en" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50"
                ].join(" ")}
              >
                EN
              </button>
              <button
                onClick={() => setLang("es")}
                className={[
                  "px-3 py-1.5 text-xs rounded-lg transition font-semibold",
                  lang === "es" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50"
                ].join(" ")}
              >
                ES
              </button>
            </div>
          </nav>

          {/* Mobile actions */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Toggle mobile (compact) */}
            <div className="flex items-center rounded-xl border border-neutral-200 bg-white p-1">
              <button
                onClick={() => setLang("en")}
                className={[
                  "px-2 py-1 text-xs rounded-lg transition font-semibold",
                  lang === "en" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50"
                ].join(" ")}
              >
                EN
              </button>
              <button
                onClick={() => setLang("es")}
                className={[
                  "px-2 py-1 text-xs rounded-lg transition font-semibold",
                  lang === "es" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-50"
                ].join(" ")}
              >
                ES
              </button>
            </div>

            <button
              onClick={() => setOpen((p) => !p)}
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white p-2 text-neutral-900 hover:bg-neutral-50"
              aria-label="Open menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open ? (
          <div className="sm:hidden pb-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
              <div className="grid gap-2">
                <NavLink to="/" end onClick={close} className={({ isActive }) => navClass(isActive)}>
                  {labels.home}
                </NavLink>
                <NavLink to="/resume" onClick={close} className={({ isActive }) => navClass(isActive)}>
                  {labels.resume}
                </NavLink>
                <NavLink to="/projects" onClick={close} className={({ isActive }) => navClass(isActive)}>
                  {labels.projects}
                </NavLink>
                <NavLink to="/contact" onClick={close} className={({ isActive }) => navClass(isActive)}>
                  {labels.contact}
                </NavLink>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
