import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BarChart3, Code, Database, Cloud, Server, MapPin, GraduationCap, ExternalLink } from 'lucide-react';
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
    badge: 'Open to Opportunities',
    title: 'Khristian Garcia',
    role: 'Data Analyst · BI Engineer · Full-Stack Developer',
    summary: 'I built the entire BI function for a US fintech company from Guatemala — Snowflake data models, Power BI dashboards, SQL pipelines. Also teaching at USAC and shipping real web apps with React & TypeScript.',
    location: 'Guatemala City, Guatemala',
    education: 'Systems Engineering — USAC · Instructor',
    ctaPrimary: 'View Interactive Resume',
    ctaSecondary: 'See Projects',
    liveProjects: 'Live Projects',
    viewAll: 'View all projects',
    domains: [
      { icon: <Database className="h-5 w-5" />, title: 'Data Engineering', desc: 'Snowflake · SQL · ETL · dbt · Data Modeling', color: 'from-blue-500 to-blue-600' },
      { icon: <BarChart3 className="h-5 w-5" />, title: 'Business Intelligence', desc: 'Power BI · Tableau · DAX · KPI Dashboards', color: 'from-green-500 to-green-600' },
      { icon: <Code className="h-5 w-5" />, title: 'Full-Stack Dev', desc: 'React · TypeScript · Tailwind · Vite · REST APIs', color: 'from-purple-500 to-purple-600' },
      { icon: <Cloud className="h-5 w-5" />, title: 'Cloud & DevOps', desc: 'Cloudflare · GCP · Docker · GitHub Actions · CI/CD', color: 'from-orange-500 to-orange-600' },
    ],
    stats: [
      { value: '6+', label: 'Years in Tech', sub: 'since 2019' },
      { value: '15+', label: 'Dashboards Delivered', sub: 'Power BI · Tableau' },
      { value: '3', label: 'Live Web Apps', sub: 'Cloudflare & GitHub Pages' },
    ],
    projects: [
      {
        id: 'vale',
        title: 'Continental Motores — Vales Combustible',
        desc: 'Fuel voucher management system with authentication and approval workflows.',
        tags: ['React', 'TypeScript', 'Cloudflare'],
        github: 'https://github.com/garciajuni20/Continental-Motores-Vales-Combustible',
        live: 'https://continental-motores-vales-combustible.pages.dev/login',
        color: 'from-orange-500 to-red-500'
      },
      {
        id: 'flowber',
        title: 'Flowber — Digital Barbershop',
        desc: 'Online appointment booking and business management platform.',
        tags: ['React', 'TypeScript', 'Cloudflare'],
        github: 'https://github.com/garciajuni20/flowber-barberia',
        live: 'https://flowber-barberia.pages.dev/',
        color: 'from-purple-500 to-indigo-500'
      }
    ]
  } : {
    badge: 'Disponible para Oportunidades',
    title: 'Khristian Garcia',
    role: 'Analista de Datos · Ingeniero BI · Desarrollador Full-Stack',
    summary: 'Construí toda la función de BI para una empresa fintech de EE. UU. desde Guatemala — modelos Snowflake, dashboards Power BI, pipelines SQL. También enseño en la USAC y desarrollo apps web reales con React y TypeScript.',
    location: 'Ciudad de Guatemala, Guatemala',
    education: 'Ingeniería en Sistemas — USAC · Instructor',
    ctaPrimary: 'Ver CV Interactivo',
    ctaSecondary: 'Ver Proyectos',
    liveProjects: 'Proyectos en Vivo',
    viewAll: 'Ver todos los proyectos',
    domains: [
      { icon: <Database className="h-5 w-5" />, title: 'Ingeniería de Datos', desc: 'Snowflake · SQL · ETL · dbt · Modelado de Datos', color: 'from-blue-500 to-blue-600' },
      { icon: <BarChart3 className="h-5 w-5" />, title: 'Inteligencia de Negocios', desc: 'Power BI · Tableau · DAX · Dashboards KPI', color: 'from-green-500 to-green-600' },
      { icon: <Code className="h-5 w-5" />, title: 'Desarrollo Full-Stack', desc: 'React · TypeScript · Tailwind · Vite · REST APIs', color: 'from-purple-500 to-purple-600' },
      { icon: <Cloud className="h-5 w-5" />, title: 'Cloud & DevOps', desc: 'Cloudflare · GCP · Docker · GitHub Actions · CI/CD', color: 'from-orange-500 to-orange-600' },
    ],
    stats: [
      { value: '6+', label: 'Años en Tecnología', sub: 'desde 2019' },
      { value: '15+', label: 'Dashboards Entregados', sub: 'Power BI · Tableau' },
      { value: '3', label: 'Apps Web en Vivo', sub: 'Cloudflare y GitHub Pages' },
    ],
    projects: [
      {
        id: 'vale',
        title: 'Continental Motores — Vales Combustible',
        desc: 'Sistema de gestión de vales de combustible con autenticación y flujos de aprobación.',
        tags: ['React', 'TypeScript', 'Cloudflare'],
        github: 'https://github.com/garciajuni20/Continental-Motores-Vales-Combustible',
        live: 'https://continental-motores-vales-combustible.pages.dev/login',
        color: 'from-orange-500 to-red-500'
      },
      {
        id: 'flowber',
        title: 'Flowber — Barbería Digital',
        desc: 'Plataforma de reservas en línea y gestión de negocio para barbería.',
        tags: ['React', 'TypeScript', 'Cloudflare'],
        github: 'https://github.com/garciajuni20/flowber-barberia',
        live: 'https://flowber-barberia.pages.dev/',
        color: 'from-purple-500 to-indigo-500'
      }
    ]
  };

  useSEO({
    title: `${t.title} — ${t.role}`,
    description: t.summary,
    lang,
    keywords: ['Data Analyst', 'Business Intelligence', 'Full Stack Developer', 'React', 'TypeScript', 'Snowflake', 'Power BI', 'Guatemala']
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <Container>
        <motion.div
          className="pt-10 pb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ── Hero ──────────────────────────────────────────────────── */}
          <div className="rounded-3xl border border-neutral-200 bg-white/80 backdrop-blur-sm p-8 sm:p-10 dark:border-neutral-800 dark:bg-neutral-900/80">

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
              {/* Left content */}
              <div className="flex-1">
                {/* Badge */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-700 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <Sparkles className="h-3.5 w-3.5" />
                  {t.badge}
                </div>

                {/* Name + Role */}
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {t.title}
                </h1>
                <p className="mt-2 text-lg font-medium text-blue-600 dark:text-blue-400">
                  {t.role}
                </p>

                {/* Summary */}
                <p className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {t.summary}
                </p>

                {/* Meta info */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {t.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {t.education}
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/resume"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all hover:scale-[1.02]"
                  >
                    {t.ctaPrimary} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition-all hover:scale-[1.02] dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                  >
                    {t.ctaSecondary}
                  </Link>
                </div>
              </div>

              {/* Profile Photo */}
              <div className="shrink-0 self-start">
                <div className="relative">
                  <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-1.5 shadow-xl dark:border-blue-900/60 dark:from-blue-950 dark:to-neutral-900">
                    <img
                      src={profileEN.photoUrl}
                      alt="Khristian Garcia"
                      className="h-32 w-32 sm:h-40 sm:w-40 rounded-xl object-cover object-top"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-green-500 p-1.5 ring-2 ring-white dark:ring-neutral-900">
                    <div className="h-2.5 w-2.5 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-7 dark:border-neutral-800">
              {t.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-neutral-700 dark:text-neutral-200 mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Domain Cards ───────────────────────────────────────────── */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.domains.map((domain, idx) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${domain.color}`} />
                <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${domain.color} p-2.5`}>
                  <div className="text-white">{domain.icon}</div>
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">{domain.title}</h3>
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {domain.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Live Projects Preview ──────────────────────────────────── */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                {t.liveProjects}
              </h2>
              <Link
                to="/projects"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
              >
                {t.viewAll} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + idx * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.color}`} />

                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span key={tag} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </span>
                  </div>

                  <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                      GitHub
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" />
                      {lang === 'en' ? 'Live Demo' : 'Demo en Vivo'}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Stats Dashboard ────────────────────────────────────────── */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <StatsDashboard />
          </motion.div>

          {/* ── Testimonials ───────────────────────────────────────────── */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Testimonials />
          </motion.div>
        </motion.div>
      </Container>
    </main>
  );
}
