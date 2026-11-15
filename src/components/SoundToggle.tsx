import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Headphones, X } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { useLang } from '../context/LanguageContext';
import { FLUID } from '../utils/animations';

const LABELS = {
  en: { on: 'Turn sound off', off: 'Turn sound on: music and effects', hint: 'This portfolio has its own music and sounds', play: 'Turn on', dismiss: 'No thanks' },
  es: { on: 'Apagar el sonido', off: 'Encender el sonido: música y efectos', hint: 'Este portafolio tiene su propia música y sonidos', play: 'Activar', dismiss: 'No, gracias' },
};

/** Four bars: dancing while the music is audible, a flat line when it's off. */
function Bars({ active, className = '' }: { active: boolean; className?: string }) {
  return (
    <span className={`flex h-4 items-end gap-[3px] ${className}`} aria-hidden="true">
      {[0, 1, 2, 3].map(i => (
        <span
          key={i}
          className={`w-[3px] origin-bottom rounded-full bg-current ${active ? 'sound-bar' : ''}`}
          style={{ height: active ? '100%' : '3px', animationDelay: `${i * -0.27}s` }}
        />
      ))}
    </span>
  );
}

/** Navbar control. `size="sm"` is the mobile-menu variant. */
export default function SoundToggle({ className = '' }: { className?: string }) {
  const { on, playing, toggle } = useSound();
  const { lang } = useLang();
  const t = LABELS[lang];
  return (
    <button
      type="button"
      onClick={toggle}
      data-sfx="none"
      aria-pressed={on}
      aria-label={on ? t.on : t.off}
      title={on ? t.on : t.off}
      className={`inline-flex items-center justify-center rounded-lg transition-colors duration-200 n-focus ${on ? 'text-n-accent-2' : 'n-muted n-hover hover:text-n-text'} ${className}`}
    >
      <Bars active={on && playing} />
    </button>
  );
}

/** First-visit invitation, bottom corner; gone after any choice. */
export function SoundHint() {
  const { showHint, dismissHint, toggle } = useSound();
  const { lang } = useLang();
  const t = LABELS[lang];
  const [visible, setVisible] = useState(false);

  // Wait until the page has painted and the visitor has had a look
  useEffect(() => {
    if (!showHint) return;
    const id = window.setTimeout(() => setVisible(true), 3500);
    return () => window.clearTimeout(id);
  }, [showHint]);

  // Said once: after a few seconds on screen it goes away for good, so it never
  // follows a visitor from page to page (the toggle in the navbar stays)
  useEffect(() => {
    if (!showHint || !visible) return;
    const id = window.setTimeout(dismissHint, 9000);
    return () => window.clearTimeout(id);
  }, [showHint, visible, dismissHint]);

  return (
    <AnimatePresence>
      {showHint && visible && (
        <motion.div
          role="region"
          aria-label={t.hint}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.45, ease: FLUID }}
          className="n-border fixed bottom-4 left-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border bg-n-bg/95 py-2.5 pl-3.5 pr-2 shadow-xl shadow-black/10 backdrop-blur-xl dark:shadow-black/40"
        >
          <Headphones className="h-4 w-4 shrink-0 text-n-accent-2" aria-hidden="true" />
          <span className="n-text text-sm">{t.hint}</span>
          <button type="button" onClick={toggle} data-sfx="none" className="n-btn-primary rounded-lg px-3 py-1.5 text-xs font-semibold n-focus">
            {t.play}
          </button>
          <button type="button" onClick={dismissHint} data-sfx="none" aria-label={t.dismiss} className="n-muted n-hover rounded-lg p-1.5 n-focus">
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
