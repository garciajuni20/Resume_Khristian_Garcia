import { motion } from "framer-motion";
import { formatMonthYearRange, formatRelativeDuration } from "../utils/dateFormatter";

type Props = {
  company: string;
  title: string;
  start: string;
  end?: string;
  location?: string;
  bullets: string[];
  tech?: string[];
};

export default function ExperienceCard({
  company,
  title,
  start,
  end,
  location,
  bullets,
  tech,
}: Props) {
  const range = formatMonthYearRange(start, end);
  const duration = formatRelativeDuration(start, end);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          <div className="text-sm text-white/80">{company}</div>
          {location ? <div className="text-xs text-white/60">{location}</div> : null}
        </div>

        <div className="text-xs text-white/60 sm:text-right">
          <div>{range}</div>
          <div className="text-white/50">{duration}</div>
        </div>
      </div>

      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80">
        {bullets.map((b, idx) => (
          <li key={idx}>{b}</li>
        ))}
      </ul>

      {tech && tech.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}
