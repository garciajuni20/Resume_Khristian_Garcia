import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, Clock, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const { lang } = useLang();

  const t = lang === 'en' ? {
    title: 'Contact',
    subtitle: 'Open to BI/Data roles, full-stack collaborations, and architecture projects.',
    formTitle: 'Send me a message',
    infoTitle: 'Contact Information',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    availability: 'Availability',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    responseTime: 'Typically respond within 24 hours',
    timezone: 'Timezone: CST (UTC-6)',
    directContact: 'Prefer direct contact?',
    connectWith: 'Connect with me on',
    hours: 'Monday - Friday, 9 AM - 6 PM'
  } : {
    title: 'Contacto',
    subtitle: 'Disponible para roles de BI/Datos, colaboraciones full-stack y proyectos de arquitectura.',
    formTitle: 'Envíame un mensaje',
    infoTitle: 'Información de Contacto',
    email: 'Correo',
    phone: 'Teléfono',
    location: 'Ubicación',
    availability: 'Disponibilidad',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    responseTime: 'Normalmente respondo en menos de 24 horas',
    timezone: 'Zona horaria: CST (UTC-6)',
    directContact: '¿Prefieres contacto directo?',
    connectWith: 'Conéctate conmigo en',
    hours: 'Lunes - Viernes, 9 AM - 6 PM'
  };

  const contactInfo = {
    email: 'garciajuni20@gmail.com',
    phone: '+502 5633 8735',
    location: 'Guatemala City, Guatemala',
    linkedin: 'https://linkedin.com/in/khristian-garcia--',
    github: 'https://github.com/garciajuni20'
  };

  useSEO({
    title: t.title,
    description: t.subtitle,
    lang,
    keywords: ['contact', 'hire', 'collaboration', 'job opportunity', 'architect']
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-50">
      <Container>
        <motion.div
          className="py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario de Contacto */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:order-2"
            >
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                <ContactForm />
              </div>
            </motion.div>

            {/* Información de Contacto */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:order-1"
            >
              <div className="h-full rounded-3xl border border-neutral-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg dark:border-neutral-800 dark:from-blue-900/10 dark:to-indigo-900/10">
                <h2 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-white">
                  {t.infoTitle}
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-neutral-800">
                      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">{t.email}</div>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-lg font-semibold text-neutral-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-neutral-800">
                      <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">{t.phone}</div>
                      <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                        className="text-lg font-semibold text-neutral-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-neutral-800">
                      <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">{t.location}</div>
                      <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {contactInfo.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-neutral-800">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">{t.availability}</div>
                      <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {t.hours}
                      </div>
                      <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        {t.timezone}
                      </div>
                    </div>
                  </div>

                  {/* Redes Sociales */}
                  <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
                      {t.connectWith}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={contactInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        {t.linkedin}
                      </a>
                      <a
                        href={contactInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        {t.github}
                      </a>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/80 p-4 dark:bg-neutral-800/80">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      💡 {t.responseTime}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}