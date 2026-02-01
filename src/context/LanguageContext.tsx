import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { Lang } from '../types';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    if (saved === 'en' || saved === 'es') return saved;
    
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang: (newLang: Lang) => {
      setLangState(newLang);
      // Analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'language_switch', {
          language: newLang
        });
      }
    },
    toggle: () => {
      const newLang = lang === 'en' ? 'es' : 'en';
      setLangState(newLang);
      // Analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'language_switch', {
          language: newLang
        });
      }
    }
  }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLang must be used within LanguageProvider');
  }
  return context;
}