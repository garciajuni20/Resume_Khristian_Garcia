import { NavLink, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, X, Globe, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', labelEn: 'Home', labelEs: 'Inicio' },
  { path: '/resume', labelEn: 'Resume', labelEs: 'CV' },
  { path: '/projects', labelEn: 'Projects', labelEs: 'Proyectos' },
  { path: '/contact', labelEn: 'Contact', labelEs: 'Contacto' },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
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

  const navClass = (isActive: boolean) => {
    const base =
      'inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500';
    if (isActive) return `${base} bg-blue-600 text-white shadow-lg shadow-blue-500/20`;
    return `${base} text-neutral-700 hover:bg-neutral-100 hover:text-blue-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-blue-400`;
  };

  return (
    <>
      <header
        className={`sticky top-2 z-50 mx-4 sm:mx-6 lg:mx-auto lg:max-w-5xl transition-all duration-300 ${
          scrolled
            ? 'rounded-2xl border border-neutral-200/80 bg-white/90 backdrop-blur-xl shadow-lg shadow-neutral-900/5 dark:border-neutral-800/80 dark:bg-neutral-950/90'
            : 'rounded-2xl border border-transparent bg-white/60 backdrop-blur-md dark:bg-neutral-950/60'
        }`}
      >
        <div className="px-4 sm:px-5">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <NavLink
              to="/"
              className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white flex items-center gap-2"
            >
              <span className="bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent font-extrabold">
                KG
              </span>
              <span className="hidden sm:inline text-neutral-900 dark:text-white font-semibold">Khristian Garcia</span>
              <span className="hidden sm:inline text-xs font-normal px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50">
                {lang === 'en' ? 'Portfolio' : 'Portafolio'}
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <NavLink key={item.path} to={item.path} className={({ isActive }) => navClass(isActive)}>
                  {lang === 'en' ? item.labelEn : item.labelEs}
                </NavLink>
              ))}

              <div className="mx-2 h-5 w-px bg-neutral-200 dark:bg-neutral-700" />

              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-700 hover:bg-neutral-100 hover:text-blue-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-blue-400 transition-colors"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
              </button>

              <div className="flex items-center rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 overflow-hidden">
                {(['en', 'es'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      lang === l
                        ? 'bg-blue-600 text-white'
                        : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>

            {/* Mobile button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-x-4 top-20 z-40 rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-xl shadow-xl dark:border-neutral-800 dark:bg-neutral-950/95"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="p-4">
              <div className="flex flex-col gap-1">
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                      }`
                    }
                  >
                    {lang === 'en' ? item.labelEn : item.labelEs}
                  </NavLink>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <Globe className="h-4 w-4" />
                  {lang === 'en' ? 'Language' : 'Idioma'}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                    {(['en', 'es'] as const).map(l => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                          lang === l ? 'bg-blue-600 text-white' : 'text-neutral-600 dark:text-neutral-400'
                        }`}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-1.5 text-neutral-600 dark:text-neutral-400"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
