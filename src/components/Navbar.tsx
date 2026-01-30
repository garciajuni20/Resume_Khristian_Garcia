import { NavLink } from "react-router-dom"
import { useLang } from "../context/LanguageContext"
import { useTheme } from "../context/ThemeContext"
import { useEffect, useState } from "react"
import { Menu, X, Moon, Sun } from "lucide-react"

const linkBase =
  "inline-flex items-center justify-center px-3 py-2 rounded-xl text-sm font-semibold transition " +
  "focus:outline-none focus:ring-2 focus:ring-neutral-300"

function navClass(isActive: boolean) {
  return [
    linkBase,
    isActive
      ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-neutral-900"
      : "bg-white text-neutral-700 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
  ].join(" ")
}

export default function Navbar() {
  const { lang, setLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false) // sm breakpoint
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const labels =
    lang === "en"
      ? { home: "Home", resume: "Resume", projects: "Projects", contact: "Contact" }
      : { home: "Inicio", resume: "CV", projects: "Proyectos", contact: "Contacto" }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/85">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-3">
          <NavLink to="/" className="font-semibold tracking-tight text-neutral-900 dark:text-white">
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

            {/* Theme Toggle (desktop) */}
            <button
              onClick={toggleTheme}
              className="ml-2 inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Toggle theme"
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden md:inline">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>

            {/* Language Toggle (desktop) */}
            <div className="ml-2 flex items-center rounded-xl border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900">
              <button
                onClick={() => setLang("en")}
                className={[
                  "px-3 py-1.5 text-xs rounded-lg transition font-semibold",
                  lang === "en"
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
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
                    : "text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
                ].join(" ")}
              >
                ES
              </button>
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white p-2 text-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="flex items-center rounded-xl border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900">
              <button
                onClick={() => setLang("en")}
                className={[
                  "px-2 py-1 text-xs rounded-lg transition font-semibold",
                  lang === "en"
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
                ].join(" ")}
              >
                EN
              </button>
              <button
                onClick={() => setLang("es")}
                className={[
                  "px-2 py-1 text-xs rounded-lg transition font-semibold",
                  lang === "es"
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
                ].join(" ")}
              >
                ES
              </button>
            </div>

            <button
              onClick={() => setOpen((p) => !p)}
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white p-2 text-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              aria-label="Open menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open ? (
          <div className="sm:hidden pb-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="grid gap-2">
                <NavLink to="/" end onClick={() => setOpen(false)} className={({ isActive }) => navClass(isActive)}>
                  {labels.home}
                </NavLink>
                <NavLink to="/resume" onClick={() => setOpen(false)} className={({ isActive }) => navClass(isActive)}>
                  {labels.resume}
                </NavLink>
                <NavLink
                  to="/projects"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => navClass(isActive)}
                >
                  {labels.projects}
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => navClass(isActive)}
                >
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
