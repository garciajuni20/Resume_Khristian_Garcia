import { useState } from 'react';
import { Download, FileText, Loader2, Sparkles, AlignLeft } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import type { ProfileData } from '../types';

type PDFVariant = 'creative-en' | 'creative-es' | 'ats-en' | 'ats-es';

async function downloadPDF(variant: PDFVariant, setLoading: (v: PDFVariant | null) => void) {
  setLoading(variant);
  try {
    const { pdf } = await import('@react-pdf/renderer');
    const lang = variant.endsWith('en') ? 'en' : 'es';
    const data = (lang === 'en' ? profileEN : profileES) as unknown as ProfileData;
    const isCreative = variant.startsWith('creative');
    const fileName = `khristian-garcia-${lang === 'en' ? 'resume' : 'cv'}-${isCreative ? 'creative' : 'ats'}.pdf`;

    let element;
    if (isCreative) {
      const { CVCreative } = await import('../pdf/CVCreative');
      element = <CVCreative data={data} lang={lang} />;
    } else {
      const { CVATS } = await import('../pdf/CVATS');
      element = <CVATS data={data} lang={lang} />;
    }

    const blob = await pdf(element).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('PDF generation error:', err);
  } finally {
    setLoading(null);
  }
}

export default function PDFDownloadButtons() {
  const { lang } = useLang();
  const [loading, setLoading] = useState<PDFVariant | null>(null);

  const t = lang === 'en'
    ? {
        title: 'Download Resume',
        creative: 'Creative',
        ats: 'ATS-Friendly',
        en: 'English',
        es: 'Spanish',
        generating: 'Generating…',
        creativeDesc: 'Visual, designed layout for humans',
        atsDesc: 'Clean plain text, optimized for ATS systems',
      }
    : {
        title: 'Descargar CV',
        creative: 'Creativo',
        ats: 'ATS-Optimizado',
        en: 'Inglés',
        es: 'Español',
        generating: 'Generando…',
        creativeDesc: 'Diseño visual, ideal para reclutadores',
        atsDesc: 'Texto limpio, optimizado para sistemas ATS',
      };

  const buttons: { variant: PDFVariant; label: string; sublabel: string; icon: React.ReactNode; color: string }[] = [
    {
      variant: 'creative-en',
      label: `${t.creative} — ${t.en}`,
      sublabel: t.creativeDesc,
      icon: <Sparkles className="h-4 w-4" />,
      color: 'from-blue-500 to-violet-500',
    },
    {
      variant: 'creative-es',
      label: `${t.creative} — ${t.es}`,
      sublabel: t.creativeDesc,
      icon: <Sparkles className="h-4 w-4" />,
      color: 'from-violet-500 to-indigo-500',
    },
    {
      variant: 'ats-en',
      label: `${t.ats} — ${t.en}`,
      sublabel: t.atsDesc,
      icon: <AlignLeft className="h-4 w-4" />,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      variant: 'ats-es',
      label: `${t.ats} — ${t.es}`,
      sublabel: t.atsDesc,
      icon: <AlignLeft className="h-4 w-4" />,
      color: 'from-teal-500 to-cyan-500',
    },
  ];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-3 mb-5">
        <div className="rounded-xl bg-blue-50 p-2.5 dark:bg-blue-900/20">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-neutral-900 dark:text-white">{t.title}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {lang === 'en' ? '4 versions · Generated from live data' : '4 versiones · Generadas desde datos en tiempo real'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {buttons.map(btn => {
          const isLoading = loading === btn.variant;
          return (
            <button
              key={btn.variant}
              onClick={() => downloadPDF(btn.variant, setLoading)}
              disabled={loading !== null}
              className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white px-4 py-3 text-left hover:border-blue-300 hover:shadow-md transition-all duration-200 disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-blue-700"
            >
              <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${btn.color}`} />
              <div className="flex items-center gap-2 mb-1">
                <div className={`rounded-lg bg-gradient-to-br ${btn.color} p-1.5 text-white`}>
                  {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : btn.icon}
                </div>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {isLoading ? t.generating : btn.label}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 pl-9">{btn.sublabel}</p>
              {!isLoading && (
                <Download className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500 text-center">
        {lang === 'en'
          ? 'PDFs are generated client-side from structured profile data — always up-to-date.'
          : 'Los PDFs se generan en el cliente desde datos estructurados — siempre actualizados.'}
      </p>
    </div>
  );
}
