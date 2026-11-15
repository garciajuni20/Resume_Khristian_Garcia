import type { Tone } from './kit';

export type Lang = 'es' | 'en';

export interface Stop {
  year: string;
  company: string;
  industry: string;
  role: string;
  metrics: { value: string; label: string }[];
  /** Ink of the industry, as on the site (src/data/ink.ts INK_TONE) */
  tone: Tone;
  /** Engravings of the industry (video/public/ink), one or two */
  art: string[];
}

export interface Copy {
  tag: string;
  /** Marks the current stop, in gold as on the site */
  today: string;
  name: string;
  headline: string;
  roles: string[];
  numbers: { value: number; suffix: string; label: string }[];
  numbersTitle: string;
  timelineTitle: string;
  stops: Stop[];
  showcaseEyebrow: string;
  showcaseTitle: string;
  showcaseBody: string;
  chips: string[];
  stackTitle: string;
  stack: { title: string; items: string[] }[];
  outroTitle: string;
  outroLine: string;
  email: string;
  site: string;
}

const STACK_ITEMS = {
  data: ['Snowflake', 'dbt', 'Azure Data Factory', 'Databricks', 'DuckDB', 'SQL · Python'],
  build: ['React · TypeScript', 'Supabase · PostgreSQL', 'Workers AI · Llama 4', 'RAG · pgvector', 'Deno Edge Functions'],
  ops: ['Azure · GCP · AWS', 'GitLab CI · GitHub Actions', 'API integrations', 'Docker · Cloudflare', 'Power BI · Tableau'],
};

