import { useLang } from '../context/LanguageContext';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import Container from './Container';

export default function Footer() {
  const { lang } = useLang();

  const t = lang === 'en' ? {
    builtWith: 'Built with',
    hostedOn: 'Hosted on',
    madeWith: 'Made with',
    copyright: 'All rights reserved.'
  } : {
    builtWith: 'Construido con',
    hostedOn: 'Alojado en',
    madeWith: 'Hecho con',
    copyright: 'Todos los derechos reservados.'
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white/50 py-8 dark:border-neutral-800 dark:bg-neutral-950/50">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              © {currentYear} Khristian Garcia. {t.copyright}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
              <span>{t.builtWith}</span>
              <span className="font-semibold">React</span>
              <span>•</span>
              <span className="font-semibold">TypeScript</span>
              <span>•</span>
              <span className="font-semibold">Tailwind</span>
              <span>•</span>
              <span>{t.hostedOn}</span>
              <span className="font-semibold">GitHub Pages</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/garciajuni20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/khristian-garcia--/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:garciajuni20@gmail.com"
              className="text-neutral-700 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
          <span>{t.madeWith}</span>
          <Heart className="h-3 w-3 fill-red-500 text-red-500" />
          <span>•</span>
          <span>Guatemala</span>
        </div>
      </Container>
    </footer>
  );
}