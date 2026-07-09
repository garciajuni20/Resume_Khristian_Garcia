import { motion } from 'framer-motion';
import { Quote, Star, Building, Linkedin } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';

export default function Testimonials() {
  const { lang } = useLang();
  const profile = lang === 'en' ? profileEN : profileES;
  const testimonials = profile.testimonials;
  const linkedin = profile.links.find(l => l.label === 'LinkedIn')?.href ?? '#';

  const t = lang === 'en' ? {
    title: 'What Colleagues Say',
    subtitle: 'Feedback from direct colleagues at Alleviate Financial Solutions',
    note: 'Both colleagues are active on LinkedIn and can be contacted directly.',
    references: 'Additional references available upon request.',
  } : {
    title: 'Lo que dicen los colegas',
    subtitle: 'Feedback de colegas directos en Alleviate Financial Solutions',
    note: 'Ambos colegas están activos en LinkedIn y pueden ser contactados directamente.',
    references: 'Referencias adicionales disponibles a solicitud.',
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.title}</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            {/* Large quote mark */}
            <Quote aria-hidden="true" className="absolute right-6 top-6 h-12 w-12 text-blue-100 dark:text-blue-900/30" />

            {/* Stars */}
            <div className="mb-4 flex gap-1" aria-hidden="true">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="mb-6 text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
              "{testimonial.text}"
            </p>

            {/* Person */}
            <div className="border-t border-neutral-100 pt-5 dark:border-neutral-800">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {testimonial.role}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-500">
                    <Building className="h-3 w-3" aria-hidden="true" />
                    {testimonial.relationship}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LinkedIn CTA */}
      <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{t.note}</p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{t.references}</p>
          </div>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:bg-neutral-800 dark:text-blue-300 dark:hover:bg-neutral-700 transition-colors"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
