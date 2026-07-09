import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Code,
  Database,
  Cloud,
  MapPin,
  GraduationCap,
  ExternalLink,
  TrendingUp,
  CheckCircle2,
  Github,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import StatsDashboard from '../components/StatsDashboard';
import Testimonials from '../components/Testimonials';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import TypingAnimation from '../components/TypingAnimation';
import PageTransition from '../components/PageTransition';
import { staggerContainer, cardReveal } from '../utils/animations';

/* ─── 3D Tilt Card ─────────────────────────────────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { damping: 18, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { damping: 18, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Hero Background ─────────────────────────────────────── */
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {/* Blue orb top-right */}
      <motion.div
        className="absolute -top-24 -right-24 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }}
        animate={{ x: [0, 18, 0], y: [0, -14, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Violet orb bottom-left */}
      <motion.div
        className="absolute -bottom-16 -left-16 h-[400px] w-[400px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)' }}
        animate={{ x: [0, -12, 0], y: [0, 18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      {/* Cyan orb center */}
      <motion.div
        className="absolute top-1/2 left-[30%] h-[300px] w-[300px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)' }}
        animate={{ x: [0, 10, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.045]"
        style={{
          backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  );
}

/* ─── Animated Photo with rotating gradient ring ────────────────────── */
function ProfilePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative shrink-0">
      {/* Glow pulse */}
      <motion.div
        className="absolute -inset-3 rounded-2xl opacity-50"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)', filter: 'blur(12px)' }}
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Spinning border container */}
      <div
        className="relative overflow-hidden"
        style={{ padding: '3px', borderRadius: '16px' }}
      >
        <motion.div
          className="absolute"
          style={{
            inset: '-60%',
            background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #10b981, #3b82f6)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        />
        <div
          className="relative z-10 overflow-hidden bg-white dark:bg-neutral-900"
          style={{ borderRadius: '13px' }}
        >
          <img
            src={src}
            alt={alt}
            className="h-32 w-32 sm:h-40 sm:w-40 block object-cover object-top hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
        </div>
      </div>
      {/* Online indicator */}
      <motion.div
        className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full bg-green-500 ring-2 ring-white dark:ring-neutral-900"
        style={{ width: 18, height: 18 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </motion.div>
    </div>
  );
}

/* ─── Scroll-triggered section wrapper ─────────────────────────────── */
function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Home Page ─────────────────────────────────────────────────────── */
export default function Home() {
  const { lang } = useLang();

  const t = lang === 'en'
    ? {
        badge: 'Open to Opportunities',
        name: 'Khristian Garcia',
        roles: ['Data Analyst', 'BI Engineer · Snowflake', 'Full-Stack Developer', 'Academic Instructor'],
        summary:
          'Built the entire BI function for a US fintech company from Guatemala — Snowflake data models, Power BI dashboards, SQL pipelines that drive decisions across 5 departments. Also teaching BI at USAC and shipping production web apps with React & TypeScript.',
        location: 'Guatemala City, Guatemala',
        education: 'Systems Engineering — USAC · Academic Instructor',
        ctaPrimary: 'View Interactive Resume',
        ctaSecondary: 'See Projects',
        liveProjects: 'Live Projects',
        viewAll: 'View all projects',
        highlights: [
          'Built BI from scratch at Alleviate Financial Solutions',
          'Raised data accuracy from 85% → 99.5% with Snowflake',
          'Cut reporting time from 2+ days to under 30 minutes',
        ],
        domains: [
          { icon: <Database className="h-5 w-5" />, title: 'Data Engineering', desc: 'Snowflake · SQL · ETL · dbt · Data Modeling', color: 'from-blue-500 to-blue-600', glow: 'rgba(59,130,246,0.2)' },
          { icon: <BarChart3 className="h-5 w-5" />, title: 'Business Intelligence', desc: 'Power BI · Tableau · DAX · KPI Dashboards', color: 'from-emerald-500 to-teal-600', glow: 'rgba(16,185,129,0.2)' },
          { icon: <Code className="h-5 w-5" />, title: 'Full-Stack Dev', desc: 'React · TypeScript · Tailwind · Vite · REST APIs', color: 'from-violet-500 to-purple-600', glow: 'rgba(139,92,246,0.2)' },
          { icon: <Cloud className="h-5 w-5" />, title: 'Cloud & DevOps', desc: 'Cloudflare · GCP · Docker · GitHub Actions · CI/CD', color: 'from-orange-500 to-red-500', glow: 'rgba(249,115,22,0.2)' },
        ],
        stats: [
          { value: '6+', label: 'Years in Tech', sub: 'since 2019' },
          { value: '15+', label: 'Dashboards Delivered', sub: 'Power BI · Tableau' },
          { value: '99.5%', label: 'Data Accuracy', sub: 'Snowflake models' },
        ],
      }
    : {
        badge: 'Disponible para Oportunidades',
        name: 'Khristian Garcia',
        roles: ['Analista de Datos', 'Ingeniero BI · Snowflake', 'Desarrollador Full-Stack', 'Instructor Académico'],
        summary:
          'Construí la función completa de BI para una fintech de EE. UU. desde Guatemala — modelos en Snowflake, dashboards en Power BI y pipelines SQL que hoy impulsan decisiones en 5 departamentos. También enseño BI en la USAC y desarrollo apps web en producción con React y TypeScript.',
        location: 'Ciudad de Guatemala, Guatemala',
        education: 'Ingeniería en Sistemas — USAC · Instructor Académico',
        ctaPrimary: 'Ver CV Interactivo',
        ctaSecondary: 'Ver Proyectos',
        liveProjects: 'Proyectos en Vivo',
        viewAll: 'Ver todos los proyectos',
        highlights: [
          'Construí el área de BI desde cero en Alleviate Financial Solutions',
          'Elevé la precisión de datos del 85% → 99.5% con Snowflake',
          'Reduje el ciclo de reportes de 2+ días a menos de 30 minutos',
        ],
        domains: [
          { icon: <Database className="h-5 w-5" />, title: 'Ingeniería de Datos', desc: 'Snowflake · SQL · ETL · dbt · Modelado de Datos', color: 'from-blue-500 to-blue-600', glow: 'rgba(59,130,246,0.2)' },
          { icon: <BarChart3 className="h-5 w-5" />, title: 'Inteligencia de Negocios', desc: 'Power BI · Tableau · DAX · Dashboards KPI', color: 'from-emerald-500 to-teal-600', glow: 'rgba(16,185,129,0.2)' },
          { icon: <Code className="h-5 w-5" />, title: 'Desarrollo Full-Stack', desc: 'React · TypeScript · Tailwind · Vite · REST APIs', color: 'from-violet-500 to-purple-600', glow: 'rgba(139,92,246,0.2)' },
          { icon: <Cloud className="h-5 w-5" />, title: 'Cloud & DevOps', desc: 'Cloudflare · GCP · Docker · GitHub Actions · CI/CD', color: 'from-orange-500 to-red-500', glow: 'rgba(249,115,22,0.2)' },
        ],
        stats: [
          { value: '6+', label: 'Años en Tecnología', sub: 'desde 2019' },
          { value: '15+', label: 'Dashboards Entregados', sub: 'Power BI · Tableau' },
          { value: '99.5%', label: 'Precisión de Datos', sub: 'modelos Snowflake' },
        ],
      };

  // Featured live projects come straight from the profile data (single source of truth)
  const profile = lang === 'en' ? profileEN : profileES;
  const homeProjects = profile.projects.filter(
    p => p.id === 'vale-combustible' || p.id === 'flowber-barberia'
  );

  useSEO({
    title: `${t.name} — ${lang === 'en' ? 'Data Analyst · BI Engineer · Full-Stack Developer' : 'Analista de Datos · Ingeniero BI · Desarrollador Full-Stack'}`,
    description: t.summary,
    lang,
    keywords: ['Data Analyst', 'Business Intelligence', 'Full Stack Developer', 'React', 'TypeScript', 'Snowflake', 'Power BI', 'Guatemala'],
  });

  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <Container>
          <div className="pt-8 pb-20 space-y-8">

            {/* ── Hero ──────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/80 backdrop-blur-sm p-8 sm:p-10 dark:border-neutral-800/80 dark:bg-neutral-900/80 shadow-xl shadow-neutral-900/5"
            >
              <HeroBackground />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
                {/* Left */}
                <div className="flex-1">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-700 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-400"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    {t.badge}
                  </motion.div>

                  {/* Name */}
                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
                  >
                    {t.name}
                  </motion.h1>

                  {/* Typing role */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mt-2 text-lg font-semibold text-blue-600 dark:text-blue-400 min-h-[1.75rem]"
                  >
                    <TypingAnimation words={t.roles} />
                  </motion.p>

                  {/* Summary */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed"
                  >
                    {t.summary}
                  </motion.p>

                  {/* Highlights */}
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 space-y-1.5"
                  >
                    {t.highlights.map(h => (
                      <li key={h} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </motion.ul>

                  {/* Meta */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="mt-5 flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-neutral-400"
                  >
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {t.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {t.education}
                    </div>
                  </motion.div>

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-7 flex flex-wrap gap-3"
                  >
                    <Link
                      to="/resume"
                      className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-500/40 hover:scale-[1.03] transition-all duration-200"
                    >
                      {t.ctaPrimary}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white/80 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-white hover:border-neutral-400 hover:scale-[1.03] transition-all duration-200 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-white dark:hover:bg-neutral-700"
                    >
                      {t.ctaSecondary}
                    </Link>
                  </motion.div>
                </div>

                {/* Photo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="shrink-0 self-start"
                >
                  <ProfilePhoto src={profileEN.photoUrl} alt="Khristian Garcia" />
                </motion.div>
              </div>

              {/* Stats bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="relative z-10 mt-8 grid grid-cols-3 gap-4 border-t border-neutral-200/60 pt-7 dark:border-neutral-800/60"
              >
                {t.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.07 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-br from-blue-600 to-violet-500 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {stat.label}
                    </div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{stat.sub}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Domain Cards ─────────────────────────────────────── */}
            <RevealSection>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {t.domains.map(domain => (
                  <motion.div key={domain.title} variants={cardReveal}>
                    <TiltCard className="h-full">
                      <div
                        className="relative h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900 cursor-default transition-all duration-300 hover:shadow-xl"
                        style={{ '--glow': domain.glow } as React.CSSProperties}
                      >
                        {/* Top accent bar */}
                        <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${domain.color}`} />

                        {/* Hover glow */}
                        <div
                          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                          style={{ boxShadow: `inset 0 0 40px ${domain.glow}` }}
                        />

                        <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${domain.color} p-2.5 shadow-sm`}>
                          <div className="text-white">{domain.icon}</div>
                        </div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">{domain.title}</h3>
                        <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          {domain.desc}
                        </p>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </motion.div>
            </RevealSection>

            {/* ── Live Projects ─────────────────────────────────────── */}
            <RevealSection>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{t.liveProjects}</h2>
                <Link
                  to="/projects"
                  className="group flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
                >
                  {t.viewAll}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {homeProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.45 }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 transition-shadow duration-300 hover:shadow-xl"
                  >
                    {/* Gradient header strip */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live
                        </span>
                      </div>

                      <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Impact badge */}
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 dark:bg-emerald-900/20">
                        <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                          {project.impact}
                        </span>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <a
                          href={project.links?.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-all"
                        >
                          <Github className="h-3.5 w-3.5" />
                          GitHub
                        </a>
                        <a
                          href={project.links?.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/25"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {lang === 'en' ? 'Live Demo' : 'Demo en Vivo'}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </RevealSection>

            {/* ── Stats Dashboard ───────────────────────────────────── */}
            <RevealSection>
              <StatsDashboard />
            </RevealSection>

            {/* ── Testimonials ─────────────────────────────────────── */}
            <RevealSection>
              <Testimonials />
            </RevealSection>
          </div>
        </Container>
      </main>
    </PageTransition>
  );
}
