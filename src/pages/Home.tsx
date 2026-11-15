import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import PageTransition from '../components/PageTransition';
import Testimonials from '../components/Testimonials';
import NowStrip from '../components/NowStrip';
import { CareerVideoButton } from '../components/CareerVideo';
import InkArt from '../components/ink/InkArt';
import InkPortrait from '../components/ink/InkPortrait';
import InkFigures from '../components/ink/InkFigures';
import ScrollStory from '../components/story/ScrollStory';
import { BrowserFrame } from '../components/notion/visuals';
import { downloadPDF } from '../utils/downloadPDF';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import { INK_TEXT, type InkTone } from '../data/ink';
import { FLUID } from '../utils/animations';

const LINK = 'n-text underline decoration-n-border underline-offset-4 transition-colors duration-300 hover:decoration-current n-focus';

type Case = {
  id: string;
  year: string;
  tone: InkTone;
  art: string;
  title: string;
  body: string;
  numbers: { v: string; l: string }[];
  to: string;
  live?: string;
};

const COPY = {
  en: {
    pitch:
      'I build the data platforms companies run on. At a US fintech I went from first BI hire to Data Engineer on Snowflake, dbt and Azure Data Factory, and on my own I ship AI that works on real data, in production.',
    meta: 'Guatemala City, remote (UTC−6, overlaps US hours) · English and Spanish',
    download: 'Download CV (PDF)',
    experience: 'See the full experience',
    workTitle: 'Selected work',
    workIntro: 'Two systems people use every day, each with its numbers and how it was built.',
    caseLink: 'Read the case study',
    live: 'Live site',
    flow: 'How the data moves',
    closeTitle: 'Open to remote Data Engineer roles',
    closeBody: 'You talk to me directly. I answer within 24 hours.',
    contact: 'Contact me',
    cases: [
      {
        id: 'alleviate', year: '2023', tone: 'blue', art: 'ink-data', to: '/alleviate',
        title: 'Alleviate: one source of truth for five departments',
        body: 'A US debt consolidation fintech reported from spreadsheets at 85% accuracy. As the first BI hire I built its analytics platform on Snowflake, and I run it today as its Data Engineer.',
        numbers: [{ v: '99.5%', l: 'data accuracy, from 85%' }, { v: '30 min', l: 'reporting, from 2+ days' }, { v: '15+', l: 'dashboards for 5 departments' }],
      },
      {
        id: 'flowber', year: '2024', tone: 'coral', art: 'ink-barberia', to: '/flowber', live: 'https://flowber-barberia.pages.dev/',
        title: 'Flowber: a barbershop from a paper book to AI and data',
        body: 'Danover’s barbershop ran on a paper schedule. I built, alone, the platform it runs on: online booking, an AI agent that books with live data, and a warehouse that predicts cancellations.',
        numbers: [{ v: '160+', l: 'appointments in production' }, { v: '20', l: 'tools in the AI agent' }, { v: '100%', l: 'RAG hit@1 on its test set' }],
      },
    ] as Case[],
    flowSteps: ['Salesforce and operational databases', 'Azure Data Factory', 'Snowflake, star schema', 'dbt and SQL', 'Power BI and Tableau'],
  },
  es: {
    pitch:
      'Construyo las plataformas de datos sobre las que operan las empresas. En una fintech de EE. UU. pasé de primera contratación de BI a Ingeniero de Datos con Snowflake, dbt y Azure Data Factory, y por mi cuenta llevo a producción IA que trabaja con datos reales.',
    meta: 'Ciudad de Guatemala, remoto (UTC−6, en horario de EE. UU.) · inglés y español',
    download: 'Descargar CV (PDF)',
    experience: 'Ver la experiencia completa',
    workTitle: 'Trabajo destacado',
    workIntro: 'Dos sistemas que la gente usa a diario, cada uno con sus cifras y cómo se construyó.',
    caseLink: 'Leer el caso de estudio',
    live: 'Sitio en vivo',
    flow: 'Cómo se mueven los datos',
    closeTitle: 'Abierto a roles remotos de Ingeniero de Datos',
    closeBody: 'Hablas directamente conmigo. Respondo en menos de 24 horas.',
    contact: 'Contactarme',
    cases: [
      {
        id: 'alleviate', year: '2023', tone: 'blue', art: 'ink-data', to: '/alleviate',
        title: 'Alleviate: una sola fuente de verdad para cinco departamentos',
        body: 'Una fintech de consolidación de deudas de EE. UU. reportaba desde hojas de cálculo con 85% de precisión. Como primera contratación de BI construí su plataforma analítica en Snowflake, y hoy la opero como su Ingeniero de Datos.',
        numbers: [{ v: '99.5%', l: 'precisión de datos, desde 85%' }, { v: '30 min', l: 'reportes, desde 2+ días' }, { v: '15+', l: 'dashboards para 5 departamentos' }],
      },
      {
        id: 'flowber', year: '2024', tone: 'coral', art: 'ink-barberia', to: '/flowber', live: 'https://flowber-barberia.pages.dev/',
        title: 'Flowber: una barbería del cuaderno de papel a la IA y los datos',
        body: 'La barbería de Danover funcionaba con agenda en papel. Construí solo la plataforma con la que opera: reservas en línea, un agente de IA que reserva con datos en vivo y un warehouse que predice cancelaciones.',
        numbers: [{ v: '160+', l: 'citas en producción' }, { v: '20', l: 'herramientas del agente de IA' }, { v: '100%', l: 'hit@1 de RAG en su set de prueba' }],
      },
    ] as Case[],
    flowSteps: ['Salesforce y bases operativas', 'Azure Data Factory', 'Snowflake, esquema estrella', 'dbt y SQL', 'Power BI y Tableau'],
  },
};

