import { NavLink, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
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

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navClass = (isActive: boolean) => {
    const base = 'inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500';
    
    if (isActive) {
      return `${base} bg-blue-600 text-white shadow-lg`;
    }
    
    return `${base} text-neutral-700 hover:bg-neutral-100 hover:text-blue-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-blue-400`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800/80 dark:bg-neutral-950/90 supports-[backdrop-filter]:dark:bg-neutral-950/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <NavLink 
              to="/" 
              className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white flex items-center gap-2"
            >
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Khristian Garcia
              </span>
              <span className="hidden sm:inline text-xs font-normal px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {lang === 'en' ? 'Portfolio' : 'Portafolio'}
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => navClass(isActive)}
                >
                  {lang === 'en' ? item.labelEn : item.labelEs}
                </NavLink>
              ))}

              {/* Separador */}
              <div className="mx-2 h-6 w-px bg-neutral-300 dark:bg-neutral-700" />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-700 hover:bg-neutral-100 hover:text-blue-600
                  dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-blue-400 transition-colors"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' 
                  ? (lang === 'en' ? 'Light mode' : 'Modo claro')
                  : (lang === 'en' ? 'Dark mode' : 'Modo oscuro')
                }
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Language Toggle */}
              <div className="flex items-center rounded-xl border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900">
                <button
                  onClick={() => setLang('en')}
                  className={`
                    px-3 py-1.5 text-xs rounded-lg transition-all duration-200 font-semibold
                    ${lang === 'en'
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                    }
                  `}
                  title="English"
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('es')}
                  className={`
                    px-3 py-1.5 text-xs rounded-lg transition-all duration-200 font-semibold
                    ${lang === 'es'
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                    }
                  `}
                  title="Español"
                >
                  ES
                </button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-x-0 top-16 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/95"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="mx-auto max-w-5xl px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                      rounded-xl px-4 py-3 text-sm font-semibold transition-colors
                      ${isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                      }
                    `}
                  >
                    {lang === 'en' ? item.labelEn : item.labelEs}
                  </NavLink>
                ))}

                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <Globe className="h-4 w-4" />
                      <span>{lang === 'en' ? 'Language' : 'Idioma'}</span>
                    </div>
                    <div className="flex rounded-lg border border-neutral-300 dark:border-neutral-700">
                      <button
                        onClick={() => setLang('en')}
                        className={`px-3 py-1.5 text-xs rounded-l transition-colors ${
                          lang === 'en'
                            ? 'bg-blue-600 text-white'
                            : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLang('es')}
                        className={`px-3 py-1.5 text-xs rounded-r transition-colors ${
                          lang === 'es'
                            ? 'bg-blue-600 text-white'
                            : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                        }`}
                      >
                        ES
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {theme === 'dark' ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                      <span>{lang === 'en' ? 'Theme' : 'Tema'}</span>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                    >
                      {theme === 'dark'
                        ? (lang === 'en' ? 'Light' : 'Claro')
                        : (lang === 'en' ? 'Dark' : 'Oscuro')
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}