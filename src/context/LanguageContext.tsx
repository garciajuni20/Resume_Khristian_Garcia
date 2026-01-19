import React, { createContext, useContext, useMemo, useState } from "react"

export type Lang = "en" | "es"

type LangCtx = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
}

const Ctx = createContext<LangCtx | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((p) => (p === "en" ? "es" : "en"))
    }),
    [lang]
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLang() {
  const v = useContext(Ctx)
  if (!v) throw new Error("useLang must be used within LanguageProvider")
  return v
}
