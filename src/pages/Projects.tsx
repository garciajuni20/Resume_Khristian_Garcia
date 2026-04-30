import { useState } from 'react';
import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Database, Code, Cloud, Server, Zap, Layers, Globe } from 'lucide-react';
import BlogSection from '../components/BlogSection';

interface Project {
  id: string;
  title: string;
  description: string;
  descriptionEs: string;
  technologies: string[];
  category: 'data' | 'web' | 'cloud' | 'architecture';
  impact?: string;
  impactEs?: string;
  role: string;
  roleEs: string;
  duration: string;
  teamSize: string;
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  featured: boolean;
}

export default function Projects() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 'vale-combustible',
      title: 'Continental Motores — Vales Combustible',
      description: 'Full-stack web app for managing fuel vouchers at Continental Motores. Features user authentication, voucher generation, approval workflows, and usage reporting. Deployed on Cloudflare Pages for fast global delivery.',
      descriptionEs: 'Aplicación web full-stack para gestión de vales de combustible en Continental Motores. Incluye autenticación, generación de vales, flujos de aprobación y reportes de uso. Desplegado en Cloudflare Pages.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages', 'Authentication', 'Vite'],
      category: 'web',
      impact: 'Digitized voucher management — eliminated paper processes and reduced approval time from days to minutes',
      impactEs: 'Digitalizó la gestión de vales — eliminó procesos en papel y redujo tiempos de aprobación de días a minutos',
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
      description: 'Digital platform for a barbershop business built with React and TypeScript. Enables online appointment scheduling, service catalog browsing, and business management. Deployed on Cloudflare Pages.',
      descriptionEs: 'Plataforma digital para negocio de barbería construida con React y TypeScript. Permite agendar citas en línea, catálogo de servicios y gestión del negocio. Desplegado en Cloudflare Pages.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages', 'UI/UX Design', 'Vite'],
      category: 'web',
      impact: 'Enabled online appointment booking, reducing no-shows and improving customer experience',
      impactEs: 'Habilitó reservas de citas en línea, reduciendo inasistencias y mejorando la experiencia del cliente',
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
      title: 'Interactive Portfolio Website',
      description: 'React + TypeScript + Tailwind portfolio with language + theme toggles, tag-based filters, and structured resume content. Demonstrates full-stack capabilities with CI/CD deployment to GitHub Pages via GitHub Actions.',
      descriptionEs: 'Portafolio en React + TypeScript + Tailwind con toggle de idioma + tema, filtros por etiqueta y CV estructurado. Demuestra capacidades full-stack con despliegue CI/CD en GitHub Pages.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub Actions', 'CI/CD', 'Vite'],
      category: 'web',
      impact: 'Showcases technical breadth with bilingual support, dark mode, and product-quality UX',
      impactEs: 'Muestra amplitud técnica con soporte bilingüe, modo oscuro y UX de calidad de producto',
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
    {
      id: 'data-pipeline',
      title: 'Scalable ETL Data Pipeline',
      description: 'Designed and implemented a production-ready ETL pipeline using Snowflake, Python, and Docker. Includes data modeling, transformation, validation, and orchestration components.',
      descriptionEs: 'Diseñé e implementé un pipeline ETL listo para producción usando Snowflake, Python y Docker. Incluye componentes de modelado, transformación, validación y orquestación de datos.',
      technologies: ['Snowflake', 'Python', 'Docker', 'ETL', 'Data Modeling', 'Apache Airflow', 'Great Expectations'],
      category: 'data',
      impact: 'Reduced data processing time by 70% and improved data accuracy to 99.9%',
      impactEs: 'Redujo tiempo de procesamiento de datos en 70% y mejoró exactitud de datos a 99.9%',
      role: 'Lead Data Engineer',
      roleEs: 'Ingeniero de Datos Líder',
      duration: '6 months',
      teamSize: '3 engineers',
      featured: true
    },
    {
      id: 'bi-dashboard',
      title: 'Enterprise BI Dashboard Suite',
      description: 'Comprehensive BI dashboard suite for financial analytics using Power BI and Tableau. Features real-time data visualization, KPI tracking, predictive analytics, and automated reporting.',
      descriptionEs: 'Suite integral de dashboards BI para análisis financiero usando Power BI y Tableau. Incluye visualización en tiempo real, seguimiento de KPIs, analytics predictivo y reporting automatizado.',
      technologies: ['Power BI', 'Tableau', 'SQL', 'DAX', 'Data Visualization', 'Snowflake', 'Azure'],
      category: 'data',
      impact: 'Enabled real-time decision making and reduced reporting time from days to minutes',
      impactEs: 'Habilitó toma de decisiones en tiempo real y redujo tiempo de reporting de días a minutos',
      role: 'BI Analyst & Dashboard Developer',
      roleEs: 'Analista BI & Desarrollador de Dashboards',
      duration: '4 months',
      teamSize: '2 analysts + 1 stakeholder',
      featured: false
    },
    {
      id: 'cloud-architecture',
      title: 'Cloud Infrastructure Design',
      description: 'GCP-based infrastructure design with Kubernetes orchestration, containerized applications, and automated CI/CD pipelines for scalable deployments. Includes monitoring and cost optimization.',
      descriptionEs: 'Diseño de infraestructura basada en GCP con orquestación Kubernetes, aplicaciones contenerizadas y pipelines CI/CD automatizados. Incluye monitoreo y optimización de costos.',
      technologies: ['GCP', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Helm', 'Prometheus', 'Grafana'],
      category: 'cloud',
      impact: 'Reduced deployment time by 80% and improved system reliability to 99.95% uptime',
      impactEs: 'Redujo tiempo de despliegue en 80% y mejoró confiabilidad del sistema a 99.95% uptime',
      role: 'Cloud Architect & DevOps Engineer',
      roleEs: 'Arquitecto Cloud & Ingeniero DevOps',
      duration: '5 months',
      teamSize: '4 engineers',
      featured: false
    },
    {
      id: 'system-architecture',
      title: 'Microservices Architecture Design',
      description: 'Designed and documented a microservices-based system architecture with API gateways, service discovery, distributed data management, and event-driven communication patterns.',
      descriptionEs: 'Diseñé y documenté una arquitectura de sistema basada en microservicios con API gateways, discovery de servicios, gestión distribuida de datos y patrones event-driven.',
      technologies: ['Microservices', 'REST APIs', 'System Design', 'Architecture Patterns', 'Event Sourcing', 'CQRS'],
      category: 'architecture',
      impact: 'Improved system scalability from 10k to 100k concurrent users',
      impactEs: 'Mejoró escalabilidad del sistema de 10k a 100k usuarios concurrentes',
      role: 'Systems Architect',
      roleEs: 'Arquitecto de Sistemas',
      duration: '2 months',
      teamSize: 'Lead architect + 2 engineers',
      featured: false
    },
    {
      id: 'data-warehouse',
      title: 'Modern Data Warehouse Implementation',
      description: 'Implemented a modern data warehouse solution using Snowflake, dbt, and data orchestration tools. Included data modeling, ETL processes, and data quality monitoring.',
      descriptionEs: 'Implementé una solución moderna de data warehouse usando Snowflake, dbt y herramientas de orquestación. Incluyó modelado de datos, procesos ETL y monitoreo de calidad.',
      technologies: ['Snowflake', 'dbt', 'SQL', 'Python', 'Data Modeling', 'Data Quality', 'Data Governance'],
      category: 'data',
      impact: 'Unified data from 15+ sources and improved query performance by 5x',
      impactEs: 'Unificó datos de 15+ fuentes y mejoró rendimiento de consultas 5 veces',
      role: 'Data Warehouse Engineer',
      roleEs: 'Ingeniero de Data Warehouse',
      duration: '8 months',
      teamSize: '3 engineers + 2 data analysts',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', labelEn: 'All Projects', labelEs: 'Todos', icon: <Layers className="h-4 w-4" />, count: projects.length },
    { id: 'web', labelEn: 'Web Apps', labelEs: 'Apps Web', icon: <Globe className="h-4 w-4" />, count: projects.filter(p => p.category === 'web').length },
    { id: 'data', labelEn: 'Data & BI', labelEs: 'Datos & BI', icon: <Database className="h-4 w-4" />, count: projects.filter(p => p.category === 'data').length },
    { id: 'cloud', labelEn: 'Cloud & DevOps', labelEs: 'Cloud & DevOps', icon: <Cloud className="h-4 w-4" />, count: projects.filter(p => p.category === 'cloud').length },
    { id: 'architecture', labelEn: 'Architecture', labelEs: 'Arquitectura', icon: <Server className="h-4 w-4" />, count: projects.filter(p => p.category === 'architecture').length },
  ];

  const t = lang === 'en' ? {
    title: 'Projects',
    subtitle: 'A showcase of my work across full-stack development, data engineering, cloud architecture, and systems design.',
    viewGithub: 'GitHub',
    viewLive: 'Live Demo',
    technologies: 'Technologies',
    featured: 'Featured Projects',
    allProjects: 'More Projects',
    impact: 'Impact',
    role: 'Role',
    duration: 'Duration',
    team: 'Team',
    liveApp: 'Live App'
  } : {
    title: 'Proyectos',
    subtitle: 'Una muestra de mi trabajo en desarrollo full-stack, ingeniería de datos, arquitectura cloud y diseño de sistemas.',
    viewGithub: 'GitHub',
    viewLive: 'Demo en Vivo',
    technologies: 'Tecnologías',
    featured: 'Proyectos Destacados',
    allProjects: 'Más Proyectos',
    impact: 'Impacto',
    role: 'Rol',
    duration: 'Duración',
    team: 'Equipo',
    liveApp: 'App en Vivo'
  };

  useSEO({
    title: t.title,
    description: t.subtitle,
    lang,
    keywords: ['projects', 'portfolio', 'data engineering', 'cloud architecture', 'BI dashboards', 'React projects']
  });

  const getCategoryIcon = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.icon || <Code className="h-4 w-4" />;
  };

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return lang === 'en' ? category?.labelEn : category?.labelEs;
  };

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const showSplit = activeCategory === 'all';
  const featuredProjects = showSplit ? filteredProjects.filter(p => p.featured) : filteredProjects;
  const otherProjects = showSplit ? filteredProjects.filter(p => !p.featured) : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-50">
      <Container>
        <motion.div
          className="py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl">
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
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Featured Projects */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + '-featured'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        whileHover={{ y: -5 }}
                        className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 flex flex-col"
                      >
                        {/* Category badge */}
                        <div className="mb-4 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            {getCategoryIcon(project.category)}
                            {getCategoryLabel(project.category)}
                          </span>
                          {project.links?.live && (
                            <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                              {t.liveApp}
                            </span>
                          )}
                        </div>

                        <h3 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>

                        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
                          {lang === 'en' ? project.description : project.descriptionEs}
                        </p>

                        {project.impact && (
                          <div className="mb-4 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Zap className="h-3 w-3 text-green-600 dark:text-green-400" />
                              <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                                {t.impact}
                              </span>
                            </div>
                            <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                              {lang === 'en' ? project.impact : project.impactEs}
                            </p>
                          </div>
                        )}

                        <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-neutral-500 dark:text-neutral-400">{t.role}</span>
                            <div className="font-medium text-neutral-900 dark:text-white mt-0.5">
                              {lang === 'en' ? project.role : project.roleEs}
                            </div>
                          </div>
                          <div>
                            <span className="text-neutral-500 dark:text-neutral-400">{t.duration}</span>
                            <div className="font-medium text-neutral-900 dark:text-white mt-0.5">{project.duration}</div>
                          </div>
                        </div>

                        <div className="mb-5">
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 5).map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 5 && (
                              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                                +{project.technologies.length - 5}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-auto">
                          {project.links?.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
                            >
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                              {t.viewGithub}
                            </a>
                          )}
                          {project.links?.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                            >
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

              {/* More Projects */}
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
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                        className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-blue-100 p-1.5 dark:bg-blue-900/30">
                                  {getCategoryIcon(project.category)}
                                </div>
                                <h3 className="font-semibold text-neutral-900 dark:text-white">{project.title}</h3>
                              </div>
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                {getCategoryLabel(project.category)}
                              </span>
                            </div>

                            <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                              {lang === 'en' ? project.description : project.descriptionEs}
                            </p>

                            {project.impact && (
                              <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 dark:bg-green-900/20">
                                <Zap className="h-3 w-3 text-green-600 dark:text-green-400" />
                                <span className="text-xs font-medium text-green-700 dark:text-green-300">
                                  {lang === 'en' ? project.impact : project.impactEs}
                                </span>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies.slice(0, 7).map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 lg:flex-col lg:shrink-0">
                            {project.links?.github && (
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
                              >
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                                GitHub
                              </a>
                            )}
                            {project.links?.live && (
                              <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                              >
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

          {/* Blog Section */}
          <div className="mb-12">
            <BlogSection />
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 text-center dark:border-neutral-800 dark:from-blue-900/10 dark:to-indigo-900/10">
            <h3 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-white">
              {lang === 'en' ? 'Have a project in mind?' : '¿Tienes un proyecto en mente?'}
            </h3>
            <p className="mb-6 text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto">
              {lang === 'en'
                ? "I'm available for freelance projects, consulting, and full-time opportunities in data engineering, BI, and full-stack development."
                : 'Estoy disponible para proyectos freelance, consultoría y oportunidades de tiempo completo en ingeniería de datos, BI y desarrollo full-stack.'}
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
