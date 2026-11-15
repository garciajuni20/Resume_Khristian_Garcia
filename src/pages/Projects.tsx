import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import PageTransition from '../components/PageTransition';
import InkArt from '../components/ink/InkArt';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import { INK_TEXT, PROJECT_INK } from '../data/ink';
import type { ProjectCategory, ProjectItem } from '../types';
import { FLUID } from '../utils/animations';

/**
 * Projects as a register, the same grammar as the experience ledger on /resume:
 * the year in Bodoni and the engraving of the industry on the left, the work on
 * the right. Everything comes from `profile-*.ts`; this file only knows how to
 * show a project, never what the projects are.
 */

const CATEGORY: Record<ProjectCategory, { en: string; es: string }> = {
  data: { en: 'Data platforms', es: 'Plataformas de datos' },
  architecture: { en: 'AI and architecture', es: 'IA y arquitectura' },
  web: { en: 'Web apps', es: 'Apps web' },
  cloud: { en: 'Cloud', es: 'Cloud' },
  academic: { en: 'Academic', es: 'Académico' },
};

const FILTER_ORDER: ProjectCategory[] = ['data', 'architecture', 'web', 'cloud', 'academic'];

const LINK = 'n-text underline decoration-n-border underline-offset-4 transition-colors duration-300 hover:decoration-current n-focus';

type Labels = { caseStudy: string; live: string; stack: string };

function ProjectRow({ project, lang, t }: { project: ProjectItem; lang: 'en' | 'es'; t: Labels }) {
  const reduce = useReducedMotion();
  const ink = PROJECT_INK[project.id];
  const inkClass = ink ? INK_TEXT[ink.tone] : 'n-text';

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: FLUID }}
      className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-4 border-t border-n-border py-7 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-6"
    >
      <div>
        {project.year && <p className={`font-display text-3xl leading-none sm:text-4xl ${inkClass}`}>{project.year}</p>}
        {ink && <InkArt name={ink.art} className={`mt-3 h-11 w-11 sm:h-14 sm:w-14 ${inkClass}`} />}
      </div>

      <div className="min-w-0">
        <h3 className="n-text text-lg font-semibold leading-snug">{project.title}</h3>
        <p className="n-muted mt-1 text-xs">
          {lang === 'en' ? CATEGORY[project.category].en : CATEGORY[project.category].es}. {project.role}. {project.duration}. {project.teamSize}
          {project.links?.live && <span className="text-n-highlight">. {t.live}</span>}
        </p>
        <p className="n-muted mt-3 max-w-prose text-sm leading-relaxed">{project.description}</p>
        {project.impact && (
          <p className="mt-3 grid max-w-prose grid-cols-[1rem_minmax(0,1fr)] text-sm leading-relaxed">
            <span className={inkClass} aria-hidden="true">–</span>
            <span className="n-text">{project.impact}</span>
          </p>
        )}
        <p className="n-muted mt-3 text-xs leading-relaxed">
          <span className="sr-only">{t.stack}: </span>
          {project.technologies.join(', ')}
        </p>
        {(project.caseStudyPath || project.links?.github || project.links?.live) && (
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {project.caseStudyPath && (
              <Link to={project.caseStudyPath} className={`${LINK} group inline-flex items-center gap-1.5 font-medium`}>
                {t.caseStudy}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            )}
            {project.links?.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={LINK}>
                {lang === 'en' ? 'Live site' : 'Sitio en vivo'}
                <span className="sr-only">: {project.title}</span>
              </a>
            )}
            {project.links?.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={LINK}>
                GitHub
                <span className="sr-only">: {project.title}</span>
              </a>
            )}
          </p>
        )}
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
        title: 'Projects',
        subtitle: 'Production data work, systems in use and academic builds. The first two have full case studies.',
        featured: 'Main work',
        others: 'Academic and side builds',
        caseStudy: 'Case study',
        live: 'Live',
        stack: 'Stack',
        all: 'All',
        summary: (n: number, live: number) => `${n} projects, ${live} live`,
        filterBy: 'Filter by',
        empty: 'No projects in this category yet.',
        ctaTitle: 'Open to remote Data Engineer roles',
        ctaButton: 'Contact me',
      }
    : {
        title: 'Proyectos',
        subtitle: 'Trabajo de datos en producción, sistemas en uso y proyectos académicos. Los dos primeros tienen caso de estudio completo.',
        featured: 'Trabajo principal',
        others: 'Proyectos académicos y personales',
        caseStudy: 'Caso de estudio',
        live: 'En vivo',
        stack: 'Tecnologías',
        all: 'Todos',
        summary: (n: number, live: number) => `${n} proyectos, ${live} en vivo`,
        filterBy: 'Filtrar por',
        empty: 'Aún no hay proyectos en esta categoría.',
        ctaTitle: 'Abierto a roles remotos de Ingeniero de Datos',
        ctaButton: 'Contactarme',
      };

  useSEO({
    title: t.title,
    description: t.subtitle,
    lang,
    keywords: ['projects', 'data engineering', 'Snowflake', 'dbt', 'Azure Data Factory', 'RAG', 'React', 'TypeScript', 'Guatemala'],
  });

  const live = useMemo(() => projects.filter(p => p.links?.live).length, [projects]);

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
  const labels: Labels = { caseStudy: t.caseStudy, live: t.live, stack: t.stack };

  return (
    <PageTransition>
      <div className="min-h-screen bg-n-bg text-n-text">
        <Container>
          <div className="py-10">
            <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: FLUID }}>
              <h1 className="font-display text-5xl sm:text-6xl">{t.title}</h1>
              <p className="n-muted mt-3 max-w-2xl text-base">{t.subtitle}</p>
              <p className="n-muted mt-2 text-sm">{t.summary(projects.length, live)}</p>
            </motion.header>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-n-border pb-3 text-sm" role="group" aria-label={t.filterBy}>
              {filters.map(f => {
                const isActive = active === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(f.id)}
                    className={`underline-offset-[6px] transition-colors duration-300 n-focus ${isActive ? 'n-text underline decoration-current' : 'n-muted hover:text-n-text'}`}
                  >
                    {f.label} <span className="tabular-nums opacity-70">{f.count}</span>
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
                className="mt-10"
              >
                {featured.length > 0 && (
                  <section className="mb-14" aria-labelledby="projects-featured">
                    <h2 id="projects-featured" className="font-display text-3xl">
                      {active === 'all' ? t.featured : filters.find(f => f.id === active)?.label}
                    </h2>
                    <div className="mt-4">
                      {featured.map(project => (
                        <ProjectRow key={project.id} project={project} lang={lang} t={labels} />
                      ))}
                    </div>
                  </section>
                )}

                {others.length > 0 && (
                  <section className="mb-14" aria-labelledby="projects-others">
                    <h2 id="projects-others" className="font-display text-3xl">{t.others}</h2>
                    <div className="mt-4">
                      {others.map(project => (
                        <ProjectRow key={project.id} project={project} lang={lang} t={labels} />
                      ))}
                    </div>
                  </section>
                )}

                {featured.length === 0 && others.length === 0 && <p className="n-muted py-12 text-center text-sm">{t.empty}</p>}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col items-start gap-4 border-t border-n-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-3xl">{t.ctaTitle}</h2>
              <Link to="/contact" className="n-btn-primary shrink-0 px-4 py-2.5 text-sm n-focus">
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
