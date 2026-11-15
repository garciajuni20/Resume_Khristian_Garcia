import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

type Props = {
  name: string;
  level: number; // 0-100
  years?: number;
};

function getLevelLabel(level: number, lang?: string): string {
  if (level >= 90) return lang === 'es' ? 'Experto' : 'Expert';
  if (level >= 80) return lang === 'es' ? 'Avanzado' : 'Advanced';
  if (level >= 70) return lang === 'es' ? 'Competente' : 'Proficient';
  if (level >= 60) return lang === 'es' ? 'Intermedio' : 'Intermediate';
  return lang === 'es' ? 'Básico' : 'Basic';
}

export default function SkillMeter({ name, level, years }: Props) {
  const { lang } = useLang();
  const safe = Math.max(0, Math.min(100, level));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const yearsLabel = years ? (lang === 'es' ? `${years}+ años` : `${years}+ yrs`) : null;

  return (
    <div
      ref={ref}
      className="n-border rounded-2xl border bg-[var(--n-bg)] p-4"
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="font-medium n-text text-sm">{name}</div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold n-muted">{getLevelLabel(safe, lang)}</span>
          {yearsLabel && <span className="text-xs n-muted">{yearsLabel}</span>}
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--n-callout)]">
        <motion.div
          className="h-2 rounded-full bg-[var(--n-accent)]"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${safe}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        />
      </div>
    </div>
  );
}
