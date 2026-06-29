import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Props = {
  name: string;
  level: number; // 0-100
};

function getBarColor(level: number): string {
  if (level >= 90) return 'from-blue-500 to-blue-600';
  if (level >= 80) return 'from-indigo-500 to-blue-500';
  if (level >= 70) return 'from-violet-500 to-indigo-500';
  if (level >= 60) return 'from-emerald-500 to-teal-500';
  return 'from-neutral-400 to-neutral-500';
}

function getLevelLabel(level: number, lang?: string): string {
  if (level >= 90) return lang === 'es' ? 'Experto' : 'Expert';
  if (level >= 80) return lang === 'es' ? 'Avanzado' : 'Advanced';
  if (level >= 70) return lang === 'es' ? 'Competente' : 'Proficient';
  if (level >= 60) return lang === 'es' ? 'Intermedio' : 'Intermediate';
  return lang === 'es' ? 'Básico' : 'Basic';
}

export default function SkillMeter({ name, level }: Props) {
  const safe = Math.max(0, Math.min(100, level));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      className="group rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-blue-900/60"
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">{name}</div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 dark:text-neutral-500">{getLevelLabel(safe)}</span>
          <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">{safe}%</span>
        </div>
      </div>

      <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden dark:bg-neutral-800">
        <motion.div
          className={`h-2 rounded-full bg-gradient-to-r ${getBarColor(safe)}`}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${safe}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        />
      </div>
    </div>
  );
}
