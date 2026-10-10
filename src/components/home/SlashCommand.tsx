import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Blocks, Bot, Briefcase, Code2, CornerDownLeft, Database } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { FLUID } from '../../utils/animations';

type Option = {
  id: string;
  cmd: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  title: string;
  metric: string;
  metricLabel: string;
  points: string[];
  to: string;
  cta: string;
};

const OPTIONS: Record<'es' | 'en', Option[]> = {
  es: [
    { id: 'data', cmd: '/ingeniero-de-datos', label: 'Ingeniero de datos', hint: 'Snowflake · dbt · ADF · DuckDB', icon: <Database className="h-4 w-4" />, title: 'Plataformas de datos que la gente usa para decidir', metric: '85% → 99.5%', metricLabel: 'precisión de datos en Alleviate', points: ['Capa analítica en Snowflake para 5 departamentos', 'Pipelines ETL/ELT con dbt y Azure Data Factory', 'Warehouse medallion con dbt + DuckDB en Flowber'], to: '/resume', cta: 'Ver experiencia' },
    { id: 'fullstack', cmd: '/full-stack', label: 'Full-Stack', hint: 'React · TypeScript · Supabase', icon: <Code2 className="h-4 w-4" />, title: 'Productos completos, del modelo de datos a la UI', metric: '22 rutas', metricLabel: 'y 13 Edge Functions en producción', points: ['React + TypeScript estricto con code splitting', 'Backend serverless con Postgres, RLS y Deno', 'CI/CD a Cloudflare Pages en cada push'], to: '/flowber', cta: 'Ver Flowber' },
    { id: 'ai', cmd: '/ia-y-rag', label: 'IA y RAG', hint: 'Agentes · pgvector · evaluación', icon: <Bot className="h-4 w-4" />, title: 'IA anclada en datos reales, con permisos reales', metric: '100% hit@1', metricLabel: 'en el golden set de recuperación', points: ['Agente con 20 herramientas filtradas por rol', 'RAG con pgvector y embeddings bge-m3', 'Guardrails que rechazan cifras inventadas'], to: '/flowber', cta: 'Ver el agente' },
    { id: 'arch', cmd: '/arquitectura', label: 'Arquitectura', hint: 'Serverless · seguridad · costos', icon: <Blocks className="h-4 w-4" />, title: 'Sistemas simples de operar y baratos de mantener', metric: '$0', metricLabel: 'de infraestructura en Flowber', points: ['Seguridad en la base con Row-Level Security', 'Reglas de negocio como restricciones, no como código', 'Decisiones documentadas con su porqué'], to: '/flowber', cta: 'Ver decisiones' },
    { id: 'services', cmd: '/servicios', label: 'Contratar por proyecto', hint: 'Remoto · inglés y español', icon: <Briefcase className="h-4 w-4" />, title: 'Te ayudo a digitalizar tu operación', metric: 'EN · ES', metricLabel: 'remoto, horario alineado con EE. UU.', points: ['Transformación digital para negocios', 'Pipelines, warehouses y dashboards', 'Asistentes de IA sobre tus datos'], to: '/contact', cta: 'Hablemos' },
  ],
  en: [
    { id: 'data', cmd: '/data-engineer', label: 'Data engineer', hint: 'Snowflake · dbt · ADF · DuckDB', icon: <Database className="h-4 w-4" />, title: 'Data platforms people actually decide with', metric: '85% → 99.5%', metricLabel: 'data accuracy at Alleviate', points: ['Snowflake analytics layer for 5 departments', 'ETL/ELT pipelines with dbt and Azure Data Factory', 'Medallion warehouse with dbt + DuckDB at Flowber'], to: '/resume', cta: 'See experience' },
    { id: 'fullstack', cmd: '/full-stack', label: 'Full-Stack', hint: 'React · TypeScript · Supabase', icon: <Code2 className="h-4 w-4" />, title: 'Whole products, from data model to UI', metric: '22 routes', metricLabel: 'and 13 Edge Functions in production', points: ['Strict React + TypeScript with code splitting', 'Serverless backend on Postgres, RLS, and Deno', 'CI/CD to Cloudflare Pages on every push'], to: '/flowber', cta: 'See Flowber' },
    { id: 'ai', cmd: '/ai-and-rag', label: 'AI and RAG', hint: 'Agents · pgvector · evaluation', icon: <Bot className="h-4 w-4" />, title: 'AI grounded in real data, with real permissions', metric: '100% hit@1', metricLabel: 'on the retrieval golden set', points: ['Agent with 20 role-scoped tools', 'RAG with pgvector and bge-m3 embeddings', 'Guardrails that reject invented figures'], to: '/flowber', cta: 'See the agent' },
    { id: 'arch', cmd: '/architecture', label: 'Architecture', hint: 'Serverless · security · cost', icon: <Blocks className="h-4 w-4" />, title: 'Systems that are simple to run and cheap to keep', metric: '$0', metricLabel: 'infrastructure at Flowber', points: ['Security in the database with Row-Level Security', 'Business rules as constraints, not code', 'Decisions documented with their why'], to: '/flowber', cta: 'See decisions' },
    { id: 'services', cmd: '/services', label: 'Hire me for a project', hint: 'Remote · English and Spanish', icon: <Briefcase className="h-4 w-4" />, title: 'I help you digitize your operation', metric: 'EN · ES', metricLabel: 'remote, hours aligned with the US', points: ['Digital transformation for businesses', 'Pipelines, warehouses, and dashboards', 'AI assistants on top of your data'], to: '/contact', cta: "Let's talk" },
  ],
};

