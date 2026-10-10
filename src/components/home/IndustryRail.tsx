import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Banknote, GraduationCap, Landmark, Scissors } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { FLUID } from '../../utils/animations';

type Stop = {
  year: string;
  company: string;
  industry: string;
  role: string;
  proof: string;
  icon: React.ReactNode;
  tone: string;
  /** AI still in public/ai (Wan 2.2, generated locally); cards without one show the icon on a dot grid */
  image?: string;
};

const STOPS: Record<'es' | 'en', Stop[]> = {
  es: [
    { year: '2019', company: 'IDT · Red Chapina', industry: 'Remesas internacionales', role: 'Analista NOC 24/7', proof: 'MTTR 25% menor sobre infraestructura para 5,000+ usuarios concurrentes', icon: <Banknote className="h-5 w-5" />, tone: 'n-tag-green', image: 'ind-remit' },
    { year: '2023', company: 'Alleviate Financial Solutions', industry: 'Consolidación de deudas · EE. UU.', role: 'De soporte TI a BI y datos', proof: 'Precisión de datos de 85% a 99.5% y reportes de 2+ días a menos de 30 min', icon: <Landmark className="h-5 w-5" />, tone: 'n-tag-blue', image: 'ind-fintech' },
    { year: '2024', company: 'Flowber · Danover', industry: 'Retail de servicios · Barbería', role: 'Full-stack, arquitecto, datos e IA', proof: 'De la idea a producción: 160+ citas, agente con RAG y warehouse con ML', icon: <Scissors className="h-5 w-5" />, tone: 'n-tag-purple', image: 'ind-retail' },
    { year: '2025', company: 'Universidad de San Carlos', industry: 'Educación superior', role: 'Instructor académico', proof: 'Sistemas Organizacionales: BI, ERP/CRM y transformación digital', icon: <GraduationCap className="h-5 w-5" />, tone: 'n-tag-orange' },
  ],
  en: [
    { year: '2019', company: 'IDT · Red Chapina', industry: 'International remittances', role: '24/7 NOC analyst', proof: '25% lower MTTR on infrastructure serving 5,000+ concurrent users', icon: <Banknote className="h-5 w-5" />, tone: 'n-tag-green', image: 'ind-remit' },
    { year: '2023', company: 'Alleviate Financial Solutions', industry: 'Debt consolidation · US', role: 'From IT support to BI and data', proof: 'Data accuracy from 85% to 99.5%; reporting from 2+ days to under 30 min', icon: <Landmark className="h-5 w-5" />, tone: 'n-tag-blue', image: 'ind-fintech' },
    { year: '2024', company: 'Flowber · Danover', industry: 'Service retail · Barbershop', role: 'Full-stack, architect, data and AI', proof: 'Idea to production: 160+ appointments, a RAG agent, and an ML warehouse', icon: <Scissors className="h-5 w-5" />, tone: 'n-tag-purple', image: 'ind-retail' },
    { year: '2025', company: 'Universidad de San Carlos', industry: 'Higher education', role: 'Academic instructor', proof: 'Organizational Systems: BI, ERP/CRM, and digital transformation', icon: <GraduationCap className="h-5 w-5" />, tone: 'n-tag-orange' },
  ],
};

function StopCard({ stop }: { stop: Stop }) {
  return (
    <div className="n-border group flex h-full flex-col overflow-hidden rounded-2xl border bg-[var(--n-bg)]">
      <div className="relative h-32 shrink-0 overflow-hidden bg-neutral-900">
        {stop.image ? (
          <img
            src={`${import.meta.env.BASE_URL}ai/${stop.image}.webp`}
            alt=""
            loading="lazy"
            decoding="async"
            width={960}
            height={528}
            className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:16px_16px] text-white/30 [&_svg]:h-14 [&_svg]:w-14" aria-hidden="true">
            {stop.icon}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className={`n-tag ${stop.tone} -mt-11 h-10 w-10 justify-center rounded-lg shadow-md ring-4 ring-[var(--n-bg)]`} aria-hidden="true">{stop.icon}</span>
          <span className="n-muted font-mono-geist -mt-1 text-sm">{stop.year}</span>
        </div>
        <p className="n-muted mt-4 text-xs font-semibold uppercase tracking-wider">{stop.industry}</p>
        <h3 className="n-text mt-1 text-xl font-semibold tracking-tight">{stop.company}</h3>
        <p className="n-text mt-1 text-sm">{stop.role}</p>
        <p className="n-muted mt-auto pt-6 text-sm leading-relaxed">{stop.proof}</p>
      </div>
    </div>
  );
}

/** Pinned section: vertical scroll drives a horizontal journey through industries (desktop). */
export default function IndustryRail() {
  const { lang } = useLang();
  const stops = STOPS[lang];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '-46%']);
  const line = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  const heading = lang === 'en' ? 'Four industries, one way of working' : 'Cuatro industrias, una forma de trabajar';
  const sub =
    lang === 'en'
      ? 'Financial services in the US, service retail, and education: I learn the business first, then build the system.'
      : 'Servicios financieros de EE. UU., retail de servicios y educación: primero entiendo el negocio, después construyo el sistema.';

  const aiNote = lang === 'en' ? 'Card images generated with AI · Wan 2.2, run locally' : 'Imágenes de las tarjetas generadas con IA · Wan 2.2 local';

  return (
    <section aria-label={heading}>
      {/* Mobile and tablet: stacked cards */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:hidden">
        <h2 className="n-text text-3xl font-semibold tracking-tight">{heading}</h2>
        <p className="n-muted mt-2 text-base">{sub}</p>
        <p className="n-muted mt-1 font-mono-geist text-xs">{aiNote}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {stops.map((s, i) => (
            <motion.div
              key={s.company + s.year}
              initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: FLUID }}
            >
              <StopCard stop={s} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop: pinned horizontal rail */}
      <div ref={ref} className="relative hidden h-[260vh] lg:block">
        {/* Left padding aligns with the 64rem content column; the track bleeds to the viewport edge */}
        <div className="sticky top-0 flex h-screen flex-col justify-start overflow-hidden pl-[max(2rem,calc((100vw-64rem)/2+2rem))] pt-28">
          <h2 className="n-text text-4xl font-semibold tracking-tight">{heading}</h2>
          <p className="n-muted mt-2 max-w-[680px] text-lg">{sub}</p>
          <p className="n-muted mt-1 font-mono-geist text-xs">{aiNote}</p>
          <div className="relative mt-10 pr-8">
            <div className="n-border absolute left-0 right-0 top-0 h-px border-t" aria-hidden="true" />
            <motion.div style={{ scaleX: line }} className="absolute left-0 right-0 top-0 h-px origin-left bg-[var(--n-accent)]" aria-hidden="true" />
            <motion.div style={{ x }} className="flex w-max gap-6 pt-8">
              {stops.map(s => (
                <div key={s.company + s.year} className="h-[440px] w-[420px] shrink-0">
                  <StopCard stop={s} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
