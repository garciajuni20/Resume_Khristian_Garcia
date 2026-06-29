import { useNavigate, Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

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

  const links = [
    { to: '/', label: lang === 'en' ? 'Home' : 'Inicio' },
    { to: '/resume', label: lang === 'en' ? 'Resume' : 'CV' },
    { to: '/projects', label: lang === 'en' ? 'Projects' : 'Proyectos' },
    { to: '/contact', label: lang === 'en' ? 'Contact' : 'Contacto' },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50 text-neutral-900 dark:from-neutral-950 dark:to-blue-950/20 dark:text-neutral-50">
        <Container>
          <div className="flex min-h-screen flex-col items-center justify-center py-20">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-9xl font-black text-blue-200 dark:text-blue-900/30 select-none"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                404
              </motion.div>

              <h1 className="mt-8 text-4xl font-bold">{t.title}</h1>
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                {t.message}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  {t.homeButton}
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.backButton}
                </button>
              </div>

              <div className="mt-16 text-sm text-neutral-500 dark:text-neutral-400">
                <p>{t.looking}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  {links.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </main>
    </PageTransition>
  );
}
