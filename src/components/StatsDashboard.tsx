import { useState, useEffect } from 'react';
import { Users, Database, BarChart3, Zap, Clock, TrendingUp, Code, Cloud, Server, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

export default function StatsDashboard() {
  const { lang } = useLang();
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    skills: 0,
    certifications: 0
  });

  useEffect(() => {
    const animateCount = (endValue: number, setter: (val: number) => void) => {
      let start = 0;
      const duration = 2000;
      const increment = endValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= endValue) {
          setter(endValue);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateCount(25, (val) => setStats(s => ({...s, projects: val})));
    animateCount(5, (val) => setStats(s => ({...s, experience: val})));
    animateCount(18, (val) => setStats(s => ({...s, skills: val})));
    animateCount(6, (val) => setStats(s => ({...s, certifications: val})));
  }, []);

  const t = lang === 'en' ? {
    title: 'Professional Metrics',
    projects: 'Projects',
    experience: 'Years Experience',
    skills: 'Technologies',
    certifications: 'Certifications',
    description: 'Quantified impact and technical proficiency across domains'
  } : {
    title: 'Métricas Profesionales',
    projects: 'Proyectos',
    experience: 'Años Experiencia',
    skills: 'Tecnologías',
    certifications: 'Certificaciones',
    description: 'Impacto cuantificado y competencia técnica en múltiples dominios'
  };

  const metricCards = [
    {
      icon: <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
      value: `${stats.projects}+`,
      label: t.projects,
      color: 'blue'
    },
    {
      icon: <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />,
      value: `${stats.experience}+`,
      label: t.experience,
      color: 'green'
    },
    {
      icon: <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />,
      value: `${stats.skills}+`,
      label: t.skills,
      color: 'purple'
    },
    {
      icon: <TrendingUp className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />,
      value: `${stats.certifications}+`,
      label: t.certifications,
      color: 'yellow'
    }
  ];

  const getColorClasses = (color: string) => {
    const base = {
      blue: { bg: 'bg-blue-100', darkBg: 'dark:bg-blue-900/30' },
      green: { bg: 'bg-green-100', darkBg: 'dark:bg-green-900/30' },
      purple: { bg: 'bg-purple-100', darkBg: 'dark:bg-purple-900/30' },
      yellow: { bg: 'bg-yellow-100', darkBg: 'dark:bg-yellow-900/30' }
    }[color];
    
    return `${base.bg} ${base.darkBg}`;
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg dark:border-neutral-800 dark:from-neutral-900 dark:to-blue-900/10">
      <h3 className="mb-6 text-xl font-bold text-neutral-900 dark:text-white">{t.title}</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metricCards.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`rounded-lg p-2 ${getColorClasses(metric.color)}`}>
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                {metric.value}
              </div>
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white/50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mb-3 flex items-center gap-2">
          <Layers className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {lang === 'en' ? 'Technical Domains' : 'Dominios Técnicos'}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-100 p-1.5 dark:bg-blue-900/30">
              <Database className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Data Engineering</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-green-100 p-1.5 dark:bg-green-900/30">
              <BarChart3 className="h-3 w-3 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Business Intelligence</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-purple-100 p-1.5 dark:bg-purple-900/30">
              <Cloud className="h-3 w-3 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Cloud & DevOps</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-yellow-100 p-1.5 dark:bg-yellow-900/30">
              <Code className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Full-Stack Dev</span>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
        {t.description}
      </p>
    </div>
  );
}