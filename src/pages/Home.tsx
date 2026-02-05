import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BarChart3, Code, Database, Cloud, Server, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import StatsDashboard from '../components/StatsDashboard';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const { lang } = useLang();

  const t = lang === 'en' ? {
    title: 'Data + Full-Stack Portfolio',
    subtitle: 'I build trusted data layers (Snowflake/SQL) and product-style interfaces (React/Tailwind). This site is a practical demo of both.',
    ctaPrimary: 'View Interactive Resume',
    ctaSecondary: 'See Projects',
    badges: ['Snowflake', 'SQL', 'Power BI', 'React', 'TypeScript', 'Tailwind', 'APIs', 'GCP', 'Docker', 'Kubernetes'],
    features: [
      {
        icon: <Database className="h-5 w-5" />,
        title: 'Data Engineering',
        desc: 'Snowflake, SQL, ETL, Data Modeling, Pipelines',
        color: 'from-blue-500 to-blue-600'
      },
      {
        icon: <BarChart3 className="h-5 w-5" />,
        title: 'Business Intelligence',
        desc: 'Power BI, Tableau, Analytics, Dashboards, KPIs',
        color: 'from-green-500 to-green-600'
      },
      {
        icon: <Code className="h-5 w-5" />,
        title: 'Full-Stack Development',
        desc: 'React, TypeScript, Node.js, APIs, Modern UI',
        color: 'from-purple-500 to-purple-600'
      },
      {
        icon: <Cloud className="h-5 w-5" />,
        title: 'Cloud & DevOps',
        desc: 'GCP, Kubernetes, Docker, CI/CD, Infrastructure',
        color: 'from-orange-500 to-orange-600'
      }
    ],
    stats: [
      { value: '5+', label: 'Years Experience', icon: <Rocket className="h-4 w-4" /> },
      { value: '25+', label: 'Projects Completed', icon: <Database className="h-4 w-4" /> },
      { value: '100%', label: 'Bilingual', icon: <Server className="h-4 w-4" /> }
    ]
  } : {
    title: 'Portafolio Data + Full-Stack',
    subtitle: 'Construyo capas de datos confiables (Snowflake/SQL) y experiencias tipo producto (React/Tailwind). Este sitio demuestra ambos.',
    ctaPrimary: 'Ver CV Interactivo',
    ctaSecondary: 'Ver Proyectos',
    badges: ['Snowflake', 'SQL', 'Power BI', 'React', 'TypeScript', 'Tailwind', 'APIs', 'GCP', 'Docker', 'Kubernetes'],
    features: [
      {
        icon: <Database className="h-5 w-5" />,
        title: 'Ingeniería de Datos',
        desc: 'Snowflake, SQL, ETL, Modelado de Datos, Pipelines',
        color: 'from-blue-500 to-blue-600'
      },
      {
        icon: <BarChart3 className="h-5 w-5" />,
        title: 'Inteligencia de Negocios',
        desc: 'Power BI, Tableau, Analytics, Dashboards, KPIs',
        color: 'from-green-500 to-green-600'
      },
      {
        icon: <Code className="h-5 w-5" />,
        title: 'Desarrollo Full-Stack',
        desc: 'React, TypeScript, Node.js, APIs, UI Moderna',
        color: 'from-purple-500 to-purple-600'
      },
      {
        icon: <Cloud className="h-5 w-5" />,
        title: 'Cloud & DevOps',
        desc: 'GCP, Kubernetes, Docker, CI/CD, Infraestructura',
        color: 'from-orange-500 to-orange-600'
      }
    ],
    stats: [
      { value: '5+', label: 'Años de Experiencia', icon: <Rocket className="h-4 w-4" /> },
      { value: '25+', label: 'Proyectos Completados', icon: <Database className="h-4 w-4" /> },
      { value: '100%', label: 'Bilingüe', icon: <Server className="h-4 w-4" /> }
    ]
  };

  useSEO({
    title: t.title,
    description: t.subtitle,
    lang,
    keywords: ['Data Analyst', 'Business Intelligence', 'Full Stack Developer', 'React', 'TypeScript', 'Snowflake', 'Power BI', 'Portfolio']
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-50">
      <Container>
        <motion.div
          className="pt-12 pb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <div className="rounded-3xl border border-neutral-200 bg-white/80 backdrop-blur-sm p-8 sm:p-12 dark:border-neutral-800 dark:bg-neutral-900/80">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <Sparkles className="h-4 w-4" />
              <span>{lang === 'en' ? 'Professional Portfolio' : 'Portafolio Profesional'}</span>
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {t.title}
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {t.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {t.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700
                    dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-300 transition-all hover:scale-105"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${feature.color}`} />
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl bg-gradient-to-br ${feature.color} p-2`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all hover:scale-105"
              >
                {t.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition-all hover:scale-105
                  dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
              >
                {t.ctaSecondary}
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800">
              {t.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white">
                    {stat.icon}
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Dashboard Section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatsDashboard />
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Testimonials />
          </motion.div>
        </motion.div>
      </Container>
    </main>
  );
}