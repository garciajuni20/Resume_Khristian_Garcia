/**
 * Content for the Flowber case study (/flowber).
 * Every figure here is verifiable: production counts come from the live
 * Supabase database (Oct 2026), engineering counts from the Flowber repo.
 */

export type TagColor = 'gray' | 'brown' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'red';

export interface FlowberTag {
  label: string;
  color: TagColor;
}

export interface TimelineEntry {
  date: string;
  title: string;
  body: string;
  tags: FlowberTag[];
  status: 'done' | 'live';
}

export interface Hat {
  id: string;
  icon: 'code' | 'blocks' | 'store' | 'bot' | 'search' | 'database' | 'chart' | 'shield';
  title: string;
  tag: FlowberTag;
  points: string[];
}

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  note: string;
}

export interface PipelineNode {
  title: string;
  detail: string;
}

export interface Decision {
  title: string;
  body: string;
}

export interface ChatTurn {
  from: 'user' | 'assistant' | 'tool';
  text: string;
}

export interface FlowberContent {
  breadcrumb: string[];
  title: string;
  properties: {
    role: string;
    client: string;
    period: string;
    status: string;
    areas: FlowberTag[];
    stack: string[];
    links: string;
  };
  propertyLabels: { role: string; client: string; period: string; status: string; areas: string; stack: string; links: string };
  tldr: string;
  toc: { id: string; label: string }[];
  sections: {
    numbers: string;
    product: string;
    productIntro: string;
    hats: string;
    hatsIntro: string;
    timeline: string;
    timelineIntro: string;
    architecture: string;
    architectureIntro: string;
    ai: string;
    aiIntro: string;
    data: string;
    dataIntro: string;
    decisions: string;
    decisionsIntro: string;
  };
  stats: Stat[];
  screens: { id: string; label: string; desktop: string; mobile: string; alt: string }[];
  hats: Hat[];
  timeline: TimelineEntry[];
  views: { timeline: string; table: string };
  tableHeads: { date: string; milestone: string; areas: string; status: string };
  statusLabels: { done: string; live: string };
  requestPath: PipelineNode[];
  layers: Decision[];
  ragPath: PipelineNode[];
  chat: ChatTurn[];
  chatNote: string;
  chatTitle: string;
  etlPath: PipelineNode[];
  marts: { name: string; question: string }[];
  martHeads: { name: string; question: string };
  sqlCaption: string;
  decisions: Decision[];
  tagline: string;
  cta: { title: string; live: string; contact: string; privateRepo: string };
}

const LIVE = 'https://flowber-barberia.pages.dev/';
export const FLOWBER_LIVE_URL = LIVE;

/** Real excerpt from etl/dbt/models/marts/mart_customer_churn_risk.sql */
export const CHURN_SQL = `-- Riesgo de abandono: compara los días sin venir con
-- el PROPIO ritmo del cliente, no con un umbral global.
with visits as (
  select customer_key, start_local::date as visit_date
  from {{ ref('fact_appointment') }}
  where status = 'completed' and customer_key <> 'walk_in'
),
gaps as (
  select customer_key, visit_date,
         date_diff('day', lag(visit_date) over (
           partition by customer_key order by visit_date), visit_date) as gap_days
  from visits
)
select customer_key,
       count(*)                                     as visits,
       max(visit_date)                              as last_visit,
       median(gap_days) filter (where gap_days > 0) as typical_gap_days
from gaps
group by 1
having count(*) >= 2`;

