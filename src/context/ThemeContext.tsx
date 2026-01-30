import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyThemeToDom(theme: Theme) {
  const root = document.documentElement // <html>
  if (theme === "dark") root.classList.add("dark")
  else root.classList.remove("dark")
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")

  // Load initial theme: localStorage -> system preference -> light
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    if (saved === "dark" || saved === "light") {
      setThemeState(saved)
      applyThemeToDom(saved)
      return
    }

    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    const initial = prefersDark ? "dark" : "light"
    setThemeState(initial)
    applyThemeToDom(initial)
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem("theme", t)
    applyThemeToDom(t)
  }

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
