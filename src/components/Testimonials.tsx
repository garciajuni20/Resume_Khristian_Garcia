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
        <h2 className="n-text text-2xl font-semibold tracking-tight">{t.title}</h2>
        <p className="mt-2 n-muted">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative overflow-hidden n-border rounded-2xl border bg-n-bg p-7"
          >
            {/* Large quote mark */}
            <Quote aria-hidden="true" className="n-muted absolute right-6 top-6 h-12 w-12 opacity-20" />

            {/* Stars */}
            <div className="mb-4 flex gap-1" aria-hidden="true">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="mb-6 n-text leading-relaxed">
              "{testimonial.text}"
            </p>

            {/* Person */}
            <div className="n-border border-t pt-5">
              <div className="flex items-center gap-4">
                <div className="n-callout n-text flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold n-text">
                    {testimonial.name}
                  </div>
                  <div className="text-sm n-muted">
                    {testimonial.role}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs n-muted">
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
      <div className="n-callout mt-6 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium n-text">{t.note}</p>
            <p className="mt-1 text-xs n-muted">{t.references}</p>
          </div>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="n-border n-text n-hover inline-flex shrink-0 items-center gap-2 rounded-lg border bg-n-bg px-4 py-2.5 text-sm font-semibold transition-colors duration-200"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
