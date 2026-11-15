import { useNavigate, Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  const navigate = useNavigate();
  const { lang } = useLang();

  const t = lang === 'en' ? {
    title: 'Page Not Found',
    message: "The page you're looking for doesn't exist or has been moved.",
    homeButton: 'Go Home',
    backButton: 'Go Back',
    looking: 'Looking for something specific?',
  } : {
    title: 'Página No Encontrada',
    message: 'La página que buscas no existe o ha sido movida.',
    homeButton: 'Ir al Inicio',
    backButton: 'Regresar',
    looking: '¿Buscas algo específico?',
  };

  useSEO({ title: t.title, description: t.message, lang });

  const links = [
    { to: '/', label: lang === 'en' ? 'Home' : 'Inicio' },
    { to: '/resume', label: lang === 'en' ? 'Resume' : 'CV' },
    { to: '/projects', label: lang === 'en' ? 'Projects' : 'Proyectos' },
    { to: '/contact', label: lang === 'en' ? 'Contact' : 'Contacto' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--n-bg)] text-neutral-900 dark:text-neutral-50">
        <Container>
          <div className="flex min-h-screen flex-col items-center justify-center py-20">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="n-text select-none font-mono-geist text-9xl font-black opacity-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                404
              </motion.div>

              <h1 className="mt-8 text-4xl font-bold">{t.title}</h1>
              <p className="mt-4 text-lg n-muted max-w-md mx-auto">
                {t.message}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--n-text)] px-6 py-3 text-sm font-semibold text-[var(--n-bg)] transition-opacity duration-300 hover:opacity-85"
                >
                  <Home className="h-4 w-4" />
                  {t.homeButton}
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="n-border n-text n-hover inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.backButton}
                </button>
              </div>

              <div className="mt-16 text-sm n-muted">
                <p>{t.looking}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  {links.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="n-text underline decoration-[var(--n-border)] underline-offset-4 hover:decoration-current"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
