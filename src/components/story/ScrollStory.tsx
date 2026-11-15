import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Lang } from '../../types';
import { INK_TEXT, type InkTone } from '../../data/ink';
import { sfx } from '../../audio/engine';
import InkArt from '../ink/InkArt';

type Chapter = {
  year: string;
  period: string;
  place: string;
  title: string;
  text: string;
  proof: { v: string; l: string }[];
  art: string;
  tone: InkTone;
};

/* Every fact here is in profile-en/es.ts (experience, arc, projects) */
const COPY: Record<Lang, { eyebrow: string; title: string; intro: string; more: string; chapter: string; chapters: Chapter[] }> = {
  en: {
    eyebrow: 'The story',
    title: 'From a 24/7 NOC to the data platform',
    intro: 'Seven years, four sheets. Scroll and each one is printed in the ink of where it happened.',
    more: 'See every role in the resume',
    chapter: 'Chapter',
    chapters: [
      {
        year: '2019', period: '2019 – 2023', place: 'IDT · Red Chapina, 24/7 NOC', title: 'Keep it running', art: 'ink-remesas', tone: 'teal',
        text: 'Four years watching the infrastructure behind international remittances, around the clock. I learned to read a system through its signals, and to write down what fixes it.',
        proof: [{ v: '−25%', l: 'mean time to recovery' }, { v: '60%', l: 'faster incident response' }],
      },
      {
        year: '2023', period: '2023 – 2026', place: 'Alleviate Financial Solutions, US fintech', title: 'Measure it', art: 'ink-bi', tone: 'blue',
        text: 'I started in IT support. The same reporting gaps kept reaching my desk, so I made them the case for a BI role and became its first hire. Five departments moved from spreadsheets to one model in Snowflake.',
        proof: [{ v: '85% → 99.5%', l: 'data accuracy' }, { v: '2+ days → 30 min', l: 'reporting cycle' }],
      },
      {
        year: '2024', period: '2024 – today', place: 'Flowber, a barbershop in production', title: 'Build it alone', art: 'ink-barberia', tone: 'coral',
        text: 'A barbershop ran on a paper book. I built, by myself, the platform it runs on: online booking, an AI agent that books with live data, RAG on pgvector and a dbt + DuckDB warehouse.',
        proof: [{ v: '160+', l: 'appointments in production' }, { v: '20', l: 'tools in the AI agent' }],
      },
      {
        year: '2026', period: 'Nov 2026 – today', place: 'Alleviate, Data Engineer', title: 'Own the platform', art: 'ink-data', tone: 'blue',
        text: 'Promoted to Data Engineer, I now run the platform I built: Snowflake, dbt and Azure Data Factory, with Databricks, GitLab CI and API integrations. From November 23, also AI Implementation Engineer through Virtrify, part time.',
        proof: [{ v: '5', l: 'departments on one source of truth' }, { v: '15+', l: 'dashboards they read' }],
      },
    ],
  },
  es: {
    eyebrow: 'La historia',
    title: 'De un NOC 24/7 a la plataforma de datos',
    intro: 'Siete años, cuatro hojas. Al bajar, cada una se imprime con la tinta del lugar donde pasó.',
    more: 'Ver cada rol en el CV',
    chapter: 'Capítulo',
    chapters: [
      {
        year: '2019', period: '2019 – 2023', place: 'IDT · Red Chapina, NOC 24/7', title: 'Mantenerlo en pie', art: 'ink-remesas', tone: 'teal',
        text: 'Cuatro años vigilando la infraestructura detrás de las remesas internacionales, día y noche. Aprendí a leer un sistema por sus señales y a dejar por escrito lo que lo arregla.',
        proof: [{ v: '−25%', l: 'tiempo medio de recuperación' }, { v: '60%', l: 'respuesta a incidentes más rápida' }],
      },
      {
        year: '2023', period: '2023 – 2026', place: 'Alleviate Financial Solutions, fintech de EE. UU.', title: 'Medirlo', art: 'ink-bi', tone: 'blue',
        text: 'Entré en soporte de TI. Las mismas fallas de reportes llegaban una y otra vez a mi escritorio, así que las convertí en el caso para un rol de BI y fui su primera contratación. Cinco departamentos pasaron de hojas de cálculo a un solo modelo en Snowflake.',
        proof: [{ v: '85% → 99.5%', l: 'precisión de datos' }, { v: '2+ días → 30 min', l: 'ciclo de reportes' }],
      },
      {
        year: '2024', period: '2024 – hoy', place: 'Flowber, una barbería en producción', title: 'Construirlo solo', art: 'ink-barberia', tone: 'coral',
        text: 'Una barbería funcionaba con un cuaderno de papel. Construí solo la plataforma con la que opera: reservas en línea, un agente de IA que reserva con datos en vivo, RAG sobre pgvector y un warehouse con dbt + DuckDB.',
        proof: [{ v: '160+', l: 'citas en producción' }, { v: '20', l: 'herramientas del agente de IA' }],
      },
      {
        year: '2026', period: 'nov 2026 – hoy', place: 'Alleviate, Ingeniero de Datos', title: 'Hacerme cargo de la plataforma', art: 'ink-data', tone: 'blue',
        text: 'Ascendido a Ingeniero de Datos, hoy opero la plataforma que construí: Snowflake, dbt y Azure Data Factory, con Databricks, GitLab CI e integraciones por API. Desde el 23 de noviembre, también AI Implementation Engineer a través de Virtrify, a medio tiempo.',
        proof: [{ v: '5', l: 'departamentos en una sola fuente de verdad' }, { v: '15+', l: 'dashboards que consultan' }],
      },
    ],
  },
};

