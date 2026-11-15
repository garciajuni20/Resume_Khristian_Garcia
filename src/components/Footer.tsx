import { useLang } from '../context/LanguageContext';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Container from './Container';
import { profileEN } from '../data/profile-en';
import { Mark } from './Logo';
import { CV_UPDATED } from '../data/media';

const ICON_LINK = 'n-muted rounded-lg p-1 transition-colors duration-200 hover:text-n-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-n-accent';

export default function Footer() {
  const { lang } = useLang();
  const currentYear = new Date().getFullYear();
  const github = profileEN.links.find(l => l.label === 'GitHub')?.href ?? '#';
  const linkedin = profileEN.links.find(l => l.label === 'LinkedIn')?.href ?? '#';

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="n-border border-t bg-n-bg py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <div className="n-text flex items-center justify-center gap-2 font-semibold md:justify-start">
              <Mark size={22} />
              Khristian Garcia
            </div>
            <p className="n-muted mt-1.5 text-xs">
              © {currentYear} · {lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
              {' · '}
              {lang === 'en' ? 'Updated' : 'Actualizado'} {CV_UPDATED[lang]}
            </p>
            <p className="n-muted mt-1 text-xs">
              {lang === 'en' ? 'Built with' : 'Hecho con'}{' '}
              <span className="n-text font-medium">React</span> · <span className="n-text font-medium">TypeScript</span> ·{' '}
              <span className="n-text font-medium">Tailwind v4</span> · <span className="n-text font-medium">Framer Motion</span>
              {' · '}
              {lang === 'en' ? 'media generated locally with' : 'medios generados localmente con'}{' '}
              <span className="n-text font-medium">Wan 2.2 · Flux 2 Klein</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href={github} target="_blank" rel="noopener noreferrer" className={ICON_LINK} aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className={ICON_LINK} aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={`mailto:${profileEN.email}`} className={ICON_LINK} aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="n-border n-muted n-hover ml-1 rounded-lg border p-2 transition-colors duration-200 hover:text-n-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-n-accent"
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
