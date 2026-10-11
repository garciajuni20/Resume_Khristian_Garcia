import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AtSign, Clapperboard, Play, Scissors } from 'lucide-react';
import AmbientVideo from '../AmbientVideo';
import { Reveal, SectionHeading } from '../notion/primitives';
import type { BrandContent } from '../../data/flowber';
import { FLUID } from '../../utils/animations';

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

/** Vertical brand film: only the poster loads until the visitor presses play. */
function BrandFilm({ title, play }: { title: string; play: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[2rem] border-4 border-neutral-900 bg-neutral-900 p-1 shadow-2xl shadow-black/30 dark:border-neutral-700">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] bg-black">
        {playing ? (
          <video
            src={asset('flowber/flowber-film.mp4')}
            poster={asset('flowber/flowber-film.webp')}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-cover"
            aria-label={title}
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={play} className="group absolute inset-0">
            <img
              src={asset('flowber/flowber-film.webp')}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-500 group-hover:bg-black/5">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c6f432] text-neutral-900 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 group-active:scale-95">
                <Play className="ml-0.5 h-6 w-6" fill="currentColor" aria-hidden="true" />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function BrandSection({ b }: { b: BrandContent }) {
  return (
    <section className="mt-24">
      <SectionHeading id="marca" intro={b.intro}>{b.heading}</SectionHeading>

      <div className="grid items-start gap-8 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <Reveal>
          <BrandFilm title={b.filmTitle} play={b.filmPlay} />
          <p className="n-text mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold">
            <Clapperboard className="h-4 w-4" aria-hidden="true" />
            {b.filmTitle}
          </p>
          <p className="n-muted mx-auto mt-1 max-w-[320px] text-center text-xs leading-relaxed">{b.filmNote}</p>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={0.08}>
            <p className="n-text mb-3 text-sm font-semibold">{b.evolutionTitle}</p>
            <ol className="flex items-center gap-2">
              {b.evolution.map((step, i) => (
                <li key={step.src} className="flex min-w-0 flex-1 items-center gap-2">
                  <motion.figure
                    initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: i * 0.15, ease: FLUID }}
                    whileHover={{ y: -4, rotate: i === 1 ? 2 : -2 }}
                    className="min-w-0 flex-1"
                  >
                    <div className="n-border aspect-square overflow-hidden rounded-xl border bg-white">
                      <img
                        src={asset(step.src)}
                        alt={step.alt}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full ${i === b.evolution.length - 1 ? 'object-cover object-top' : 'object-contain p-2'}`}
                      />
                    </div>
                    <figcaption className="n-muted mt-1.5 truncate text-center text-xs">{step.label}</figcaption>
                  </motion.figure>
                  {i < b.evolution.length - 1 && <ArrowRight className="n-muted h-4 w-4 shrink-0" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="n-text mb-3 flex items-center gap-1.5 text-sm font-semibold">
              <AtSign className="h-4 w-4" aria-hidden="true" />
              {b.audienceTitle}
            </p>
            {/* Two screenshots stacked like cards; they fan out on hover */}
            <motion.div initial="rest" whileHover="fan" animate="rest" className="relative mx-4 mt-6">
              <motion.img
                src={asset('flowber/brand/ig-grid.webp')}
                alt={b.audienceGridAlt}
                loading="lazy"
                decoding="async"
                width={840}
                height={639}
                variants={{ rest: { rotate: 2, x: 4, y: -4 }, fan: { rotate: 4, x: 14, y: -8 } }}
                transition={{ duration: 0.6, ease: FLUID }}
                className="n-border absolute inset-0 block h-full w-full rounded-xl border bg-black object-cover opacity-80 shadow-xl"
              />
              <motion.img
                src={asset('flowber/brand/ig-profile.webp')}
                alt={b.audienceAlt}
                loading="lazy"
                decoding="async"
                width={840}
                height={623}
                variants={{ rest: { rotate: 0, x: 0 }, fan: { rotate: -2, x: -10 } }}
                transition={{ duration: 0.6, ease: FLUID }}
                className="n-border relative block w-full rounded-xl border bg-black shadow-2xl shadow-black/20"
              />
            </motion.div>
            <p className="n-muted mt-3 text-sm leading-relaxed">{b.audienceBody}</p>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-10">
        <p className="n-text flex items-center gap-1.5 text-sm font-semibold">
          <Scissors className="h-4 w-4" aria-hidden="true" />
          {b.clipsTitle}
        </p>
        <p className="n-muted mb-3 mt-1 text-xs">{b.clipsNote}</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {b.clips.map((c, i) => (
            <motion.figure
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: FLUID }}
              className="group relative aspect-[9/16] overflow-hidden rounded-xl bg-black"
            >
              <AmbientVideo
                mp4={c.src}
                poster={c.poster}
                label={c.label}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2.5 pt-8 text-xs font-semibold text-white">
                {c.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
