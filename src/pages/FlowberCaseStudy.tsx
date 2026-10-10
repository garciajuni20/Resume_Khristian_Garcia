import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Blocks,
  Bot,
  CalendarDays,
  ChevronRight,
  Circle,
  Code2,
  Database,
  ExternalLink,
  Layers,
  Lightbulb,
  Link2,
  ListTree,
  Lock,
  Search,
  ShieldCheck,
  Store,
  Table2,
  Tags,
  User,
  Wrench,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Callout, CountUp, Reveal, SectionHeading, TableOfContents, Tag, Toggle } from '../components/notion/primitives';
import { BrowserFrame, ChatDemo, PhoneFrame, Pipeline, WordReveal } from '../components/notion/visuals';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { CHURN_SQL, FLOWBER_LIVE_URL, flowberContent, type Hat } from '../data/flowber';
import { FLUID } from '../utils/animations';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const HAT_ICONS: Record<Hat['icon'], React.ReactNode> = {
  code: <Code2 className="h-4 w-4" />,
  blocks: <Blocks className="h-4 w-4" />,
  store: <Store className="h-4 w-4" />,
  bot: <Bot className="h-4 w-4" />,
  search: <Search className="h-4 w-4" />,
  database: <Database className="h-4 w-4" />,
  chart: <BarChart3 className="h-4 w-4" />,
  shield: <ShieldCheck className="h-4 w-4" />,
};

function PropertyRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-1.5 sm:flex-row sm:items-start sm:gap-2">
      <div className="flex w-40 shrink-0 items-center gap-2 n-muted text-sm">
        <span aria-hidden="true">{icon}</span>
        {label}
      </div>
      <div className="n-text min-w-0 flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function Cover() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  return (
    <div className="relative h-48 w-full overflow-hidden sm:h-64 lg:h-72">
      <motion.img
        src={asset('flowber/world-landscape.webp')}
        alt=""
        style={{ y }}
        className="cover-drift absolute inset-0 h-full w-full object-cover object-[center_22%]"
        fetchPriority="high"
      />
    </div>
  );
}

