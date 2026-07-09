import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bot,
  Cloud,
  Database,
  ExternalLink,
  Github,
  Layers,
  Lock,
  MessageCircle,
  ShoppingBag,
  BarChart3,
  FileSpreadsheet,
} from 'lucide-react';
import Container from '../components/Container';
import PageTransition from '../components/PageTransition';
import ArchitectureDiagram, { type ArchLayer } from '../components/ArchitectureDiagram';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';

const LIVE_URL = 'https://flowber-barberia.pages.dev/';
const GITHUB_URL = 'https://github.com/garciajuni20/flowber-barberia';

export default function FlowberCaseStudy() {
  const { lang } = useLang();
  const isEN = lang === 'en';

  const t = isEN
    ? {
        badge: 'Case Study',
        title: 'Flowber — Digital Barbershop Platform',
        subtitle:
          'A serverless booking and business management platform for a real barbershop in Guatemala. Built solo, end-to-end: product design, frontend, database, security model, notifications infrastructure, and BI.',
        back: 'All projects',
        live: 'Live Site',
        github: 'GitHub',
        problemTitle: 'The Problem',
        problem:
          'The barbershop ran everything over phone calls and a paper notebook: double-booked appointments, no-shows with no reminders, zero visibility into revenue, and the owner spending hours coordinating instead of cutting hair.',
        solutionTitle: 'The Solution',
        solution:
          'A single web platform where customers book in real time, barbers manage their day, and the owner sees revenue and occupancy analytics — with automated confirmations and reminders over WhatsApp, Telegram, and email.',
        archTitle: 'System Architecture',
        archSubtitle: 'Serverless by design: no custom backend server to maintain — security and business rules live in the database itself.',
        numbersTitle: 'By the Numbers',
        highlightsTitle: 'Engineering Highlights',
        detailTitle: 'How it works',
        stats: [
          { value: '19', label: 'Pages (role-gated, lazy-loaded)' },
          { value: '3', label: 'Roles enforced with Postgres RLS' },
          { value: '7', label: 'Supabase Edge Functions' },
          { value: '5', label: 'BI SQL views (revenue, loyalty)' },
          { value: '3', label: 'Notification channels' },
          { value: '~28', label: 'Reusable components' },
        ],
        highlights: [
          { icon: <Lock className="h-5 w-5" />, title: 'Security enforced in the database', desc: 'Customer / barber / admin roles are enforced with Postgres Row-Level Security — the same policies protect the UI, realtime subscriptions, and the chat assistant. No service-role key ever reaches the client.' },
          { icon: <Bell className="h-5 w-5" />, title: 'Multichannel notifications', desc: 'Appointment confirmations and reminders over WhatsApp (self-hosted NestJS gateway), Telegram bot, and email (Resend) — including a one-click confirm/reject link for barbers.' },
          { icon: <Bot className="h-5 w-5" />, title: 'Role-aware chat assistant', desc: 'A conversational assistant with function-calling tools: books and reschedules for customers, confirms appointments for barbers, and answers metrics questions for admins — always within the caller\'s RLS permissions.' },
          { icon: <BarChart3 className="h-5 w-5" />, title: 'Built-in Business Intelligence', desc: 'SQL views compute net revenue (revenue minus expenses), customer loyalty, and occupancy. Dedicated analytics pages for barbers and admins, with CSV export.' },
          { icon: <ShoppingBag className="h-5 w-5" />, title: 'E-commerce module', desc: 'Product catalog, cart, and discount codes with usage limits — all under the same data model and audit log.' },
          { icon: <FileSpreadsheet className="h-5 w-5" />, title: 'Auditability', desc: 'Every sensitive action lands in an append-only app_events table, giving the owner a full audit trail.' },
        ],
        cta: 'Want a system like this for your business?',
        ctaButton: "Let's talk",
      }
    : {
        badge: 'Caso de Estudio',
        title: 'Flowber — Plataforma Digital de Barbería',
        subtitle:
          'Plataforma serverless de reservas y gestión de negocio para una barbería real en Guatemala. Construida en solitario, de punta a punta: diseño de producto, frontend, base de datos, modelo de seguridad, infraestructura de notificaciones y BI.',
        back: 'Todos los proyectos',
        live: 'Sitio en Vivo',
        github: 'GitHub',
        problemTitle: 'El Problema',
        problem:
          'La barbería operaba con llamadas telefónicas y un cuaderno: citas duplicadas, inasistencias sin recordatorios, cero visibilidad de ingresos, y el dueño invirtiendo horas coordinando en lugar de cortar cabello.',
        solutionTitle: 'La Solución',
        solution:
          'Una sola plataforma web donde los clientes reservan en tiempo real, los barberos gestionan su día y el dueño ve analítica de ingresos y ocupación — con confirmaciones y recordatorios automáticos por WhatsApp, Telegram y correo.',
        archTitle: 'Arquitectura del Sistema',
        archSubtitle: 'Serverless por diseño: sin servidor backend propio que mantener — la seguridad y las reglas de negocio viven en la propia base de datos.',
        numbersTitle: 'En Números',
        highlightsTitle: 'Aspectos Destacados de Ingeniería',
        detailTitle: 'Cómo funciona',
        stats: [
          { value: '19', label: 'Páginas (por rol, lazy-loaded)' },
          { value: '3', label: 'Roles con RLS de Postgres' },
          { value: '7', label: 'Edge Functions de Supabase' },
          { value: '5', label: 'Vistas SQL de BI (ingresos, lealtad)' },
          { value: '3', label: 'Canales de notificación' },
          { value: '~28', label: 'Componentes reutilizables' },
        ],
        highlights: [
          { icon: <Lock className="h-5 w-5" />, title: 'Seguridad en la base de datos', desc: 'Los roles cliente / barbero / admin se aplican con Row-Level Security de Postgres — las mismas políticas protegen la UI, las suscripciones realtime y el asistente de chat. La service-role key nunca llega al cliente.' },
          { icon: <Bell className="h-5 w-5" />, title: 'Notificaciones multicanal', desc: 'Confirmaciones y recordatorios de citas por WhatsApp (gateway NestJS auto-hospedado), bot de Telegram y correo (Resend) — incluyendo un enlace de confirmar/rechazar con un clic para barberos.' },
          { icon: <Bot className="h-5 w-5" />, title: 'Asistente de chat según rol', desc: 'Un asistente conversacional con herramientas de function calling: reserva y reagenda para clientes, confirma citas para barberos y responde métricas para admins — siempre dentro de los permisos RLS del usuario.' },
          { icon: <BarChart3 className="h-5 w-5" />, title: 'Business Intelligence integrado', desc: 'Vistas SQL calculan ingresos netos (ingresos menos gastos), lealtad de clientes y ocupación. Páginas de analítica dedicadas para barberos y admins, con exportación a CSV.' },
          { icon: <ShoppingBag className="h-5 w-5" />, title: 'Módulo de e-commerce', desc: 'Catálogo de productos, carrito y códigos de descuento con límites de uso — bajo el mismo modelo de datos y registro de auditoría.' },
          { icon: <FileSpreadsheet className="h-5 w-5" />, title: 'Auditabilidad', desc: 'Cada acción sensible queda en una tabla app_events de solo escritura, dándole al dueño una traza de auditoría completa.' },
        ],
        cta: '¿Quieres un sistema así para tu negocio?',
        ctaButton: 'Hablemos',
      };

  const layers: ArchLayer[] = isEN
    ? [
        {
          id: 'frontend',
          name: 'Frontend SPA',
          icon: <Layers className="h-5 w-5" />,
          technologies: ['React 18', 'TypeScript', 'Vite', 'Tailwind v4', 'Framer Motion'],
          description: '19 pages, lazy-loaded and gated by role, with animated route transitions.',
          detail: 'Role pages (customer booking, barber dashboard, admin CRUD) are code-split so each user only downloads what they can use. A ProtectedRoute component reads the role from the auth context and redirects unauthorized visitors.',
        },
        {
          id: 'auth',
          name: 'Auth & Row-Level Security',
          icon: <Lock className="h-5 w-5" />,
          technologies: ['Supabase Auth', 'Postgres RLS', 'JWT'],
          description: 'Three-tier RBAC (customer / barber / admin) enforced by the database, not the client.',
          detail: 'Every table carries RLS policies, so even a compromised client cannot read or write outside its role. The chat assistant builds its Supabase client from the caller\'s JWT — it inherits exactly the caller\'s permissions.',
        },
        {
          id: 'data',
          name: 'Data & Realtime',
          icon: <Database className="h-5 w-5" />,
          technologies: ['PostgreSQL', 'Supabase Realtime', '14+ tables', 'SQL views'],
          description: 'Appointments, services, payments, products, audit log — with live updates.',
          detail: 'Barber and admin dashboards subscribe to Postgres Changes with server-side filtering, so a new booking appears instantly without polling. Five SQL views power the BI pages: daily revenue, net revenue (minus expenses), customer loyalty, and more.',
        },
        {
          id: 'functions',
          name: 'Edge Functions',
          icon: <Cloud className="h-5 w-5" />,
          technologies: ['Deno', 'Supabase Functions', 'Resend'],
          description: '7 serverless functions for email, WhatsApp, Telegram, the assistant, and one-click actions.',
          detail: 'handle-appointment-action lets a barber confirm or reject a booking from a signed link in their email — no login needed. Each function validates its inputs and never exposes privileged credentials to the browser.',
        },
        {
          id: 'notifications',
          name: 'Notification Infrastructure',
          icon: <MessageCircle className="h-5 w-5" />,
          technologies: ['OpenWA (NestJS)', 'Telegram Bot', 'Docker', 'Traefik'],
          description: 'Self-hosted WhatsApp HTTP gateway plus Telegram and email channels.',
          detail: 'The WhatsApp gateway is a hardened NestJS service (Helmet CSP, API-key auth, rate limiting, Swagger docs) deployed with Docker Compose behind Traefik. Appointment reminders reach customers where they actually read messages: WhatsApp.',
        },
        {
          id: 'infra',
          name: 'Hosting & CI/CD',
          icon: <Github className="h-5 w-5" />,
          technologies: ['Cloudflare Pages', 'GitHub Actions', 'Wrangler'],
          description: 'Zero-downtime deploys on every push, vendor chunk splitting, bundle analysis.',
          detail: 'The Vite build drops console calls in production, splits vendor chunks manually, and ships a bundle visualizer report. GitHub Actions deploys to Cloudflare Pages via Wrangler.',
        },
      ]
    : [
        {
          id: 'frontend',
          name: 'Frontend SPA',
          icon: <Layers className="h-5 w-5" />,
          technologies: ['React 18', 'TypeScript', 'Vite', 'Tailwind v4', 'Framer Motion'],
          description: '19 páginas, lazy-loaded y protegidas por rol, con transiciones animadas.',
          detail: 'Las páginas por rol (reservas de cliente, dashboard de barbero, CRUD de admin) usan code-splitting: cada usuario solo descarga lo que puede usar. Un componente ProtectedRoute lee el rol del contexto de autenticación y redirige a visitantes no autorizados.',
        },
        {
          id: 'auth',
          name: 'Auth & Row-Level Security',
          icon: <Lock className="h-5 w-5" />,
          technologies: ['Supabase Auth', 'RLS de Postgres', 'JWT'],
          description: 'RBAC de tres niveles (cliente / barbero / admin) aplicado por la base de datos, no por el cliente.',
          detail: 'Cada tabla tiene políticas RLS: incluso un cliente comprometido no puede leer ni escribir fuera de su rol. El asistente de chat construye su cliente de Supabase con el JWT del usuario — hereda exactamente sus permisos.',
        },
        {
          id: 'data',
          name: 'Datos & Realtime',
          icon: <Database className="h-5 w-5" />,
          technologies: ['PostgreSQL', 'Supabase Realtime', '14+ tablas', 'Vistas SQL'],
          description: 'Citas, servicios, pagos, productos, auditoría — con actualizaciones en vivo.',
          detail: 'Los dashboards de barbero y admin se suscriben a Postgres Changes con filtrado del lado del servidor: una nueva reserva aparece al instante sin polling. Cinco vistas SQL alimentan las páginas de BI: ingresos diarios, ingresos netos (menos gastos), lealtad de clientes y más.',
        },
        {
          id: 'functions',
          name: 'Edge Functions',
          icon: <Cloud className="h-5 w-5" />,
          technologies: ['Deno', 'Supabase Functions', 'Resend'],
          description: '7 funciones serverless para correo, WhatsApp, Telegram, el asistente y acciones de un clic.',
          detail: 'handle-appointment-action permite al barbero confirmar o rechazar una reserva desde un enlace firmado en su correo — sin iniciar sesión. Cada función valida sus entradas y nunca expone credenciales privilegiadas al navegador.',
        },
        {
          id: 'notifications',
          name: 'Infraestructura de Notificaciones',
          icon: <MessageCircle className="h-5 w-5" />,
          technologies: ['OpenWA (NestJS)', 'Bot de Telegram', 'Docker', 'Traefik'],
          description: 'Gateway HTTP de WhatsApp auto-hospedado, más canales de Telegram y correo.',
          detail: 'El gateway de WhatsApp es un servicio NestJS endurecido (CSP con Helmet, auth por API key, rate limiting, docs Swagger) desplegado con Docker Compose detrás de Traefik. Los recordatorios llegan donde la gente realmente lee: WhatsApp.',
        },
        {
          id: 'infra',
          name: 'Hosting & CI/CD',
          icon: <Github className="h-5 w-5" />,
          technologies: ['Cloudflare Pages', 'GitHub Actions', 'Wrangler'],
          description: 'Deploys sin downtime en cada push, división de chunks y análisis de bundle.',
          detail: 'El build de Vite elimina console.log en producción, divide chunks de vendors manualmente y genera un reporte de visualización del bundle. GitHub Actions despliega a Cloudflare Pages vía Wrangler.',
        },
      ];

  useSEO({
    title: isEN ? 'Flowber Case Study' : 'Caso de Estudio Flowber',
    description: t.subtitle,
    lang,
    keywords: ['Flowber', 'Supabase', 'PostgreSQL', 'RLS', 'React', 'TypeScript', 'case study', 'Guatemala'],
  });

  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-50">
        <Container>
          <div className="py-10">
            {/* Back link */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t.back}
            </Link>

            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-6"
            >
              <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-semibold text-violet-700 dark:border-violet-900/40 dark:bg-violet-900/20 dark:text-violet-300">
                {t.badge}
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">{t.title}</h1>
              <p className="mt-4 max-w-3xl text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {t.subtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  {t.live}
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  {t.github}
                </a>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {t.stats.map(stat => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-neutral-200 bg-white p-4 text-center dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="text-2xl font-extrabold bg-gradient-to-br from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 leading-snug">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Problem / Solution */}
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-red-200/60 bg-red-50/50 p-6 dark:border-red-900/30 dark:bg-red-900/10"
              >
                <h2 className="text-lg font-bold text-red-800 dark:text-red-300">{t.problemTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{t.problem}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-6 dark:border-emerald-900/30 dark:bg-emerald-900/10"
              >
                <h2 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">{t.solutionTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{t.solution}</p>
              </motion.div>
            </div>

            {/* Architecture */}
            <div className="mt-14">
              <ArchitectureDiagram
                title={t.archTitle}
                subtitle={t.archSubtitle}
                layers={layers}
                detailTitle={t.detailTitle}
              />
            </div>

            {/* Engineering highlights */}
            <div className="mt-14">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">{t.highlightsTitle}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {t.highlights.map((h, i) => (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.08, duration: 0.4 }}
                    className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <div className="inline-flex rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 p-2.5 text-white shadow-sm">
                      {h.icon}
                    </div>
                    <h3 className="mt-3 font-semibold text-neutral-900 dark:text-white">{h.title}</h3>
                    <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{h.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-14 relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-center dark:border-neutral-800 shadow-xl shadow-violet-500/20">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} aria-hidden="true" />
              <div className="relative z-10">
                <h3 className="mb-4 text-xl font-bold text-white">{t.cta}</h3>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors shadow-lg"
                >
                  {t.ctaButton}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </PageTransition>
  );
}