/** Notion-style "/" command menu that demos itself, then hands control to the visitor. */
export default function SlashCommand() {
  const { lang } = useLang();
  const options = OPTIONS[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [typed, setTyped] = useState('');
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const current = options[active];

  // Type "/" then the command name, like someone using Notion
  useEffect(() => {
    if (!inView) return;
    const target = current.cmd;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = reduce ? target.length - 1 : 0;
    const t = window.setInterval(() => {
      i += 1;
      setTyped(target.slice(0, i));
      if (i >= target.length) window.clearInterval(t);
    }, reduce ? 0 : 45);
    return () => window.clearInterval(t);
  }, [inView, current.cmd]);

  // Auto-cycle until the visitor interacts
  useEffect(() => {
    if (!inView || !auto) return;
    const t = window.setTimeout(() => setActive(a => (a + 1) % options.length), 4200);
    return () => window.clearTimeout(t);
  }, [inView, auto, active, options.length]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      choose((active + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      choose((active - 1 + options.length) % options.length);
    }
  };

  return (
    <div ref={ref} className="n-border overflow-hidden rounded-2xl border bg-[var(--n-bg)] shadow-xl shadow-black/5">
      {/* Editor line */}
      <div className="n-border flex items-center gap-2 border-b px-4 py-3">
        <span className="n-muted text-sm">{lang === 'en' ? 'Type' : 'Escribe'}</span>
        <span className="n-text font-mono-geist text-sm">
          {typed}
          <span className="typing-cursor" aria-hidden="true" />
        </span>
        <span className="n-muted ml-auto hidden items-center gap-1 text-xs sm:flex">
          <kbd className="n-callout rounded px-1.5 py-0.5 font-mono-geist">↑</kbd>
          <kbd className="n-callout rounded px-1.5 py-0.5 font-mono-geist">↓</kbd>
          {lang === 'en' ? 'to explore' : 'para explorar'}
        </span>
      </div>

      <div className="grid md:grid-cols-[260px_minmax(0,1fr)]">
        {/* Menu */}
        <div role="listbox" aria-label={lang === 'en' ? 'Profiles' : 'Perfiles'} tabIndex={0} onKeyDown={onKeyDown} className="n-border border-b p-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--n-accent)] md:border-b-0 md:border-r">
          <p className="n-muted px-2 pb-1 pt-1 text-xs">{lang === 'en' ? 'Basic blocks' : 'Bloques básicos'}</p>
          {options.map((o, i) => (
            <button
              key={o.id}
              type="button"
              role="option"
              aria-selected={i === active}
              onClick={() => choose(i)}
              onMouseEnter={() => choose(i)}
              tabIndex={-1}
              className="relative flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left"
            >
              {i === active && (
                <motion.span layoutId="slash-active" className="absolute inset-0 rounded-md bg-[var(--n-hover)]" transition={{ duration: 0.5, ease: FLUID }} />
              )}
              <span className="n-border n-text relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-[var(--n-bg)]">{o.icon}</span>
              <span className="relative min-w-0">
                <span className="n-text block text-sm font-semibold">{o.label}</span>
                <span className="n-muted block truncate text-xs">{o.hint}</span>
              </span>
              {i === active && <CornerDownLeft className="n-muted relative ml-auto h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
            </button>
          ))}
        </div>

        {/* Rendered block */}
        <div className="relative min-h-[300px] p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.6, ease: FLUID }}
            >
              <h3 className="n-text text-2xl font-semibold tracking-tight">{current.title}</h3>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="n-text text-4xl font-semibold tabular-nums tracking-tight">{current.metric}</span>
                <span className="n-muted text-sm">{current.metricLabel}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {current.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: FLUID }}
                    className="n-muted flex items-start gap-2 text-base"
                  >
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--n-muted)]" aria-hidden="true" />
                    {p}
                  </motion.li>
                ))}
              </ul>
              <Link
                to={current.to}
                className="n-text group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-[var(--n-border)] underline-offset-4 transition-colors duration-300 hover:decoration-current"
              >
                {current.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>
          {auto && inView && (
            <motion.span
              key={`bar-${active}`}
              className="absolute bottom-0 left-0 h-0.5 bg-[var(--n-accent)]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4.2, ease: 'linear' }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}
