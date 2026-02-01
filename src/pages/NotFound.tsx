import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function NotFound() {
  const navigate = useNavigate();
  const { lang } = useLang();

  const t = lang === 'en' ? {
    title: 'Page Not Found',
    message: 'The page you\'re looking for doesn\'t exist or has been moved.',
    homeButton: 'Go Home',
    backButton: 'Go Back'
  } : {
    title: 'Página No Encontrada',
    message: 'La página que buscas no existe o ha sido movida.',
    homeButton: 'Ir al Inicio',
    backButton: 'Regresar'
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50 text-neutral-900 dark:from-neutral-950 dark:to-blue-950/20 dark:text-neutral-50">
      <Container>
        <div className="flex min-h-screen flex-col items-center justify-center py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-9xl font-bold text-blue-200 dark:text-blue-900/30">404</div>
            
            <h1 className="mt-8 text-4xl font-bold">{t.title}</h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
              {t.message}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700
                  dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                <Home className="h-4 w-4" />
                {t.homeButton}
              </button>
              
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50
                  dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.backButton}
              </button>
            </div>

            <div className="mt-16 text-sm text-neutral-500 dark:text-neutral-400">
              <p>{lang === 'en' ? 'Looking for something specific?' : '¿Buscas algo específico?'}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <a href="/" className="text-blue-600 hover:underline dark:text-blue-400">
                  {lang === 'en' ? 'Home' : 'Inicio'}
                </a>
                <a href="/resume" className="text-blue-600 hover:underline dark:text-blue-400">
                  {lang === 'en' ? 'Resume' : 'CV'}
                </a>
                <a href="/projects" className="text-blue-600 hover:underline dark:text-blue-400">
                  {lang === 'en' ? 'Projects' : 'Proyectos'}
                </a>
                <a href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
                  {lang === 'en' ? 'Contact' : 'Contacto'}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}