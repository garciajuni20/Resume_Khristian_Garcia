import { useMemo, useState, useEffect } from 'react';
import { Download, X, FileJson, Calendar } from 'lucide-react';
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
import { formatDate, getDuration } from '../utils/dateFormatter';
import { ProfileData } from '../types';

export default function ResumePage() {
  const { lang } = useLang();
  const { trackDownload, trackEvent } = useAnalytics();
  const data: ProfileData = (lang === 'en' ? profileEN : profileES) as unknown as ProfileData;

  const labels = lang === 'en' ? {
    pageTitle: 'Interactive Resume',
    subtitle: 'Product-style resume demonstrating full-stack mindset (UI + data + structure).',
    filterBy: 'Filter by',
    clear: 'Clear',
    skills: 'Skills',
    education: 'Education',
    download: 'Download PDF',
    downloadJson: 'Export as JSON',
    close: 'Close',
    viewFull: 'View Full Details',
    exportData: 'Export Data'
  } : {
    pageTitle: 'CV Interactivo',
    subtitle: 'CV estilo producto que demuestra mentalidad full-stack (UI + datos + estructura).',
    filterBy: 'Filtrar por',
    clear: 'Limpiar',
    skills: 'Habilidades',
    education: 'Educación',
    download: 'Descargar PDF',
    downloadJson: 'Exportar como JSON',
    close: 'Cerrar',
    viewFull: 'Ver Detalles Completos',
    exportData: 'Exportar Datos'
  };

  // SEO
  useSEO({
    title: labels.pageTitle,
    description: `${data.name} - ${data.headline}`,
    lang,
    keywords: [...data.badges, 'CV', 'Resume', 'Portfolio']
  });

  const allTags = useMemo(() => {
    const set = new Set<string>();
    data.experience.forEach((e) => (e.tags ?? []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [data.experience]);

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selected, setSelected] = useState<(typeof data.experience)[0] | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    trackEvent('filter_tag', { tag, active: !activeTags.includes(tag) });
  }

  function clearTags() {
    setActiveTags([]);
    trackEvent('filter_clear');
  }

  const filteredExperience = useMemo(() => {
    if (activeTags.length === 0) return data.experience;
    return data.experience.filter((e) => (e.tags ?? []).some((t) => activeTags.includes(t)));
  }, [data.experience, activeTags]);

  const exportToJson = () => {
    setIsExporting(true);
    const exportData = {
      ...data,
      exportDate: new Date().toISOString(),
      exportSource: 'Khristian Garcia Portfolio'
    };
    
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `khristian-garcia-portfolio-${lang}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    trackEvent('export_data', { format: 'json', language: lang });
    setTimeout(() => setIsExporting(false), 1000);
  };

  const handleDownload = () => {
    trackDownload(data.resumePdfPath.split('/').pop() || 'resume.pdf');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-50">
      <Container>
        {/* Header */}
        <div className="py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{labels.pageTitle}</h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">{labels.subtitle}</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={exportToJson}
              disabled={isExporting}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 disabled:opacity-50
                dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              title={labels.exportData}
            >
              <FileJson className="h-4 w-4" />
              <span className="hidden sm:inline">{labels.downloadJson}</span>
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl border border-neutral-200 bg-white/90 backdrop-blur-sm p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900/90">
          <div className="grid gap-8 sm:grid-cols-[1fr_240px] sm:items-start">
            <div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold">{data.name}</div>
                <div className="flex gap-2">
                  {data.badges.slice(0, 3).map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-2 text-lg text-neutral-700 dark:text-neutral-200">{data.headline}</div>
              <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                <Calendar className="h-3 w-3" />
                <span>{data.location}</span>
              </div>

              <p className="mt-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">{data.summary}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={data.resumePdfPath}
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                    dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4" />
                  {labels.download}
                </a>

                {data.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300
                      dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600 transition-colors"
                  >
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
                    className="h-full w-full object-cover object-top transition-transform hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <Section title={lang === 'en' ? 'Experience' : 'Experiencia'}>
          <FilterChips
            allTags={allTags}
            activeTags={activeTags}
            onToggle={toggleTag}
            onClear={clearTags}
            labels={{ filterBy: labels.filterBy, clear: labels.clear }}
          />

          <div className="mt-8 grid gap-6">
            {filteredExperience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ExperienceCard 
                  item={exp} 
                  onOpen={setSelected} 
                  lang={lang} 
                />
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Skills Section */}
        <Section title={labels.skills}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SkillMeter name={skill.name} level={skill.level} />
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Education Section */}
        <Section title={labels.education}>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            {data.education.map((edu, index) => (
              <div key={index} className={index > 0 ? 'mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800' : ''}>
                <div className="font-semibold text-lg">{edu.institution}</div>
                <div className="mt-1 text-neutral-700 dark:text-neutral-200">
                  {edu.degree} — {edu.area}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <Calendar className="h-3 w-3" />
                  <span>{lang === 'en' ? 'Expected:' : 'Fin estimado:'} {formatDate(edu.end, lang)}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Modal de Detalles */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-white border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{selected.role}</h3>
                    <div className="mt-1 text-neutral-700 dark:text-neutral-200">
                      {selected.company} • {selected.location}
                    </div>
                    <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                      {getDuration(selected.start, selected.end, lang)}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="ml-4 rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label={labels.close}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6">
                  {selected.tags?.length ? (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {selected.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {selected.bullets?.length ? (
                    <ul className="space-y-3">
                      {selected.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                          <span className="text-neutral-700 dark:text-neutral-300">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-16" />
      </Container>
    </main>
  );
}