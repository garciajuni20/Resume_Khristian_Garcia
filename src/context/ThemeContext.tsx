import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Theme } from '../types';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeToDom(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('portfolio_theme');
  if (saved === 'light' || saved === 'dark') return saved;

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  return prefersDark ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [isSystem, setIsSystem] = useState(false);

  useEffect(() => {
    applyThemeToDom(theme);
    localStorage.setItem('portfolio_theme', theme);
    
    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'theme_switch', { theme });
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (isSystem) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isSystem]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (t: Theme) => {
        setThemeState(t);
        setIsSystem(false);
      },
      toggleTheme: () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setThemeState(newTheme);
        setIsSystem(false);
      },
      useSystemTheme: () => {
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
        setThemeState(prefersDark ? 'dark' : 'light');
        setIsSystem(true);
      }
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}