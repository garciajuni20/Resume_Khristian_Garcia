import { useState } from 'react';
import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Database, Code, Cloud, Server, Zap, Layers, Globe, GraduationCap } from 'lucide-react';

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
  links?: {
    github?: string;
    live?: string;
  };
  featured: boolean;
}

export default function Projects() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const projects: Project[] = [
    // ── Live Web Applications ────────────────────────────────────────────
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
      links: {
        github: 'https://github.com/garciajuni20/Continental-Motores-Vales-Combustible',
        live: 'https://continental-motores-vales-combustible.pages.dev/login'
      },
      featured: true
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
      links: {
        github: 'https://github.com/garciajuni20/flowber-barberia',
        live: 'https://flowber-barberia.pages.dev/'
      },
      featured: true
    },
    {
      id: 'portfolio',
      title: 'This Portfolio — Interactive Resume Website',
      description: 'React + TypeScript portfolio with bilingual support (EN/ES), dark/light mode, tag-based experience filters, animated skill meters, and a structured resume. Auto-deploys to GitHub Pages via GitHub Actions on every push.',
      descriptionEs: 'Portafolio en React + TypeScript con soporte bilingüe (EN/ES), modo oscuro/claro, filtros de experiencia por etiqueta, medidores de habilidades animados y CV estructurado. Auto-desplegado en GitHub Pages vía GitHub Actions en cada push.',
      technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'GitHub Actions', 'Vite'],
      category: 'web',
      impact: 'Demonstrates full-stack product thinking — this site is itself the portfolio artifact',
      impactEs: 'Demuestra pensamiento de producto full-stack — este sitio es el propio artefacto del portafolio',
      role: 'Full-Stack Developer & Designer',
      roleEs: 'Desarrollador Full-Stack & Diseñador',
      duration: '3 weeks',
      teamSize: 'Solo project',
      links: {
        github: 'https://github.com/garciajuni20/Resume_Khristian_Garcia',
        live: 'https://garciajuni20.github.io/Resume_Khristian_Garcia/'
      },
      featured: true
    },

    // ── Data & BI Work ───────────────────────────────────────────────────
    {
      id: 'snowflake-data-layer',
      title: 'Snowflake Analytics Data Layer',
      description: 'Designed and built the complete Snowflake data architecture for Alleviate Financial Solutions — star schema models, analytical views, and optimized SQL transformations feeding Power BI and Tableau dashboards across 5 departments.',
      descriptionEs: 'Diseñé y construí la arquitectura completa de datos en Snowflake para Alleviate Financial Solutions — modelos en esquema estrella, vistas analíticas y transformaciones SQL optimizadas que alimentan dashboards de Power BI y Tableau en 5 departamentos.',
      technologies: ['Snowflake', 'SQL', 'Star Schema', 'Data Modeling', 'ETL', 'dbt', 'Data Validation'],
      category: 'data',
      impact: 'Raised data accuracy from 85% to 99.5% — became the company\'s source of truth',
      impactEs: 'Elevó la precisión de datos del 85% al 99.5% — se convirtió en la fuente de verdad de la empresa',
      role: 'Lead Data Engineer / BI Analyst',
      roleEs: 'Ingeniero de Datos Líder / Analista BI',
      duration: '14+ months',
      teamSize: 'Solo (cross-dept collaboration)',
      featured: true
    },
    {
      id: 'bi-dashboard-suite',
      title: 'Financial Analytics Dashboard Suite',
      description: 'Comprehensive Power BI and Tableau dashboard suite for financial and operational reporting at Alleviate Financial Solutions. Real-time data visualization, KPI tracking, trend analysis, and automated PDF reporting for executive reviews.',
      descriptionEs: 'Suite integral de dashboards en Power BI y Tableau para reportes financieros y operativos en Alleviate Financial Solutions. Visualización en tiempo real, seguimiento de KPIs, análisis de tendencias y reportes PDF automatizados para revisiones ejecutivas.',
      technologies: ['Power BI', 'Tableau', 'DAX', 'Power Query', 'Snowflake', 'SQL', 'Azure'],
      category: 'data',
      impact: 'Reduced reporting cycle from 2+ days to under 30 minutes — 15+ dashboards in production',
      impactEs: 'Redujo el ciclo de reportes de 2+ días a menos de 30 minutos — 15+ dashboards en producción',
      role: 'BI Developer',
      roleEs: 'Desarrollador BI',
      duration: '14+ months',
      teamSize: '2 analysts + US stakeholders',
      featured: false
    },

    // ── Academic Projects ─────────────────────────────────────────────────
    {
      id: 'fortran-peg-parser',
      title: 'FortranPEG — Fortran Parser Generator',
      description: 'A parser generator for the Fortran programming language using PEG (Parsing Expression Grammar) and recursive descent parsing, built as part of the Compilers 2 course at USAC. Includes a web-based IDE for grammar testing. Live on GitHub Pages.',
      descriptionEs: 'Generador de parsers para el lenguaje Fortran usando PEG (Parsing Expression Grammar) y análisis descendente recursivo, construido para el curso de Compiladores 2 en la USAC. Incluye un IDE web para pruebas de gramática. Disponible en GitHub Pages.',
      technologies: ['JavaScript', 'PEG Parsers', 'Svelte', 'Compiler Theory', 'Recursive Descent', 'GitHub Pages'],
      category: 'academic',
      impact: 'Full Fortran grammar implementation with a live, interactive testing environment',
      impactEs: 'Implementación completa de gramática Fortran con entorno interactivo de pruebas en vivo',
      role: 'Developer — Group 8, Compilers 2',
      roleEs: 'Desarrollador — Grupo 8, Compiladores 2',
      duration: '1 month',
      teamSize: '3 students',
      links: {
        github: 'https://github.com/garciajuni20/G8_Fase2_FortranPEG',
        live: 'https://garciajuni20.github.io/G8_Fase2_FortranPEG/'
      },
      featured: true
    },
    {
      id: 'compilers-phase1',
      title: 'Compilers 2 — Phase 1 (Svelte App)',
      description: 'Phase 1 of the Compilers 2 course project — a web-based compiler front-end built with Svelte and JavaScript. Implements lexical analysis, tokenization, and early parsing stages for a custom language grammar.',
      descriptionEs: 'Fase 1 del proyecto del curso Compiladores 2 — interfaz web de compilador construida con Svelte y JavaScript. Implementa análisis léxico, tokenización y etapas tempranas de parsing para una gramática de lenguaje personalizada.',
      technologies: ['JavaScript', 'Svelte', 'Lexical Analysis', 'Tokenization', 'Compiler Design'],
      category: 'academic',
      impact: 'Solid foundation in compiler front-end theory applied to a working implementation',
      impactEs: 'Base sólida en teoría de front-end de compiladores aplicada a una implementación funcional',
      role: 'Developer — Group 8',
      roleEs: 'Desarrollador — Grupo 8',
      duration: '3 weeks',
      teamSize: '3 students',
      links: {
        github: 'https://github.com/garciajuni20/Compi2_Grupo8'
      },
      featured: false
    },
    {
      id: 'bd2-suficiencia',
      title: 'Advanced Databases — BD2 Sufficiency Project',
      description: 'Python-based advanced database project submitted as the BD2 (Databases 2) sufficiency exam at USAC. Covers advanced query optimization, indexing strategies, and complex schema design.',
      descriptionEs: 'Proyecto avanzado de bases de datos en Python presentado como examen de suficiencia de BD2 (Bases de Datos 2) en la USAC. Cubre optimización avanzada de consultas, estrategias de indexación y diseño complejo de esquemas.',
      technologies: ['Python', 'Advanced SQL', 'Database Design', 'Query Optimization', 'Indexing'],
      category: 'academic',
      impact: 'Applied advanced database theory to a real, graded deliverable',
      impactEs: 'Aplicó teoría avanzada de bases de datos a un entregable real y calificado',
      role: 'Student — Systems Engineering, USAC',
      roleEs: 'Estudiante — Ingeniería en Sistemas, USAC',
      duration: '2 weeks',
      teamSize: 'Solo',
      links: {
        github: 'https://github.com/garciajuni20/BD2_SUFICIENCIA_201404202'
      },
      featured: false
    },

    // ── Cloud & Infrastructure ───────────────────────────────────────────
    {
      id: 'docker-workshop',
      title: 'Docker & Cloud-Native Infrastructure Workshop',
      description: 'Participated in and worked through the taller-docker workshop from the Cloud-Native + GT community — containerization, Docker Compose, Kubernetes basics, and CI/CD pipeline design for cloud-native applications.',
      descriptionEs: 'Participé y completé el taller-docker de la comunidad Cloud-Native + GT — contenedorización, Docker Compose, fundamentos de Kubernetes y diseño de pipelines CI/CD para aplicaciones cloud-native.',
      technologies: ['Docker', 'Docker Compose', 'Kubernetes', 'CI/CD', 'Microservices', 'GitHub Actions'],
      category: 'cloud',
      impact: 'Hands-on containerization skills applied to real DevOps workflows',
      impactEs: 'Habilidades prácticas de contenedorización aplicadas a flujos de trabajo DevOps reales',
      role: 'Participant / Developer',
      roleEs: 'Participante / Desarrollador',
      duration: '1 week',
      teamSize: 'Community workshop',
      links: {
        github: 'https://github.com/garciajuni20/taller-docker'
      },
      featured: false
    }
  ];

  const categories = [
    { id: 'all', labelEn: 'All', labelEs: 'Todos', icon: <Layers className="h-4 w-4" />, count: projects.length },
    { id: 'web', labelEn: 'Live Web Apps', labelEs: 'Apps Web', icon: <Globe className="h-4 w-4" />, count: projects.filter(p => p.category === 'web').length },
    { id: 'data', labelEn: 'Data & BI', labelEs: 'Datos & BI', icon: <Database className="h-4 w-4" />, count: projects.filter(p => p.category === 'data').length },
    { id: 'academic', labelEn: 'Academic', labelEs: 'Académico', icon: <GraduationCap className="h-4 w-4" />, count: projects.filter(p => p.category === 'academic').length },
    { id: 'cloud', labelEn: 'Cloud & DevOps', labelEs: 'Cloud', icon: <Cloud className="h-4 w-4" />, count: projects.filter(p => p.category === 'cloud').length },
  ];

  const t = lang === 'en' ? {
    title: 'Projects',
    subtitle: 'Live deployments, real work experience, and academic technical projects — all with working code.',
    viewGithub: 'GitHub',
    viewLive: 'Live Demo',
    featured: 'Featured Projects',
    allProjects: 'More Projects',
    impact: 'Impact',
    role: 'Role',
    duration: 'Duration',
    team: 'Team',
    liveApp: 'Live',
    academic: 'USAC Project'
  } : {
    title: 'Proyectos',
    subtitle: 'Despliegues en vivo, experiencia laboral real y proyectos técnicos académicos — todos con código funcional.',
    viewGithub: 'GitHub',
    viewLive: 'Demo en Vivo',
    featured: 'Proyectos Destacados',
    allProjects: 'Más Proyectos',
    impact: 'Impacto',
    role: 'Rol',
    duration: 'Duración',
    team: 'Equipo',
    liveApp: 'En Vivo',
    academic: 'Proyecto USAC'
  };

  useSEO({
    title: t.title,
    description: t.subtitle,
    lang,
    keywords: ['projects', 'portfolio', 'data engineering', 'Snowflake', 'React', 'TypeScript', 'Cloudflare', 'Guatemala']
  });

  const getCategoryIcon = (cat: string) => {
    if (cat === 'web') return <Globe className="h-4 w-4" />;
    if (cat === 'data') return <Database className="h-4 w-4" />;
    if (cat === 'cloud') return <Cloud className="h-4 w-4" />;
    if (cat === 'academic') return <GraduationCap className="h-4 w-4" />;
    return <Server className="h-4 w-4" />;
  };

  const getCategoryLabel = (cat: string) => {
    const c = categories.find(c => c.id === cat);
    return lang === 'en' ? c?.labelEn : c?.labelEs;
  };

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const showSplit = activeCategory === 'all';
  const featuredProjects = showSplit ? filteredProjects.filter(p => p.featured) : filteredProjects;
  const otherProjects = showSplit ? filteredProjects.filter(p => !p.featured) : [];

  const categoryColorMap: Record<string, string> = {
    web: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    data: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    cloud: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    academic: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    architecture: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-50">
      <Container>
        <motion.div
          className="py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
            <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl">
              {t.subtitle}
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {category.icon}
                  {lang === 'en' ? category.labelEn : category.labelEs}
                  <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300'
                  }`}>
                    {category.count}
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
              {/* Featured grid */}
              {featuredProjects.length > 0 && (
                <div className="mb-12">
                  {showSplit && (
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">{t.featured}</h2>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {featuredProjects.length} {lang === 'en' ? 'projects' : 'proyectos'}
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {featuredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.07 }}
                        whileHover={{ y: -4 }}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow dark:border-neutral-800 dark:bg-neutral-900"
                      >
                        {/* Top bar */}
                        <div className="mb-4 flex items-center justify-between">
                          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${categoryColorMap[project.category]}`}>
                            {getCategoryIcon(project.category)}
                            {getCategoryLabel(project.category)}
                          </span>
                          {project.links?.live && (
                            <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                              {t.liveApp}
                            </span>
                          )}
                        </div>

                        <h3 className="mb-2 font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                          {project.title}
                        </h3>

                        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
                          {lang === 'en' ? project.description : project.descriptionEs}
                        </p>

                        {project.impact && (
                          <div className="mb-4 rounded-lg bg-green-50 px-3 py-2.5 dark:bg-green-900/20">
                            <div className="flex items-start gap-2">
                              <Zap className="h-3.5 w-3.5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                              <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                                {lang === 'en' ? project.impact : project.impactEs}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
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

                        <div className="mb-5 flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 5).map((tech) => (
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
                              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors">
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                              GitHub
                            </a>
                          )}
                          {project.links?.live && (
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors">
                              <ExternalLink className="h-3.5 w-3.5" />
                              {t.viewLive}
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other projects list */}
              {otherProjects.length > 0 && (
                <div className="mb-12">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">{t.allProjects}</h2>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      {otherProjects.length} {lang === 'en' ? 'projects' : 'proyectos'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {otherProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColorMap[project.category]}`}>
                                {getCategoryIcon(project.category)}
                                {getCategoryLabel(project.category)}
                              </span>
                              <h3 className="font-semibold text-neutral-900 dark:text-white">{project.title}</h3>
                            </div>
                            <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              {lang === 'en' ? project.description : project.descriptionEs}
                            </p>
                            {project.impact && (
                              <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 dark:bg-green-900/20">
                                <Zap className="h-3 w-3 text-green-600 dark:text-green-400 shrink-0" />
                                <span className="text-xs text-green-700 dark:text-green-300">
                                  {lang === 'en' ? project.impact : project.impactEs}
                                </span>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies.slice(0, 7).map((tech) => (
                                <span key={tech} className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 lg:flex-col lg:shrink-0">
                            {project.links?.github && (
                              <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors">
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                                GitHub
                              </a>
                            )}
                            {project.links?.live && (
                              <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors">
                                <ExternalLink className="h-3 w-3" />
                                Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div className="rounded-2xl border border-neutral-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 text-center dark:border-neutral-800 dark:from-blue-900/10 dark:to-indigo-900/10">
            <h3 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-white">
              {lang === 'en' ? 'Have a project in mind?' : '¿Tienes un proyecto en mente?'}
            </h3>
            <p className="mb-6 text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto text-sm">
              {lang === 'en'
                ? "Open to freelance projects, consulting, and full-time roles in data engineering, BI, and full-stack development."
                : 'Disponible para proyectos freelance, consultoría y roles de tiempo completo en ingeniería de datos, BI y desarrollo full-stack.'}
            </p>
            <a
              href="/#/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              {lang === 'en' ? "Let's Talk" : 'Hablemos'}
            </a>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
