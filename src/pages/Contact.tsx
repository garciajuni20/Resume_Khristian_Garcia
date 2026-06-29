import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, Clock, Linkedin, Github, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function Contact() {
  const { lang } = useLang();

  const t = lang === 'en'
    ? {
        title: 'Contact',
        subtitle: "Open to BI/Data roles, full-stack collaborations, and architecture projects. Let's build something great.",
        infoTitle: 'Contact Information',
        responseTime: 'Typically respond within 24 hours',
        timezone: 'CST (UTC-6) · Guatemala City',
        hours: 'Monday – Friday, 9 AM – 6 PM',
        connect: 'Connect on',
      }
    : {
        title: 'Contacto',
        subtitle: 'Disponible para roles de BI/Datos, colaboraciones full-stack y proyectos de arquitectura. Construyamos algo genial juntos.',
        infoTitle: 'Información de Contacto',
        responseTime: 'Normalmente respondo en menos de 24 horas',
        timezone: 'CST (UTC-6) · Ciudad de Guatemala',
        hours: 'Lunes – Viernes, 9 AM – 6 PM',
        connect: 'Conectar en',
      };

  const contactInfo = {
    email: 'garciajuni20@gmail.com',
    phone: '+502 5633 8735',
    location: lang === 'en' ? 'Guatemala City, Guatemala' : 'Ciudad de Guatemala, Guatemala',
    linkedin: 'https://linkedin.com/in/khristian-garcia--',
    github: 'https://github.com/garciajuni20',
  };

  useSEO({
    title: t.title,
    description: t.subtitle,
    lang,
    keywords: ['contact', 'hire', 'collaboration', 'job opportunity', 'data analyst', 'Guatemala'],
  });

  const infoItems = [
    { icon: <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />, label: lang === 'en' ? 'Email' : 'Correo', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />, label: lang === 'en' ? 'Phone' : 'Teléfono', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
    { icon: <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />, label: lang === 'en' ? 'Location' : 'Ubicación', value: contactInfo.location, href: null },
    { icon: <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />, label: lang === 'en' ? 'Availability' : 'Disponibilidad', value: t.hours, sub: t.timezone, href: null },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-50">
        <Container>
          <motion.div
            className="py-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/20">
                <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">{t.title}</h1>
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="lg:order-2"
              >
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                  <ContactForm />
                </div>
              </motion.div>

              {/* Info Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="lg:order-1"
              >
                <div className="h-full rounded-3xl border border-neutral-200 bg-gradient-to-br from-blue-50 via-white to-violet-50/30 p-6 shadow-lg dark:border-neutral-800 dark:from-blue-900/10 dark:via-neutral-900 dark:to-violet-900/5">
                  <h2 className="mb-6 text-xl font-bold text-neutral-900 dark:text-white">{t.infoTitle}</h2>

                  <div className="space-y-5">
                    {infoItems.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.07 }}
                        className="flex items-start gap-4"
                      >
                        <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-neutral-800">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">{item.label}</div>
                          {item.href ? (
                            <a href={item.href} className="mt-0.5 text-base font-semibold text-neutral-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <div className="mt-0.5 text-base font-semibold text-neutral-900 dark:text-white">{item.value}</div>
                          )}
                          {item.sub && <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{item.sub}</div>}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="mt-7 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="mb-3 text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">{t.connect}</div>
                    <div className="flex gap-3">
                      <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-blue-600 hover:text-white hover:shadow-blue-500/25 dark:bg-neutral-800 dark:text-white dark:hover:bg-blue-600 transition-all duration-200 border border-neutral-200 dark:border-neutral-700">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                      <a href={contactInfo.github} target="_blank" rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-900 hover:text-white dark:bg-neutral-800 dark:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all duration-200 border border-neutral-200 dark:border-neutral-700">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </div>
                  </div>

                  {/* Response time note */}
                  <div className="mt-4 flex items-start gap-3 rounded-xl bg-blue-50 p-4 dark:bg-blue-900/15">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 shrink-0 animate-pulse" />
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">{t.responseTime}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </main>
    </PageTransition>
  );
}
