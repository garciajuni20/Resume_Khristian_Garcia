import { useState } from 'react';
import { Download, FileText, Loader2, PenTool, AlignLeft, AlertCircle, X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { downloadPDF, type PDFVariant } from '../utils/downloadPDF';

export default function PDFDownloadButtons() {
  const { lang } = useLang();
  const [loading, setLoading] = useState<PDFVariant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [atsNoPhoto, setAtsNoPhoto] = useState(false);

  const t = lang === 'en'
    ? {
        title: 'Download my resume',
        subtitle: 'Generated in your browser from the same data as this page, always current.',
        generating: 'Generating…',
        creative: { name: 'Creative', desc: 'Two pages set like a banknote: portrait, figures with their sources, the route and every role. For recruiters and clients.' },
        ats: { name: 'ATS-friendly', desc: 'Single-column text that applicant tracking systems parse cleanly, with optional photo in the header.' },
        noPhoto: 'Without photo',
        noPhotoHint: 'standard for US, Canada and UK',
        en: 'English',
        es: 'Spanish',
        preview: 'Preview of the',
      }
    : {
        title: 'Descarga mi CV',
        subtitle: 'Generadas en tu navegador con los mismos datos de esta página, siempre al día.',
        generating: 'Generando…',
        creative: { name: 'Creativo', desc: 'Dos páginas compuestas como un billete: retrato, cifras con su fuente, la ruta y cada rol. Para reclutadores y clientes.' },
        ats: { name: 'Optimizado para ATS', desc: 'Texto en una columna que los sistemas de selección leen sin errores, con foto opcional en el encabezado.' },
        noPhoto: 'Sin foto',
        noPhotoHint: 'lo habitual en EE. UU., Canadá y Reino Unido',
        en: 'Inglés',
        es: 'Español',
        preview: 'Vista previa del CV',
      };

  const kinds = [
    { id: 'creative' as const, icon: <PenTool className="h-4 w-4" aria-hidden="true" />, ...t.creative },
    { id: 'ats' as const, icon: <AlignLeft className="h-4 w-4" aria-hidden="true" />, ...t.ats },
  ];
  const base = import.meta.env.BASE_URL;

  return (
    <div>
      <div className="mb-4 flex items-start gap-3">
        <FileText className="n-muted mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div>
          <h3 className="n-text text-lg font-semibold">{t.title}</h3>
          <p className="n-muted text-sm">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {kinds.map(kind => (
          <div key={kind.id} className="n-border group flex flex-col overflow-hidden rounded-2xl border bg-n-bg">
            <div className="n-callout relative h-56 overflow-hidden px-8 pt-6">
              <img
                src={`${base}cv-previews/${kind.id}-${lang}.webp`}
                alt={`${t.preview} ${kind.name}`}
                loading="lazy"
                className="mx-auto w-full max-w-[260px] rounded-t-md shadow-xl shadow-black/15 ring-1 ring-black/5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-3 group-hover:rotate-[-1.5deg]"
                width={794}
                height={1123}
              />
            </div>
            <div className="n-border flex flex-1 flex-col border-t p-4">
              <div className="n-text flex items-center gap-2 font-semibold">
                {kind.icon}
                {kind.name}
              </div>
              <p className="n-muted mt-1 text-sm leading-relaxed">{kind.desc}</p>
              {kind.id === 'ats' && (
                <label className="n-text mt-3 flex cursor-pointer flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <input
                    type="checkbox"
                    checked={atsNoPhoto}
                    onChange={e => setAtsNoPhoto(e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded accent-n-text"
                  />
                  <span className="whitespace-nowrap font-medium">{t.noPhoto}</span>
                  <span className="n-muted">({t.noPhotoHint})</span>
                </label>
              )}
              <div className="mt-auto flex gap-2 pt-4">
                {(['en', 'es'] as const).map(l => {
                  const variant = (kind.id === 'ats' && atsNoPhoto ? `ats-nophoto-${l}` : `${kind.id}-${l}`) as PDFVariant;
                  const busy = loading === variant;
                  return (
                    <button
                      key={l}
                      type="button"
                      onClick={() => downloadPDF(variant, setLoading, setError)}
                      disabled={loading !== null}
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-transform duration-300 active:scale-[0.98] disabled:opacity-60 ${
                        l === lang ? 'bg-n-text text-n-bg' : 'n-border n-text n-hover border'
                      }`}
                    >
                      {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
                      {busy ? t.generating : l === 'en' ? t.en : t.es}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div role="alert" className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} aria-label="Close" className="shrink-0 opacity-60 transition-opacity hover:opacity-100">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
