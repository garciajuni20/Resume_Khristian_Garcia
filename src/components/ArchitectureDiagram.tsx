import { useState } from 'react';
import { motion } from 'framer-motion';

export interface ArchLayer {
  id: string;
  name: string;
  icon: React.ReactNode;
  technologies: string[];
  description: string;
  /** Extra detail shown in the panel when the layer is selected */
  detail?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  layers: ArchLayer[];
  detailTitle?: string;
}

/** Interactive vertical architecture timeline — click a layer to expand its detail. */
export default function ArchitectureDiagram({ title, subtitle, layers, detailTitle }: Props) {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const active = layers.find(l => l.id === activeLayer);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{title}</h3>
        {subtitle && (
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">{subtitle}</p>
        )}
      </div>

      <div className="relative">
        {/* Connection line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 -translate-x-1/2 hidden lg:block" aria-hidden="true" />

        <div className="space-y-8 lg:space-y-12">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45 }}
              className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Layer card */}
              <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                <div className="inline-block">
                  <button
                    onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                    aria-expanded={activeLayer === layer.id}
                    className={`group rounded-2xl border p-6 text-left transition-all ${
                      activeLayer === layer.id
                        ? 'border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20'
                        : 'border-neutral-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-neutral-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-xl bg-blue-100 p-2 group-hover:bg-blue-200 dark:bg-blue-900/30 dark:group-hover:bg-blue-900/50">
                        {layer.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {layer.name}
                      </h4>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {layer.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-neutral-800 dark:text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </button>
                </div>
              </div>

              {/* Center node */}
              <div className="relative z-10" aria-hidden="true">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-500 bg-white dark:bg-neutral-900">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                </div>
                <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-blue-400/20" />
              </div>

              {/* Opposite side (empty for balance) */}
              <div className="lg:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>

      {active?.detail && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/50 p-6 dark:border-blue-800 dark:bg-blue-900/10"
        >
          <h4 className="mb-3 font-semibold text-blue-700 dark:text-blue-300">
            {detailTitle ?? active.name}
          </h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">{active.detail}</p>
        </motion.div>
      )}
    </div>
  );
}
