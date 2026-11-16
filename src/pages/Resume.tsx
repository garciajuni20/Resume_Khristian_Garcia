import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Container from '../components/Container';
import Section from '../components/Section';
import FilterChips from '../components/FilterChips';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { useAnalytics } from '../hooks/useAnalytics';
import { getDuration } from '../utils/dateFormatter';
import type { ExperienceItem, ProfileData } from '../types';
import SkillsDashboard from '../components/SkillsDashboard';
import PDFDownloadButtons from '../components/PDFDownloadButtons';
import PageTransition from '../components/PageTransition';
import { CareerVideoBlock } from '../components/CareerVideo';
import CareerTimeline from '../components/CareerTimeline';
import PageOutline from '../components/PageOutline';
import { Toggle } from '../components/notion/primitives';
import HowIWork from '../components/HowIWork';
import InkArt from '../components/ink/InkArt';
import InkMasthead from '../components/ink/InkMasthead';
import InkEntry from '../components/ink/InkEntry';
import InkFigures from '../components/ink/InkFigures';
import CareerArc from '../components/ink/CareerArc';
import { routeHref } from '../utils/site';
import { employerPositions, orderExperience } from '../utils/experienceOrder';
import { sfx } from '../audio/engine';
import { roleStatus, startsLabel } from '../utils/roleStatus';
import { INK_ROUTE, INK_TEXT, INK_TONE, INK_VIGNETTE, inkAchievements, inkFigures, inkNotes } from '../data/ink';

/** First two sentences of a paragraph: the lead a recruiter reads before deciding to expand */
function lead(text: string): string {
  // Sentence ends: a period followed by a capital, but not inside "EE. UU." or similar abbreviations
  return text.split(/(?<=\.)(?<!\b[A-Z]{1,2}\.)\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/).slice(0, 2).join(' ');
}

const Presentation = lazy(() => import('../components/present/Presentation'));

const LINK = 'n-text underline decoration-n-border underline-offset-4 transition-colors duration-300 hover:decoration-current n-focus';

/**
 * The interactive resume, set like the PDF: a banknote. One ink on paper, the
 * engraved Volcán de Agua over Antigua, the portrait in a guilloché oval, figures
 * in Bodoni with footnotes that say where each number comes from, and the roles
 * as a ledger. Shared copy and art live in src/data/ink.ts.
 */
