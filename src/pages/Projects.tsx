import { useMemo, useState } from 'react';
import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ExternalLink, Database, Cloud, Zap, Layers, Globe, GraduationCap, Github, ArrowRight, BookOpen, Workflow } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import AmbientVideo from '../components/AmbientVideo';
import { Link } from 'react-router-dom';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import type { ProjectCategory, ProjectItem } from '../types';
import { FLUID } from '../utils/animations';

/**
 * Projects, Notion-style: one database view with category filters, cards as
 * pages with properties. Everything comes from `profile-*.ts`; this file only
 * knows how to show a project, never what the projects are.
 */

type Tone = 'blue' | 'green' | 'purple' | 'orange' | 'pink';

const CATEGORY: Record<ProjectCategory, { tone: Tone; en: string; es: string; icon: typeof Globe }> = {
  web: { tone: 'blue', en: 'Live web app', es: 'App web en vivo', icon: Globe },
  data: { tone: 'green', en: 'Data & BI', es: 'Datos y BI', icon: Database },
  architecture: { tone: 'pink', en: 'Architecture & AI', es: 'Arquitectura e IA', icon: Workflow },
  cloud: { tone: 'purple', en: 'Cloud & DevOps', es: 'Cloud y DevOps', icon: Cloud },
  academic: { tone: 'orange', en: 'Academic', es: 'Académico', icon: GraduationCap },
};

const FILTER_ORDER: ProjectCategory[] = ['architecture', 'data', 'web', 'cloud', 'academic'];

const TECH_SHOWN = 5;

type Labels = {
  role: string;
  duration: string;
  team: string;
  caseStudy: string;
  viewLive: string;
  live: string;
  open: string;
};

