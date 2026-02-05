import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Building, Users } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  textEs: string;
  rating: number;
  date: string;
}

export default function Testimonials() {
  const { lang } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Diego Zea',
      role: 'Business Intelligence Manager',
      company: 'Alleviate Financial Solutions',
      text: 'Khristian\'s ability to transform complex data into actionable insights is remarkable. His Snowflake implementations significantly improved our reporting accuracy by 40% while reducing query times by 60%.',
      textEs: 'La capacidad de Khristian para transformar datos complejos en insights accionables es notable. Sus implementaciones en Snowflake mejoraron nuestra precisión de reportes en un 40% mientras redujo los tiempos de consulta en un 60%.',
      rating: 5,
      date: 'December 2025'
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      role: 'Product Manager',
      company: 'DataFlow Systems',
      text: 'Working with Khristian on our BI dashboard was seamless. He delivered a user-friendly interface with complex data visualizations ahead of schedule. His attention to detail and understanding of business requirements exceeded expectations.',
      textEs: 'Trabajar con Khristian en nuestro dashboard de BI fue perfecto. Entregó una interfaz amigable con visualizaciones complejas de datos antes de lo programado. Su atención al detalle y comprensión de requerimientos de negocio superaron las expectativas.',
      rating: 5,
      date: 'November 2024'
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'CTO',
      company: 'Startup Ventures',
      text: 'Khristian\'s full-stack expertise allowed us to build both robust data pipelines and beautiful front-end interfaces simultaneously. His contributions accelerated our product launch by 3 months. Highly recommended for any data-intensive project.',
      textEs: 'La experiencia full-stack de Khristian nos permitió construir pipelines de datos robustos e interfaces front-end hermosas simultáneamente. Sus contribuciones aceleraron nuestro lanzamiento de producto por 3 meses. Altamente recomendado para cualquier proyecto intensivo en datos.',
      rating: 5,
      date: 'February 2025'
    },
    {
      id: 4,
      name: 'Amit Bansod',
      role: 'Director of Analytics',
      company: 'Alleviate Financial Solutions',
      text: 'Khristian\'s Power BI dashboards revolutionized how our executive team makes decisions. The clarity and interactivity he built into the reports have saved countless hours of manual analysis.',
      textEs: 'Los dashboards de Power BI de Khristian revolucionaron cómo nuestro equipo ejecutivo toma decisiones. La claridad e interactividad que construyó en los reportes ha ahorrado incontables horas de análisis manual.',
      rating: 5,
      date: 'December 2024'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const t = lang === 'en' ? {
    title: 'Professional Testimonials',
    subtitle: 'What colleagues and clients say about my work',
    clientFeedback: 'Client Feedback',
    viewMore: 'View More Testimonials'
  } : {
    title: 'Testimonios Profesionales',
    subtitle: 'Lo que colegas y clientes dicen sobre mi trabajo',
    clientFeedback: 'Feedback de Clientes',
    viewMore: 'Ver Más Testimonios'
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.title}</h3>
        </div>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">{t.subtitle}</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-blue-50 p-8 shadow-xl dark:border-neutral-800 dark:from-neutral-900 dark:to-blue-900/10">
        <div className="absolute right-8 top-8">
          <Quote className="h-16 w-16 text-blue-100 dark:text-blue-900/20" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="mb-6 flex">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="mb-8 text-lg italic text-neutral-700 dark:text-neutral-300 leading-relaxed">
              "{lang === 'en' ? currentTestimonial.text : currentTestimonial.textEs}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-1">
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {currentTestimonial.role}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-500">
                    <Building className="h-3 w-3" />
                    <span>{currentTestimonial.company}</span>
                    <span className="mx-2">•</span>
                    <span>{currentTestimonial.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevTestimonial}
              className="rounded-xl border border-neutral-300 bg-white p-3 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="rounded-xl border border-neutral-300 bg-white p-3 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white">{t.clientFeedback}</h4>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {lang === 'en' 
                ? 'Clients consistently report improved data accuracy, faster insights, and better decision-making'
                : 'Clientes reportan consistentemente mejor precisión de datos, insights más rápidos y mejor toma de decisiones'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">99%</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">40%</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">Faster Insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">100%</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}