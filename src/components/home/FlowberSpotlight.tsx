import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { CountUp, Tag } from '../notion/primitives';
import { BrowserFrame } from '../notion/visuals';
import type { TagColor } from '../../data/flowber';
import { FLUID } from '../../utils/animations';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

const COPY = {
  es: {
    eyebrow: 'Proyecto destacado · ene 2024 → hoy',
    title: 'Flowber: llevé una barbería del cuaderno a la nube',
    body: 'Con Danover, el dueño, a quien conozco desde hace seis años, convertimos una agenda en papel en una plataforma con reservas en línea, un agente de IA que consulta y reserva con datos reales, y un warehouse que predice cancelaciones y demanda. Yo diseñé, construí y opero todo.',
    tags: [['Full-Stack', 'blue'], ['Arquitectura', 'purple'], ['Transformación digital', 'orange'], ['IA · RAG', 'pink'], ['ETL · dbt', 'green']] as [string, TagColor][],
    stats: [
      { v: 160, s: '+', l: 'citas gestionadas' },
      { v: 20, s: '', l: 'herramientas del agente' },
      { v: 50, s: '', l: 'tests de datos' },
    ],
    cta: 'Leer el caso completo',
    ai: 'Clip de marca generado con IA local (Wan2GP)',
  },
  en: {
    eyebrow: 'Featured project · Jan 2024 → today',
    title: 'Flowber: I took a barbershop from a notebook to the cloud',
    body: 'With Danover, the owner and a friend of six years, we turned a paper schedule into a platform with online booking, an AI agent that queries and books with real data, and a warehouse that predicts cancellations and demand. I designed, built, and run all of it.',
    tags: [['Full-Stack', 'blue'], ['Architecture', 'purple'], ['Digital transformation', 'orange'], ['AI · RAG', 'pink'], ['ETL · dbt', 'green']] as [string, TagColor][],
    stats: [
      { v: 160, s: '+', l: 'appointments managed' },
      { v: 20, s: '', l: 'agent tools' },
      { v: 50, s: '', l: 'data tests' },
    ],
    cta: 'Read the full case study',
    ai: 'Brand clip generated with local AI (Wan2GP)',
  },
};

/** Laptop-style reveal: the screenshot tilts back and straightens as it scrolls in. */
export default function FlowberSpotlight() {
  const { lang } = useLang();
  const t = COPY[lang];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [120, 0]);

  return (
    <section aria-labelledby="flowber-spotlight" className="relative">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: FLUID }}
        >
          <p className="n-muted font-mono-geist text-xs uppercase tracking-wider">{t.eyebrow}</p>
          <h2 id="flowber-spotlight" className="n-text mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.title}
          </h2>
          <p className="n-muted mt-4 text-base leading-relaxed">{t.body}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {t.tags.map(([label, color]) => <Tag key={label} label={label} color={color} />)}
          </div>
          <dl className="n-border mt-6 grid grid-cols-3 divide-x divide-[var(--n-border)] rounded-lg border">
            {t.stats.map(s => (
              <div key={s.l} className="px-3 py-3">
                <dt className="n-muted text-xs">{s.l}</dt>
                <dd className="n-text mt-1 text-2xl font-semibold tracking-tight">
                  <CountUp value={s.v} suffix={s.s} />
                </dd>
              </div>
            ))}
          </dl>
          <Link
            to="/flowber"
            className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--n-text)] px-4 py-2 text-base font-semibold text-[var(--n-bg)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>

        <div ref={ref} className="relative pb-10 [perspective:1400px]">
          <motion.div style={{ rotateX, scale, transformOrigin: 'center bottom' }}>
            <BrowserFrame src={asset('flowber/home-desktop.webp')} alt="Flowber" url="flowber-barberia.pages.dev" />
          </motion.div>
          <motion.figure
            style={{ y: phoneY }}
            className="absolute -bottom-2 right-2 w-[30%] min-w-[110px] sm:-right-4"
          >
            <div className="rounded-[1.6rem] border-4 border-neutral-900 bg-neutral-900 p-0.5 shadow-2xl shadow-black/40 dark:border-neutral-700">
              <video
                className="block aspect-[9/16] w-full rounded-[1.3rem] object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={asset('flowber/flowber-art-loop-poster.webp')}
                aria-label={t.ai}
              >
                <source src={asset('flowber/flowber-art-loop.webm')} type="video/webm" />
                <source src={asset('flowber/flowber-art-loop.mp4')} type="video/mp4" />
              </video>
            </div>
            <figcaption className="n-muted mt-2 flex items-start gap-1 text-xs leading-tight">
              <Sparkles className="mt-px h-3 w-3 shrink-0" aria-hidden="true" />
              {t.ai}
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
