import { useLang } from '../context/LanguageContext';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import type { SkillCategoryItem } from '../types';

/**
 * Skills by what I do with them, set as a ledger: the area and its level on the
 * left, the tools as words on the right. No meters: a level is a word and a range
 * of years, which is what the meters were standing in for.
 */
export default function SkillsDashboard() {
  const { lang } = useLang();
  const en = lang === 'en';
  const categories: SkillCategoryItem[] = (en ? profileEN : profileES).skillCategories;

  const level = (l: SkillCategoryItem['level']) => {
    const words = en
      ? { advanced: ['Advanced', '3+ years'], intermediate: ['Intermediate', '1 to 3 years'], beginner: ['Beginner', 'under 1 year'] }
      : { advanced: ['Avanzado', '3+ años'], intermediate: ['Intermedio', '1 a 3 años'], beginner: ['Principiante', 'menos de 1 año'] };
    const [word, years] = words[l];
    return `${word}, ${years}`;
  };

  return (
    <div className="w-full">
      <dl className="border-b border-n-border">
        {categories.map(category => (
          <div key={category.id} className="grid gap-x-8 gap-y-1 border-t border-n-border py-4 md:grid-cols-[15rem_minmax(0,1fr)]">
            <dt>
              <span className="font-display n-text block text-xl leading-tight">{category.title}</span>
              <span className={`mt-1 block text-xs ${category.level === 'advanced' ? 'n-text' : 'n-muted'}`}>{level(category.level)}</span>
            </dt>
            <dd className="n-muted text-sm leading-relaxed md:pt-1">{category.skills.join(', ')}</dd>
          </div>
        ))}
      </dl>

      {/* AI and automation that is actually running, not a wish list */}
      <div className="mt-8 grid gap-x-8 gap-y-2 md:grid-cols-[15rem_minmax(0,1fr)]">
        <h3 className="font-display n-text text-xl leading-tight">
          {en ? 'AI and automation in production' : 'IA y automatización en producción'}
        </h3>
        <div>
          <p className="n-text text-sm leading-relaxed">
            {en
              ? 'At Flowber: an LLM agent with 20 role-scoped tools, RAG on pgvector at 100% hit@1, and 18 self-hosted n8n workflows (reminders, follow-ups, loyalty, reports, Google Calendar sync). At Virtrify, since November 2026: the CRM, automations, and content system of a US wellness brand, built to be run by its founder.'
              : 'En Flowber: un agente LLM con 20 herramientas filtradas por rol, RAG sobre pgvector con 100% hit@1 y 18 workflows de n8n autoalojados (recordatorios, seguimientos, lealtad, reportes, sincronización con Google Calendar). En Virtrify, desde noviembre de 2026: el CRM, las automatizaciones y el sistema de contenido de una marca de bienestar de EE. UU., construido para que lo opere su fundadora.'}
          </p>
          <p className="n-muted mt-2 text-xs leading-relaxed">
            n8n, Make, Zapier, GoHighLevel, HubSpot, Stripe, Workers AI (Llama 4), pgvector con bge-m3, {en ? 'Telegram bots' : 'bots de Telegram'}, Docker, Traefik
          </p>
        </div>
      </div>
    </div>
  );
}
