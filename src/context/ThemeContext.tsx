import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark"
type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyThemeToDom(theme: Theme) {
  const root = document.documentElement // ✅ <html>
  root.classList.toggle("dark", theme === "dark")
  // Optional: helps native components render correctly
  root.style.colorScheme = theme
}

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("theme")
  if (saved === "light" || saved === "dark") return saved

  // default: follow system
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
  return prefersDark ? "dark" : "light"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme())

  useEffect(() => {
    applyThemeToDom(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  // Optional: if user didn't choose manually, you can listen system changes
  // (if you want, tell me and I enable it cleanly)

  const value = useMemo(
    () => ({
      theme,
      setTheme: (t: Theme) => setThemeState(t),
      toggleTheme: () => setThemeState((t) => (t === "dark" ? "light" : "dark"))
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