export default function FlowberCaseStudy() {
  const { lang } = useLang();
  const c = flowberContent[lang];
  const [view, setView] = useState<'timeline' | 'table'>('timeline');
  const [screen, setScreen] = useState(c.screens[0].id);
  const activeScreen = c.screens.find(s => s.id === screen) ?? c.screens[0];

  useSEO({
    title: lang === 'en' ? 'Flowber case study' : 'Caso de estudio Flowber',
    description: c.tldr,
    lang,
    keywords: ['Flowber', 'Full-Stack', 'RAG', 'pgvector', 'dbt', 'DuckDB', 'Supabase', 'Cloudflare Workers AI', 'Data Engineering', 'Guatemala'],
  });

  return (
    <PageTransition>
      <article className="min-h-screen bg-[var(--n-bg)] pb-24">
        <Cover />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12">
            <div className="mx-auto w-full max-w-3xl">
              {/* Page icon overlapping the cover */}
              <motion.img
                src={asset('flowber/logo-mark.webp')}
                alt="Flowber"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: FLUID }}
                className="relative -mt-10 h-20 w-20 rounded-xl shadow-lg ring-4 ring-[var(--n-bg)]"
                width={80}
                height={80}
              />

              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mt-6 flex flex-wrap items-center gap-1 n-muted text-sm">
                <Link to="/" className="n-hover rounded px-1">{c.breadcrumb[0]}</Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                <Link to="/projects" className="n-hover rounded px-1">{c.breadcrumb[1]}</Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="n-text px-1" aria-current="page">{c.breadcrumb[2]}</span>
              </nav>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: FLUID }}
                className="n-text mt-4 max-w-[680px] text-4xl font-bold leading-tight tracking-tight sm:text-5xl sm:leading-tight"
              >
                {c.title}
              </motion.h1>

              {/* Properties */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.25, ease: FLUID }}
                className="n-border mt-6 border-b pb-4"
              >
                <PropertyRow icon={<User className="h-4 w-4" />} label={c.propertyLabels.role}>{c.properties.role}</PropertyRow>
                <PropertyRow icon={<Store className="h-4 w-4" />} label={c.propertyLabels.client}>{c.properties.client}</PropertyRow>
                <PropertyRow icon={<CalendarDays className="h-4 w-4" />} label={c.propertyLabels.period}>{c.properties.period}</PropertyRow>
                <PropertyRow icon={<Circle className="h-4 w-4" />} label={c.propertyLabels.status}>
                  <span className="n-tag n-tag-green gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    {c.properties.status}
                  </span>
                </PropertyRow>
                <PropertyRow icon={<Tags className="h-4 w-4" />} label={c.propertyLabels.areas}>
                  <div className="flex flex-wrap gap-1.5">
                    {c.properties.areas.map(t => <Tag key={t.label} {...t} />)}
                  </div>
                </PropertyRow>
                <PropertyRow icon={<Layers className="h-4 w-4" />} label={c.propertyLabels.stack}>
                  <div className="flex flex-wrap gap-1.5">
                    {c.properties.stack.map(s => <Tag key={s} label={s} color="gray" />)}
                  </div>
                </PropertyRow>
                <PropertyRow icon={<Link2 className="h-4 w-4" />} label={c.propertyLabels.links}>
                  <a href={FLOWBER_LIVE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline decoration-[var(--n-border)] underline-offset-4 transition-colors duration-300 hover:decoration-current">
                    flowber-barberia.pages.dev
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </PropertyRow>
              </motion.div>

              <Reveal className="mt-6">
                <Callout icon={<Lightbulb className="h-5 w-5" />}>{c.tldr}</Callout>
              </Reveal>

              {/* Numbers */}
              <section className="mt-16">
                <SectionHeading id="numeros">{c.sections.numbers}</SectionHeading>
                <div className="n-border grid grid-cols-2 overflow-hidden rounded-lg border sm:grid-cols-4">
                  {c.stats.map((s, i) => (
                    <Reveal key={s.label} delay={(i % 4) * 0.08} className="n-border border-b border-r p-4 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(4n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-last-child(-n+4)]:border-b-0">
                      <p className="n-text text-3xl font-semibold tracking-tight">
                        <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                      </p>
                      <p className="n-text mt-1 text-sm font-semibold">{s.label}</p>
                      <p className="n-muted mt-0.5 text-xs leading-snug">{s.note}</p>
                    </Reveal>
                  ))}
                </div>
              </section>

              {/* Product */}
              <section className="mt-16">
                <SectionHeading id="producto" intro={c.sections.productIntro}>{c.sections.product}</SectionHeading>
                <div role="tablist" aria-label={c.sections.product} className="mb-4 flex gap-1">
                  {c.screens.map(s => (
                    <button
                      key={s.id}
                      role="tab"
                      aria-selected={screen === s.id}
                      onClick={() => setScreen(s.id)}
                      className={`rounded-md px-3 py-1 text-sm transition-colors duration-300 active:scale-[0.98] ${screen === s.id ? 'n-callout n-text font-semibold' : 'n-hover n-muted'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <Reveal>
                  <div className="relative grid grid-cols-[minmax(0,1fr)_28%] items-end gap-4 sm:gap-6">
                    <motion.div key={`d-${activeScreen.id}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: FLUID }}>
                      <BrowserFrame src={asset(activeScreen.desktop)} alt={activeScreen.alt} url="flowber-barberia.pages.dev" />
                    </motion.div>
                    <motion.div key={`m-${activeScreen.id}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: FLUID }} className="translate-y-6">
                      <PhoneFrame src={asset(activeScreen.mobile)} alt={activeScreen.alt} />
                    </motion.div>
                  </div>
                </Reveal>
              </section>

              {/* Hats: Notion gallery view */}
              <section className="mt-24">
                <SectionHeading id="roles" intro={c.sections.hatsIntro}>{c.sections.hats}</SectionHeading>
                <div className="grid gap-3 sm:grid-cols-2">
                  {c.hats.map((h, i) => (
                    <Reveal key={h.id} delay={(i % 2) * 0.08}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.5, ease: FLUID }}
                        className="n-border n-hover h-full rounded-lg border p-4 transition-colors duration-300"
                      >
                        <div className="flex items-center gap-2">
                          <span className="n-callout n-text flex h-8 w-8 items-center justify-center rounded-md" aria-hidden="true">
                            {HAT_ICONS[h.icon]}
                          </span>
                          <h3 className="n-text text-base font-semibold">{h.title}</h3>
                          <span className="ml-auto"><Tag {...h.tag} /></span>
                        </div>
                        <ul className="mt-3 space-y-1.5">
                          {h.points.map(p => (
                            <li key={p} className="n-muted flex gap-2 text-sm leading-relaxed">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--n-muted)]" aria-hidden="true" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </section>

              {/* Timeline: Notion database with two views */}
              <section className="mt-24">
                <SectionHeading id="bitacora" intro={c.sections.timelineIntro}>{c.sections.timeline}</SectionHeading>
                <div role="tablist" aria-label={c.sections.timeline} className="n-border mb-4 flex gap-1 border-b">
                  {(['timeline', 'table'] as const).map(v => (
                    <button
                      key={v}
                      role="tab"
                      aria-selected={view === v}
                      onClick={() => setView(v)}
                      className={`-mb-px flex items-center gap-1.5 border-b-2 px-2 py-2 text-sm transition-colors duration-300 ${view === v ? 'n-text border-current font-semibold' : 'n-muted border-transparent hover:text-[var(--n-text)]'}`}
                    >
                      {v === 'timeline' ? <ListTree className="h-4 w-4" aria-hidden="true" /> : <Table2 className="h-4 w-4" aria-hidden="true" />}
                      {c.views[v]}
                    </button>
                  ))}
                </div>

                {view === 'timeline' ? (
                  <ol className="relative">
                    <motion.span
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 1.6, ease: FLUID }}
                      className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-[var(--n-border)]"
                      aria-hidden="true"
                    />
                    {c.timeline.map((e, i) => (
                      <li key={e.title} className="relative pb-8 pl-8 last:pb-0">
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true, margin: '-64px' }}
                          transition={{ duration: 0.6, delay: i * 0.05, ease: FLUID }}
                          className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${e.status === 'live' ? 'border-emerald-500 bg-emerald-500' : 'border-[var(--n-muted)] bg-[var(--n-bg)]'}`}
                          aria-hidden="true"
                        >
                          {e.status === 'live' && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-50" />}
                        </motion.span>
                        <Reveal delay={i * 0.05}>
                          <p className="font-mono-geist n-muted text-xs uppercase tracking-wider">{e.date}</p>
                          <h3 className="n-text mt-1 text-lg font-semibold">{e.title}</h3>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {e.tags.map(t => <Tag key={t.label} {...t} />)}
                          </div>
                          <p className="n-muted mt-2 text-base leading-relaxed">{e.body}</p>
                        </Reveal>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: FLUID }} className="n-border overflow-x-auto rounded-lg border">
                    <table className="w-full min-w-[640px] text-left text-sm">
                      <thead>
                        <tr className="n-border n-muted border-b">
                          <th className="px-3 py-2 font-normal">{c.tableHeads.date}</th>
                          <th className="px-3 py-2 font-normal">{c.tableHeads.milestone}</th>
                          <th className="px-3 py-2 font-normal">{c.tableHeads.areas}</th>
                          <th className="px-3 py-2 font-normal">{c.tableHeads.status}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {c.timeline.map(e => (
                          <tr key={e.title} className="n-border n-hover border-b last:border-b-0 transition-colors duration-300">
                            <td className="font-mono-geist n-muted whitespace-nowrap px-3 py-2 text-xs">{e.date}</td>
                            <td className="n-text px-3 py-2 font-semibold">{e.title}</td>
                            <td className="px-3 py-2"><div className="flex flex-wrap gap-1">{e.tags.map(t => <Tag key={t.label} {...t} />)}</div></td>
                            <td className="px-3 py-2"><Tag label={c.statusLabels[e.status]} color={e.status === 'live' ? 'green' : 'gray'} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </section>

              {/* Architecture */}
              <section className="mt-24">
                <SectionHeading id="arquitectura" intro={c.sections.architectureIntro}>{c.sections.architecture}</SectionHeading>
                <Pipeline nodes={c.requestPath} label={c.sections.architecture} />
                <div className="mt-6 space-y-0.5">
                  {c.layers.map(l => (
                    <Toggle key={l.title} title={l.title}>{l.body}</Toggle>
                  ))}
                </div>
              </section>

              {/* AI + RAG */}
              <section className="mt-24">
                <SectionHeading id="ia" intro={c.sections.aiIntro}>{c.sections.ai}</SectionHeading>
                <Pipeline nodes={c.ragPath} label="RAG" />
                <Reveal className="mt-6">
                  <ChatDemo turns={c.chat} title={c.chatTitle} note={c.chatNote} />
                </Reveal>
              </section>

              {/* Data + ML */}
              <section className="mt-24">
                <SectionHeading id="datos" intro={c.sections.dataIntro}>{c.sections.data}</SectionHeading>
                <Pipeline nodes={c.etlPath} label="ETL" />
                <Reveal className="mt-6">
                  <div className="n-border overflow-x-auto rounded-lg border">
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead>
                        <tr className="n-border n-muted border-b">
                          <th className="px-3 py-2 font-normal">{c.martHeads.name}</th>
                          <th className="px-3 py-2 font-normal">{c.martHeads.question}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {c.marts.map(m => (
                          <tr key={m.name} className="n-border n-hover border-b last:border-b-0 transition-colors duration-300">
                            <td className="font-mono-geist whitespace-nowrap px-3 py-2 text-xs text-[#eb5757]">{m.name}</td>
                            <td className="n-text px-3 py-2">{m.question}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>
                <Reveal className="mt-6">
                  <figure className="n-code overflow-hidden rounded-lg">
                    <div className="flex items-center justify-between px-4 pt-3">
                      <span className="n-muted text-xs">SQL · dbt</span>
                      <Wrench className="h-3.5 w-3.5 n-muted" aria-hidden="true" />
                    </div>
                    <pre className="overflow-x-auto px-4 py-3 text-xs leading-relaxed n-text font-mono-geist"><code>{CHURN_SQL}</code></pre>
                    <figcaption className="n-muted px-4 pb-3 text-xs">{c.sqlCaption}</figcaption>
                  </figure>
                </Reveal>
              </section>

              {/* Decisions */}
              <section className="mt-24">
                <SectionHeading id="decisiones" intro={c.sections.decisionsIntro}>{c.sections.decisions}</SectionHeading>
                <div className="space-y-0.5">
                  {c.decisions.map((d, i) => (
                    <Toggle key={d.title} title={d.title} defaultOpen={i === 0}>{d.body}</Toggle>
                  ))}
                </div>
              </section>
            </div>

            {/* Sticky outline */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 mt-16">
                <TableOfContents items={c.toc} title={lang === 'en' ? 'On this page' : 'En esta página'} />
              </div>
            </aside>
          </div>

          {/* Tagline reveal */}
          <section className="py-32 text-center" aria-label="Tagline">
            <WordReveal text={c.tagline} />
          </section>

          {/* CTA */}
          <Reveal>
            <div className="n-callout mx-auto max-w-3xl rounded-xl px-6 py-10 text-center">
              <h2 className="n-text text-2xl font-semibold tracking-tight">{c.cta.title}</h2>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={FLOWBER_LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--n-text)] px-4 py-2 text-base font-semibold text-[var(--n-bg)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {c.cta.live}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  to="/contact"
                  className="n-border n-text n-hover inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-base font-semibold transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {c.cta.contact}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="n-muted mt-4 flex items-center justify-center gap-1.5 text-xs">
                <Lock className="h-3 w-3" aria-hidden="true" />
                {c.cta.privateRepo}
              </p>
            </div>
          </Reveal>
        </div>
      </article>
    </PageTransition>
  );
}
