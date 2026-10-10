import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Bot, Check, Languages, Store, Workflow } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { FLUID } from '../../utils/animations';

type Service = { icon: React.ReactNode; title: string; for: string; deliverables: string[]; proof: string };

const COPY: Record<'es' | 'en', { title: string; intro: string; services: Service[]; bilingual: string; cta: string; proofLabel: string }> = {
  es: {
    title: 'Contrátame por proyecto',
    intro: 'Además de buscar mi próximo rol, tomo proyectos como freelance para negocios y equipos de datos. Cada servicio tiene detrás un caso real que puedes revisar.',
    proofLabel: 'Prueba',
    services: [
      { icon: <Store className="h-5 w-5" />, title: 'Transformación digital para tu negocio', for: 'Negocios que operan con papel, Excel o WhatsApp', deliverables: ['App web con reservas, pagos y roles', 'Notificaciones por correo y Telegram', 'Panel con ingresos y clientes'], proof: 'Flowber: 160+ citas en producción' },
      { icon: <Workflow className="h-5 w-5" />, title: 'Pipelines y data warehouse', for: 'Equipos que necesitan una sola fuente de verdad', deliverables: ['ETL/ELT con dbt, ADF o Python', 'Modelado dimensional y tests de calidad', 'Corridas programadas y documentadas'], proof: 'Alleviate: precisión de 85% a 99.5%' },
      { icon: <Bot className="h-5 w-5" />, title: 'Asistentes de IA sobre tus datos', for: 'Empresas que quieren IA sin inventos', deliverables: ['Agente con herramientas y permisos por rol', 'RAG con pgvector y evaluación medida', 'Guardrails contra alucinaciones'], proof: 'Flowber: RAG con 100% hit@1' },
      { icon: <BarChart3 className="h-5 w-5" />, title: 'Dashboards y KPIs', for: 'Dirección que decide con reportes manuales', deliverables: ['Dashboards en Power BI o Tableau', 'Definición de KPIs con el negocio', 'Reportes automáticos'], proof: 'Alleviate: de 2+ días a menos de 30 min' },
    ],
    bilingual: 'Trabajo en inglés y español, remoto desde Guatemala (UTC−6), con horario alineado a EE. UU.',
    cta: 'Cuéntame tu proyecto',
  },
  en: {
    title: 'Hire me for a project',
    intro: 'Besides looking for my next role, I take freelance projects for businesses and data teams. Every service is backed by a real case you can review.',
    proofLabel: 'Proof',
    services: [
      { icon: <Store className="h-5 w-5" />, title: 'Digital transformation for your business', for: 'Businesses running on paper, Excel, or WhatsApp', deliverables: ['Web app with booking, payments, and roles', 'Email and Telegram notifications', 'Dashboard with revenue and customers'], proof: 'Flowber: 160+ appointments in production' },
      { icon: <Workflow className="h-5 w-5" />, title: 'Pipelines and data warehouse', for: 'Teams that need a single source of truth', deliverables: ['ETL/ELT with dbt, ADF, or Python', 'Dimensional modeling and quality tests', 'Scheduled, documented runs'], proof: 'Alleviate: accuracy from 85% to 99.5%' },
      { icon: <Bot className="h-5 w-5" />, title: 'AI assistants on your data', for: 'Companies that want AI without made-up answers', deliverables: ['Agent with tools and role permissions', 'RAG on pgvector with measured evaluation', 'Anti-hallucination guardrails'], proof: 'Flowber: RAG at 100% hit@1' },
      { icon: <BarChart3 className="h-5 w-5" />, title: 'Dashboards and KPIs', for: 'Leadership deciding from manual reports', deliverables: ['Power BI or Tableau dashboards', 'KPI definition with the business', 'Automated reporting'], proof: 'Alleviate: from 2+ days to under 30 min' },
    ],
    bilingual: 'I work in English and Spanish, remotely from Guatemala (UTC−6), with hours aligned to the US.',
    cta: 'Tell me about your project',
  },
};

export default function Services() {
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <section id="servicios" aria-labelledby="services-title" className="scroll-mt-24">
      <h2 id="services-title" className="n-text text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h2>
      <p className="n-muted mt-2 max-w-[680px] text-base leading-relaxed">{t.intro}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {t.services.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: FLUID }}
            whileHover={{ y: -6 }}
            className="n-border group flex flex-col rounded-2xl border bg-[var(--n-bg)] p-6 transition-shadow duration-500 hover:shadow-xl hover:shadow-black/5"
          >
            <span className="n-callout n-text flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-[-8deg] group-hover:scale-110" aria-hidden="true">
              {s.icon}
            </span>
            <h3 className="n-text mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="n-muted mt-1 text-sm">{s.for}</p>
            <ul className="mb-6 mt-4 space-y-2">
              {s.deliverables.map(d => (
                <li key={d} className="n-text flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="n-border mt-auto border-t pt-4 text-xs">
              <span className="n-muted">{t.proofLabel}: </span>
              <span className="n-text font-semibold">{s.proof}</span>
            </p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: FLUID }}
        className="n-callout mt-6 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center"
      >
        <Languages className="n-muted h-6 w-6 shrink-0" aria-hidden="true" />
        <p className="n-text flex-1 text-base">{t.bilingual}</p>
        <Link
          to="/contact"
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--n-text)] px-4 py-2 text-base font-semibold text-[var(--n-bg)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          {t.cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  );
}
