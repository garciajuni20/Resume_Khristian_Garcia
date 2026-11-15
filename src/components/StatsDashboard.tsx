import { useState, useEffect, useRef } from 'react';
import { Database, BarChart3, Clock, Code, Layers, Sparkles, TrendingUp } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';

function useCountUp(end: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || reduced) return;
    let rafId: number;
    let startTime: number | null = null;
    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, end, duration, reduced]);

  // Reduced motion: show the final value immediately
  return { count: reduced ? end : count, ref };
}

export default function StatsDashboard() {
  const { lang } = useLang();

  const t = lang === 'en' ? {
    title: 'By the Numbers',
    yearsTech: 'Years in Tech',
    yearsBI: 'Years in BI / Data',
    dashboards: 'Dashboards Delivered',
    queries: 'SQL Models Built',
    kpis: 'KPIs Defined',
    apps: 'Live Web Apps',
    domains: 'Technical Domains',
    accuracy: 'Data Accuracy Achieved',
    description: 'Quantified impact from real work at Alleviate Financial Solutions and live projects'
  } : {
    title: 'En Números',
    yearsTech: 'Años en Tecnología',
    yearsBI: 'Años en BI / Datos',
    dashboards: 'Dashboards Entregados',
    queries: 'Modelos SQL Construidos',
    kpis: 'KPIs Definidos',
    apps: 'Apps Web en Vivo',
    domains: 'Dominios Técnicos',
    accuracy: 'Precisión de Datos Lograda',
    description: 'Impacto cuantificado del trabajo real en Alleviate Financial Solutions y proyectos en vivo'
  };

  const m = (lang === 'en' ? profileEN : profileES).metrics;

  const { count: techYears, ref: r1 } = useCountUp(m.yearsExperience);
  const { count: biYears, ref: r2 } = useCountUp(m.yearsBI);
  const { count: dashboards, ref: r3 } = useCountUp(m.dashboardsDelivered);
  const { count: models, ref: r4 } = useCountUp(m.sqlModels);
  const { count: kpis, ref: r5 } = useCountUp(m.kpisTracked);
  const { count: apps, ref: r6 } = useCountUp(m.liveApps);

  const metrics = [
    { ref: r1, value: techYears, suffix: '+', label: t.yearsTech, icon: <Clock className="h-5 w-5" />, color: 'text-blue-600 dark:text-blue-400' },
    { ref: r2, value: biYears, suffix: '+', label: t.yearsBI, icon: <Database className="h-5 w-5" />, color: 'text-emerald-600 dark:text-emerald-400' },
    { ref: r3, value: dashboards, suffix: '+', label: t.dashboards, icon: <BarChart3 className="h-5 w-5" />, color: 'text-purple-600 dark:text-purple-400' },
    { ref: r4, value: models, suffix: '+', label: t.queries, icon: <Layers className="h-5 w-5" />, color: 'text-orange-600 dark:text-orange-400' },
    { ref: r5, value: kpis, suffix: '+', label: t.kpis, icon: <TrendingUp className="h-5 w-5" />, color: 'text-rose-600 dark:text-rose-400' },
    { ref: r6, value: apps, suffix: '', label: t.apps, icon: <Code className="h-5 w-5" />, color: 'text-cyan-600 dark:text-cyan-400' },
  ];

  const domains = [
    { label: lang === 'en' ? 'Data Engineering' : 'Ingeniería de Datos', tone: 'n-tag-blue', icon: <Database className="h-3.5 w-3.5" /> },
    { label: lang === 'en' ? 'Business Intelligence' : 'Inteligencia de Negocios', tone: 'n-tag-green', icon: <BarChart3 className="h-3.5 w-3.5" /> },
    { label: lang === 'en' ? 'AI & Automation' : 'IA y Automatización', tone: 'n-tag-pink', icon: <Sparkles className="h-3.5 w-3.5" /> },
    { label: lang === 'en' ? 'Full-Stack Web Dev' : 'Desarrollo Web Full-Stack', tone: 'n-tag-purple', icon: <Code className="h-3.5 w-3.5" /> },
    { label: lang === 'en' ? 'Network Operations' : 'Operaciones de Red', tone: 'n-tag-orange', icon: <Layers className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="n-border w-full rounded-2xl border bg-n-bg p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="n-text text-xl font-semibold tracking-tight">{t.title}</h3>
          <p className="n-muted mt-1 text-sm">{t.description}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            ref={metric.ref as React.RefObject<HTMLDivElement>}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="n-callout rounded-xl p-4"
          >
            <div className={`mb-2 ${metric.color}`}>{metric.icon}</div>
            <div className="n-text text-3xl font-semibold tabular-nums tracking-tight">
              {metric.value}{metric.suffix}
            </div>
            <div className="n-muted mt-1 text-xs leading-snug">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Accuracy Highlight */}
      <div className="n-callout mb-5 rounded-xl p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="n-text text-sm font-semibold">{t.accuracy}</div>
            <div className="n-muted mt-0.5 text-xs">
              {lang === 'en' ? 'Snowflake data models at Alleviate Financial Solutions' : 'Modelos de datos en Snowflake para Alleviate Financial Solutions'}
            </div>
          </div>
          <div className="text-3xl font-semibold tabular-nums tracking-tight text-emerald-700 dark:text-emerald-300">99.5%</div>
        </div>
      </div>

      {/* Technical Domains */}
      <div>
        <div className="n-text mb-3 text-sm font-medium">
          {t.domains}
        </div>
        <div className="flex flex-wrap gap-2">
          {domains.map((d) => (
            <span key={d.label} className={`n-tag ${d.tone} gap-1.5 text-xs`}>
              {d.icon}
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
