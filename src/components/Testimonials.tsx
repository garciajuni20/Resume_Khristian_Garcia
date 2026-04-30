import { motion } from 'framer-motion';
import { Quote, Star, Building } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  textEs: string;
  rating: number;
  relationship: string;
  relationshipEs: string;
}

export default function Testimonials() {
  const { lang } = useLang();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Diego Zea',
      role: 'Business Intelligence Manager',
      company: 'Alleviate Financial Solutions',
      text: "Khristian's ability to turn complex, messy data into clean, actionable insights has been remarkable. His Snowflake implementations improved our reporting accuracy by 40% while cutting query times in half. He didn't just do the work — he built the foundation the entire team now relies on.",
      textEs: "La capacidad de Khristian para transformar datos complejos y desordenados en insights claros y accionables ha sido notable. Sus implementaciones en Snowflake mejoraron nuestra precisión de reportes en un 40% mientras reducían los tiempos de consulta a la mitad. No solo hizo el trabajo — construyó la base en la que todo el equipo ahora se apoya.",
      rating: 5,
      relationship: 'Direct Manager at Alleviate Financial Solutions',
      relationshipEs: 'Gerente directo en Alleviate Financial Solutions'
    },
    {
      id: 2,
      name: 'Amit Bansod',
      role: 'Director of Analytics',
      company: 'Alleviate Financial Solutions',
      text: "Khristian's Power BI dashboards transformed the way our executive team makes decisions. The clarity and depth he brings to financial reporting has saved us countless hours of manual analysis. He operates like a senior analyst despite his tenure — driven, autonomous, and always quality-focused.",
      textEs: "Los dashboards de Power BI de Khristian transformaron cómo nuestro equipo ejecutivo toma decisiones. La claridad y profundidad que aporta a los reportes financieros nos ha ahorrado incontables horas de análisis manual. Opera como un analista senior a pesar de su experiencia — motivado, autónomo y siempre enfocado en la calidad.",
      rating: 5,
      relationship: 'Director of Analytics at Alleviate Financial Solutions',
      relationshipEs: 'Director de Analytics en Alleviate Financial Solutions'
    }
  ];

  const t = lang === 'en' ? {
    title: 'What Colleagues Say',
    subtitle: 'Feedback from direct colleagues at Alleviate Financial Solutions',
    from: 'From',
    workedTogether: 'Worked together at'
  } : {
    title: 'Lo que dicen los colegas',
    subtitle: 'Feedback de colegas directos en Alleviate Financial Solutions',
    from: 'De',
    workedTogether: 'Trabajaron juntos en'
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
            <Quote className="absolute right-6 top-6 h-12 w-12 text-blue-100 dark:text-blue-900/30" />

            {/* Stars */}
            <div className="mb-4 flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="mb-6 text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
              "{lang === 'en' ? testimonial.text : testimonial.textEs}"
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
                    <Building className="h-3 w-3" />
                    {lang === 'en' ? testimonial.relationship : testimonial.relationshipEs}
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
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              {lang === 'en'
                ? 'Both colleagues are active on LinkedIn and can be contacted directly.'
                : 'Ambos colegas están activos en LinkedIn y pueden ser contactados directamente.'}
            </p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {lang === 'en'
                ? 'Additional references available upon request.'
                : 'Referencias adicionales disponibles a solicitud.'}
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/khristian-garcia--/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:bg-neutral-800 dark:text-blue-300 dark:hover:bg-neutral-700 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
