import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { Lang } from '../types';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function langFromUrl(): Lang | null {
  const { search, hash } = window.location;
  const hashQuery = hash.includes('?') ? hash.slice(hash.indexOf('?')) : '';
  const value = new URLSearchParams(search).get('lang') ?? new URLSearchParams(hashQuery).get('lang');
  return value === 'en' || value === 'es' ? value : null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    // 1. Explicit link: ?lang=en works before the hash (/?lang=en#/resume) and after it (#/resume?lang=en),
    //    so a LinkedIn link in English always opens in English regardless of the visitor's browser.
    const fromUrl = langFromUrl();
    if (fromUrl) return fromUrl;
    // 2. Previous choice on this device
    const saved = localStorage.getItem('portfolio_lang');
    if (saved === 'en' || saved === 'es') return saved;
    // 3. Browser language
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const switchLang = (newLang: Lang) => {
      setLangState(newLang);
      window.gtag?.('event', 'language_switch', { language: newLang });
    };
    return {
      lang,
      setLang: switchLang,
      toggle: () => switchLang(lang === 'en' ? 'es' : 'en'),
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLang must be used within LanguageProvider');
  }
  return context;
}