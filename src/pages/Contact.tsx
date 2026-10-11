import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, Clock, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import { PHOTO } from '../data/media';
import { FLUID } from '../utils/animations';

export default function Contact() {
  const { lang } = useLang();
  const profile = lang === 'en' ? profileEN : profileES;

  const t = lang === 'en'
    ? {
        title: 'Contact',
        subtitle: 'Open to remote Data Engineer, Analytics Engineering, and BI roles, plus freelance projects: pipelines, dashboards, and full-stack apps with AI.',
        direct: 'You talk to me directly, no agency in between.',
        infoTitle: 'Contact Information',
        responseTime: 'Typically respond within 24 hours',
        timezone: 'CST (UTC-6) · Guatemala City',
        hours: 'Monday – Friday, 9 AM – 6 PM',
        connect: 'Connect on',
      }
    : {
        title: 'Contacto',
        subtitle: 'Disponible para roles remotos de Data Engineer, Analytics Engineering y BI, y para proyectos por servicios: pipelines, dashboards y apps full-stack con IA.',
        direct: 'Hablas directamente conmigo, sin agencias de por medio.',
        infoTitle: 'Información de Contacto',
        responseTime: 'Normalmente respondo en menos de 24 horas',
        timezone: 'CST (UTC-6) · Ciudad de Guatemala',
        hours: 'Lunes – Viernes, 9 AM – 6 PM',
        connect: 'Conectar en',
      };

  const contactInfo = {
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    linkedin: profile.links.find(l => l.label === 'LinkedIn')?.href ?? '#',
    github: profile.links.find(l => l.label === 'GitHub')?.href ?? '#',
  };

  useSEO({
    title: t.title,
    description: t.subtitle,
    lang,
    keywords: ['contact', 'hire', 'Data Engineer', 'freelance', 'remote', 'Guatemala'],
  });

  const infoItems = [
    { icon: <Mail className="h-4 w-4" />, label: lang === 'en' ? 'Email' : 'Correo', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: <Phone className="h-4 w-4" />, label: lang === 'en' ? 'Phone' : 'Teléfono', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
    { icon: <MapPin className="h-4 w-4" />, label: lang === 'en' ? 'Location' : 'Ubicación', value: contactInfo.location, href: null },
    { icon: <Clock className="h-4 w-4" />, label: lang === 'en' ? 'Availability' : 'Disponibilidad', value: t.hours, sub: t.timezone, href: null },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--n-bg)]">
        <Container>
          <div className="py-10">
            {/* Header: a face before a form */}
            <div className="mb-10 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: FLUID }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-full p-[3px]">
                  <motion.div
                    className="absolute -inset-[60%]"
                    style={{ background: 'conic-gradient(from 0deg, #2383e2, #9065b0, #dfab01, #0f7b6c, #2383e2)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    aria-hidden="true"
                  />
                  <img
                    src={`${import.meta.env.BASE_URL}${PHOTO.squareWebp}`}
                    alt={profile.name}
                    width={112}
                    height={112}
                    className="relative z-10 block h-28 w-28 rounded-full border-4 border-[var(--n-bg)] object-cover object-top"
                  />
                </div>
                <span className="absolute bottom-1 right-1 z-20 h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-[var(--n-bg)]" aria-hidden="true" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: FLUID }}
                className="n-text mt-5 text-4xl font-bold tracking-tight"
              >
                {t.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: FLUID }}
                className="n-muted mx-auto mt-3 max-w-xl text-lg leading-relaxed"
              >
                {t.subtitle}
              </motion.p>
              <p className="n-tag n-tag-green mt-4 gap-2 py-0.5 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                {t.direct}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: FLUID }}
                className="lg:order-2"
              >
                <div className="n-border rounded-2xl border bg-[var(--n-bg)] p-6 shadow-xl shadow-black/5">
                  <ContactForm />
                </div>
              </motion.div>

              {/* Info panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: FLUID }}
                className="lg:order-1"
              >
                <div className="n-border n-callout h-full rounded-2xl border p-6">
                  <h2 className="n-text mb-6 text-xl font-semibold">{t.infoTitle}</h2>

                  <div className="space-y-5">
                    {infoItems.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: FLUID }}
                        className="flex items-start gap-4"
                      >
                        <div className="n-border n-text rounded-lg border bg-[var(--n-bg)] p-2.5" aria-hidden="true">
                          {item.icon}
                        </div>
                        <div>
                          <div className="n-muted text-xs font-medium uppercase tracking-wide">{item.label}</div>
                          {item.href ? (
                            <a href={item.href} className="n-text mt-0.5 text-base font-semibold underline decoration-[var(--n-border)] underline-offset-4 transition-colors duration-300 hover:decoration-current">
                              {item.value}
                            </a>
                          ) : (
                            <div className="n-text mt-0.5 text-base font-semibold">{item.value}</div>
                          )}
                          {item.sub && <div className="n-muted mt-0.5 text-xs">{item.sub}</div>}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="n-border mt-7 border-t pt-6">
                    <div className="n-muted mb-3 text-xs font-medium uppercase tracking-wide">{t.connect}</div>
                    <div className="flex gap-3">
                      <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer"
                        className="n-border n-text inline-flex flex-1 items-center justify-center gap-2 rounded-lg border bg-[var(--n-bg)] px-4 py-3 text-sm font-semibold transition-colors duration-300 hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white active:scale-[0.98]">
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                        LinkedIn
                      </a>
                      <a href={contactInfo.github} target="_blank" rel="noopener noreferrer"
                        className="n-border n-text inline-flex flex-1 items-center justify-center gap-2 rounded-lg border bg-[var(--n-bg)] px-4 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-[var(--n-text)] hover:text-[var(--n-bg)] active:scale-[0.98]">
                        <Github className="h-4 w-4" aria-hidden="true" />
                        GitHub
                      </a>
                    </div>
                  </div>

                  {/* Response time note */}
                  <div className="mt-4 flex items-start gap-3 rounded-lg bg-[var(--n-bg)] p-4">
                    <div className="mt-1.5 h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-500" />
                    <p className="n-text text-sm">{t.responseTime}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