function CaseRow({ c, t, children }: { c: Case; t: (typeof COPY)['en']; children?: React.ReactNode }) {
  const ink = INK_TEXT[c.tone];
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: FLUID }}
      className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-4 border-t border-n-border py-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-6"
    >
      <div>
        <p className={`font-display text-3xl leading-none sm:text-4xl ${ink}`}>{c.year}</p>
        <InkArt name={c.art} className={`mt-3 h-11 w-11 sm:h-14 sm:w-14 ${ink}`} />
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-2xl leading-tight sm:text-3xl">{c.title}</h3>
        <p className="n-muted mt-3 max-w-prose text-base leading-relaxed">{c.body}</p>
        <dl className="mt-5 grid max-w-2xl grid-cols-3 gap-4">
          {c.numbers.map(n => (
            <div key={n.l}>
              <dt className="sr-only">{n.l}</dt>
              <dd className={`font-display text-2xl leading-none tabular-nums sm:text-3xl ${ink}`}>{n.v}</dd>
              <dd className="n-muted mt-1.5 text-xs leading-snug">{n.l}</dd>
            </div>
          ))}
        </dl>
        {children}
        <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link to={c.to} className={`${LINK} group inline-flex items-center gap-1.5 font-medium`}>
            {t.caseLink}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          {c.live && (
            <a href={c.live} target="_blank" rel="noopener noreferrer" className={LINK}>
              {t.live}
            </a>
          )}
        </p>
      </div>
    </motion.article>
  );
}

/**
 * Home, set like the resume: the banknote header with a one-paragraph pitch and the
 * CV one click away, the three figures, the story told while scrolling (four
 * chapters on a sticky stage), two case studies, what colleagues say and how to
 * reach me.
 */
