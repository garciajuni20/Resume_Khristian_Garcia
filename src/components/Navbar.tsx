import { NavLink, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, X, Globe, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wordmark } from './Logo';
import SoundToggle from './SoundToggle';
import { FLUID } from '../utils/animations';
import { useHydrated } from '../utils/useHydrated';

const navItems = [
  { path: '/', labelEn: 'Home', labelEs: 'Inicio' },
  { path: '/resume', labelEn: 'Resume', labelEs: 'CV' },
  { path: '/projects', labelEn: 'Projects', labelEs: 'Proyectos' },
  { path: '/flowber', labelEn: 'Flowber', labelEs: 'Flowber' },
  { path: '/contact', labelEn: 'Contact', labelEs: 'Contacto' },
];

/* Shape rule for the chrome: the bar is a card (2xl), controls are lg. */
const CONTROL = 'inline-flex items-center justify-center rounded-lg transition-colors duration-200 n-focus';
const ACTIVE = 'bg-n-text text-n-bg';
const IDLE = 'n-muted n-hover hover:text-n-text';

function LangToggle({ lang, setLang, size = 'md' }: { lang: 'en' | 'es'; setLang: (l: 'en' | 'es') => void; size?: 'sm' | 'md' }) {
  return (
    <div className="n-border flex overflow-hidden rounded-lg border" role="group" aria-label={lang === 'en' ? 'Language' : 'Idioma'}>
      {(['en', 'es'] as const).map(l => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          data-sfx="none"
          aria-pressed={lang === l}
          className={`${size === 'sm' ? 'px-2.5 py-1' : 'px-3 py-1.5'} text-xs font-semibold transition-colors duration-200 ${lang === l ? ACTIVE : IDLE}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  // Light until hydrated, as in the prerendered HTML; the page colours already follow
  // the theme from the first paint (inline script in index.html sets html.dark)
  const dark = useHydrated() && theme === 'dark';
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu on navigation (state adjustment during render, not in an effect)
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const themeLabel = dark
    ? (lang === 'en' ? 'Switch to light mode' : 'Cambiar a modo claro')
    : (lang === 'en' ? 'Switch to dark mode' : 'Cambiar a modo oscuro');

  return (
    <>
      <header
        className={`sticky top-2 z-50 mx-4 rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 sm:mx-6 lg:mx-auto lg:max-w-6xl ${
          scrolled
            ? 'n-border bg-n-bg/90 shadow-lg shadow-black/5 backdrop-blur-xl dark:shadow-black/30'
            : 'border-transparent bg-n-bg/60 backdrop-blur-md'
        }`}
      >
        <div className="px-4 sm:px-5">
          <div className="flex h-14 items-center justify-between gap-3 lg:gap-6">
            <NavLink to="/" className="shrink-0 whitespace-nowrap rounded-lg n-focus" aria-label={lang === 'en' ? 'Khristian Garcia, home' : 'Khristian Garcia, inicio'}>
              <Wordmark name="Khristian Garcia" compact />
            </NavLink>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-1 md:flex" aria-label={lang === 'en' ? 'Main' : 'Principal'}>
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `${CONTROL} whitespace-nowrap px-2.5 py-2 text-sm font-semibold lg:px-4 ${isActive ? ACTIVE : IDLE}`}
                >
                  {lang === 'en' ? item.labelEn : item.labelEs}
                </NavLink>
              ))}

              <div className="mx-1 h-5 w-px shrink-0 bg-n-border lg:mx-2" aria-hidden="true" />

              <SoundToggle className="h-[34px] w-[34px]" />

              <button type="button" onClick={toggleTheme} data-sfx="none" className={`${CONTROL} ${IDLE} p-2`} aria-label={themeLabel}>
                {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
              </button>

              <LangToggle lang={lang} setLang={setLang} />
            </nav>

            {/* Mobile: music stays one tap away, outside the menu */}
            <div className="flex items-center gap-1 md:hidden">
            <SoundToggle className="h-9 w-9" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-sfx={isMobileMenuOpen ? 'close' : 'open'}
              className={`${CONTROL} ${IDLE} p-2`}
              aria-label={isMobileMenuOpen ? (lang === 'en' ? 'Close menu' : 'Cerrar menú') : (lang === 'en' ? 'Open menu' : 'Abrir menú')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="n-border fixed inset-x-4 top-20 z-40 rounded-2xl border bg-n-bg/95 shadow-xl shadow-black/10 backdrop-blur-xl dark:shadow-black/40 md:hidden"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: FLUID }}
          >
            <nav className="p-3" aria-label={lang === 'en' ? 'Main' : 'Principal'}>
              <div className="flex flex-col gap-1">
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `rounded-lg px-4 py-3 text-sm font-semibold transition-colors duration-200 ${isActive ? ACTIVE : 'n-text n-hover'}`}
                  >
                    {lang === 'en' ? item.labelEn : item.labelEs}
                  </NavLink>
                ))}
              </div>

              <div className="n-border mt-3 flex items-center justify-between gap-4 border-t px-1 pt-3">
                <div className="n-muted flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  {lang === 'en' ? 'Language' : 'Idioma'}
                </div>
                <div className="flex items-center gap-2">
                  <LangToggle lang={lang} setLang={setLang} size="sm" />
                  <button type="button" onClick={toggleTheme} data-sfx="none" className={`${CONTROL} n-border n-muted border p-1.5`} aria-label={themeLabel}>
                    {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
