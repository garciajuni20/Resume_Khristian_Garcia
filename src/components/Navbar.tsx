import { NavLink } from "react-router-dom"
import { useLang } from "../context/LanguageContext"
import { useTheme } from "../context/ThemeContext"
import { Moon, Sun } from "lucide-react"

const linkBase =
  "inline-flex items-center justify-center px-3 py-2 rounded-xl text-sm font-semibold transition " +
  "focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"

function linkClass(isActive: boolean) {
  if (isActive) {
    return [
      linkBase,
      "bg-neutral-900 text-white shadow-sm",
      "dark:bg-white dark:text-neutral-900"
    ].join(" ")
  }

  return [
    linkBase,
    "bg-white text-neutral-700 hover:bg-neutral-100",
    "dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
  ].join(" ")
}

export default function Navbar() {
  const { lang, setLang } = useLang()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/85">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-3 gap-3">
          <NavLink to="/" className="font-semibold tracking-tight text-neutral-900 dark:text-white">
            Khristian Garcia
          </NavLink>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/" end className={({ isActive }) => linkClass(isActive)}>
              {lang === "en" ? "Home" : "Inicio"}
            </NavLink>

            <NavLink to="/resume" className={({ isActive }) => linkClass(isActive)}>
              {lang === "en" ? "Resume" : "CV"}
            </NavLink>

            <NavLink to="/projects" className={({ isActive }) => linkClass(isActive)}>
              {lang === "en" ? "Projects" : "Proyectos"}
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) => linkClass(isActive)}>
              {lang === "en" ? "Contact" : "Contacto"}
            </NavLink>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={[
                "ml-2 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition",
                "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-100",
                "dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
              ].join(" ")}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>

            {/* Language Toggle */}
            <div className="ml-2 flex items-center rounded-xl border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-950">
              <button
                onClick={() => setLang("en")}
                className={[
                  "px-3 py-1.5 text-xs rounded-lg transition font-semibold",
                  lang === "en"
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900"
                ].join(" ")}
              >
                EN
              </button>
              <button
                onClick={() => setLang("es")}
                className={[
                  "px-3 py-1.5 text-xs rounded-lg transition font-semibold",
                  lang === "es"
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900"
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
