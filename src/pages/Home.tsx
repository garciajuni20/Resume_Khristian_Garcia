import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Briefcase, ExternalLink, GraduationCap, Languages, MapPin, TrendingUp } from 'lucide-react';
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
import Magnetic from '../components/Magnetic';
import TechMarquee from '../components/TechMarquee';
import SlashCommand from '../components/home/SlashCommand';
import IndustryRail from '../components/home/IndustryRail';
import FlowberSpotlight from '../components/home/FlowberSpotlight';
import Services from '../components/home/Services';
import { CountUp, Reveal } from '../components/notion/primitives';
import { WordReveal } from '../components/notion/visuals';
import { FLUID } from '../utils/animations';

/* ─── Hero backdrop: dot grid lit by a spotlight that follows the cursor ── */
function HeroGrid({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const mask = useMotionTemplate`radial-gradient(260px circle at ${sx}px ${sy}px, black, transparent 70%)`;

  return (
    <div
      ref={ref}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
      className="n-border relative overflow-hidden rounded-3xl border bg-[var(--n-bg)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{ backgroundImage: 'radial-gradient(circle, var(--n-border) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--n-accent) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function ProfilePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative shrink-0">
      <div className="relative overflow-hidden rounded-2xl p-[3px]">
        <motion.div
          className="absolute -inset-[60%]"
          style={{ background: 'conic-gradient(from 0deg, #2383e2, #9065b0, #dfab01, #0f7b6c, #2383e2)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative z-10 overflow-hidden rounded-[13px] bg-[var(--n-bg)]">
          <img src={src} alt={alt} className="block h-32 w-32 object-cover object-top sm:h-40 sm:w-40" loading="eager" width={160} height={160} />
        </div>
      </div>
      <span className="absolute -bottom-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-emerald-500 ring-2 ring-[var(--n-bg)]">
        <span className="h-2 w-2 rounded-full bg-white" />
      </span>
    </div>
  );
}

/* ─── Name that assembles letter by letter ──────────────────────────── */
function SplitName({ text }: { text: string }) {
  let index = 0;
  return (
    <span aria-label={text} className="inline-block">
      {text.split(' ').map((word, w) => (
        // Letters of a word stay together so the name never breaks mid-word
        <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
          {word.split('').map(ch => {
            const i = index++;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: '0.5em', filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.03, ease: FLUID }}
                className="inline-block bg-gradient-to-r from-black to-[#666666] bg-clip-text text-transparent dark:from-white dark:to-[#9b9b9b]"
              >
                {ch}
              </motion.span>
            );
          })}
          {w < text.split(' ').length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const { lang } = useLang();

  const t = lang === 'en'
    ? {
        badge: 'Open to full-time roles and freelance projects',
        name: 'Khristian Garcia',
        roles: ['Data Engineer', 'Full-Stack Developer', 'AI & RAG Engineer', 'Solutions Architect', 'Analytics Engineer'],
        summary:
          'I turn messy operations into systems people can use and data they can trust. 7+ years across US financial services (debt consolidation and remittances), service retail, and education: from Snowflake platforms for a US fintech to Flowber, a barbershop I took from idea to production with AI and a data warehouse.',
        location: 'Guatemala City · Remote',
        education: 'Systems Engineering, USAC',
        bilingual: 'English and Spanish',
        ctaPrimary: 'View interactive resume',
        ctaSecondary: 'Hire me for a project',
        slashTitle: 'Explore my profiles',
        slashSub: 'A Notion-style command menu. Pick a block or let it play.',
        liveProjects: 'Live projects',
        viewAll: 'View all projects',
        caseStudy: 'Case study',
        liveDemo: 'Live demo',
        stats: [
          { v: 7, s: '+', label: 'years in tech', sub: 'since 2019' },
          { v: 99.5, d: 1, s: '%', label: 'data accuracy', sub: 'Snowflake at Alleviate' },
          { v: 160, s: '+', label: 'appointments', sub: 'Flowber in production' },
        ],
        tagline: 'I learn the business first, then build the system: clean data, honest AI, and software the team actually uses.',
      }
    : {
        badge: 'Disponible para empleo y proyectos por servicios',
        name: 'Khristian Garcia',
        roles: ['Ingeniero de Datos', 'Desarrollador Full-Stack', 'Ingeniero de IA y RAG', 'Arquitecto de Soluciones', 'Analytics Engineer'],
        summary:
          'Convierto operaciones desordenadas en sistemas que la gente usa y datos en los que se puede confiar. Más de 7 años entre servicios financieros de EE. UU. (consolidación de deudas y remesas), retail de servicios y educación: desde plataformas en Snowflake para una fintech estadounidense hasta Flowber, una barbería que llevé de la idea a producción con IA y un data warehouse.',
        location: 'Ciudad de Guatemala · Remoto',
        education: 'Ingeniería en Sistemas, USAC',
        bilingual: 'Inglés y español',
        ctaPrimary: 'Ver CV interactivo',
        ctaSecondary: 'Contratar por proyecto',
        slashTitle: 'Explora mis perfiles',
        slashSub: 'Un menú de comandos al estilo Notion. Elige un bloque o déjalo correr.',
        liveProjects: 'Proyectos en vivo',
        viewAll: 'Ver todos los proyectos',
        caseStudy: 'Caso de estudio',
        liveDemo: 'Demo en vivo',
        stats: [
          { v: 7, s: '+', label: 'años en tecnología', sub: 'desde 2019' },
          { v: 99.5, d: 1, s: '%', label: 'precisión de datos', sub: 'Snowflake en Alleviate' },
          { v: 160, s: '+', label: 'citas', sub: 'Flowber en producción' },
        ],
        tagline: 'Primero entiendo el negocio, después construyo el sistema: datos limpios, IA honesta y software que el equipo de verdad usa.',
      };

  const profile = lang === 'en' ? profileEN : profileES;
  const homeProjects = profile.projects.filter(p => p.id === 'vale-combustible' || p.id === 'flowber-barberia');

  useSEO({
    title: `${t.name} — ${lang === 'en' ? 'Data Engineer · Full-Stack & AI · Solutions Architect' : 'Ingeniero de Datos · Full-Stack & IA · Arquitecto de Soluciones'}`,
    description: t.summary,
    lang,
    keywords: ['Data Engineer', 'Full Stack Developer', 'AI Engineer', 'RAG', 'Solutions Architect', 'Snowflake', 'dbt', 'React', 'Fintech', 'Guatemala', 'Freelance'],
  });

  const scrollToServices = () => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--n-bg)]">
        <Container>
          <div className="space-y-24 pb-24 pt-8">
            {/* ── Hero ─────────────────────────────────────────────── */}
            <HeroGrid>
              <div className="p-6 sm:p-10">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: FLUID }}
                      className="n-tag n-tag-green mb-5 gap-2 py-0.5 text-sm"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      {t.badge}
                    </motion.p>

                    <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                      <SplitName text={t.name} />
                    </h1>

                    <p className="n-text mt-3 min-h-[1.75rem] text-xl font-semibold">
                      <TypingAnimation words={t.roles} />
                    </p>

                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5, ease: FLUID }}
                      className="n-muted mt-4 max-w-[680px] text-base leading-relaxed"
                    >
                      {t.summary}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: FLUID }}
                      className="n-muted mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm"
                    >
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{t.location}</span>
                      <span className="flex items-center gap-1.5"><Languages className="h-3.5 w-3.5" aria-hidden="true" />{t.bilingual}</span>
                      <span className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />{t.education}</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7, ease: FLUID }}
                      className="mt-7 flex flex-wrap gap-3"
                    >
                      <Magnetic>
                        <Link
                          to="/resume"
                          className="group inline-flex items-center gap-2 rounded-lg bg-[var(--n-text)] px-4 py-2 text-base font-semibold text-[var(--n-bg)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                        >
                          {t.ctaPrimary}
                          <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </Magnetic>
                      <Magnetic>
                        <button
                          type="button"
                          onClick={scrollToServices}
                          className="n-border n-text n-hover inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-base font-semibold transition-colors duration-300 active:scale-[0.98]"
                        >
                          <Briefcase className="h-4 w-4" aria-hidden="true" />
                          {t.ctaSecondary}
                        </button>
                      </Magnetic>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: FLUID }}
                    className="shrink-0 self-start"
                  >
                    <ProfilePhoto src={profileEN.photoUrl} alt="Khristian Garcia" />
                  </motion.div>
                </div>

                <div className="n-border mt-10 grid grid-cols-3 gap-4 border-t pt-6">
                  {t.stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 + i * 0.08, ease: FLUID }}
                    >
                      <p className="n-text text-2xl font-semibold tracking-tight sm:text-3xl">
                        <CountUp value={s.v} decimals={s.d} suffix={s.s} />
                      </p>
                      <p className="n-text mt-0.5 text-sm font-semibold">{s.label}</p>
                      <p className="n-muted text-xs">{s.sub}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HeroGrid>

            {/* ── Slash command explorer ───────────────────────────── */}
            <Reveal>
              <h2 className="n-text text-3xl font-semibold tracking-tight">{t.slashTitle}</h2>
              <p className="n-muted mb-6 mt-2 text-base">{t.slashSub}</p>
              <SlashCommand />
            </Reveal>

            {/* ── Flowber spotlight ────────────────────────────────── */}
            <FlowberSpotlight />
          </div>
        </Container>

        {/* Pinned rail lives outside Container: overflow on an ancestor would break sticky */}
        <IndustryRail />

        <Container>
          <div className="space-y-24 pb-24 pt-24">
            {/* ── Tagline reveal ───────────────────────────────────── */}
            <section className="py-12 text-center" aria-label="Tagline">
              <WordReveal text={t.tagline} />
            </section>

            <Services />

            <Reveal>
              <TechMarquee />
            </Reveal>

            {/* ── Live projects ────────────────────────────────────── */}
            <Reveal>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="n-text text-2xl font-semibold tracking-tight">{t.liveProjects}</h2>
                <Link to="/projects" className="n-text group flex items-center gap-1 text-sm font-semibold">
                  {t.viewAll}
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {homeProjects.map((project, idx) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8, ease: FLUID }}
                    whileHover={{ y: -4 }}
                    className="n-border flex flex-col rounded-2xl border bg-[var(--n-bg)] p-5 transition-shadow duration-500 hover:shadow-xl hover:shadow-black/5"
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map(tag => (
                          <span key={tag} className="n-tag n-tag-gray">{tag}</span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Live
                      </span>
                    </div>
                    <h3 className="n-text font-semibold leading-snug">{project.title}</h3>
                    <p className="n-muted mt-1.5 line-clamp-4 text-sm leading-relaxed">{project.description}</p>
                    <p className="mt-3 inline-flex items-start gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      <TrendingUp className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                      {project.impact}
                    </p>
                    <div className="mt-auto flex gap-2 pt-4">
                      {project.caseStudyPath && (
                        <Link
                          to={project.caseStudyPath}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--n-text)] px-3 py-2 text-xs font-semibold text-[var(--n-bg)] transition-transform duration-300 active:scale-[0.98]"
                        >
                          {t.caseStudy}
                        </Link>
                      )}
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="n-border n-text n-hover inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors duration-300"
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          {t.liveDemo}
                        </a>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <StatsDashboard />
            </Reveal>

            <Reveal>
              <Testimonials />
            </Reveal>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
