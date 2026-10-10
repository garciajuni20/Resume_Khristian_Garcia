import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { TagColor } from '../../data/flowber';
import { FLUID } from '../../utils/animations';

/** Heavy fade-up with blur as a block scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.8, delay, ease: FLUID }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Tag({ label, color }: { label: string; color: TagColor }) {
  return <span className={`n-tag n-tag-${color}`}>{label}</span>;
}

export function Callout({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="n-callout flex gap-3 rounded-md px-4 py-4">
      <div className="mt-0.5 shrink-0 n-muted" aria-hidden="true">
        {icon}
      </div>
      <div className="n-text text-base leading-relaxed">{children}</div>
    </div>
  );
}

/** Notion toggle block: rotating triangle and height animation. */
export function Toggle({
  title,
  children,
  defaultOpen = false,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="n-hover group flex w-full items-start gap-2 rounded-md px-2 py-1 text-left transition-colors duration-300 active:scale-[0.99] focus-visible:outline-2"
      >
        <ChevronRight
          className={`mt-1 h-4 w-4 shrink-0 n-muted transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? 'rotate-90' : ''}`}
          aria-hidden="true"
        />
        <span className="n-text text-base font-semibold">{title}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: FLUID }}
            className="overflow-hidden"
          >
            <div className="pb-2 pl-8 pr-2 pt-1 n-muted text-base leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Notion heading with an anchor that shows on hover. */
export function SectionHeading({ id, children, intro }: { id: string; children: React.ReactNode; intro?: string }) {
  return (
    <div className="mb-4">
      <h2 id={id} className="group scroll-mt-24 n-text text-2xl font-semibold tracking-tight">
        <a href={`#${id}`} onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }} className="relative">
          <span className="absolute -left-6 top-0 hidden n-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inline" aria-hidden="true">#</span>
          {children}
        </a>
      </h2>
      {intro && <p className="mt-2 n-muted text-base leading-relaxed">{intro}</p>}
    </div>
  );
}

/** Animated number that counts up the first time it enters the viewport. */
export function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const controls = animate(0, value, {
      duration: reduce ? 0 : 1.6,
      ease: FLUID,
      onUpdate: v => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Sticky "On this page" outline that highlights the section in view. */
export function TableOfContents({ items, title }: { items: { id: string; label: string }[]; title: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    items.forEach(i => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={title} className="text-sm">
      <p className="mb-2 px-2 n-muted text-xs font-semibold uppercase tracking-wider">{title}</p>
      <ul className="space-y-0.5">
        {items.map(i => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              onClick={e => {
                e.preventDefault();
                document.getElementById(i.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-current={active === i.id ? 'location' : undefined}
              className={`n-hover block rounded-md px-2 py-1 transition-colors duration-300 ${
                active === i.id ? 'n-text font-semibold' : 'n-muted'
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
