import { useState, useRef } from 'react';
import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, Database, Code, Cloud, Server, Zap, Layers, Globe, GraduationCap, Github, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  descriptionEs: string;
  technologies: string[];
  category: 'data' | 'web' | 'cloud' | 'architecture' | 'academic';
  impact?: string;
  impactEs?: string;
  role: string;
  roleEs: string;
  duration: string;
  teamSize: string;
  links?: { github?: string; live?: string };
  featured: boolean;
  gradient: string;
}

const projects: Project[] = [
  {
    id: 'vale-combustible',
    title: 'Continental Motores — Vales Combustible',
    description: 'Full-stack fuel voucher management system for a vehicle fleet company. Features authentication, voucher generation, multi-step approval workflows, and usage reporting. Deployed on Cloudflare Pages with zero-downtime CI/CD.',
    descriptionEs: 'Sistema full-stack de gestión de vales de combustible para empresa de flota vehicular. Incluye autenticación, generación de vales, flujos de aprobación multinivel y reportes de uso. Desplegado en Cloudflare Pages con CI/CD sin tiempo de inactividad.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages', 'Vite', 'Authentication'],
    category: 'web',
    impact: 'Eliminated paper-based voucher process — approvals dropped from days to minutes',
    impactEs: 'Eliminó el proceso de vales en papel — las aprobaciones bajaron de días a minutos',
    role: 'Full-Stack Developer',
    roleEs: 'Desarrollador Full-Stack',
    duration: 'Ongoing',
    teamSize: 'Solo project',
    links: { github: 'https://github.com/garciajuni20/Continental-Motores-Vales-Combustible', live: 'https://continental-motores-vales-combustible.pages.dev/login' },
    featured: true,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'flowber-barberia',
    title: 'Flowber — Digital Barbershop Platform',
    description: 'Digital platform for a barbershop business built from scratch. Enables online appointment scheduling, service catalog browsing, and business management. Mobile-first responsive design. Deployed on Cloudflare Pages.',
    descriptionEs: 'Plataforma digital para negocio de barbería construida desde cero. Permite reservas de citas en línea, exploración del catálogo de servicios y gestión del negocio. Diseño responsivo mobile-first. Desplegado en Cloudflare Pages.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages', 'Vite', 'Responsive Design'],
    category: 'web',
    impact: 'Digitized scheduling — eliminated phone-based bookings and reduced no-shows',
    impactEs: 'Digitalizó la agenda — eliminó reservas telefónicas y redujo inasistencias',
    role: 'Full-Stack Developer & Designer',
    roleEs: 'Desarrollador Full-Stack & Diseñador',
    duration: 'Ongoing',
    teamSize: 'Solo project',
    links: { github: 'https://github.com/garciajuni20/flowber-barberia', live: 'https://flowber-barberia.pages.dev/' },
    featured: true,
    gradient: 'from-violet-500 to-indigo-600',
  },
  {
    id: 'portfolio',
    title: 'This Portfolio — Interactive Resume',
    description: 'React + TypeScript portfolio with bilingual support (EN/ES), dark/light mode, animated skill meters, tag-based filters, dynamic PDF generation, and auto-deployment to GitHub Pages via GitHub Actions.',
    descriptionEs: 'Portafolio en React + TypeScript con soporte bilingüe (EN/ES), modo oscuro/claro, medidores animados, filtros por etiqueta, generación dinámica de PDFs y auto-despliegue a GitHub Pages vía GitHub Actions.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'GitHub Actions', 'Vite', '@react-pdf/renderer'],
    category: 'web',
    impact: 'Demonstrates full-stack product thinking — this site IS the portfolio artifact',
    impactEs: 'Demuestra pensamiento de producto full-stack — este sitio ES el propio artefacto del portafolio',
    role: 'Full-Stack Developer & Designer',
    roleEs: 'Desarrollador Full-Stack & Diseñador',
    duration: '3 weeks',
    teamSize: 'Solo project',
    links: { github: 'https://github.com/garciajuni20/Resume_Khristian_Garcia', live: 'https://garciajuni20.github.io/Resume_Khristian_Garcia/' },
    featured: true,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'snowflake-data-layer',
    title: 'Snowflake Analytics Data Layer',
    description: 'Designed and built the complete Snowflake data architecture for Alleviate Financial Solutions — star schema models, analytical views, and optimized SQL transformations feeding Power BI and Tableau dashboards across 5 departments.',
    descriptionEs: 'Diseñé y construí la arquitectura completa de datos en Snowflake para Alleviate Financial Solutions — modelos en esquema estrella, vistas analíticas y transformaciones SQL optimizadas que alimentan dashboards de Power BI y Tableau en 5 departamentos.',
    technologies: ['Snowflake', 'SQL', 'Star Schema', 'Data Modeling', 'ETL', 'dbt', 'Data Validation'],
    category: 'data',
    impact: "Raised data accuracy from 85% to 99.5% — became the company's source of truth",
    impactEs: 'Elevó la precisión de datos del 85% al 99.5% — se convirtió en la fuente de verdad de la empresa',
    role: 'Lead Data Engineer / BI Analyst',
    roleEs: 'Ingeniero de Datos Líder / Analista BI',
    duration: '14+ months',
    teamSize: 'Solo (cross-dept collaboration)',
    featured: true,
    gradient: 'from-blue-600 to-blue-700',
  },
  {
    id: 'bi-dashboard-suite',
    title: 'Financial Analytics Dashboard Suite',
    description: 'Comprehensive Power BI and Tableau dashboard suite for financial and operational reporting at Alleviate Financial Solutions. Real-time data visualization, KPI tracking, trend analysis, and automated PDF reporting.',
    descriptionEs: 'Suite integral de dashboards en Power BI y Tableau para reportes financieros y operativos en Alleviate Financial Solutions. Visualización en tiempo real, seguimiento de KPIs, análisis de tendencias y reportes PDF automatizados.',
    technologies: ['Power BI', 'Tableau', 'DAX', 'Power Query', 'Snowflake', 'SQL'],
    category: 'data',
    impact: 'Reduced reporting cycle from 2+ days to under 30 minutes — 15+ dashboards in production',
    impactEs: 'Redujo el ciclo de reportes de 2+ días a menos de 30 minutos — 15+ dashboards en producción',
    role: 'BI Developer',
    roleEs: 'Desarrollador BI',
    duration: '14+ months',
    teamSize: '2 analysts + US stakeholders',
    featured: false,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'fortran-peg-parser',
    title: 'FortranPEG — Fortran Parser Generator',
    description: 'A parser generator for the Fortran programming language using PEG (Parsing Expression Grammar) and recursive descent parsing. Includes a web-based IDE for grammar testing. Live on GitHub Pages.',
    descriptionEs: 'Generador de parsers para Fortran usando PEG (Parsing Expression Grammar) y análisis descendente recursivo. Incluye un IDE web para pruebas de gramática. Disponible en GitHub Pages.',
    technologies: ['JavaScript', 'PEG Parsers', 'Svelte', 'Compiler Theory', 'Recursive Descent'],
    category: 'academic',
    impact: 'Full Fortran grammar implementation with a live, interactive testing environment',
    impactEs: 'Implementación completa de gramática Fortran con entorno interactivo de pruebas en vivo',
    role: 'Developer — Group 8, Compilers 2',
    roleEs: 'Desarrollador — Grupo 8, Compiladores 2',
    duration: '1 month',
    teamSize: '3 students',
    links: { github: 'https://github.com/garciajuni20/G8_Fase2_FortranPEG', live: 'https://garciajuni20.github.io/G8_Fase2_FortranPEG/' },
    featured: true,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'compilers-phase1',
    title: 'Compilers 2 — Phase 1 (Svelte App)',
    description: 'Phase 1 of the Compilers 2 course project — web-based compiler front-end with lexical analysis, tokenization, and early parsing stages.',
    descriptionEs: 'Fase 1 del proyecto de Compiladores 2 — interfaz web de compilador con análisis léxico, tokenización y etapas tempranas de parsing.',
    technologies: ['JavaScript', 'Svelte', 'Lexical Analysis', 'Tokenization'],
    category: 'academic',
    impact: 'Foundation in compiler front-end theory applied to a working implementation',
    impactEs: 'Base sólida en teoría de front-end de compiladores aplicada a una implementación funcional',
    role: 'Developer — Group 8',
    roleEs: 'Desarrollador — Grupo 8',
    duration: '3 weeks',
    teamSize: '3 students',
    links: { github: 'https://github.com/garciajuni20/Compi2_Grupo8' },
    featured: false,
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    id: 'bd2-suficiencia',
    title: 'Advanced Databases — BD2 Sufficiency',
    description: 'Python-based advanced database project for the BD2 sufficiency exam at USAC. Covers query optimization, indexing strategies, and complex schema design.',
    descriptionEs: 'Proyecto avanzado de bases de datos en Python para el examen de suficiencia BD2 en la USAC. Cubre optimización de consultas, estrategias de indexación y diseño complejo de esquemas.',
    technologies: ['Python', 'Advanced SQL', 'Database Design', 'Query Optimization', 'Indexing'],
    category: 'academic',
    impact: 'Applied advanced database theory to a real, graded deliverable',
    impactEs: 'Aplicó teoría avanzada de bases de datos a un entregable real y calificado',
    role: 'Student — Systems Engineering, USAC',
    roleEs: 'Estudiante — Ingeniería en Sistemas, USAC',
    duration: '2 weeks',
    teamSize: 'Solo',
    links: { github: 'https://github.com/garciajuni20/BD2_SUFICIENCIA_201404202' },
    featured: false,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'docker-workshop',
    title: 'Docker & Cloud-Native Infrastructure',
    description: 'Containerization, Docker Compose, Kubernetes basics, and CI/CD pipeline design for cloud-native applications — completed in the Cloud-Native + GT community workshop.',
    descriptionEs: 'Contenedorización, Docker Compose, fundamentos de Kubernetes y diseño de pipelines CI/CD — completado en el taller de la comunidad Cloud-Native + GT.',
    technologies: ['Docker', 'Docker Compose', 'Kubernetes', 'CI/CD', 'Microservices', 'GitHub Actions'],
    category: 'cloud',
    impact: 'Hands-on containerization skills applied to real DevOps workflows',
    impactEs: 'Habilidades prácticas de contenedorización aplicadas a flujos de trabajo DevOps reales',
    role: 'Participant / Developer',
    roleEs: 'Participante / Desarrollador',
    duration: '1 week',
    teamSize: 'Community workshop',
    links: { github: 'https://github.com/garciajuni20/taller-docker' },
    featured: false,
    gradient: 'from-sky-500 to-blue-600',
  },
];

