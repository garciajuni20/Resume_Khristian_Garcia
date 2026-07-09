import { useState, useRef } from 'react';
import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, Database, Cloud, Server, Zap, Layers, Globe, GraduationCap, Github, ArrowRight, BookOpen } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import type { ProjectItem } from '../types';

const categoryColorMap: Record<string, string> = {
  web: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  data: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  cloud: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  academic: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  architecture: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
};

function ProjectCard({ project, t }: { project: ProjectItem; t: Record<string, string> }) {
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
          {project.description}
        </p>

        {project.impact && (
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 dark:bg-emerald-900/15">
            <Zap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed font-medium">
              {project.impact}
            </p>
          </div>
        )}

        <div className="mb-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-neutral-400">{t.role}</span>
            <div className="font-medium text-neutral-800 dark:text-neutral-200 mt-0.5 leading-snug">
              {project.role}
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
          {project.caseStudyPath && (
            <Link
              to={project.caseStudyPath}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-700 transition-colors shadow-sm shadow-violet-500/25"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              {t.caseStudy}
            </Link>
          )}
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
  const projects = (lang === 'en' ? profileEN : profileES).projects;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const t = lang === 'en'
    ? { title: 'Projects', subtitle: 'Live deployments, real work, and academic projects — all with working code.', viewGithub: 'GitHub', viewLive: 'Live Demo', featured: 'Featured Projects', allProjects: 'More Projects', impact: 'Impact', role: 'Role', duration: 'Duration', team: 'Team', liveApp: 'Live', academic: 'USAC', caseStudy: 'Case Study' }
    : { title: 'Proyectos', subtitle: 'Despliegues en vivo, trabajo real y proyectos académicos — todos con código funcional.', viewGithub: 'GitHub', viewLive: 'Demo en Vivo', featured: 'Proyectos Destacados', allProjects: 'Más Proyectos', impact: 'Impacto', role: 'Rol', duration: 'Duración', team: 'Equipo', liveApp: 'En Vivo', academic: 'USAC', caseStudy: 'Caso de Estudio' };

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
                        <ProjectCard key={project.id} project={project} t={t as Record<string, string>} />
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
                        <ProjectCard key={project.id} project={project} t={t as Record<string, string>} />
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
