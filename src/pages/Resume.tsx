import { useEffect, useMemo, useRef, useState } from 'react';
import { X, FileJson, Calendar, Code, Database, Cloud, BarChart3, CheckCircle2, Linkedin, Mail, Phone } from 'lucide-react';
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
import { ProfileData } from '../types';
import Certifications from '../components/Certifications';
import SkillsDashboard from '../components/SkillsDashboard';
import PDFDownloadButtons from '../components/PDFDownloadButtons';
import PageTransition from '../components/PageTransition';
import { staggerContainer, cardReveal } from '../utils/animations';

export default function ResumePage() {
  const { lang } = useLang();
  const { trackEvent } = useAnalytics();
  const data: ProfileData = lang === 'en' ? profileEN : profileES;

  const labels = lang === 'en'
    ? {
        pageTitle: 'Interactive Resume',
        subtitle: 'Product-style resume demonstrating full-stack mindset — UI + data + structure.',
        filterBy: 'Filter by',
        clear: 'Clear',
        skills: 'Skills Overview',
        education: 'Education',
        downloadJson: 'Export JSON',
        close: 'Close',
        certifications: 'Certifications & Achievements',
        tools: 'Tools & Technologies',
        languages: 'Languages',
        skillsDashboard: 'Skills Dashboard',
        downloadCV: 'Download CV',
        contact: 'Contact',
      }
    : {
        pageTitle: 'CV Interactivo',
        subtitle: 'CV estilo producto que demuestra mentalidad full-stack — UI + datos + estructura.',
        filterBy: 'Filtrar por',
        clear: 'Limpiar',
        skills: 'Resumen de Habilidades',
        education: 'Educación',
        downloadJson: 'Exportar JSON',
        close: 'Cerrar',
        certifications: 'Certificaciones & Logros',
        tools: 'Herramientas & Tecnologías',
        languages: 'Idiomas',
        skillsDashboard: 'Panel de Habilidades',
        downloadCV: 'Descargar CV',
        contact: 'Contacto',
      };

  useSEO({
    title: labels.pageTitle,
    description: `${data.name} — ${data.headline}`,
    lang,
    keywords: [...data.badges, 'CV', 'Resume', 'Portfolio', 'Data Analyst', 'Business Intelligence'],
  });

  const allTags = useMemo(() => {
    const set = new Set<string>();
    data.experience.forEach(e => (e.tags ?? []).forEach(t => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
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
    const blob = new Blob([JSON.stringify({ ...data, exportDate: new Date().toISOString() }, null, 2)], { type: 'application/json' });
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
    { key: 'dataEngineering', icon: <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />, label: lang === 'en' ? 'Data Engineering' : 'Ingeniería de Datos', items: tools.dataEngineering, chip: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
    { key: 'biAnalytics', icon: <BarChart3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />, label: 'BI & Analytics', items: tools.biAnalytics, chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
    { key: 'cloudDevOps', icon: <Cloud className="h-4 w-4 text-violet-600 dark:text-violet-400" />, label: 'Cloud & DevOps', items: tools.cloudDevOps, chip: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
    { key: 'fullStack', icon: <Code className="h-4 w-4 text-orange-600 dark:text-orange-400" />, label: lang === 'en' ? 'Full-Stack Dev' : 'Desarrollo Full-Stack', items: tools.fullStack, chip: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-50">
        <Container>
          {/* ── Page Header ─────────────────────────────────────── */}
          <div className="py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{labels.pageTitle}</h1>
              <p className="mt-2 text-neutral-500 dark:text-neutral-400 max-w-xl">{labels.subtitle}</p>
            </div>
            <button
              onClick={exportToJson}
              disabled={isExporting}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition-all"
            >
              <FileJson className="h-4 w-4" />
              {labels.downloadJson}
            </button>
          </div>

          {/* ── Profile Card ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-neutral-200 bg-white/90 backdrop-blur-sm p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900/90"
          >
            <div className="grid gap-6 sm:grid-cols-[1fr_200px] sm:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{data.name}</h2>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {data.badges.map(badge => (
                    <span
                      key={badge}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="text-base font-medium text-neutral-700 dark:text-neutral-200">{data.headline}</div>
                <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {data.location}
                </div>

                <p className="mt-5 text-neutral-700 dark:text-neutral-300 leading-relaxed">{data.summary}</p>

                {/* Quick contact */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={`mailto:${data.email}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                    {data.email}
                  </a>
                  <a href={`tel:${data.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                    {data.phone}
                  </a>
                  {data.links.map(link => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                      {link.label === 'LinkedIn' && <Linkedin className="h-3.5 w-3.5" />}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Photo */}
              <div className="sm:justify-self-end">
                <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-2 shadow-lg dark:border-blue-900 dark:from-blue-900/20 dark:to-neutral-900">
                  <div className="aspect-square w-full overflow-hidden rounded-xl">
                    <img
                      src={data.photoUrl}
                      alt={data.name}
                      className="h-full w-full object-cover object-top transition-transform hover:scale-105 duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── PDF Downloads ──────────────────────────────────── */}
          <div className="mt-6">
            <PDFDownloadButtons />
          </div>

          {/* ── Experience ────────────────────────────────────── */}
          <Section title={lang === 'en' ? 'Experience' : 'Experiencia'}>
            <FilterChips
              allTags={allTags}
              activeTags={activeTags}
              onToggle={toggleTag}
              onClear={clearTags}
              labels={{ filterBy: labels.filterBy, clear: labels.clear }}
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

          {/* ── Certifications ────────────────────────────────── */}
          {data.certifications && data.certifications.length > 0 && (
            <Section title={labels.certifications}>
              <Certifications />
            </Section>
          )}

          {/* ── Skills Overview ───────────────────────────────── */}
          <Section title={labels.skills}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <SkillMeter name={skill.name} level={skill.level} />
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ── Skills Dashboard ──────────────────────────────── */}
          <Section title={labels.skillsDashboard}>
            <SkillsDashboard />
          </Section>

          {/* ── Tools & Technologies ──────────────────────────── */}
          <Section title={labels.tools}>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {toolCategories.map(cat => (
                  <div key={cat.key}>
                    <div className="mb-3 flex items-center gap-2">
                      {cat.icon}
                      <h4 className="font-semibold text-sm text-neutral-900 dark:text-white">{cat.label}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map(tool => (
                        <span key={tool} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cat.chip}`}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {tools.methodologies && (
                <div className="mt-5 pt-5 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mr-1">
                      {lang === 'en' ? 'Methodologies:' : 'Metodologías:'}
                    </span>
                    {tools.methodologies.map(m => (
                      <span key={m} className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
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
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              {data.education.map((edu, index) => (
                <div key={index} className={index > 0 ? 'mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800' : ''}>
                  <div className="font-bold text-lg text-neutral-900 dark:text-white">{edu.institution}</div>
                  <div className="mt-1 text-neutral-700 dark:text-neutral-200 font-medium">
                    {edu.degree} — {edu.area}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{lang === 'en' ? 'Expected:' : 'Fin estimado:'} {edu.end === 'present' ? (lang === 'en' ? 'In Progress' : 'En Curso') : edu.end}</span>
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
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
                  className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-neutral-900 dark:text-white">{language.language}</div>
                    <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {language.level}
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden dark:bg-neutral-800">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${language.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 + 0.2 }}
                    />
                  </div>
                  <div className="mt-2 text-right text-xs font-semibold text-blue-600 dark:text-blue-400">
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
                  className="w-full max-w-2xl max-h-[82vh] overflow-y-auto rounded-2xl bg-white border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 shadow-2xl focus:outline-none"
                  initial={{ scale: 0.88, opacity: 0, y: 16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white/95 backdrop-blur-sm p-5 dark:border-neutral-800 dark:bg-neutral-900/95">
                    <div className="flex-1 min-w-0">
                      <h3 id="experience-modal-title" className="text-lg font-bold text-neutral-900 dark:text-white leading-snug">{selected.role}</h3>
                      <div className="mt-0.5 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                        {selected.company} · {selected.location}
                      </div>
                      <div className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                        {getDuration(selected.start, selected.end, lang)}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="ml-4 shrink-0 rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label={labels.close}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="p-5">
                    {selected.tags && selected.tags.length > 0 && (
                      <div className="mb-5 flex flex-wrap gap-1.5">
                        {selected.tags.map(tag => (
                          <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
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
                            <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{bullet}</span>
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
      </main>
    </PageTransition>
  );
}
