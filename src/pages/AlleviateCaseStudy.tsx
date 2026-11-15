import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import PageTransition from '../components/PageTransition';
import InkArt from '../components/ink/InkArt';
import PipelineFlow from '../components/ink/PipelineFlow';
import { downloadPDF } from '../utils/downloadPDF';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { ALLEVIATE } from '../data/alleviate';
import { FLUID } from '../utils/animations';

const LINK = 'n-text underline decoration-n-border underline-offset-4 transition-colors duration-300 hover:decoration-current n-focus';

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: FLUID }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/**
 * The Alleviate case study, printed in the fintech ink (blue): what it was like
 * before, how the data moves now, the decisions behind the numbers, and the path
 * from IT support to Data Engineer. Copy in src/data/alleviate.ts.
 */
export default function AlleviateCaseStudy() {
  const { lang } = useLang();
  const c = ALLEVIATE[lang];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useSEO({
    title: c.title,
    description: c.lead,
    lang,
    keywords: ['Data Engineer', 'Snowflake', 'dbt', 'Azure Data Factory', 'Databricks', 'Power BI', 'case study', 'fintech'],
  });

  const download = () =>
    downloadPDF(lang === 'en' ? 'ats-nophoto-en' : 'ats-nophoto-es', v => setLoading(v !== null), setError);

  return (
    <PageTransition>
      <div className="min-h-screen bg-n-bg text-n-text">
        <Container>
          <article className="pb-24 pt-8">
            <nav aria-label="Breadcrumb" className="n-muted text-sm">
              <Link to="/projects" className={LINK}>{c.crumb}</Link>
              <span aria-hidden="true"> / </span>
              <span>Alleviate</span>
            </nav>

            {/* ── Title, with the fintech engraving ── */}
            <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-end">
              <div>
                <p className="font-display text-ink-blue text-2xl">2023</p>
                <h1 className="font-display mt-2 max-w-3xl text-4xl leading-[1.05] sm:text-5xl">{c.title}</h1>
                <p className="n-muted mt-5 max-w-2xl text-lg leading-relaxed">{c.lead}</p>
              </div>
              <InkArt name="ink-data" className="text-ink-blue hidden h-40 w-40 justify-self-end lg:block" />
            </header>

            <dl className="mt-8 grid gap-x-8 gap-y-3 border-y border-n-border py-5 text-sm sm:grid-cols-2">
              {c.props.map(p => (
                <div key={p.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-3">
                  <dt className="n-muted">{p.label}</dt>
                  <dd className="n-text">{p.value}</dd>
                </div>
              ))}
            </dl>

            {/* ── The numbers ── */}
            <Reveal className="mt-10">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
                {c.numbers.map(n => (
                  <div key={n.label} className="border-t border-n-border pt-4">
                    <dt className="sr-only">{n.label}</dt>
                    <dd className="font-display text-ink-blue whitespace-nowrap text-3xl leading-none tabular-nums sm:text-4xl">
                      {n.before && (
                        <>
                          <span className="n-muted text-[0.6em]">{n.before}</span>
                          <span className="n-muted mx-1.5 font-sans text-[0.5em]" aria-hidden="true">→</span>
                          <span className="sr-only">{lang === 'en' ? ' to ' : ' a '}</span>
                        </>
                      )}
                      {n.value}
                    </dd>
                    <dd className="n-muted mt-2 text-sm">{n.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* ── Before ── */}
            <Reveal className="mt-20 grid gap-4 lg:grid-cols-[14rem_minmax(0,1fr)]">
              <h2 className="font-display text-3xl">{c.beforeTitle}</h2>
              <p className="n-text max-w-prose text-base leading-relaxed">{c.before}</p>
            </Reveal>

            {/* ── Architecture: a schematic, left to right on desktop, top to bottom on a phone ── */}
            <Reveal className="mt-20">
              <h2 className="font-display text-3xl">{c.archTitle}</h2>
              <p className="n-muted mt-2 max-w-prose text-base">{c.archIntro}</p>
              <PipelineFlow stages={c.stages} label={c.archTitle} />
              <p className="mt-8 border-t border-dashed border-n-border pt-3 text-sm">
                <span className="n-muted">{c.governanceLabel}: </span>
                <span className="n-text">{c.governance.join(', ')}</span>
              </p>
            </Reveal>

            {/* ── Decisions ── */}
            <Reveal className="mt-20">
              <h2 className="font-display text-3xl">{c.decisionsTitle}</h2>
              <ol className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {c.decisions.map((d, i) => (
                  <li key={d.title} className="grid grid-cols-[2rem_minmax(0,1fr)] border-t border-n-border py-5">
                    <span className="font-display text-ink-blue text-xl leading-tight">{i + 1}</span>
                    <span>
                      <span className="n-text block font-semibold leading-snug">{d.title}</span>
                      <span className="n-muted mt-1.5 block text-sm leading-relaxed">{d.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* ── The path ── */}
            <Reveal className="mt-20">
              <h2 className="font-display text-3xl">{c.pathTitle}</h2>
              <ol className="mt-6">
                {c.path.map(p => (
                  <li key={p.when} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 border-t border-n-border py-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
                    <span className="font-display text-ink-blue text-lg">{p.when}</span>
                    <span>
                      <span className="n-text block font-medium">{p.role}</span>
                      <span className="n-muted mt-1 block text-sm leading-relaxed">{p.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="n-muted mt-4 text-xs">{c.note}</p>
            </Reveal>

            {/* ── Next step ── */}
            <section className="mt-20 border-t border-n-border pt-10">
              <h2 className="font-display text-4xl">{c.ctaTitle}</h2>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <button type="button" onClick={download} disabled={loading} data-sfx="none" className="n-btn-primary px-4 py-2.5 disabled:opacity-60 n-focus">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
                  {c.download}
                </button>
                <Link to="/contact" className={`${LINK} font-medium`}>{c.contact}</Link>
                <Link to="/flowber" className={`${LINK} group inline-flex items-center gap-1.5`}>
                  {c.other}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
              {error && <p className="mt-3 text-sm text-ink-coral" role="alert">{error}</p>}
            </section>
          </article>
        </Container>
      </div>
    </PageTransition>
  );
}
