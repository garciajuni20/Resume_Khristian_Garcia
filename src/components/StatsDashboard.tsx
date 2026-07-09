import { useState, useEffect, useRef } from 'react';
import { Database, BarChart3, Clock, Code, Layers, TrendingUp } from 'lucide-react';
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
    { ref: r1, value: techYears, suffix: '+', label: t.yearsTech, icon: <Clock className="h-5 w-5" />, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { ref: r2, value: biYears, suffix: '+', label: t.yearsBI, icon: <Database className="h-5 w-5" />, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
    { ref: r3, value: dashboards, suffix: '+', label: t.dashboards, icon: <BarChart3 className="h-5 w-5" />, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { ref: r4, value: models, suffix: '+', label: t.queries, icon: <Layers className="h-5 w-5" />, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { ref: r5, value: kpis, suffix: '+', label: t.kpis, icon: <TrendingUp className="h-5 w-5" />, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
    { ref: r6, value: apps, suffix: '', label: t.apps, icon: <Code className="h-5 w-5" />, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
  ];

  const domains = [
    { label: lang === 'en' ? 'Data Engineering' : 'Ingeniería de Datos', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', icon: <Database className="h-3.5 w-3.5" /> },
    { label: lang === 'en' ? 'Business Intelligence' : 'Inteligencia de Negocios', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', icon: <BarChart3 className="h-3.5 w-3.5" /> },
    { label: lang === 'en' ? 'Full-Stack Web Dev' : 'Desarrollo Web Full-Stack', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300', icon: <Code className="h-3.5 w-3.5" /> },
    { label: lang === 'en' ? 'Network Operations' : 'Operaciones de Red', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300', icon: <Layers className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t.title}</h3>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{t.description}</p>
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
            className={`rounded-xl ${metric.bg} p-4`}
          >
            <div className={`mb-2 ${metric.color}`}>{metric.icon}</div>
            <div className={`text-3xl font-bold ${metric.color}`}>
              {metric.value}{metric.suffix}
            </div>
            <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Accuracy Highlight */}
      <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-green-800 dark:text-green-300">{t.accuracy}</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-0.5">
              {lang === 'en' ? 'Snowflake data models at Alleviate Financial Solutions' : 'Modelos de datos en Snowflake para Alleviate Financial Solutions'}
            </div>
          </div>
          <div className="text-3xl font-bold text-green-700 dark:text-green-300">99.5%</div>
        </div>
      </div>

      {/* Technical Domains */}
      <div>
        <div className="mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {t.domains}
        </div>
        <div className="flex flex-wrap gap-2">
          {domains.map((d) => (
            <span key={d.label} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${d.color}`}>
              {d.icon}
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
