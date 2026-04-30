import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BarChart3, Code, Database, Cloud, Server, Rocket, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import StatsDashboard from '../components/StatsDashboard';
import Testimonials from '../components/Testimonials';
import { profileEN } from '../data/profile-en';

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
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
              <div className="flex-1">
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
              </div>

              {/* Profile Photo */}
              <div className="shrink-0 self-start">
                <div className="relative">
                  <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-1.5 shadow-xl dark:border-blue-900 dark:from-blue-900/20 dark:to-neutral-900">
                    <img
                      src={profileEN.photoUrl}
                      alt="Khristian Garcia"
                      className="h-28 w-28 sm:h-36 sm:w-36 rounded-xl object-cover object-top"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-green-500 p-1.5 ring-2 ring-white dark:ring-neutral-900">
                    <div className="h-2.5 w-2.5 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </div>

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

          {/* Live Projects Preview */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {lang === 'en' ? 'Live Projects' : 'Proyectos en Vivo'}
              </h2>
              <Link
                to="/projects"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                {lang === 'en' ? 'View all' : 'Ver todos'} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Vale Combustible */}
              <motion.div
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                    <Server className="h-3 w-3" />
                    {lang === 'en' ? 'Fleet Management' : 'Gestión de Flota'}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Continental Motores — Vales Combustible
                </h3>
                <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                  {lang === 'en'
                    ? 'Fuel voucher management system with authentication, approval workflows, and reporting.'
                    : 'Sistema de gestión de vales de combustible con autenticación, flujos de aprobación y reportes.'}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare'].map(t => (
                    <span key={t} className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/garciajuni20/Continental-Motores-Vales-Combustible"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
                  >
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a
                    href="https://continental-motores-vales-combustible.pages.dev/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {lang === 'en' ? 'Live Demo' : 'Demo en Vivo'}
                  </a>
                </div>
              </motion.div>

              {/* Flowber Barbería */}
              <motion.div
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    <Code className="h-3 w-3" />
                    {lang === 'en' ? 'Business Platform' : 'Plataforma de Negocio'}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Flowber — Digital Barbershop Platform
                </h3>
                <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                  {lang === 'en'
                    ? 'Digital platform for barbershop with online appointment booking, service catalog, and business management.'
                    : 'Plataforma digital para barbería con reservas en línea, catálogo de servicios y gestión del negocio.'}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare'].map(t => (
                    <span key={t} className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/garciajuni20/flowber-barberia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
                  >
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a
                    href="https://flowber-barberia.pages.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {lang === 'en' ? 'Live Demo' : 'Demo en Vivo'}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

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