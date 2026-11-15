import { useEffect, useMemo, useRef, useState } from 'react';
import { X, FileJson, Calendar, Code, Database, Cloud, BarChart3, CheckCircle2, Linkedin, Mail, MapPin, Languages, Building2, AtSign, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Container from '../components/Container';
import Section from '../components/Section';
import FilterChips from '../components/FilterChips';
import SkillMeter from '../components/SkillMeter';
import ExperienceCard from '../components/ExperienceCard';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { useAnalytics } from '../hooks/useAnalytics';
import { getDuration } from '../utils/dateFormatter';
import type { ProfileData } from '../types';
import SkillsDashboard from '../components/SkillsDashboard';
import PDFDownloadButtons from '../components/PDFDownloadButtons';
import PageTransition from '../components/PageTransition';
import { staggerContainer, cardReveal, FLUID } from '../utils/animations';
import { CareerVideoBlock } from '../components/CareerVideo';
import { PHOTO } from '../data/media';
import NowStrip from '../components/NowStrip';
import CareerTimeline from '../components/CareerTimeline';
import PageOutline from '../components/PageOutline';
import { industryTone } from '../utils/tone';
import { Toggle } from '../components/notion/primitives';
import ApproachFlow from '../components/ApproachFlow';
import HowIWork from '../components/HowIWork';

/** First two sentences of a paragraph: the lead a recruiter reads before deciding to expand */
function lead(text: string): string {
  // Sentence ends: a period followed by a capital, but not inside "EE. UU." or similar abbreviations
  return text.split(/(?<=\.)(?<!\b[A-Z]{1,2}\.)\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/).slice(0, 2).join(' ');
}

const LINK = 'n-text inline-flex items-center gap-1 underline decoration-n-border underline-offset-4 transition-colors duration-300 hover:decoration-current';

export default function ResumePage() {
  const { lang } = useLang();
  const { trackEvent } = useAnalytics();
  const data: ProfileData = lang === 'en' ? profileEN : profileES;

  const labels = lang === 'en'
    ? {
        eyebrow: 'Resume · 2026',
        pageTitle: 'Interactive resume',
        subtitle: 'Data, full-stack and AI across five industries. Filter my experience, watch the film, or take the PDF.',
        available: 'Open to Data & AI roles · remote',
        location: 'Location',
        remote: 'remote',
        industries: 'Industries',
        filterBy: 'Filter by',
        clear: 'Clear',
        skills: 'Self-assessed levels by tool',
        education: 'Education',
        downloadJson: 'Export JSON',
        close: 'Close',
        tools: 'Tools & Technologies',
        languages: 'Languages',
        skillsDashboard: 'Skills Dashboard',
        skillsIntro: 'Grouped by what I do with them: data engineering, cloud, BI, AI, delivery and full-stack.',
        skillsSelfNote: 'Self-assessed, with years of hands-on use. The dashboard above is the better summary; this is the detail.',
        experienceIntro: 'Roles overlap on purpose: a promotion, a part-time AI engagement and a product I own run in parallel.',
        fullProfile: 'Read the full profile',
        downloadCV: 'Download CV',
        contact: 'Contact',
      }
    : {
        eyebrow: 'CV · 2026',
        pageTitle: 'CV interactivo',
        subtitle: 'Datos, full-stack e IA en cinco industrias. Filtra mi experiencia, mira el video o llévate el PDF.',
        available: 'Abierto a roles de Datos e IA · remoto',
        location: 'Ubicación',
        remote: 'remoto',
        industries: 'Industrias',
        filterBy: 'Filtrar por',
        clear: 'Limpiar',
        skills: 'Niveles autoevaluados por herramienta',
        education: 'Educación',
        downloadJson: 'Exportar JSON',
        close: 'Cerrar',
        tools: 'Herramientas & Tecnologías',
        languages: 'Idiomas',
        skillsDashboard: 'Panel de Habilidades',
        skillsIntro: 'Agrupadas por lo que hago con ellas: ingeniería de datos, cloud, BI, IA, entrega y full-stack.',
        skillsSelfNote: 'Autoevaluación con años de uso real. El panel de arriba es el mejor resumen; esto es el detalle.',
        experienceIntro: 'Los roles se traslapan a propósito: un ascenso, un contrato de IA a medio tiempo y un producto propio corren en paralelo.',
        fullProfile: 'Leer el perfil completo',
        downloadCV: 'Descargar CV',
        contact: 'Contacto',
      };

  useSEO({
    title: labels.pageTitle,
    description: `${data.name} — ${data.headline}`,
    lang,
    keywords: [...data.badges, ...(data.seo?.keywords ?? []), 'CV', 'Resume', 'Portfolio'],
  });

  // Tags ordered by how many roles carry them, so the first row is the useful one
  const allTags = useMemo(() => {
    const count = new Map<string, number>();
    data.experience.forEach(e => (e.tags ?? []).forEach(t => count.set(t, (count.get(t) ?? 0) + 1)));
    return Array.from(count.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [data.experience]);

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selected, setSelected] = useState<(typeof data.experience)[0] | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  function toggleTag(tag: string) {
    setActiveTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
    trackEvent('filter_tag', { tag });
  }

  function clearTags() {
    setActiveTags([]);
    trackEvent('filter_clear');
  }

  const filteredExperience = useMemo(() => {
    if (activeTags.length === 0) return data.experience;
    return data.experience.filter(e => (e.tags ?? []).some(t => activeTags.includes(t)));
  }, [data.experience, activeTags]);

  const exportToJson = () => {
    setIsExporting(true);
    const { phone: _phone, ...publicData } = data; // phone is shared by PDF or in person, not on the web
    void _phone;
    const blob = new Blob([JSON.stringify({ ...publicData, exportDate: new Date().toISOString() }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `khristian-garcia-${lang}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    trackEvent('export_data', { format: 'json', language: lang });
    setTimeout(() => setIsExporting(false), 1200);
  };

  const languages = data.languages;
  // Distinct industries in chronological order of the roles
  const industries = Array.from(
    new Set(
      [...data.experience]
        .sort((a, b) => a.start.localeCompare(b.start))
        .map(e => e.industry)
        .filter((x): x is string => Boolean(x))
    )
  );
  const tools = data.tools;

  // Modal a11y: close on Escape, move focus into the dialog, restore it on close
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!selected) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [selected]);

  const toolCategories = [
    { key: 'dataEngineering', icon: <Database className="h-4 w-4 n-muted" />, label: lang === 'en' ? 'Data Engineering' : 'Ingeniería de Datos', items: tools.dataEngineering, chip: 'n-tag n-tag-blue' },
    { key: 'biAnalytics', icon: <BarChart3 className="h-4 w-4 n-muted" />, label: 'BI & Analytics', items: tools.biAnalytics, chip: 'n-tag n-tag-green' },
    { key: 'cloudDevOps', icon: <Cloud className="h-4 w-4 n-muted" />, label: 'Cloud & DevOps', items: tools.cloudDevOps, chip: 'n-tag n-tag-purple' },
    { key: 'fullStack', icon: <Code className="h-4 w-4 n-muted" />, label: lang === 'en' ? 'Full-Stack Dev' : 'Desarrollo Full-Stack', items: tools.fullStack, chip: 'n-tag n-tag-orange' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-n-bg text-n-text">
        <PageOutline lang={lang} />
        <Container>
          {/* ── Page header ─────────────────────────────────────── */}
          <div className="flex flex-col gap-4 pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono-geist text-xs uppercase tracking-wider text-n-accent-2">{labels.eyebrow}</p>
              <h1 className="n-text mt-2 text-4xl font-bold tracking-tight">{labels.pageTitle}</h1>
              <p className="n-muted mt-2 max-w-xl text-base">{labels.subtitle}</p>
            </div>
            <button
              onClick={exportToJson}
              disabled={isExporting}
              className="n-border n-text n-hover inline-flex items-center gap-2 self-start rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-300 active:scale-[0.98] disabled:opacity-50 sm:self-auto"
            >
              <FileJson className="h-4 w-4" aria-hidden="true" />
              {labels.downloadJson}
            </button>
          </div>

          {/* ── Profile: portrait + Notion-style properties ─────── */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: FLUID }}
            className="n-border mt-8 grid gap-8 rounded-3xl border bg-n-bg p-6 sm:p-8 md:grid-cols-[240px_minmax(0,1fr)]"
          >
            <div>
              <div className="relative mx-auto w-48 md:w-full">
                <motion.img
                  src={`${import.meta.env.BASE_URL}${PHOTO.portraitWebp}`}
                  alt={data.name}
                  width={800}
                  height={1200}
                  whileHover={{ rotate: -1.5, y: -4 }}
                  transition={{ duration: 0.6, ease: FLUID }}
                  className="aspect-[2/3] w-full rounded-2xl object-cover shadow-2xl shadow-black/15"
                />
                <span className="n-tag n-tag-green absolute -bottom-3 left-1/2 -translate-x-1/2 gap-1.5 whitespace-nowrap px-2 py-0.5 shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {labels.available}
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="n-text text-3xl font-bold tracking-tight">{data.name}</h2>
              <p className="mt-1 text-lg font-medium text-n-accent">{data.headline}</p>

              <dl className="n-border mt-5 space-y-2 border-y py-4 text-sm">
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <dt className="n-muted flex w-32 shrink-0 items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" />{labels.location}</dt>
                  <dd className="n-text">{data.location} · {labels.remote}</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <dt className="n-muted flex w-32 shrink-0 items-center gap-2"><Languages className="h-4 w-4" aria-hidden="true" />{labels.languages}</dt>
                  <dd className="n-text">{languages.map(l => `${l.language} (${l.level})`).join(' · ')}</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <dt className="n-muted flex w-32 shrink-0 items-center gap-2"><Building2 className="h-4 w-4" aria-hidden="true" />{labels.industries}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {industries.map((ind, i) => (
                      <span key={ind} className={`n-tag n-tag-${industryTone(i)}`}>{ind}</span>
                    ))}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <dt className="n-muted flex w-32 shrink-0 items-center gap-2"><AtSign className="h-4 w-4" aria-hidden="true" />{labels.contact}</dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1">
                    <a href={`mailto:${data.email}`} className={LINK}>
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />{data.email}
                    </a>
                    {data.links.map(link => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                        {link.label === 'LinkedIn' ? <Linkedin className="h-3.5 w-3.5" aria-hidden="true" /> : <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
                        {link.label}
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>

              <NowStrip lang={lang} className="mt-5" />

              {/* Lead first; the full profile is one toggle away instead of a wall of text */}
              <p className="n-text mt-5 text-base leading-relaxed">{lead(data.summaryShort ?? data.summary)}</p>
              <div className="mt-2 -ml-2">
                <Toggle title={labels.fullProfile}>
                  <p className="text-base leading-relaxed">{data.summary}</p>
                </Toggle>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {data.badges.map(badge => (
                  <span key={badge} className="n-tag n-tag-gray">{badge}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── How I work ──────────────────────────────────────── */}
          {data.workflow && <HowIWork workflow={data.workflow} />}

          {/* ── Career film ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: FLUID }}
            className="mt-10"
          >
            <CareerVideoBlock />
          </motion.div>

          {/* ── PDF Downloads ──────────────────────────────────── */}
          <div className="mt-12">
            <PDFDownloadButtons />
          </div>

          {/* ── Experience ────────────────────────────────────── */}
          <Section
            title={lang === 'en' ? 'Experience' : 'Experiencia'}
            intro={labels.experienceIntro}
            aside={`${data.experience.length} ${lang === 'en' ? 'roles' : 'roles'} · ${industries.length} ${lang === 'en' ? 'industries' : 'industrias'}`}
          >
            <div className="mb-6">
              <CareerTimeline experience={data.experience} industries={industries} lang={lang} onOpen={setSelected} />
            </div>
            <FilterChips
              allTags={allTags}
              activeTags={activeTags}
              onToggle={toggleTag}
              onClear={clearTags}
              labels={{
                filterBy: labels.filterBy,
                clear: labels.clear,
                more: n => (lang === 'en' ? `+${n} more` : `+${n} más`),
                less: lang === 'en' ? 'Show less' : 'Ver menos',
              }}
            />
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="mt-6 grid gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredExperience.map(exp => (
                  <motion.div
                    key={exp.id}
                    variants={cardReveal}
                    layout
                    exit={{ opacity: 0, scale: 0.96 }}
                  >
                    <ExperienceCard item={exp} onOpen={setSelected} lang={lang} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </Section>


          {/* ── Skills Dashboard (the overview); per-tool self-assessment folded below it ── */}
          <Section title={labels.skillsDashboard} intro={labels.skillsIntro}>
            <SkillsDashboard />
            <div className="mt-6">
              <Toggle title={labels.skills}>
                <p className="mb-4 text-sm">{labels.skillsSelfNote}</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {data.skills.map(skill => (
                    <SkillMeter key={skill.name} name={skill.name} level={skill.level} years={skill.years} />
                  ))}
                </div>
              </Toggle>
            </div>
          </Section>

          {/* ── Tools & Technologies ──────────────────────────── */}
          <Section title={labels.tools}>
            <div className="n-border rounded-2xl border bg-n-bg p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {toolCategories.map(cat => (
                  <div key={cat.key}>
                    <div className="mb-3 flex items-center gap-2">
                      {cat.icon}
                      <h3 className="font-semibold text-sm n-text">{cat.label}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map(tool => (
                        <span key={tool} className={cat.chip}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {tools.methodologies && (
                <div className="mt-5 pt-5 border-t border-n-border">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-xs font-medium n-muted mr-1">
                      {lang === 'en' ? 'Methodologies:' : 'Metodologías:'}
                    </span>
                    {tools.methodologies.map(m => (
                      <span key={m} className="n-tag n-tag-gray">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* ── Education ─────────────────────────────────────── */}
          <Section title={labels.education}>
            <div className="n-border rounded-2xl border bg-n-bg p-6">
              {data.education.map((edu, index) => (
                <div key={index} className={index > 0 ? 'mt-6 pt-6 border-t border-n-border' : ''}>
                  <div className="font-bold text-lg n-text">{edu.institution}</div>
                  <div className="mt-1 n-text font-medium">
                    {edu.degree} — {edu.area}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm n-muted">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {edu.status
                        ? edu.status
                        : `${lang === 'en' ? 'Expected:' : 'Fin estimado:'} ${edu.end === 'present' ? (lang === 'en' ? 'In Progress' : 'En Curso') : edu.end}`}
                    </span>
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm n-muted">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* ── Languages ─────────────────────────────────────── */}
          <Section title={labels.languages}>
            <div className="grid gap-4 sm:grid-cols-3">
              {languages.map((language, index) => (
                <motion.div
                  key={language.language}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="n-border rounded-2xl border bg-n-bg p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold n-text">{language.language}</div>
                    <div className="n-tag n-tag-blue">
                      {language.level}
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-n-callout">
                    <motion.div
                      className="h-2 rounded-full bg-n-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${language.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 + 0.2 }}
                    />
                  </div>
                  <div className="n-muted mt-2 text-right font-mono-geist text-xs">
                    {language.proficiency}%
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ── Experience Detail Modal ───────────────────────── */}
          <AnimatePresence>
            {selected && (
              <motion.div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
              >
                <motion.div
                  ref={modalRef}
                  tabIndex={-1}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="experience-modal-title"
                  className="w-full max-w-2xl max-h-[82vh] overflow-y-auto n-border rounded-2xl border bg-n-bg shadow-2xl shadow-black/20 focus:outline-none"
                  initial={{ scale: 0.88, opacity: 0, y: 16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="sticky top-0 z-10 flex items-center justify-between n-border border-b bg-n-bg/95 p-5 backdrop-blur-sm">
                    <div className="flex-1 min-w-0">
                      <h3 id="experience-modal-title" className="text-lg font-bold n-text leading-snug">{selected.role}</h3>
                      <div className="mt-0.5 text-sm font-medium n-muted">
                        {selected.company} · {selected.location}
                      </div>
                      <div className="mt-1 text-xs n-muted">
                        {getDuration(selected.start, selected.end, lang)}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="ml-4 shrink-0 rounded-full p-2 n-hover transition-colors"
                      aria-label={labels.close}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="p-5">
                    {selected.approach && <ApproachFlow approach={selected.approach} lang={lang} className="mb-5" />}
                    {selected.tags && selected.tags.length > 0 && (
                      <div className="mb-5 flex flex-wrap gap-1.5">
                        {selected.tags.map(tag => (
                          <span key={tag} className="n-tag n-tag-gray">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {selected.bullets && selected.bullets.length > 0 && (
                      <ul className="space-y-3">
                        {selected.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-sm n-text leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-16" />
        </Container>
      </div>
    </PageTransition>
  );
}