const es: FlowberContent = {
  breadcrumb: ['Khristian Garcia', 'Proyectos', 'Flowber'],
  title: 'Flowber: de un cuaderno de citas a una plataforma con IA y datos',
  propertyLabels: {
    role: 'Rol',
    client: 'Cliente',
    period: 'Periodo',
    status: 'Estado',
    areas: 'Áreas',
    stack: 'Stack',
    links: 'Enlaces',
  },
  properties: {
    role: 'Full-Stack Engineer · Arquitecto de Soluciones · Data & AI Engineer',
    client: 'Danover, barbería en Ciudad Satélite, Mixco (@danover.barbero)',
    period: 'Enero 2024 → hoy',
    status: 'En producción',
    areas: [
      { label: 'Full-Stack', color: 'blue' },
      { label: 'Arquitectura', color: 'purple' },
      { label: 'Transformación digital', color: 'orange' },
      { label: 'IA / LLM', color: 'pink' },
      { label: 'RAG', color: 'red' },
      { label: 'ETL', color: 'yellow' },
      { label: 'Data Engineering', color: 'green' },
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Deno', 'Cloudflare Workers AI', 'pgvector', 'dbt', 'DuckDB', 'Python'],
    links: 'Sitio en vivo',
  },
  tldr:
    'Desde enero de 2024 llevé la barbería de Danover de la idea a producción, como único ingeniero: producto, arquitectura, backend en la base de datos, un agente de IA con RAG y una plataforma de datos con modelos predictivos.',
  toc: [
    { id: 'numeros', label: 'En números' },
    { id: 'producto', label: 'El producto' },
    { id: 'roles', label: 'Los roles que asumí' },
    { id: 'bitacora', label: 'Bitácora' },
    { id: 'arquitectura', label: 'Arquitectura' },
    { id: 'ia', label: 'Agente de IA y RAG' },
    { id: 'datos', label: 'Datos y ML' },
    { id: 'decisiones', label: 'Decisiones' },
  ],
  sections: {
    numbers: 'En números',
    product: 'El producto en producción',
    productIntro: 'Capturas reales de flowber-barberia.pages.dev. Los clientes reservan en menos de un minuto; el barbero y el dueño operan desde el mismo sistema.',
    hats: 'Los roles que asumí',
    hatsIntro: 'Un proyecto, ocho sombreros. Cada tarjeta resume lo que entregué en ese rol.',
    timeline: 'Bitácora: de la idea a hoy',
    timelineIntro: 'Hitos del proyecto. Cambia entre la vista de línea de tiempo y la vista de tabla.',
    architecture: 'Arquitectura',
    architectureIntro: 'Sin servidor propio: el frontend es estático en Cloudflare y la seguridad y las reglas de negocio viven en Postgres.',
    ai: 'Agente de IA y RAG',
    aiIntro: 'Un agente que conversa, consulta y escribe datos reales, siempre con los permisos de quien pregunta.',
    data: 'Ingeniería de datos y ML',
    dataIntro: 'Un warehouse medallion que convierte la operación diaria en métricas, segmentos y predicciones.',
    decisions: 'Decisiones de arquitectura',
    decisionsIntro: 'Las decisiones que más pesaron, con su porqué. Abre cada una.',
  },
  stats: [
    { value: 160, suffix: '+', label: 'citas gestionadas', note: 'en producción desde feb 2026' },
    { value: 90, suffix: '+', label: 'clientes registrados', note: 'más walk-ins en el local' },
    { value: 20, label: 'herramientas del agente', note: '5 escriben datos con confirmación' },
    { value: 100, suffix: '%', label: 'hit@1 en RAG', note: 'sobre el golden set de evaluación' },
    { value: 24, label: 'modelos dbt', note: '50 tests de calidad de datos' },
    { value: 13, label: 'Edge Functions', note: '4 programadas con pg_cron' },
    { value: 2.5, decimals: 1, suffix: ' s', label: 'LCP móvil', note: 'antes 4.8 s, medido con Lighthouse' },
    { value: 0, prefix: '$', label: 'costo de infraestructura', note: 'planes gratuitos con margen medido' },
  ],
  screens: [
    { id: 'home', label: 'Inicio', desktop: 'flowber/home-desktop.webp', mobile: 'flowber/home-mobile.webp', alt: 'Página de inicio de Flowber con el diseño Neón de barrio' },
    { id: 'services', label: 'Servicios', desktop: 'flowber/servicios.webp', mobile: 'flowber/servicios-mobile.webp', alt: 'Catálogo de servicios de Flowber con precios en vivo' },
  ],
  hats: [
    { id: 'fullstack', icon: 'code', title: 'Full-Stack Developer', tag: { label: 'Producto', color: 'blue' }, points: ['SPA en React + TypeScript estricto: 22 rutas con code splitting', '80+ funciones tipadas como única puerta a la base', 'Agenda en tiempo real y algoritmo de disponibilidad en pasos de 15 min'] },
    { id: 'architect', icon: 'blocks', title: 'Arquitecto de Soluciones', tag: { label: 'Sistema', color: 'purple' }, points: ['Serverless: Cloudflare Pages + Supabase, sin servidor propio', 'RLS en todas las tablas y EXCLUDE con GiST contra dobles reservas', '13 Edge Functions y 24 migraciones versionadas'] },
    { id: 'transformation', icon: 'store', title: 'Transformación Digital', tag: { label: 'Negocio', color: 'orange' }, points: ['Del cuaderno y los mensajes a reservas en línea 24/7', 'El dueño ve ingresos, ocupación y clientes en riesgo', 'Recordatorios automáticos al barbero y citas walk-in'] },
    { id: 'ai', icon: 'bot', title: 'Ingeniero de IA', tag: { label: 'LLM', color: 'pink' }, points: ['Agente multi-turno en Llama 4 Scout con 20 herramientas por rol', 'Escrituras con confirmación explícita y re-verificación', 'Proveedores intercambiables con respaldo basado en reglas'] },
    { id: 'rag', icon: 'search', title: 'RAG', tag: { label: 'Recuperación', color: 'red' }, points: ['pgvector con índice HNSW y embeddings multilingües bge-m3', 'La búsqueda respeta el RLS de cada rol (SECURITY INVOKER)', 'Golden set con hit@k y MRR: 100% hit@1'] },
    { id: 'data', icon: 'database', title: 'Data Engineer · ETL', tag: { label: 'Pipelines', color: 'green' }, points: ['Medallion: Postgres → Parquet → dbt + DuckDB', 'Esquema estrella con 4 dimensiones y 3 hechos, sin PII', 'Corrida nocturna en GitHub Actions con rol de solo lectura'] },
    { id: 'bi', icon: 'chart', title: 'BI y Machine Learning', tag: { label: 'Analítica', color: 'yellow' }, points: ['RFM, riesgo de abandono, mapa de calor y embudo de reservas', 'Regresión logística de cancelación con validación temporal', 'Una sola capa de métricas para panel, asistente y Telegram'] },
    { id: 'devops', icon: 'shield', title: 'DevOps y Seguridad', tag: { label: 'Operación', color: 'gray' }, points: ['CI/CD a Cloudflare Pages en cada push', 'Auditorías documentadas, CSP estricta y webhooks verificados', 'pg_cron con secretos en Vault; LCP móvil de 4.8 s a 2.5 s'] },
  ],
  timeline: [
    { date: 'Ene 2024', title: 'Kickoff con Danover', status: 'done', tags: [{ label: 'Transformación digital', color: 'orange' }, { label: 'Producto', color: 'blue' }], body: 'Nace la idea con Danover, dueño de la barbería. La agenda vivía en un cuaderno y en mensajes: levanto el proceso real de cómo se pide una cita, qué se cobra y dónde se pierde dinero.' },
    { date: '2024 → 2025', title: 'Descubrimiento y diseño', status: 'done', tags: [{ label: 'Arquitectura', color: 'purple' }], body: 'Mapeo de procesos, modelo de datos (barberos, servicios, horarios, descansos, citas y pagos) y la decisión de fondo: serverless sobre Supabase y Cloudflare, sin servidor que mantener.' },
    { date: 'Feb 2026', title: 'Primera reserva real', status: 'done', tags: [{ label: 'Full-Stack', color: 'blue' }], body: 'La plataforma entra en producción y el 7 de febrero de 2026 se registra la primera cita real en el sistema.' },
    { date: 'Abr 2026', title: 'Panel de operación y BI', status: 'done', tags: [{ label: 'Full-Stack', color: 'blue' }, { label: 'BI', color: 'yellow' }], body: 'Administración completa, módulo de BI con pagos y gastos, correo transaccional, registro de auditoría y bot de Telegram con vinculación de cuenta.' },
    { date: 'Jun 2026', title: 'Tiempo real y asistente con IA', status: 'done', tags: [{ label: 'IA / LLM', color: 'pink' }, { label: 'Full-Stack', color: 'blue' }], body: 'Agenda que se actualiza sola, primer asistente por intents y luego un LLM en Workers AI con function calling, reserva conversacional, n8n en Docker y el sistema de diseño de marca.' },
    { date: 'Jul 2026', title: 'Auditorías de seguridad', status: 'done', tags: [{ label: 'Seguridad', color: 'gray' }], body: 'RLS canónico (una política por comando), cierre de brechas de acceso en funciones de notificación, RPC de descuentos con trigger guardián, citas walk-in y bot de Telegram por rol.' },
    { date: 'Oct 2026', title: 'Datos, RAG y rediseño', status: 'done', tags: [{ label: 'Data Engineering', color: 'green' }, { label: 'RAG', color: 'red' }], body: 'Warehouse dbt + DuckDB con modelos de ML, RAG con pgvector, rediseño "Neón de barrio", Google OAuth, recordatorios con pg_cron, campañas de lealtad por correo, cierre diario para el staff, reenganche asistido por IA y una sola capa de métricas. Retiré la API de WhatsApp por costo.' },
    { date: 'Hoy', title: 'En producción y creciendo', status: 'live', tags: [{ label: 'Operación', color: 'gray' }], body: '160+ citas, 90+ clientes registrados y 190+ mensajes atendidos por el asistente. El negocio opera sobre la plataforma todos los días.' },
  ],
  views: { timeline: 'Línea de tiempo', table: 'Tabla' },
  tableHeads: { date: 'Fecha', milestone: 'Hito', areas: 'Áreas', status: 'Estado' },
  statusLabels: { done: 'Completado', live: 'En vivo' },
  requestPath: [
    { title: 'Cliente · Barbero · Admin', detail: 'Navegador o Telegram' },
    { title: 'Cloudflare Pages', detail: 'SPA React en CDN, CSP y HSTS' },
    { title: 'Supabase Auth', detail: 'JWT con el rol del usuario' },
    { title: 'Postgres + RLS', detail: 'Cada tabla decide qué filas ve el rol' },
    { title: 'Edge Functions', detail: 'Correo, Telegram, IA y cron' },
  ],
  layers: [
    { title: 'Frontend: React 18 + TypeScript', body: '22 rutas, 10 protegidas por sesión y rol. Las páginas pesadas de admin y BI cargan en diferido; todo acceso a datos pasa por una sola capa tipada. Tailwind v4 con tokens: un cambio de token re-tematizó toda la app al pasar a "Neón de barrio".' },
    { title: 'Base de datos: PostgreSQL con RLS', body: 'Row-Level Security en todas las tablas con una política por comando. La doble reserva es imposible por una restricción EXCLUDE con índice GiST; el pago se crea por trigger al completar la cita y hay un solo pago por cita.' },
    { title: 'Backend: 13 Edge Functions en Deno', body: 'Notificaciones (Brevo y Telegram), acciones de un clic desde el correo, hook propio de correos de autenticación, ingesta del conocimiento del asistente, y cuatro procesos programados con pg_cron que leen secretos de Vault: recordatorios, resumen semanal, cierre diario y campañas de lealtad con baja firmada por HMAC.' },
    { title: 'IA en el borde: Cloudflare Worker', body: 'El único binding de Workers AI vive en un Worker que traduce el formato de herramientas al wire format de OpenAI que exige Llama 4 Scout, y expone embeddings bge-m3 para el RAG.' },
    { title: 'Plataforma de datos: dbt + DuckDB', body: 'GitHub Actions extrae cada noche con un rol de solo lectura, sin columnas personales, y construye el warehouse con 24 modelos y 50 tests.' },
  ],
  ragPath: [
    { title: 'Pregunta', detail: '"¿Puedo cancelar si falta media hora?"' },
    { title: 'Embedding bge-m3', detail: 'Worker POST /embed, 1024 dimensiones' },
    { title: 'match_kb_chunks', detail: 'pgvector HNSW filtrado por RLS del rol' },
    { title: 'Llama 4 Scout', detail: 'Pasajes + 20 herramientas, temperature 0.15' },
    { title: 'Guardrails', detail: 'Rechaza cifras sin resultado de herramienta' },
  ],
  chatTitle: 'Así razona el agente',
  chat: [
    { from: 'user', text: '¿Tienen espacio el viernes en la tarde para un corte?' },
    { from: 'tool', text: 'get_available_slots(fecha: "viernes", servicio: "Corte")' },
    { from: 'assistant', text: 'El viernes hay espacio a las 14:00, 15:30 y 17:00 para Corte (30 min). ¿Te reservo alguno?' },
    { from: 'user', text: 'Sí, a las 15:30' },
    { from: 'tool', text: 'book_appointment(...) → re-verificado en el servidor' },
    { from: 'assistant', text: 'Listo, tu cita quedó el viernes a las 15:30. Te avisamos por correo y Telegram.' },
  ],
  chatNote: 'Ejemplo ilustrativo del flujo; los horarios reales salen de la base de datos en cada consulta.',
  etlPath: [
    { title: 'Supabase Postgres', detail: 'Rol etl_reader, conexión READ ONLY' },
    { title: 'Bronze', detail: 'Parquet por corrida, 7 tablas, sin PII' },
    { title: 'Silver', detail: 'dbt: tipos, dedupe, hora de Guatemala' },
    { title: 'Gold', detail: 'Estrella: 4 dimensiones, 3 hechos' },
    { title: 'Marts + ML', detail: '7 marts y 3 modelos predictivos' },
  ],
  martHeads: { name: 'Modelo', question: 'Pregunta que responde' },
  marts: [
    { name: 'mart_customer_rfm', question: '¿Quiénes son campeones, leales o están en riesgo?' },
    { name: 'mart_customer_churn_risk', question: '¿Quién lleva más tiempo sin venir respecto a su propio ritmo?' },
    { name: 'mart_demand_heatmap', question: '¿Qué día y hora concentran la demanda?' },
    { name: 'mart_booking_funnel', question: '¿Dónde se caen las reservas antes de completarse?' },
    { name: 'mart_cancellation_risk', question: '¿Qué cita tiene más probabilidad de cancelarse? (regresión logística)' },
    { name: 'mart_demand_forecast', question: '¿Cuántas citas esperar la próxima semana? (EWMA con backtest)' },
    { name: 'mart_data_health', question: '¿Qué ingresos no están llegando al BI? (encontró Q4,245)' },
  ],
  sqlCaption: 'Extracto real de mart_customer_churn_risk.sql',
  decisions: [
    { title: 'Sin servidor propio', body: 'El navegador habla directo con Postgres usando el JWT del usuario y RLS decide qué filas ve cada rol. La seguridad no depende de esconder endpoints: menos superficie de ataque y $0 de infraestructura.' },
    { title: 'Las reglas de negocio viven en la base', body: 'Una restricción EXCLUDE hace imposible la doble reserva aunque haya dos pestañas abiertas. El pago nace por trigger al completar la cita, así ninguna cita completada se queda fuera del BI.' },
    { title: 'El modelo nunca toca credenciales', body: 'El agente usa el JWT de quien pregunta, nunca la service role key. Las herramientas se filtran por rol antes de que el modelo las vea, y toda escritura pide un "sí" explícito y se re-verifica en el servidor.' },
    { title: 'Prompt corto y temperature 0.15', body: 'Con un prompt largo en prosa, Scout se saltaba herramientas e inventaba barberos y precios. Un prompt corto en viñetas y temperatura baja lo resolvió; lo medí en pruebas repetidas, no a ojo.' },
    { title: 'Pre-recuperación, salvo para datos', body: 'Scout a veces no llama a search_knowledge, así que inyecto los pasajes relevantes antes. Pero en preguntas de citas o métricas eso lo hacía responder desde la guía: esas van directo a herramientas.' },
    { title: 'Una sola definición de ingreso', body: 'business_summary() es la única capa de métricas: ingreso cobrado por fecha local de la cita. La usan el panel, el asistente, el resumen semanal y Telegram, así todos dicen el mismo número.' },
    { title: 'Retirar WhatsApp automatizado', body: 'La API de WhatsApp costaba más de lo que aportaba a una barbería. Quedan correo y Telegram (gratis) y enlaces wa.me para que el cliente escriba directo.' },
    { title: 'Humano en el bucle para marketing', body: 'La IA redacta mensajes de reenganche para clientes en riesgo, pero el dueño decide y envía. Nunca se envía marketing automático a clientes.' },
  ],
  tagline: 'De un cuaderno de citas a una plataforma que reserva, avisa, analiza y conversa, sin un solo servidor que mantener.',
  cta: { title: '¿Necesitas llevar tu operación de papel a datos?', live: 'Ver Flowber en vivo', contact: 'Hablemos', privateRepo: 'Código en repositorio privado, disponible para revisión bajo solicitud.' },
};

const en: FlowberContent = {
  breadcrumb: ['Khristian Garcia', 'Projects', 'Flowber'],
  title: 'Flowber: from a paper appointment book to a platform with AI and data',
  propertyLabels: {
    role: 'Role',
    client: 'Client',
    period: 'Period',
    status: 'Status',
    areas: 'Areas',
    stack: 'Stack',
    links: 'Links',
  },
  properties: {
    role: 'Full-Stack Engineer · Solutions Architect · Data & AI Engineer',
    client: 'Danover, barbershop in Ciudad Satélite, Mixco (@danover.barbero)',
    period: 'January 2024 → today',
    status: 'In production',
    areas: [
      { label: 'Full-Stack', color: 'blue' },
      { label: 'Architecture', color: 'purple' },
      { label: 'Digital transformation', color: 'orange' },
      { label: 'AI / LLM', color: 'pink' },
      { label: 'RAG', color: 'red' },
      { label: 'ETL', color: 'yellow' },
      { label: 'Data Engineering', color: 'green' },
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Deno', 'Cloudflare Workers AI', 'pgvector', 'dbt', 'DuckDB', 'Python'],
    links: 'Live site',
  },
  tldr:
    'Since January 2024 I took Danover\'s barbershop from idea to production as the sole engineer: product, architecture, a backend that lives in the database, an AI agent with RAG, and a data platform with predictive models.',
  toc: [
    { id: 'numeros', label: 'By the numbers' },
    { id: 'producto', label: 'The product' },
    { id: 'roles', label: 'Roles I took on' },
    { id: 'bitacora', label: 'Logbook' },
    { id: 'arquitectura', label: 'Architecture' },
    { id: 'ia', label: 'AI agent and RAG' },
    { id: 'datos', label: 'Data and ML' },
    { id: 'decisiones', label: 'Decisions' },
  ],
  sections: {
    numbers: 'By the numbers',
    product: 'The product in production',
    productIntro: 'Real screenshots of flowber-barberia.pages.dev. Customers book in under a minute; the barber and the owner run the shop from the same system.',
    hats: 'Roles I took on',
    hatsIntro: 'One project, eight hats. Each card sums up what I shipped in that role.',
    timeline: 'Logbook: from idea to today',
    timelineIntro: 'Project milestones. Switch between the timeline view and the table view.',
    architecture: 'Architecture',
    architectureIntro: 'No custom server: the frontend is static on Cloudflare, and security and business rules live in Postgres.',
    ai: 'AI agent and RAG',
    aiIntro: 'An agent that talks, queries, and writes real data, always with the permissions of whoever is asking.',
    data: 'Data engineering and ML',
    dataIntro: 'A medallion warehouse that turns daily operations into metrics, segments, and predictions.',
    decisions: 'Architecture decisions',
    decisionsIntro: 'The calls that mattered most, and why. Open each one.',
  },
  stats: [
    { value: 160, suffix: '+', label: 'appointments managed', note: 'in production since Feb 2026' },
    { value: 90, suffix: '+', label: 'registered customers', note: 'plus in-shop walk-ins' },
    { value: 20, label: 'agent tools', note: '5 write data behind confirmation' },
    { value: 100, suffix: '%', label: 'RAG hit@1', note: 'on the golden evaluation set' },
    { value: 24, label: 'dbt models', note: '50 data quality tests' },
    { value: 13, label: 'Edge Functions', note: '4 scheduled with pg_cron' },
    { value: 2.5, decimals: 1, suffix: ' s', label: 'mobile LCP', note: 'down from 4.8 s, measured with Lighthouse' },
    { value: 0, prefix: '$', label: 'infrastructure cost', note: 'free tiers with measured headroom' },
  ],
  screens: [
    { id: 'home', label: 'Home', desktop: 'flowber/home-desktop.webp', mobile: 'flowber/home-mobile.webp', alt: 'Flowber home page with the neon barbershop design' },
    { id: 'services', label: 'Services', desktop: 'flowber/servicios.webp', mobile: 'flowber/servicios-mobile.webp', alt: 'Flowber service catalog with live prices' },
  ],
  hats: [
    { id: 'fullstack', icon: 'code', title: 'Full-Stack Developer', tag: { label: 'Product', color: 'blue' }, points: ['Strict React + TypeScript SPA: 22 code-split routes', '80+ typed functions as the single gateway to the database', 'Realtime schedule and a 15-minute-step availability algorithm'] },
    { id: 'architect', icon: 'blocks', title: 'Solutions Architect', tag: { label: 'System', color: 'purple' }, points: ['Serverless: Cloudflare Pages + Supabase, no custom server', 'RLS on every table and a GiST EXCLUDE against double booking', '13 Edge Functions and 24 versioned migrations'] },
    { id: 'transformation', icon: 'store', title: 'Digital Transformation', tag: { label: 'Business', color: 'orange' }, points: ['From a notebook and text messages to 24/7 online booking', 'The owner sees revenue, occupancy, and at-risk customers', 'Automatic reminders for the barber and walk-in appointments'] },
    { id: 'ai', icon: 'bot', title: 'AI Engineer', tag: { label: 'LLM', color: 'pink' }, points: ['Multi-turn agent on Llama 4 Scout with 20 role-scoped tools', 'Writes behind explicit confirmation and re-verification', 'Swappable providers with a rule-based fallback'] },
    { id: 'rag', icon: 'search', title: 'RAG', tag: { label: 'Retrieval', color: 'red' }, points: ['pgvector with an HNSW index and multilingual bge-m3 embeddings', 'Retrieval honors each role\'s RLS (SECURITY INVOKER)', 'Golden set with hit@k and MRR: 100% hit@1'] },
    { id: 'data', icon: 'database', title: 'Data Engineer · ETL', tag: { label: 'Pipelines', color: 'green' }, points: ['Medallion: Postgres → Parquet → dbt + DuckDB', 'Star schema with 4 dimensions and 3 facts, PII-free', 'Nightly GitHub Actions run under a read-only role'] },
    { id: 'bi', icon: 'chart', title: 'BI and Machine Learning', tag: { label: 'Analytics', color: 'yellow' }, points: ['RFM, churn risk, demand heatmap, and booking funnel', 'Cancellation logistic regression with temporal validation', 'One metrics layer for dashboard, assistant, and Telegram'] },
    { id: 'devops', icon: 'shield', title: 'DevOps and Security', tag: { label: 'Operations', color: 'gray' }, points: ['CI/CD to Cloudflare Pages on every push', 'Documented audits, strict CSP, and verified webhooks', 'pg_cron with Vault secrets; mobile LCP from 4.8 s to 2.5 s'] },
  ],
  timeline: [
    { date: 'Jan 2024', title: 'Kickoff with Danover', status: 'done', tags: [{ label: 'Digital transformation', color: 'orange' }, { label: 'Product', color: 'blue' }], body: 'The idea is born with Danover, the shop owner. The schedule lived in a notebook and in text messages, so I mapped the real process: how an appointment is requested, what gets charged, and where money leaks.' },
    { date: '2024 → 2025', title: 'Discovery and design', status: 'done', tags: [{ label: 'Architecture', color: 'purple' }], body: 'Process mapping, the data model (barbers, services, working hours, breaks, appointments, payments), and the core decision: serverless on Supabase and Cloudflare, with no server to maintain.' },
    { date: 'Feb 2026', title: 'First real booking', status: 'done', tags: [{ label: 'Full-Stack', color: 'blue' }], body: 'The platform goes live, and on February 7, 2026 the first real appointment lands in the system.' },
    { date: 'Apr 2026', title: 'Operations panel and BI', status: 'done', tags: [{ label: 'Full-Stack', color: 'blue' }, { label: 'BI', color: 'yellow' }], body: 'Full admin, a BI module with payments and expenses, transactional email, an audit log, and a Telegram bot with account linking.' },
    { date: 'Jun 2026', title: 'Realtime and an AI assistant', status: 'done', tags: [{ label: 'AI / LLM', color: 'pink' }, { label: 'Full-Stack', color: 'blue' }], body: 'A schedule that updates itself, a first intent-based assistant and then an LLM on Workers AI with function calling, conversational booking, n8n on Docker, and the brand design system.' },
    { date: 'Jul 2026', title: 'Security audits', status: 'done', tags: [{ label: 'Security', color: 'gray' }], body: 'Canonical RLS (one policy per command), closed access gaps in notification functions, a discount RPC with a guard trigger, walk-in appointments, and a role-aware Telegram bot.' },
    { date: 'Oct 2026', title: 'Data, RAG, and a redesign', status: 'done', tags: [{ label: 'Data Engineering', color: 'green' }, { label: 'RAG', color: 'red' }], body: 'A dbt + DuckDB warehouse with ML models, RAG on pgvector, the "neon barbershop" redesign, Google OAuth, pg_cron reminders, loyalty email campaigns, a daily close for staff, AI-assisted re-engagement, and a single metrics layer. I retired the WhatsApp API for cost.' },
    { date: 'Today', title: 'Live and growing', status: 'live', tags: [{ label: 'Operations', color: 'gray' }], body: '160+ appointments, 90+ registered customers, and 190+ messages handled by the assistant. The business runs on the platform every day.' },
  ],
  views: { timeline: 'Timeline', table: 'Table' },
  tableHeads: { date: 'Date', milestone: 'Milestone', areas: 'Areas', status: 'Status' },
  statusLabels: { done: 'Done', live: 'Live' },
  requestPath: [
    { title: 'Customer · Barber · Admin', detail: 'Browser or Telegram' },
    { title: 'Cloudflare Pages', detail: 'React SPA on a CDN, CSP and HSTS' },
    { title: 'Supabase Auth', detail: 'JWT carrying the user role' },
    { title: 'Postgres + RLS', detail: 'Each table decides which rows a role sees' },
    { title: 'Edge Functions', detail: 'Email, Telegram, AI, and cron' },
  ],
  layers: [
    { title: 'Frontend: React 18 + TypeScript', body: '22 routes, 10 gated by session and role. Heavy admin and BI pages load lazily; all data access goes through a single typed layer. Tailwind v4 tokens meant one token change re-themed the whole app for the "neon barbershop" redesign.' },
    { title: 'Database: PostgreSQL with RLS', body: 'Row-Level Security on every table, one policy per command. Double booking is impossible thanks to an EXCLUDE constraint with a GiST index; a trigger creates the payment when an appointment completes, one payment per appointment.' },
    { title: 'Backend: 13 Deno Edge Functions', body: 'Notifications (Brevo and Telegram), one-click actions from email, a custom auth email hook, the assistant\'s knowledge ingestion, and four pg_cron jobs reading secrets from Vault: reminders, a weekly summary, a daily close, and loyalty campaigns with HMAC-signed unsubscribe links.' },
    { title: 'AI at the edge: Cloudflare Worker', body: 'The only Workers AI binding lives in a Worker that translates the tool format into the OpenAI wire format Llama 4 Scout requires, and serves bge-m3 embeddings for RAG.' },
    { title: 'Data platform: dbt + DuckDB', body: 'GitHub Actions extracts nightly with a read-only role and no personal columns, then builds the warehouse with 24 models and 50 tests.' },
  ],
  ragPath: [
    { title: 'Question', detail: '"Can I cancel half an hour before?"' },
    { title: 'bge-m3 embedding', detail: 'Worker POST /embed, 1024 dimensions' },
    { title: 'match_kb_chunks', detail: 'pgvector HNSW filtered by the role\'s RLS' },
    { title: 'Llama 4 Scout', detail: 'Passages + 20 tools, temperature 0.15' },
    { title: 'Guardrails', detail: 'Rejects figures with no tool result' },
  ],
  chatTitle: 'How the agent reasons',
  chat: [
    { from: 'user', text: 'Do you have an opening Friday afternoon for a haircut?' },
    { from: 'tool', text: 'get_available_slots(date: "friday", service: "Haircut")' },
    { from: 'assistant', text: 'Friday has openings at 2:00, 3:30, and 5:00 PM for a Haircut (30 min). Want me to book one?' },
    { from: 'user', text: 'Yes, 3:30' },
    { from: 'tool', text: 'book_appointment(...) → re-verified on the server' },
    { from: 'assistant', text: 'Done, you are booked Friday at 3:30 PM. We will notify you by email and Telegram.' },
  ],
  chatNote: 'Illustrative flow; real openings come from the database on every query.',
  etlPath: [
    { title: 'Supabase Postgres', detail: 'etl_reader role, READ ONLY session' },
    { title: 'Bronze', detail: 'Parquet per run, 7 tables, no PII' },
    { title: 'Silver', detail: 'dbt: types, dedupe, Guatemala time' },
    { title: 'Gold', detail: 'Star: 4 dimensions, 3 facts' },
    { title: 'Marts + ML', detail: '7 marts and 3 predictive models' },
  ],
  martHeads: { name: 'Model', question: 'Question it answers' },
  marts: [
    { name: 'mart_customer_rfm', question: 'Who are the champions, the loyal, and the at-risk?' },
    { name: 'mart_customer_churn_risk', question: 'Who is overdue relative to their own visit rhythm?' },
    { name: 'mart_demand_heatmap', question: 'Which day and hour concentrate demand?' },
    { name: 'mart_booking_funnel', question: 'Where do bookings drop before completion?' },
    { name: 'mart_cancellation_risk', question: 'Which appointment is likely to cancel? (logistic regression)' },
    { name: 'mart_demand_forecast', question: 'How many appointments next week? (EWMA with backtest)' },
    { name: 'mart_data_health', question: 'Which revenue never reaches BI? (found Q4,245)' },
  ],
  sqlCaption: 'Real excerpt from mart_customer_churn_risk.sql',
  decisions: [
    { title: 'No custom server', body: 'The browser talks straight to Postgres with the user\'s JWT, and RLS decides which rows each role sees. Security does not rely on hiding endpoints: a smaller attack surface and $0 in infrastructure.' },
    { title: 'Business rules live in the database', body: 'An EXCLUDE constraint makes double booking impossible even with two tabs open. Payments are born from a trigger when an appointment completes, so no completed appointment falls out of BI.' },
    { title: 'The model never holds credentials', body: 'The agent uses the caller\'s JWT, never the service role key. Tools are filtered by role before the model sees them, and every write needs an explicit "yes" and server-side re-verification.' },
    { title: 'Short prompt, temperature 0.15', body: 'With a long prose prompt, Scout skipped tools and invented barbers and prices. A short bullet prompt and low temperature fixed it; I measured it across repeated runs, not by eye.' },
    { title: 'Pre-retrieval, except for data', body: 'Scout sometimes skips search_knowledge, so I inject relevant passages up front. On appointment or metrics questions that made it answer from the guide, so those go straight to tools.' },
    { title: 'One definition of revenue', body: 'business_summary() is the single metrics layer: collected revenue by the appointment\'s local date. The dashboard, assistant, weekly summary, and Telegram all use it, so everyone reports the same number.' },
    { title: 'Retire automated WhatsApp', body: 'The WhatsApp API cost more than it returned for a barbershop. Email and Telegram (free) remain, plus wa.me links so customers can message directly.' },
    { title: 'Human in the loop for marketing', body: 'AI drafts re-engagement messages for at-risk customers, but the owner decides and sends. Marketing is never sent to customers automatically.' },
  ],
  tagline: 'From a paper appointment book to a platform that books, notifies, analyzes, and talks, without a single server to maintain.',
  cta: { title: 'Need to move your operation from paper to data?', live: 'See Flowber live', contact: "Let's talk", privateRepo: 'Code lives in a private repository, available for review on request.' },
};

export const flowberContent: Record<'es' | 'en', FlowberContent> = { es, en };
