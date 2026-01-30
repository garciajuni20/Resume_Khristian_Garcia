import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyTheme(theme: Theme) {
  const root = document.documentElement // <html>
  if (theme === "dark") root.classList.add("dark")
  else root.classList.remove("dark")
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")

  useEffect(() => {
    // 1) Local storage
    const saved = localStorage.getItem("theme") as Theme | null
    if (saved === "dark" || saved === "light") {
      setThemeState(saved)
      applyTheme(saved)
      return
    }

    // 2) System preference
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    const initial: Theme = prefersDark ? "dark" : "light"
    setThemeState(initial)
    applyTheme(initial)
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem("theme", t)
    applyTheme(t)
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
