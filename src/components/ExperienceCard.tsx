import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Building2 } from 'lucide-react';
import { getDuration } from '../utils/dateFormatter';
import ApproachFlow from './ApproachFlow';
import type { Approach } from '../types';

type Lang = 'en' | 'es';

type Item = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  industry?: string;
  tags?: string[];
  bullets?: string[];
  approach?: Approach;
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
      className="n-border group w-full rounded-2xl border bg-n-bg p-5 text-left transition-shadow duration-500 hover:shadow-xl hover:shadow-black/5 n-focus"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="n-text font-semibold leading-snug transition-colors group-hover:text-n-accent">
            {item.role}
          </div>
          <div className="n-text mt-0.5 text-sm font-medium">
            {item.company}
          </div>
          <div className="n-muted mt-1 flex items-center gap-1 text-xs">
            <MapPin className="h-3 w-3 shrink-0" />
            {item.location}
          </div>
          {item.industry && (
            <div className="n-tag n-tag-brown mt-2 max-w-full gap-1.5 whitespace-normal text-xs">
              <Building2 className="h-3 w-3 shrink-0" aria-hidden="true" />
              {item.industry}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="n-muted whitespace-nowrap font-mono-geist text-xs">
            {dateLabel}
          </div>
          {isPresent && (
            <span className="n-tag n-tag-green gap-1 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {lang === 'en' ? 'Current' : 'Actual'}
            </span>
          )}
        </div>
      </div>

      {item.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map(t => (
            <span key={t} className="n-tag n-tag-gray text-xs">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {item.approach ? (
        <ApproachFlow approach={item.approach} lang={lang} compact className="mt-4" />
      ) : item.bullets?.length ? (
        <p className="n-muted mt-3 line-clamp-2 text-sm leading-relaxed">
          {item.bullets[0]}
        </p>
      ) : null}

      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-n-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {lang === 'en' ? 'View details' : 'Ver detalles'}
        <ChevronRight className="h-3.5 w-3.5" />
      </div>
    </motion.button>
  );
}