export default function ResumePage() {
  const { lang } = useLang();
  const { trackEvent } = useAnalytics();
  const data: ProfileData = lang === 'en' ? profileEN : profileES;
  const en = lang === 'en';

  const labels = en
    ? {
        pageTitle: 'Interactive resume',
        available: 'Open to remote data and AI roles',
        filterBy: 'Filter by',
        clear: 'Clear',
        skills: 'Years of hands-on use, by tool',
        education: 'Education',
        downloadJson: 'Export as JSON',
        present: 'Present',
        close: 'Close',
        tools: 'Tools',
        languages: 'Languages',
        skillsDashboard: 'Skills',
        skillsIntro: 'Grouped by what I do with them: data engineering, cloud, BI, AI, delivery and full-stack.',
        experienceIntro: 'Most recent first. Some roles overlap on purpose: a promotion, a part-time AI engagement and a product I own run in parallel.',
        fullProfile: 'Read the full profile',
        profile: 'Profile',
        changed: 'What changed because of my work',
        route: 'Route',
        today: 'today',
        notes: 'Sources',
        note: (n: number) => `Note ${n}`,
        years: (n: number) => (n === 1 ? '1 year' : `${n} years`),
        methodologies: 'Ways of working',
        roles: (n: number, i: number) => `${n} roles, ${i} industries`,
      }
    : {
        pageTitle: 'CV interactivo',
        available: 'Abierto a roles remotos de datos e IA',
        filterBy: 'Filtrar por',
        clear: 'Limpiar',
        skills: 'Años de uso real, por herramienta',
        education: 'Educación',
        downloadJson: 'Exportar en JSON',
        present: 'Presentar',
        close: 'Cerrar',
        tools: 'Herramientas',
        languages: 'Idiomas',
        skillsDashboard: 'Habilidades',
        skillsIntro: 'Agrupadas por lo que hago con ellas: ingeniería de datos, cloud, BI, IA, entrega y full-stack.',
        experienceIntro: 'Del más reciente al más antiguo. Algunos roles se traslapan a propósito: un ascenso, un contrato de IA a medio tiempo y un producto propio corren en paralelo.',
        fullProfile: 'Leer el perfil completo',
        profile: 'Perfil',
        changed: 'Lo que cambió con mi trabajo',
        route: 'Ruta',
        today: 'hoy',
        notes: 'Fuentes',
        note: (n: number) => `Nota ${n}`,
        years: (n: number) => (n === 1 ? '1 año' : `${n} años`),
        methodologies: 'Formas de trabajo',
        roles: (n: number, i: number) => `${n} roles, ${i} industrias`,
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
  const [selected, setSelected] = useState<ExperienceItem | null>(null);
  // Shared element: the role's title and company travel from the ledger into the
  // detail (View Transitions API). Without support, or with reduced motion, the
  // detail opens with its usual fade.
  const [viaVT, setViaVT] = useState(false);
  const openRole = useCallback((item: ExperienceItem | null) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) {
      setViaVT(false);
      setSelected(item);
      return;
    }
    document.startViewTransition(() => flushSync(() => { setViaVT(true); setSelected(item); }));
  }, []);
  const [isExporting, setIsExporting] = useState(false);

  function toggleTag(tag: string) {
    setActiveTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
    trackEvent('filter_tag', { tag });
  }

  function clearTags() {
    setActiveTags([]);
    trackEvent('filter_clear');
  }

  // Reverse-chronological, the same order as both PDFs
  const filteredExperience = useMemo(() => {
    const ordered = orderExperience(data.experience);
    if (activeTags.length === 0) return ordered;
    return ordered.filter(e => (e.tags ?? []).some(t => activeTags.includes(t)));
  }, [data.experience, activeTags]);
  const positions = useMemo(() => employerPositions(filteredExperience), [filteredExperience]);

  // Each industry's engraving is stamped once, on the first role shown from it
  const ledgerArt = useMemo(() => {
    const seen = new Set<string>();
    const out = new Map<string, string | null>();
    filteredExperience.forEach(e => {
      const art = INK_VIGNETTE[e.id];
      out.set(e.id, art && !seen.has(art) ? art : null);
      if (art) seen.add(art);
    });
    return out;
  }, [filteredExperience]);

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

  // Distinct industries in chronological order of the roles
  const chronological = [...data.experience].sort((a, b) => a.start.localeCompare(b.start));
  const industries = Array.from(new Set(chronological.map(e => e.industry).filter((x): x is string => Boolean(x))));
  const routeSeen = new Set<string>();
  const route = chronological.map(e => {
    const art = INK_VIGNETTE[e.id];
    const first = art && !routeSeen.has(art) ? art : null;
    if (art) routeSeen.add(art);
    return { e, art: first };
  });

  const figures = inkFigures(lang);
  const notes = inkNotes(lang);
  const achievements = inkAchievements(data.keyAchievements);
  const tools = data.tools;
  const toolGroups: Array<[string, string[]]> = en
    ? [['Data engineering', tools.dataEngineering], ['BI and analytics', tools.biAnalytics], ['Cloud and delivery', tools.cloudDevOps], ['Product and AI', tools.fullStack]]
    : [['Ingeniería de datos', tools.dataEngineering], ['BI y analítica', tools.biAnalytics], ['Nube y entrega', tools.cloudDevOps], ['Producto e IA', tools.fullStack]];

  // The engraving prints in with a sound of its own (no-op while sound is off)
  useEffect(() => {
    const id = window.setTimeout(() => sfx('print'), 150);
    return () => window.clearTimeout(id);
  }, []);

  // Interview mode lives in the URL (/resume?present) so it can be linked and reloaded
  const location = useLocation();
  const navigate = useNavigate();
  const presenting = new URLSearchParams(location.search).has('present');
  const withPresent = (on: boolean) => {
    const params = new URLSearchParams(location.search);
    if (on) params.set('present', '');
    else params.delete('present');
    return params.toString().replace(/present=(&|$)/, 'present$1');
  };
  const startPresenting = () => navigate({ search: withPresent(true) });
  const stopSearch = withPresent(false);
  const stopPresenting = useCallback(() => navigate({ search: stopSearch }, { replace: true }), [navigate, stopSearch]);

  // Modal a11y: close on Escape, move focus into the dialog, restore it on close
  const modalRef = useRef<HTMLDivElement>(null);
  const isOpen = selected !== null;
  const wasOpen = useRef(false);
  useEffect(() => {
    if (isOpen !== wasOpen.current) sfx(isOpen ? 'open' : 'close');
    wasOpen.current = isOpen;
  }, [isOpen]);
  useEffect(() => {
    if (!selected) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') openRole(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [selected, openRole]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-n-bg text-n-text">
        <PageOutline lang={lang} />
        <Container>
          {/* ── Banknote: the engraving, the portrait window and the name ── */}
          <InkMasthead
            name={data.name}
            headline={data.headline}
            titleSuffix={`, ${labels.pageTitle}`}
            className="lg:min-h-[21rem]"
            artClassName="lg:w-[56%]"
          >
            <div className="enter-fade relative mt-6 max-w-lg space-y-1 text-sm" style={{ '--enter-delay': '560ms' } as CSSProperties}>
              <p className="n-muted">
                {data.location}. {labels.available}
              </p>
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                <a href={`mailto:${data.email}`} className={LINK}>{data.email}</a>
                {data.links.map(link => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                    {link.label}
                  </a>
                ))}
                <button type="button" onClick={exportToJson} disabled={isExporting} className={`${LINK} disabled:opacity-50`}>
                  {labels.downloadJson}
                </button>
                <button type="button" onClick={startPresenting} className={LINK}>
                  {labels.present}
                </button>
              </p>
            </div>
          </InkMasthead>

          {/* ── The proof: three figures, each with its source below ── */}
          <InkFigures lang={lang} notes intro className="mt-8" />

          {/* ── Profile and route ── */}
          <Section title={labels.profile} display>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
              <div className="min-w-0">
                <p className="n-text max-w-prose text-base leading-relaxed">{lead(data.summaryShort ?? data.summary)}</p>
                <div className="mt-2 -ml-2">
                  <Toggle title={labels.fullProfile}>
                    <p className="max-w-prose text-base leading-relaxed">{data.summary}</p>
                  </Toggle>
                </div>

                <h3 className="font-display mt-10 text-2xl">{labels.changed}</h3>
                <ul className="mt-3">
                  {achievements.map(a => (
                    <li key={a} className="n-text border-t border-n-border py-3 text-sm leading-relaxed">{a}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-2xl">{labels.route}</h3>
                <ol className="mt-4 space-y-4">
                  {route.map(({ e, art }) => {
                    const r = INK_ROUTE[e.id];
                    const status = roleStatus(e);
                    return (
                      <li key={e.id} className="grid grid-cols-[3rem_minmax(0,1fr)_2.5rem] items-start gap-x-3">
                        <span className={`font-display text-lg leading-tight ${INK_TEXT[INK_TONE[e.id] ?? 'blue']}`}>{e.start.slice(0, 4)}</span>
                        <span>
                          <span className="n-text block text-sm leading-snug">{r ? (en ? r.en : r.es) : e.role}</span>
                          <span className="n-muted block text-xs">
                            {r?.at ?? e.company}
                            {status === 'current' && <span className="text-n-highlight">, {labels.today}</span>}
                            {status === 'upcoming' && e.startsOn && <span>, {startsLabel(e.startsOn, lang).toLowerCase()}</span>}
                          </span>
                        </span>
                        {art ? <InkArt name={art} className={`h-10 w-10 ${INK_TEXT[INK_TONE[e.id] ?? 'blue']}`} /> : <span />}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <ol className="n-muted mt-12 space-y-1 border-t border-n-border pt-4 text-xs leading-relaxed" aria-label={labels.notes}>
              {notes.map((n, i) => (
                <li key={i} id={`nota-${i + 1}`} className="scroll-mt-28">
                  <span className={`mr-1.5 ${INK_TEXT[figures[i]?.tone ?? 'blue']}`}>{i + 1}</span>
                  {n}
                  {i === notes.length - 1 && (
                    <a href={routeHref('/flowber')} className={LINK}>
                      {en ? 'Flowber case study' : 'caso de estudio de Flowber'}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </Section>

          {/* ── The thread: three stages before the ledger ── */}
          {data.arc && <CareerArc arc={data.arc} lang={lang} />}

          {/* ── How I work ── */}
          {data.workflow && <HowIWork workflow={data.workflow} />}

          {/* ── Career film ── */}
          <div className="mt-14">
            <CareerVideoBlock />
          </div>

          {/* ── PDF downloads ── */}
          <div className="mt-12">
            <PDFDownloadButtons />
          </div>

          {/* ── Experience, as a ledger ── */}
          <Section
            title={en ? 'Experience' : 'Experiencia'}
            intro={labels.experienceIntro}
            aside={labels.roles(data.experience.length, industries.length)}
            display
          >
            <div className="mb-6">
              <CareerTimeline experience={data.experience} lang={lang} onOpen={openRole} />
            </div>
            <FilterChips
              allTags={allTags}
              activeTags={activeTags}
              onToggle={toggleTag}
              onClear={clearTags}
              labels={{
                filterBy: labels.filterBy,
                clear: labels.clear,
                more: n => (en ? `+${n} more` : `+${n} más`),
                less: en ? 'Show less' : 'Ver menos',
              }}
            />
            <div className="mt-6 border-b border-n-border">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredExperience.map(exp => (
                  <motion.div key={exp.id} layout exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <InkEntry item={exp} art={ledgerArt.get(exp.id)} continued={positions.get(exp.id)?.continued} shared={selected?.id !== exp.id} lang={lang} onOpen={openRole} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Section>

          {/* ── Skills: the dashboard, with years per tool folded below ── */}
          <Section title={labels.skillsDashboard} intro={labels.skillsIntro} display>
            <SkillsDashboard />
            <div className="mt-6">
              <Toggle title={labels.skills}>
                <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                  {data.skills.map(skill => (
                    <li key={skill.name} className="flex items-baseline justify-between gap-4 border-b border-n-border py-2 text-sm">
                      <span className="n-text">{skill.name}</span>
                      {skill.years != null && <span className="n-muted shrink-0 tabular-nums">{labels.years(skill.years)}</span>}
                    </li>
                  ))}
                </ul>
              </Toggle>
            </div>
          </Section>

          {/* ── Tools, as words ── */}
          <Section title={labels.tools} display>
            <div className="grid gap-x-8 gap-y-6 border-t border-n-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
              {toolGroups.map(([head, list]) => (
                <div key={head}>
                  <h3 className="font-display text-xl">{head}</h3>
                  <p className="n-muted mt-2 text-sm leading-relaxed">{list.join(', ')}</p>
                </div>
              ))}
            </div>
            {tools.methodologies && (
              <p className="n-muted mt-6 border-t border-n-border pt-4 text-sm leading-relaxed">
                <span className="n-text">{labels.methodologies}: </span>
                {tools.methodologies.join(', ')}
              </p>
            )}
          </Section>

          {/* ── Education and languages ── */}
          <div className="grid gap-x-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <Section title={labels.education} display>
              {data.education.map((edu, index) => (
                <div key={index} className={`border-t border-n-border pt-4 ${index > 0 ? 'mt-6' : ''}`}>
                  <p className="font-display text-xl">{edu.institution}</p>
                  <p className="n-text mt-1 text-sm">{edu.degree}, {edu.area}</p>
                  <p className="n-muted mt-1 text-sm">
                    {edu.status ?? (edu.end === 'present' ? (en ? 'In progress' : 'En curso') : edu.end)}
                  </p>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="n-muted grid grid-cols-[1rem_minmax(0,1fr)] text-sm leading-relaxed">
                          <span aria-hidden="true">–</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Section>

            <Section title={labels.languages} display>
              <dl className="border-t border-n-border">
                {data.languages.map(l => (
                  <div key={l.language} className="flex items-baseline justify-between gap-4 border-b border-n-border py-3 text-sm">
                    <dt className="n-text">{l.language}</dt>
                    <dd className="n-muted text-right">{l.level}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          </div>

          {/* ── Experience detail ── */}
          <AnimatePresence>
            {selected && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                initial={viaVT ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={viaVT ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
                onClick={() => openRole(null)}
              >
                <motion.div
                  ref={modalRef}
                  tabIndex={-1}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="experience-modal-title"
                  className="max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-n-border bg-n-bg shadow-xl shadow-black/20 focus:outline-none"
                  initial={viaVT ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={viaVT ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="sticky top-0 z-10 flex items-start justify-between border-b border-n-border bg-n-bg p-5">
                    <div className="min-w-0 flex-1">
                      <h3 id="experience-modal-title" className="n-text font-semibold leading-snug" style={{ viewTransitionName: `role-title-${selected.id}` }}>{selected.role}</h3>
                      <p className="n-text mt-0.5 text-sm" style={{ viewTransitionName: `role-company-${selected.id}` }}>{selected.company}</p>
                      <p className="n-muted mt-1 text-xs">
                        {selected.location}. {getDuration(selected.start, selected.end, lang)}
                      </p>
                    </div>
                    <button onClick={() => openRole(null)} data-sfx="none" className="n-hover ml-4 shrink-0 rounded-full p-2 transition-colors n-focus" aria-label={labels.close}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="p-5">
                    {selected.story && <p className="n-muted mb-5 text-sm leading-relaxed">{selected.story.lead}</p>}
                    {selected.bullets && selected.bullets.length > 0 && (
                      <ul className="space-y-3">
                        {selected.bullets.map((bullet, i) => (
                          <li key={i} className="grid grid-cols-[1rem_minmax(0,1fr)] text-sm leading-relaxed">
                            <span className="n-muted" aria-hidden="true">–</span>
                            <span className="n-text">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {selected.tags && selected.tags.length > 0 && (
                      <p className="n-muted mt-5 border-t border-n-border pt-4 text-xs leading-relaxed">{selected.tags.join(', ')}</p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-16" />
        </Container>
      </div>
      {/* Portaled: the page wrapper animates a transform, which would trap a fixed overlay */}
      {presenting &&
        createPortal(
          <Suspense fallback={null}>
            <Presentation data={data} lang={lang} onClose={stopPresenting} />
          </Suspense>,
          document.body,
        )}
    </PageTransition>
  );
}
