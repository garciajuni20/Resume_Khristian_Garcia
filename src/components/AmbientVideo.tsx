import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

interface AmbientVideoProps {
  /** Paths relative to the Vite base URL; WebM is tried first when given */
  mp4: string;
  webm?: string;
  poster: string;
  className?: string;
  /** Decorative loops stay out of the accessibility tree */
  label?: string;
}

/**
 * Muted looping clip that only downloads when it nears the viewport and pauses
 * when it leaves. With prefers-reduced-motion it stays on the poster frame.
 */
export default function AmbientVideo({ mp4, webm, poster, className = '', label }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  // Sources mount on first approach, so the element has to reload before playing
  useEffect(() => {
    if (near) ref.current?.load();
  }, [near]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !near) return;
    if (visible) el.play().catch(() => {});
    else el.pause();
  }, [near, visible]);

  return (
    <video
      ref={ref}
      className={className}
      poster={asset(poster)}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {near && webm && <source src={asset(webm)} type="video/webm" />}
      {near && <source src={asset(mp4)} type="video/mp4" />}
    </video>
  );
}
