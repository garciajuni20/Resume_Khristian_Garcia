import { useLang } from '../context/LanguageContext';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Container from './Container';
import { profileEN } from '../data/profile-en';

export default function Footer() {
  const { lang } = useLang();
  const currentYear = new Date().getFullYear();
  const github = profileEN.links.find(l => l.label === 'GitHub')?.href ?? '#';
  const linkedin = profileEN.links.find(l => l.label === 'LinkedIn')?.href ?? '#';

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-neutral-200 bg-white/50 backdrop-blur-sm py-8 dark:border-neutral-800 dark:bg-neutral-950/50">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left */}
          <div className="text-center md:text-left">
            <div className="font-semibold text-neutral-900 dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">KG</span>
              {' '}Khristian Garcia
            </div>
            <div className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-500">
              © {currentYear} · {lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-600">
              <span>{lang === 'en' ? 'Built with' : 'Hecho con'}</span>
              <span className="font-medium text-neutral-500">React</span>
              <span>·</span>
              <span className="font-medium text-neutral-500">TypeScript</span>
              <span>·</span>
              <span className="font-medium text-neutral-500">Tailwind v4</span>
              <span>·</span>
              <span className="font-medium text-neutral-500">Framer Motion</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            <a href={github} target="_blank" rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer"
              className="text-neutral-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={`mailto:${profileEN.email}`}
              className="text-neutral-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <button
              onClick={scrollToTop}
              className="ml-1 rounded-xl border border-neutral-200 bg-white p-2 text-neutral-500 hover:bg-neutral-50 hover:text-blue-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-blue-400 transition-all"
              aria-label={lang === 'en' ? 'Back to top' : 'Volver arriba'}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
