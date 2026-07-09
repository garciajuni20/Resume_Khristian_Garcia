import { useLang } from '../context/LanguageContext';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';

/** Infinite scrolling strip of the tech stack, built from profile.tools (pauses on hover, static under reduced motion). */
export default function TechMarquee() {
  const { lang } = useLang();
  const tools = (lang === 'en' ? profileEN : profileES).tools;

  const items = Array.from(
    new Set([
      ...tools.dataEngineering,
      ...tools.biAnalytics,
      ...tools.cloudDevOps,
      ...tools.fullStack,
    ])
  );

  // Duplicate the list so translateX(-50%) loops seamlessly
  const loop = [...items, ...items];

  return (
    <div
      className="marquee relative overflow-hidden py-3 border-y border-neutral-200/70 dark:border-neutral-800/70"
      aria-label={lang === 'en' ? 'Technology stack' : 'Stack tecnológico'}
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-neutral-50 to-transparent dark:from-neutral-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-neutral-50 to-transparent dark:from-neutral-950" />

      <div className="marquee-track gap-3 pr-3" aria-hidden="true">
        {loop.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="shrink-0 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-semibold text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
