import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clapperboard, Play, X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { FLUID } from '../utils/animations';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

/** Rendered with Remotion from /video (npm run render:es / render:en) */
function sources(lang: 'en' | 'es') {
  return { src: asset(`video/career-${lang}.mp4`), poster: asset(`video/career-${lang}.webp`) };
}

const LABELS = {
  es: { title: 'Mi trayectoria en 54 segundos', sub: 'De remesas y fintech a IA y datos: hecho con código en Remotion.', play: 'Ver video', close: 'Cerrar video' },
  en: { title: 'My career in 54 seconds', sub: 'From remittances and fintech to AI and data: made with code in Remotion.', play: 'Watch video', close: 'Close video' },
};

/** Poster with a play button; the video only loads once the visitor asks for it. */
function Player({ autoPlay = false }: { autoPlay?: boolean }) {
  const { lang } = useLang();
  const { src, poster } = sources(lang);
  const [playing, setPlaying] = useState(autoPlay);
  const ref = useRef<HTMLVideoElement>(null);
  const t = LABELS[lang];

  return (
    <div className="n-border relative aspect-video w-full overflow-hidden rounded-xl border bg-black">
      {playing ? (
        <video ref={ref} key={src} src={src} poster={poster} controls autoPlay playsInline className="h-full w-full" />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={t.play} className="group absolute inset-0">
          <img src={poster} alt="" className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]" loading="lazy" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-500 group-hover:bg-black/10">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-900 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 group-active:scale-95">
              <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export function CareerVideoBlock() {
  const { lang } = useLang();
  const t = LABELS[lang];
  return (
    <div>
      <div className="mb-3 flex items-start gap-2">
        <Clapperboard className="n-muted mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <div>
          <p className="n-text text-sm font-semibold">{t.title}</p>
          <p className="n-muted text-xs">{t.sub}</p>
        </div>
      </div>
      <Player />
    </div>
  );
}

/** Button that opens the career film in a modal */
export function CareerVideoButton({ className = '' }: { className?: string }) {
  const { lang } = useLang();
  const t = LABELS[lang];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <Play className="h-4 w-4" fill="currentColor" aria-hidden="true" />
        {t.title}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t.title}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.6, ease: FLUID }}
              className="relative w-full max-w-5xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white transition-colors duration-300 hover:bg-white/20"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <Player autoPlay />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