export default function Home() {
  const { lang } = useLang();
  const profile = lang === 'en' ? profileEN : profileES;
  const t = COPY[lang];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useSEO({
    title: profile.seo?.title ?? `Khristian Garcia — ${profile.headline}`,
    description: profile.seo?.description ?? t.pitch,
    lang,
    keywords: profile.seo?.keywords,
  });

  const download = () =>
    downloadPDF(lang === 'en' ? 'ats-nophoto-en' : 'ats-nophoto-es', v => setLoading(v !== null), setError);

  return (
    <PageTransition>
      <div className="min-h-screen bg-n-bg text-n-text">
        <Container>
          {/* ── Banknote header: engraving, portrait window, name and pitch ── */}
          <header className="relative pt-6 lg:min-h-[25rem] lg:pt-12">
            <InkArt
              name="ink-hero"
              className="ink-print ink-iris pointer-events-none -mx-4 aspect-[20/11] sm:mx-0 lg:absolute lg:right-0 lg:top-2 lg:w-[52%]"
            />
            <div className="relative mt-2 flex items-center gap-5 sm:-mt-12 sm:gap-7 lg:mt-0">
              <InkPortrait alt={profile.name} width={124} className="n-text sm:hidden" />
              <InkPortrait alt={profile.name} width={148} className="n-text hidden sm:block" />
              <div className="min-w-0">
                <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl">
                  Khristian
                  <br />
                  Garcia
                </h1>
                <p className="n-muted mt-3 max-w-[22rem] text-base leading-snug">{profile.headline}</p>
              </div>
            </div>

            <p className="n-text relative mt-7 max-w-xl text-lg leading-relaxed lg:max-w-[44%]">{t.pitch}</p>
            <p className="n-muted relative mt-3 text-sm">{t.meta}</p>

            <div className="relative mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={download}
                disabled={loading}
                data-sfx="none"
                className="n-btn-primary px-4 py-2.5 text-sm disabled:opacity-60 n-focus"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
                {t.download}
              </button>
              <Link to="/resume" className={`${LINK} text-sm font-medium`}>
                {t.experience}
              </Link>
              <CareerVideoButton className={`${LINK} inline-flex items-center gap-1.5 text-sm font-medium`} />
            </div>
            {error && <p className="relative mt-3 text-sm text-ink-coral" role="alert">{error}</p>}
          </header>

          <InkFigures lang={lang} className="mt-12" />
          <NowStrip lang={lang} className="mt-5" />
        </Container>

        {/* ── The story, told while scrolling: wider than the reading column ── */}
        <ScrollStory lang={lang} />

        <Container>
          {/* ── Selected work ── */}
          <section className="mt-24" aria-labelledby="work-title">
            <h2 id="work-title" className="font-display text-4xl">{t.workTitle}</h2>
            <p className="n-muted mt-2 max-w-prose text-base">{t.workIntro}</p>
            <div className="mt-8">
              <CaseRow c={t.cases[0]} t={t}>
                <div className="mt-6">
                  <p className="n-muted text-xs">{t.flow}</p>
                  <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
                    {t.flowSteps.map((step, i) => (
                      <li key={step} className="flex items-center gap-2">
                        <span className="rounded-md border border-n-border px-2 py-1 n-text">{step}</span>
                        {i < t.flowSteps.length - 1 && <span className="n-muted" aria-hidden="true">→</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              </CaseRow>
              <CaseRow c={t.cases[1]} t={t}>
                <div className="mt-6 max-w-2xl">
                  <BrowserFrame src={`${import.meta.env.BASE_URL}flowber/home-desktop.webp`} alt={lang === 'en' ? 'Flowber home page in production' : 'Página de inicio de Flowber en producción'} url="flowber-barberia.pages.dev" />
                </div>
              </CaseRow>
            </div>
          </section>

          <section className="mt-24">
            <Testimonials />
          </section>

          {/* ── How to reach me ── */}
          <section className="mt-24 border-t border-n-border pb-24 pt-10">
            <h2 className="font-display text-4xl">{t.closeTitle}</h2>
            <p className="n-muted mt-2 text-base">{t.closeBody}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <Link to="/contact" className="n-btn-primary px-4 py-2.5 n-focus">
                {t.contact}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={`mailto:${profile.email}`} className={LINK}>{profile.email}</a>
              {profile.links.filter(l => l.label !== 'Portfolio' && l.label !== 'Portafolio').map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={LINK}>{l.label}</a>
              ))}
            </div>
          </section>
        </Container>
      </div>
    </PageTransition>
  );
}
