import { ArrowRight } from 'lucide-react';
import type { Approach, Lang } from '../types';

const LABELS = {
  en: { context: 'Context', how: 'How', result: 'Result', goal: 'Goal' },
  es: { context: 'Contexto', how: 'Cómo', result: 'Resultado', goal: 'Meta' },
} as const;

/**
 * The three beats of a role (context → how → result), so a reader gets the
 * method, not only the job title. `compact` is the card version.
 */
export default function ApproachFlow({ approach, lang, compact = false, className = '' }: { approach: Approach; lang: Lang; compact?: boolean; className?: string }) {
  const t = LABELS[lang];
  const beats: { key: 'context' | 'how' | 'result'; label: string }[] = [
    { key: 'context', label: t.context },
    { key: 'how', label: t.how },
    { key: 'result', label: approach.planned ? t.goal : t.result },
  ];
  return (
    <ol className={`grid gap-3 sm:grid-cols-3 ${compact ? '' : 'n-callout rounded-2xl p-4 sm:p-5'} ${className}`} aria-label={lang === 'en' ? 'Context, how and result' : 'Contexto, cómo y resultado'}>
      {beats.map((b, i) => (
        <li key={b.key} className="relative min-w-0">
          <p className="flex items-center gap-1.5 font-mono-geist text-[10px] uppercase tracking-wider text-n-accent-2">
            <span>{i + 1}</span>
            {b.label}
            {i < beats.length - 1 && <ArrowRight className="ml-auto hidden h-3 w-3 n-muted sm:block" aria-hidden="true" />}
          </p>
          <p className={`mt-1 leading-relaxed ${compact ? 'n-muted text-xs' : 'n-text text-sm'}`}>{approach[b.key]}</p>
        </li>
      ))}
    </ol>
  );
}