/** Bodoni draws +, → and − poorly: those glyphs go in Geist, as in InkFigures */
function Figure({ text }: { text: string }) {
  return (
    <>
      {text.split(/([+→−])/).map((part, i) =>
        /^[+→−]$/.test(part) ? <span key={i} className="mx-0.5 font-sans text-[0.6em] font-light">{part}</span> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

/**
 * Home's story, told while scrolling. On wide screens a sticky stage holds the
 * year and the engraving of the chapter being read; as each chapter crosses the
 * middle of the screen its engraving is printed in, top to bottom, in that
 * chapter's ink, and the thread on the left fills to it. The page scrolls
 * natively: nothing is pinned against the reader's will. Narrow screens get
 * the same chapters stacked, each with its own engraving.
 */
export default function ScrollStory({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const n = t.chapters.length;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const first = useRef(true);

  // The chapter crossing the middle of the screen is the one on stage
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = refs.current.indexOf(e.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    refs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, [n]);

  // The press makes a sound when a new sheet is printed (silent while sound is off)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    sfx('print');
  }, [active]);

  const now = t.chapters[active];
  const fill = { '--story-fill': n > 1 ? active / (n - 1) : 1 } as CSSProperties;

  return (
    <section className="story mt-24" aria-labelledby="story-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="n-muted text-sm">{t.eyebrow}</p>
        <h2 id="story-title" className="font-display mt-1 max-w-3xl text-4xl leading-tight sm:text-5xl">{t.title}</h2>
        <p className="n-muted mt-3 max-w-xl text-base">{t.intro}</p>

        <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* Stage: sticky on wide screens, decorative (the chapters carry the words) */}
          <div className="story-stage hidden lg:block" aria-hidden="true">
            <div className="sticky top-24 flex h-[calc(100vh-8rem)] max-h-[44rem] min-h-[30rem] gap-8">
              {/* The thread: one mark per chapter, filled up to the one on stage */}
              <div className="relative flex w-12 shrink-0 flex-col justify-between py-2" style={fill}>
                <span className="absolute bottom-3 left-[5px] top-3 w-px bg-n-border" />
                <span className={`story-thread absolute left-[5px] top-3 w-px bg-current ${INK_TEXT[now.tone]}`} />
                {t.chapters.map((c, i) => (
                  <span key={c.year} className="relative flex items-center gap-3">
                    <span
                      className={`story-dot h-[11px] w-[11px] rounded-full border ${i <= active ? `border-current bg-current ${INK_TEXT[c.tone]}` : 'border-n-border bg-n-bg'}`}
                    />
                    <span className={`text-xs tabular-nums transition-colors duration-300 ${i === active ? 'n-text' : 'n-muted'}`}>{c.year}</span>
                  </span>
                ))}
              </div>

              <div className="relative min-w-0 flex-1">
                {/* All four engravings are laid out; the one on stage is printed in */}
                {t.chapters.map((c, i) => (
                  <InkArt
                    key={c.art}
                    name={c.art}
                    className={`story-art absolute inset-x-0 bottom-0 top-24 ${INK_TEXT[c.tone]} ${i === active ? 'is-on' : ''}`}
                  />
                ))}
                {/* The year, in Bodoni, swaps with a short rise */}
                <div className="relative h-28 overflow-hidden">
                  {t.chapters.map((c, i) => (
                    <p
                      key={c.year}
                      className={`story-year font-display absolute left-0 top-0 text-[7rem] leading-none tabular-nums ${INK_TEXT[c.tone]} ${i === active ? 'is-on' : ''}`}
                    >
                      {c.year}
                    </p>
                  ))}
                </div>
                <p className="n-muted relative mt-1 text-sm tabular-nums">
                  {t.chapter} {active + 1} / {n}
                </p>
              </div>
            </div>
          </div>

          {/* The chapters: the words, read in order */}
          <ol className="relative">
            {t.chapters.map((c, i) => {
              const ink = INK_TEXT[c.tone];
              return (
                <li
                  key={c.year}
                  ref={el => { refs.current[i] = el; }}
                  className={`flex flex-col justify-center border-t border-n-border py-12 lg:min-h-[78vh] lg:border-t-0 lg:py-16 ${i === 0 ? 'border-t-0' : ''}`}
                >
                  {/* Narrow screens: the engraving and year sit with the chapter */}
                  <div className="mb-5 flex items-end justify-between gap-4 lg:hidden">
                    <p className={`font-display text-5xl leading-none tabular-nums ${ink}`}>{c.year}</p>
                    <InkArt name={c.art} className={`h-24 w-40 ${ink}`} />
                  </div>
                  <p className="n-muted text-xs tabular-nums">{c.period} · {c.place}</p>
                  <h3 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">{c.title}</h3>
                  <p className="n-muted mt-4 max-w-prose text-base leading-relaxed">{c.text}</p>
                  <dl className="mt-6 grid max-w-md grid-cols-2 gap-6 border-t border-n-border pt-5">
                    {c.proof.map(p => (
                      <div key={p.l}>
                        <dt className="sr-only">{p.l}</dt>
                        <dd className={`font-display whitespace-nowrap text-xl leading-none tabular-nums sm:text-2xl xl:text-3xl ${ink}`}>
                          <Figure text={p.v} />
                        </dd>
                        <dd className="n-muted mt-2 text-xs leading-snug">{p.l}</dd>
                      </div>
                    ))}
                  </dl>
                  {i === n - 1 && (
                    <p className="mt-8 text-sm">
                      <Link
                        to="/resume"
                        className="n-text group inline-flex items-center gap-1.5 font-medium underline decoration-n-border underline-offset-4 transition-colors duration-300 hover:decoration-current n-focus"
                      >
                        {t.more}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
