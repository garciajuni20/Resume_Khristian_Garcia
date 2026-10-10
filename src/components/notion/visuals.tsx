import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Bot, User, Wrench } from 'lucide-react';
import type { ChatTurn, PipelineNode } from '../../data/flowber';
import { FLUID } from '../../utils/animations';

/* ─── Pipeline: nodes joined by connectors with travelling packets ──── */
export function Pipeline({ nodes, label }: { nodes: PipelineNode[]; label: string }) {
  return (
    <figure aria-label={label} className="my-2">
      <ol className="flex flex-col gap-0 lg:flex-row lg:items-stretch">
        {nodes.map((node, i) => (
          <li key={node.title} className="flex flex-col lg:flex-1 lg:flex-row lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: FLUID }}
              className="n-border relative w-full rounded-lg border px-3 py-3 lg:h-full"
            >
              <span className="font-mono-geist n-muted text-xs">{String(i + 1).padStart(2, '0')}</span>
              <p className="n-text mt-1 text-sm font-semibold leading-snug">{node.title}</p>
              <p className="n-muted mt-1 text-xs leading-relaxed">{node.detail}</p>
            </motion.div>
            {i < nodes.length - 1 && (
              <div className="relative mx-auto h-8 w-px lg:mx-0 lg:h-px lg:w-8 lg:shrink-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[var(--n-border)]" />
                <span
                  className="pipe-packet is-vertical left-[-2.5px] lg:hidden"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
                <span
                  className="pipe-packet top-[-2.5px] hidden lg:block"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* ─── Device frames ─────────────────────────────────────────────────── */
export function BrowserFrame({ src, alt, url }: { src: string; alt: string; url: string }) {
  return (
    <div className="n-border overflow-hidden rounded-xl border bg-[var(--n-bg)] shadow-2xl shadow-black/10">
      <div className="n-border flex items-center gap-2 border-b px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="n-callout n-muted ml-2 flex-1 truncate rounded-md px-2 py-0.5 text-xs font-mono-geist">{url}</span>
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" width={1440} height={900} />
    </div>
  );
}

export function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full rounded-[2rem] border-4 border-neutral-900 bg-neutral-900 p-1 shadow-2xl shadow-black/30 dark:border-neutral-700">
      <div className="overflow-hidden rounded-[1.6rem]">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" width={780} height={1688} />
      </div>
    </div>
  );
}

/* ─── Tagline: words light up one by one as the block scrolls past ──── */
function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.28, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export function WordReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="n-text mx-auto max-w-[680px] text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
      {words.map((w, i) => (
        <Word key={`${w}-${i}`} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

/* ─── Chat demo: turns appear in sequence once visible ──────────────── */
export function ChatDemo({ turns, title, note }: { turns: ChatTurn[]; title: string; note: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setInterval(() => {
      setShown(n => {
        if (n >= turns.length) {
          window.clearInterval(timer);
          return n;
        }
        return reduce ? turns.length : n + 1;
      });
    }, reduce ? 0 : 900);
    return () => window.clearInterval(timer);
  }, [inView, turns.length]);

  return (
    <div ref={ref} className="n-border rounded-xl border">
      <div className="n-border flex items-center gap-2 border-b px-4 py-3">
        <Bot className="h-4 w-4 n-muted" aria-hidden="true" />
        <p className="n-text text-sm font-semibold">{title}</p>
        <span className="ml-auto flex items-center gap-1.5 n-muted text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Llama 4 Scout
        </span>
      </div>
      <ul className="min-h-[340px] space-y-3 px-4 py-4" aria-live="polite">
        {turns.slice(0, shown).map((t, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: FLUID }}
            className={`flex gap-2 ${t.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {t.from === 'tool' ? (
              <span className="n-code n-border inline-flex max-w-full items-center gap-2 rounded-md border px-2 py-1 text-xs font-mono-geist n-muted">
                <Wrench className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{t.text}</span>
              </span>
            ) : (
              <span
                className={`inline-flex max-w-[85%] items-start gap-2 rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  t.from === 'user' ? 'bg-[var(--n-accent)] text-white' : 'n-callout n-text'
                }`}
              >
                {t.from === 'user' && <User className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden="true" />}
                {t.text}
              </span>
            )}
          </motion.li>
        ))}
        {shown < turns.length && inView && (
          <li className="flex gap-1 px-1" aria-hidden="true">
            {[0, 1, 2].map(d => (
              <motion.span
                key={d}
                className="h-1.5 w-1.5 rounded-full bg-[var(--n-muted)]"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
              />
            ))}
          </li>
        )}
      </ul>
      <p className="n-border border-t px-4 py-2 n-muted text-xs">{note}</p>
    </div>
  );
}
