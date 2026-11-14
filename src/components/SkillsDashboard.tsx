import { motion } from 'framer-motion';
import {
  Database,
  BarChart3,
  Code2,
  Workflow,
  ClipboardList,
  FileText,
  Sparkles
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import type { SkillCategoryItem } from '../types';

const categoryIcons: Record<SkillCategoryItem['id'], React.ReactNode> = {
  ba: <ClipboardList className="h-5 w-5" aria-hidden="true" />,
  data: <Database className="h-5 w-5" aria-hidden="true" />,
  bi: <BarChart3 className="h-5 w-5" aria-hidden="true" />,
  integration: <Workflow className="h-5 w-5" aria-hidden="true" />,
  ai: <Sparkles className="h-5 w-5" aria-hidden="true" />,
  docs: <FileText className="h-5 w-5" aria-hidden="true" />,
  tech: <Code2 className="h-5 w-5" aria-hidden="true" />,
};

export default function SkillsDashboard() {
  const { lang } = useLang();
  const categories: SkillCategoryItem[] = (lang === 'en' ? profileEN : profileES).skillCategories;

  const getLevelColor = (level: SkillCategoryItem['level']) => {
    switch (level) {
      case 'advanced': return 'bg-green-500 dark:bg-green-600';
      case 'intermediate': return 'bg-blue-500 dark:bg-blue-600';
      case 'beginner': return 'bg-yellow-500 dark:bg-yellow-600';
    }
  };

  const getLevelText = (level: SkillCategoryItem['level']) => {
    if (lang === 'en') {
      switch (level) {
        case 'advanced': return 'Advanced';
        case 'intermediate': return 'Intermediate';
        case 'beginner': return 'Beginner';
      }
    } else {
      switch (level) {
        case 'advanced': return 'Avanzado';
        case 'intermediate': return 'Intermedio';
        case 'beginner': return 'Principiante';
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="n-text text-2xl font-semibold tracking-tight">
          {lang === 'en' ? 'Technical Skills Dashboard' : 'Panel de Habilidades Técnicas'}
        </h3>
        <p className="n-muted mt-2">
          {lang === 'en'
            ? 'Comprehensive overview of my technical expertise across different domains'
            : 'Visión completa de mi experiencia técnica en diferentes dominios'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="n-border rounded-2xl border bg-[var(--n-bg)] p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="n-callout n-text rounded-xl p-2">
                  {categoryIcons[category.id]}
                </div>
                <h4 className="n-text font-semibold">
                  {category.title}
                </h4>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getLevelColor(category.level)}`}>
                {getLevelText(category.level)}
              </span>
            </div>

            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="n-text text-sm">{skill}</span>
                  <div className="flex items-center gap-1" aria-hidden="true">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-6 rounded-full ${
                          i <= (category.level === 'advanced' ? 3 : category.level === 'intermediate' ? 2 : 1)
                            ? 'bg-[var(--n-accent)]'
                            : 'bg-[var(--n-border)]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="n-border mt-4 border-t pt-4">
              <div className="n-muted text-xs">
                {lang === 'en' ? 'Experience' : 'Experiencia'}:{' '}
                <span className="font-semibold">
                  {category.level === 'advanced'
                    ? (lang === 'en' ? '3+ years' : '3+ años')
                    : category.level === 'intermediate'
                    ? (lang === 'en' ? '1-3 years' : '1-3 años')
                    : (lang === 'en' ? '<1 year' : '<1 año')}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI and automation that is actually running, not a wish list */}
      <div className="n-callout mt-8 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Workflow className="n-text h-5 w-5" aria-hidden="true" />
          <h4 className="n-text font-semibold">
            {lang === 'en' ? 'AI and automation in production' : 'IA y automatización en producción'}
          </h4>
        </div>
        <p className="n-muted mt-2 text-sm leading-relaxed">
          {lang === 'en'
            ? 'At Flowber: an LLM agent with 20 role-scoped tools, RAG on pgvector at 100% hit@1, and 18 self-hosted n8n workflows (reminders, follow-ups, loyalty, reports, Google Calendar sync). At Virtrify, since November 2026: the CRM, automations, and content system of a US wellness brand, built to be run by its founder.'
            : 'En Flowber: un agente LLM con 20 herramientas filtradas por rol, RAG sobre pgvector con 100% hit@1 y 18 workflows de n8n autoalojados (recordatorios, seguimientos, lealtad, reportes, sincronización con Google Calendar). En Virtrify, desde noviembre de 2026: el CRM, las automatizaciones y el sistema de contenido de una marca de bienestar de EE. UU., construido para que lo opere su fundadora.'}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {['n8n', 'Make · Zapier', 'GoHighLevel · HubSpot', 'Stripe', 'Workers AI · Llama 4', 'pgvector · bge-m3', 'Telegram bots', 'Docker · Traefik'].map((tech) => (
            <span key={tech} className="n-tag n-tag-gray text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
