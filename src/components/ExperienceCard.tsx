import { motion } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import { getDuration } from '../utils/dateFormatter';

type Lang = 'en' | 'es';

type Item = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  tags?: string[];
  bullets?: string[];
};

type Props = {
  item: Item;
  onOpen: (item: Item) => void;
  lang: Lang;
};

export default function ExperienceCard({ item, onOpen, lang }: Props) {
  const isPresent = item.end === 'present' || item.end === 'actual';
  const dateLabel = getDuration(item.start, item.end, lang);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      className="group w-full text-left rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-blue-900/60"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
            {item.role}
          </div>
          <div className="mt-0.5 text-sm font-medium text-neutral-700 dark:text-neutral-200">
            {item.company}
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
            <MapPin className="h-3 w-3 shrink-0" />
            {item.location}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
            {dateLabel}
          </div>
          {isPresent && (
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              {lang === 'en' ? 'Current' : 'Actual'}
            </span>
          )}
        </div>
      </div>

      {item.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map(t => (
            <span
              key={t}
              className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {item.bullets?.length ? (
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {item.bullets[0]}
        </p>
      ) : null}

      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
        {lang === 'en' ? 'View details' : 'Ver detalles'}
        <ChevronRight className="h-3.5 w-3.5" />
      </div>
    </motion.button>
  );
}