const categoryColorMap: Record<string, string> = {
  web: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  data: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  cloud: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  academic: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  architecture: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
};

function ProjectCard({ project, lang, t }: { project: Project; lang: string; t: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const getCatIcon = (cat: string) => {
    if (cat === 'web') return <Globe className="h-3.5 w-3.5" />;
    if (cat === 'data') return <Database className="h-3.5 w-3.5" />;
    if (cat === 'cloud') return <Cloud className="h-3.5 w-3.5" />;
    if (cat === 'academic') return <GraduationCap className="h-3.5 w-3.5" />;
    return <Server className="h-3.5 w-3.5" />;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900"
    >
      {/* Gradient top */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

      <div className="flex flex-col flex-1 p-5">
        {/* Header row */}
        <div className="mb-3 flex items-center justify-between">
          <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColorMap[project.category]}`}>
            {getCatIcon(project.category)}
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
          {project.links?.live && (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          )}
        </div>

        <h3 className="mb-2 font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
          {lang === 'en' ? project.description : project.descriptionEs}
        </p>

        {project.impact && (
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 dark:bg-emerald-900/15">
            <Zap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed font-medium">
              {lang === 'en' ? project.impact : project.impactEs}
            </p>
          </div>
        )}

        <div className="mb-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-neutral-400">{t.role}</span>
            <div className="font-medium text-neutral-800 dark:text-neutral-200 mt-0.5 leading-snug">
              {lang === 'en' ? project.role : project.roleEs}
            </div>
          </div>
          <div>
            <span className="text-neutral-400">{t.duration}</span>
            <div className="font-medium text-neutral-800 dark:text-neutral-200 mt-0.5">{project.duration}</div>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map(tech => (
            <span key={tech} className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-400 dark:bg-neutral-800">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="mt-auto flex gap-2">
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-all">
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/25">
              <ExternalLink className="h-3.5 w-3.5" />
              {t.viewLive}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const t = lang === 'en'
    ? { title: 'Projects', subtitle: 'Live deployments, real work, and academic projects — all with working code.', viewGithub: 'GitHub', viewLive: 'Live Demo', featured: 'Featured Projects', allProjects: 'More Projects', impact: 'Impact', role: 'Role', duration: 'Duration', team: 'Team', liveApp: 'Live', academic: 'USAC' }
    : { title: 'Proyectos', subtitle: 'Despliegues en vivo, trabajo real y proyectos académicos — todos con código funcional.', viewGithub: 'GitHub', viewLive: 'Demo en Vivo', featured: 'Proyectos Destacados', allProjects: 'Más Proyectos', impact: 'Impacto', role: 'Rol', duration: 'Duración', team: 'Equipo', liveApp: 'En Vivo', academic: 'USAC' };

  useSEO({ title: t.title, description: t.subtitle, lang, keywords: ['projects', 'portfolio', 'data engineering', 'Snowflake', 'React', 'TypeScript', 'Cloudflare', 'Guatemala'] });

  const categories = [
    { id: 'all', labelEn: 'All', labelEs: 'Todos', icon: <Layers className="h-4 w-4" />, count: projects.length },
    { id: 'web', labelEn: 'Live Web Apps', labelEs: 'Apps Web', icon: <Globe className="h-4 w-4" />, count: projects.filter(p => p.category === 'web').length },
    { id: 'data', labelEn: 'Data & BI', labelEs: 'Datos & BI', icon: <Database className="h-4 w-4" />, count: projects.filter(p => p.category === 'data').length },
    { id: 'academic', labelEn: 'Academic', labelEs: 'Académico', icon: <GraduationCap className="h-4 w-4" />, count: projects.filter(p => p.category === 'academic').length },
    { id: 'cloud', labelEn: 'Cloud & DevOps', labelEs: 'Cloud', icon: <Cloud className="h-4 w-4" />, count: projects.filter(p => p.category === 'cloud').length },
  ];

  const filtered = activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory);
  const featured = activeCategory === 'all' ? filtered.filter(p => p.featured) : filtered;
  const others = activeCategory === 'all' ? filtered.filter(p => !p.featured) : [];

  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-50">
        <Container>
          <motion.div
            className="py-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold tracking-tight">{t.title}</h1>
              <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl">{t.subtitle}</p>
            </div>

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map(cat => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {cat.icon}
                    {lang === 'en' ? cat.labelEn : cat.labelEs}
                    <span className={`ml-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Featured */}
                {featured.length > 0 && (
                  <div className="mb-12">
                    {activeCategory === 'all' && (
                      <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">{t.featured}</h2>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                          {featured.length} {lang === 'en' ? 'projects' : 'proyectos'}
                        </span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {featured.map(project => (
                        <ProjectCard key={project.id} project={project} lang={lang} t={t as Record<string, string>} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Others */}
                {others.length > 0 && (
                  <div className="mb-12">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-2xl font-bold">{t.allProjects}</h2>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {others.length} {lang === 'en' ? 'projects' : 'proyectos'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {others.map(project => (
                        <ProjectCard key={project.id} project={project} lang={lang} t={t as Record<string, string>} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-center dark:border-neutral-800 shadow-xl shadow-blue-500/20">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10">
                <h3 className="mb-2 text-xl font-bold text-white">
                  {lang === 'en' ? 'Have a project in mind?' : '¿Tienes un proyecto en mente?'}
                </h3>
                <p className="mb-6 text-blue-100 max-w-xl mx-auto text-sm">
                  {lang === 'en'
                    ? 'Open to freelance projects, consulting, and full-time roles in data engineering, BI, and full-stack development.'
                    : 'Disponible para proyectos freelance, consultoría y roles de tiempo completo en ingeniería de datos, BI y desarrollo full-stack.'}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors shadow-lg"
                >
                  {lang === 'en' ? "Let's Talk" : 'Hablemos'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </main>
    </PageTransition>
  );
}