export const COPY: Record<Lang, Copy> = {
  es: {
    tag: 'Trayectoria · 2019 → 2026',
    today: 'hoy',
    name: 'Khristian Garcia',
    headline: 'Ingeniero de Datos · Snowflake, dbt, Azure Data Factory',
    roles: ['Datos', 'Full-Stack', 'IA y RAG', 'Arquitectura'],
    numbersTitle: 'En pocas palabras',
    numbers: [
      { value: 7, suffix: '+', label: 'años en tecnología' },
      { value: 5, suffix: '', label: 'industrias' },
      { value: 2, suffix: '', label: 'idiomas de trabajo' },
    ],
    timelineTitle: 'De dónde vengo',
    stops: [
      { year: '2019', company: 'IDT · Red Chapina', industry: 'Remesas internacionales', role: 'Analista NOC 24/7', tone: 'teal', art: ['ink-remesas'], metrics: [{ value: '−25%', label: 'tiempo de recuperación (MTTR)' }, { value: '5,000+', label: 'usuarios concurrentes' }] },
      { year: '2023', company: 'Alleviate Financial Solutions', industry: 'Consolidación de deudas · EE. UU.', role: 'De soporte TI a BI e ingeniería de datos', tone: 'blue', art: ['ink-bi'], metrics: [{ value: '85% → 99.5%', label: 'precisión de datos' }, { value: '2 días → 30 min', label: 'ciclo de reportes' }] },
      { year: '2024', company: 'Flowber · Danover', industry: 'Retail de servicios · Barbería', role: 'Full-stack, arquitecto, datos e IA', tone: 'coral', art: ['ink-barberia'], metrics: [{ value: '160+', label: 'citas en producción' }, { value: '100%', label: 'hit@1 en RAG' }] },
      { year: '2025', company: 'Universidad de San Carlos', industry: 'Educación superior', role: 'Instructor académico', tone: 'violet', art: ['ink-educacion'], metrics: [{ value: 'BI', label: 'ERP/CRM y transformación digital' }, { value: 'USAC', label: 'Ingeniería en Sistemas, completada en 2026' }] },
      { year: '2026', company: 'Alleviate · Virtrify', industry: 'Datos e IA · EE. UU.', role: 'Ingeniero de Datos · AI Implementation Engineer', tone: 'blue', art: ['ink-data', 'ink-bienestar'], metrics: [{ value: 'nov 2026', label: 'promoción a Ingeniero de Datos' }, { value: 'CRM + n8n', label: 'automatización con IA para una marca de bienestar' }] },
    ],
    showcaseEyebrow: 'Proyecto destacado · ene 2024 → hoy',
    showcaseTitle: 'Flowber: del cuaderno a la nube',
    showcaseBody: 'Llevé la barbería de Danover de la idea a producción como único ingeniero.',
    chips: ['Agente IA · 20 herramientas', 'RAG · pgvector · 100% hit@1', 'dbt + DuckDB · 50 tests', 'Postgres RLS · $0 de infraestructura'],
    stackTitle: 'Con qué construyo',
    stack: [
      { title: 'Datos', items: STACK_ITEMS.data },
      { title: 'Producto e IA', items: STACK_ITEMS.build },
      { title: 'Cloud y BI', items: STACK_ITEMS.ops },
    ],
    outroTitle: 'Construyamos algo juntos',
    outroLine: 'Abierto a roles de Datos e IA · inglés y español',
    email: 'garciajuni20@gmail.com',
    site: 'resume-khristian-garcia.pages.dev',
  },
  en: {
    tag: 'Career · 2019 → 2026',
    today: 'today',
    name: 'Khristian Garcia',
    headline: 'Data Engineer · Snowflake, dbt, Azure Data Factory',
    roles: ['Data', 'Full-Stack', 'AI and RAG', 'Architecture'],
    numbersTitle: 'In short',
    numbers: [
      { value: 7, suffix: '+', label: 'years in tech' },
      { value: 5, suffix: '', label: 'industries' },
      { value: 2, suffix: '', label: 'working languages' },
    ],
    timelineTitle: 'Where I come from',
    stops: [
      { year: '2019', company: 'IDT · Red Chapina', industry: 'International remittances', role: '24/7 NOC analyst', tone: 'teal', art: ['ink-remesas'], metrics: [{ value: '−25%', label: 'mean time to recovery' }, { value: '5,000+', label: 'concurrent users' }] },
      { year: '2023', company: 'Alleviate Financial Solutions', industry: 'Debt consolidation · US', role: 'From IT support to BI and data engineering', tone: 'blue', art: ['ink-bi'], metrics: [{ value: '85% → 99.5%', label: 'data accuracy' }, { value: '2 days → 30 min', label: 'reporting cycle' }] },
      { year: '2024', company: 'Flowber · Danover', industry: 'Service retail · Barbershop', role: 'Full-stack, architect, data and AI', tone: 'coral', art: ['ink-barberia'], metrics: [{ value: '160+', label: 'appointments in production' }, { value: '100%', label: 'RAG hit@1' }] },
      { year: '2025', company: 'Universidad de San Carlos', industry: 'Higher education', role: 'Academic instructor', tone: 'violet', art: ['ink-educacion'], metrics: [{ value: 'BI', label: 'ERP/CRM and digital transformation' }, { value: 'USAC', label: 'Systems Engineering, completed 2026' }] },
      { year: '2026', company: 'Alleviate · Virtrify', industry: 'Data and AI · US', role: 'Data Engineer · AI Implementation Engineer', tone: 'blue', art: ['ink-data', 'ink-bienestar'], metrics: [{ value: 'Nov 2026', label: 'promoted to Data Engineer' }, { value: 'CRM + n8n', label: 'AI automation for a wellness brand' }] },
    ],
    showcaseEyebrow: 'Featured project · Jan 2024 → today',
    showcaseTitle: 'Flowber: from a notebook to the cloud',
    showcaseBody: "I took Danover's barbershop from idea to production as the sole engineer.",
    chips: ['AI agent · 20 tools', 'RAG · pgvector · 100% hit@1', 'dbt + DuckDB · 50 tests', 'Postgres RLS · $0 infrastructure'],
    stackTitle: 'What I build with',
    stack: [
      { title: 'Data', items: STACK_ITEMS.data },
      { title: 'Product and AI', items: STACK_ITEMS.build },
      { title: 'Cloud and BI', items: STACK_ITEMS.ops },
    ],
    outroTitle: "Let's build something together",
    outroLine: 'Open to Data & AI roles · English and Spanish',
    email: 'garciajuni20@gmail.com',
    site: 'resume-khristian-garcia.pages.dev',
  },
};
