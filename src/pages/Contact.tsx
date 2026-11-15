import { motion } from 'framer-motion';
import Container from '../components/Container';
import ContactForm from '../components/ContactForm';
import PageTransition from '../components/PageTransition';
import InkPortrait from '../components/ink/InkPortrait';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import { FLUID } from '../utils/animations';

const LINK = 'n-text underline decoration-n-border underline-offset-4 transition-colors duration-300 hover:decoration-current n-focus';

/**
 * Contact, set like the resume: the portrait window and the name in Bodoni, the
 * ways to reach me as a short ledger, and the form beside it.
 */
export default function Contact() {
  const { lang } = useLang();
  const profile = lang === 'en' ? profileEN : profileES;

  const t = lang === 'en'
    ? {
        title: 'Contact',
        subtitle: 'Open to remote Data Engineer roles. You talk to me directly, no agency in between, and I answer within 24 hours.',
        email: 'Email',
        where: 'Based in',
        hours: 'Hours',
        hoursValue: 'Monday to Friday, 9 am to 6 pm, UTC−6 (overlaps US Central and Eastern)',
        profiles: 'Profiles',
      }
    : {
        title: 'Contacto',
        subtitle: 'Abierto a roles remotos de Ingeniero de Datos. Hablas directamente conmigo, sin agencias de por medio, y respondo en menos de 24 horas.',
        email: 'Correo',
        where: 'Desde',
        hours: 'Horario',
        hoursValue: 'Lunes a viernes, 9 a 18 h, UTC−6 (coincide con el horario central y del este de EE. UU.)',
        profiles: 'Perfiles',
      };

  useSEO({
    title: t.title,
    description: t.subtitle,
    lang,
    keywords: ['contact', 'Data Engineer', 'remote', 'Snowflake', 'dbt', 'Guatemala'],
  });

  const profiles = profile.links.filter(l => l.label === 'LinkedIn' || l.label === 'GitHub');

  return (
    <PageTransition>
      <div className="min-h-screen bg-n-bg text-n-text">
        <Container>
          <div className="pb-24 pt-10">
            <motion.header
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: FLUID }}
              className="flex items-center gap-5 sm:gap-7"
            >
              <InkPortrait alt={profile.name} width={104} className="n-text" />
              <div className="min-w-0">
                <h1 className="font-display text-5xl sm:text-6xl">{t.title}</h1>
                <p className="n-muted mt-3 max-w-xl text-base leading-relaxed">{t.subtitle}</p>
              </div>
            </motion.header>

            <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              <dl className="self-start text-sm">
                <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 border-t border-n-border py-4">
                  <dt className="n-muted">{t.email}</dt>
                  <dd><a href={`mailto:${profile.email}`} className={`${LINK} text-base`}>{profile.email}</a></dd>
                </div>
                <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 border-t border-n-border py-4">
                  <dt className="n-muted">{t.where}</dt>
                  <dd className="n-text">{profile.location}</dd>
                </div>
                <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 border-t border-n-border py-4">
                  <dt className="n-muted">{t.hours}</dt>
                  <dd className="n-text leading-relaxed">{t.hoursValue}</dd>
                </div>
                <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 border-y border-n-border py-4">
                  <dt className="n-muted">{t.profiles}</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-1">
                    {profiles.map(l => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={LINK}>{l.label}</a>
                    ))}
                  </dd>
                </div>
              </dl>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: FLUID }}
                className="rounded-2xl border border-n-border p-6"
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