function ProjectCard({ project, lang, t }: { project: ProjectItem; lang: 'en' | 'es'; t: Labels }) {
  const reduce = useReducedMotion();
  const cat = CATEGORY[project.category];
  const CatIcon = cat.icon;
  const hiddenCount = project.technologies.length - TECH_SHOWN;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: FLUID }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="n-border group relative flex flex-col overflow-hidden rounded-2xl border bg-n-bg transition-shadow duration-500 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40"
    >
      {project.cover ? (
        <div className="relative aspect-[1200/630] overflow-hidden bg-black">
          {project.cover.video ? (
            <AmbientVideo
              mp4={project.cover.video}
              poster={project.cover.image}
              label={project.cover.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <img
              src={`${import.meta.env.BASE_URL}${project.cover.image}`}
              alt={project.cover.alt}
              loading="lazy"
              decoding="async"
              width={1200}
              height={630}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            />
          )}
        </div>
      ) : (
        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient ?? 'from-neutral-400 to-neutral-500'}`} aria-hidden="true" />
      )}

      <div className="flex flex-1 flex-col p-5">
        {/* Properties row: category and status */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className={`n-tag n-tag-${cat.tone} gap-1.5`}>
            <CatIcon className="h-3 w-3" aria-hidden="true" />
            {lang === 'en' ? cat.en : cat.es}
          </span>
          {project.links?.live && (
            <span className="n-tag n-tag-green gap-1.5">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {t.live}
            </span>
          )}
        </div>

        <h3 className="n-text mb-2 text-base font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-n-accent">
          {project.title}
        </h3>
        <p className="n-muted mb-4 flex-1 text-sm leading-relaxed">{project.description}</p>

        {project.impact && (
          <div className="n-callout mb-4 flex items-start gap-2.5 rounded-md px-3 py-2.5">
            <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-n-accent" aria-hidden="true" />
            <p className="n-text text-xs font-medium leading-relaxed">{project.impact}</p>
          </div>
        )}

        <dl className="n-border mb-4 grid grid-cols-2 gap-x-4 gap-y-2 border-y py-3 text-xs sm:grid-cols-3">
          <div>
            <dt className="n-muted font-mono-geist text-[10px] uppercase tracking-wider">{t.role}</dt>
            <dd className="n-text mt-0.5 font-medium leading-snug">{project.role}</dd>
          </div>
          <div>
            <dt className="n-muted font-mono-geist text-[10px] uppercase tracking-wider">{t.duration}</dt>
            <dd className="n-text mt-0.5 font-medium">{project.duration}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="n-muted font-mono-geist text-[10px] uppercase tracking-wider">{t.team}</dt>
            <dd className="n-text mt-0.5 font-medium leading-snug">{project.teamSize}</dd>
          </div>
        </dl>

        <ul className="mb-4 flex flex-wrap gap-1.5" aria-label={lang === 'en' ? 'Stack' : 'Tecnologías'}>
          {project.technologies.slice(0, TECH_SHOWN).map(tech => (
            <li key={tech} className="n-tag n-tag-gray">{tech}</li>
          ))}
          {hiddenCount > 0 && (
            <li className="n-tag n-tag-gray n-muted" title={project.technologies.slice(TECH_SHOWN).join(', ')}>
              +{hiddenCount}
            </li>
          )}
        </ul>

        <div className="mt-auto flex gap-2">
          {project.caseStudyPath && (
            <Link
              to={project.caseStudyPath}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-n-text px-3 py-2 text-xs font-semibold text-n-bg transition-opacity duration-300 hover:opacity-85 active:scale-[0.98]"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              {t.caseStudy}
            </Link>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="n-border n-text n-hover inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors duration-300 active:scale-[0.98]"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
          )}
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.open} ${project.title}`}
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors duration-300 active:scale-[0.98] ${
                project.caseStudyPath
                  ? 'n-border n-text n-hover border'
                  : 'bg-n-text text-n-bg hover:opacity-85'
              }`}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              {t.viewLive}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const projects = (lang === 'en' ? profileEN : profileES).projects;
  const [active, setActive] = useState<'all' | ProjectCategory>('all');

  const t = lang === 'en'
    ? {
        eyebrow: 'Projects · 2026',
        title: 'Projects',
        subtitle: 'Live deployments, production data work and academic builds, all with working code. Filter by category or open a case study.',
        viewLive: 'Live demo',
        featured: 'Featured',
        others: 'More projects',
        role: 'Role',
        duration: 'Duration',
        team: 'Team',
        live: 'Live',
        caseStudy: 'Case study',
        open: 'Open',
        all: 'All',
        count: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}`,
        liveCount: (n: number) => `${n} live`,
        aiCount: (n: number) => `${n} with AI in production`,
        filterBy: 'Filter by',
        empty: 'No projects in this category yet.',
        ctaTitle: 'Have a project in mind?',
        ctaBody: 'Open to data engineering roles, AI implementation work and full-stack builds, remote or in Guatemala.',
        ctaButton: "Let's talk",
      }
    : {
        eyebrow: 'Proyectos · 2026',
        title: 'Proyectos',
        subtitle: 'Despliegues en vivo, trabajo de datos en producción y proyectos académicos, todos con código funcional. Filtra por categoría o abre un caso de estudio.',
        viewLive: 'Demo en vivo',
        featured: 'Destacados',
        others: 'Más proyectos',
        role: 'Rol',
        duration: 'Duración',
        team: 'Equipo',
        live: 'En vivo',
        caseStudy: 'Caso de estudio',
        open: 'Abrir',
        all: 'Todos',
        count: (n: number) => `${n} ${n === 1 ? 'proyecto' : 'proyectos'}`,
        liveCount: (n: number) => `${n} en vivo`,
        aiCount: (n: number) => `${n} con IA en producción`,
        filterBy: 'Filtrar por',
        empty: 'Aún no hay proyectos en esta categoría.',
        ctaTitle: '¿Tienes un proyecto en mente?',
        ctaBody: 'Disponible para roles de ingeniería de datos, implementación de IA y desarrollo full-stack, remoto o en Guatemala.',
        ctaButton: 'Hablemos',
      };

  useSEO({
    title: t.title,
    description: t.subtitle,
    lang,
    keywords: ['projects', 'portfolio', 'data engineering', 'AI implementation', 'n8n', 'Snowflake', 'React', 'TypeScript', 'Cloudflare', 'Guatemala'],
  });

  const stats = useMemo(() => {
    const live = projects.filter(p => p.links?.live).length;
    const ai = projects.filter(p => /\b(AI|IA|RAG|LLM|Llama)\b/.test(`${p.title} ${p.technologies.join(' ')}`)).length;
    return { total: projects.length, live, ai };
  }, [projects]);

  const filters: { id: 'all' | ProjectCategory; label: string; count: number }[] = [
    { id: 'all', label: t.all, count: projects.length },
    ...FILTER_ORDER.map(id => ({
      id,
      label: lang === 'en' ? CATEGORY[id].en : CATEGORY[id].es,
      count: projects.filter(p => p.category === id).length,
    })).filter(f => f.count > 0),
  ];

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active);
  const featured = active === 'all' ? filtered.filter(p => p.featured) : filtered;
  const others = active === 'all' ? filtered.filter(p => !p.featured) : [];
  const labels: Labels = { role: t.role, duration: t.duration, team: t.team, caseStudy: t.caseStudy, viewLive: t.viewLive, live: t.live, open: t.open };

  return (
    <PageTransition>
      <div className="min-h-screen bg-n-bg text-neutral-900 dark:text-neutral-50">
        <Container>
          <div className="py-10">
            {/* ── Page header ─────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: FLUID }}
            >
              <p className="font-mono-geist n-muted text-xs uppercase tracking-wider">{t.eyebrow}</p>
              <h1 className="n-text mt-2 text-4xl font-bold tracking-tight">{t.title}</h1>
              <p className="n-muted mt-2 max-w-2xl text-base">{t.subtitle}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={lang === 'en' ? 'Summary' : 'Resumen'}>
                <li className="n-tag n-tag-gray font-mono-geist">{t.count(stats.total)}</li>
                <li className="n-tag n-tag-green font-mono-geist">{t.liveCount(stats.live)}</li>
                <li className="n-tag n-tag-pink font-mono-geist">{t.aiCount(stats.ai)}</li>
              </ul>
            </motion.div>

            {/* ── Category filter (database view tabs) ─────────────── */}
            <div className="n-border mt-8 flex flex-wrap items-center gap-2 border-b pb-4" role="tablist" aria-label={t.filterBy}>
              <span className="n-muted mr-1 text-xs">{t.filterBy}</span>
              {filters.map(f => {
                const isActive = active === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(f.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-300 active:scale-[0.98] ${
                      isActive
                        ? 'border-n-text bg-n-text text-n-bg'
                        : 'n-border n-text n-hover'
                    }`}
                  >
                    {f.id === 'all' && <Layers className="h-3 w-3" aria-hidden="true" />}
                    {f.label}
                    <span className={`font-mono-geist tabular-nums ${isActive ? 'opacity-70' : 'n-muted'}`}>{f.count}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: FLUID }}
                className="mt-8"
              >
                {featured.length > 0 && (
                  <section className="mb-12" aria-labelledby="projects-featured">
                    <div className="mb-5 flex items-baseline justify-between">
                      <h2 id="projects-featured" className="n-text text-2xl font-semibold tracking-tight">
                        {active === 'all' ? t.featured : filters.find(f => f.id === active)?.label}
                      </h2>
                      <span className="n-muted font-mono-geist text-xs">{t.count(featured.length)}</span>
                    </div>
                    <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {featured.map(project => (
                        <ProjectCard key={project.id} project={project} lang={lang} t={labels} />
                      ))}
                    </div>
                  </section>
                )}

                {others.length > 0 && (
                  <section className="mb-12" aria-labelledby="projects-others">
                    <div className="mb-5 flex items-baseline justify-between">
                      <h2 id="projects-others" className="n-text text-2xl font-semibold tracking-tight">{t.others}</h2>
                      <span className="n-muted font-mono-geist text-xs">{t.count(others.length)}</span>
                    </div>
                    <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
                      {others.map(project => (
                        <ProjectCard key={project.id} project={project} lang={lang} t={labels} />
                      ))}
                    </div>
                  </section>
                )}

                {featured.length === 0 && others.length === 0 && (
                  <p className="n-muted py-12 text-center text-sm">{t.empty}</p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* ── CTA (callout block) ─────────────────────────────── */}
            <div className="n-callout flex flex-col items-start gap-4 rounded-2xl px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <h3 className="n-text text-lg font-semibold tracking-tight">{t.ctaTitle}</h3>
                <p className="n-muted mt-1 max-w-xl text-sm">{t.ctaBody}</p>
              </div>
              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-n-text px-5 py-2.5 text-sm font-semibold text-n-bg transition-opacity duration-300 hover:opacity-85 active:scale-[0.98]"
              >
                {t.ctaButton}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
