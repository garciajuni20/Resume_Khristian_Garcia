import { NavLink } from "react-router-dom"
import { useLang } from "../context/LanguageContext"

const linkBase =
  "inline-flex items-center justify-center px-3 py-2 rounded-xl text-sm font-semibold transition " +
  "focus:outline-none focus:ring-2 focus:ring-neutral-300"

function linkClass(isActive: boolean) {
  return isActive
    ? `${linkBase} bg-neutral-900 shadow-sm`
    : `${linkBase} bg-white text-neutral-700 hover:bg-neutral-100`
}

function linkStyle(isActive: boolean) {
  // Fuerza blanco en activo (rompe cualquier CSS externo que lo esté pisando)
  return isActive ? { color: "white" } : undefined
}

export default function Navbar() {
  const { lang, setLang } = useLang()

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-3">
          <NavLink to="/" className="font-semibold tracking-tight text-neutral-900">
            Khristian Garcia
          </NavLink>

          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) => linkClass(isActive)}
              style={({ isActive }) => linkStyle(isActive)}
            >
              {lang === "en" ? "Home" : "Inicio"}
            </NavLink>

            <NavLink
              to="/resume"
              className={({ isActive }) => linkClass(isActive)}
              style={({ isActive }) => linkStyle(isActive)}
            >
              {lang === "en" ? "Resume" : "CV"}
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) => linkClass(isActive)}
              style={({ isActive }) => linkStyle(isActive)}
            >
              {lang === "en" ? "Projects" : "Proyectos"}
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => linkClass(isActive)}
              style={({ isActive }) => linkStyle(isActive)}
            >
              {lang === "en" ? "Contact" : "Contacto"}
            </NavLink>

            {/* Toggle */}
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
        </div>
      </div>
    </header>
  )
}
