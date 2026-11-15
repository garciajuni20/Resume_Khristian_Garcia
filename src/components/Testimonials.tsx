import { useLang } from '../context/LanguageContext';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';

const LINK = 'n-text underline decoration-n-border underline-offset-4 transition-colors duration-300 hover:decoration-current n-focus';

/**
 * What colleagues said, set as quotations: the words, then who said them and
 * where to check. No stars, no avatars; LinkedIn is where a recruiter verifies.
 */
export default function Testimonials() {
  const { lang } = useLang();
  const profile = lang === 'en' ? profileEN : profileES;
  const linkedin = profile.links.find(l => l.label === 'LinkedIn')?.href;

  const t = lang === 'en'
    ? { title: 'What colleagues say', subtitle: 'Two people I worked with at Alleviate Financial Solutions.', verify: 'Both can be reached on LinkedIn; more references on request.', profile: 'My LinkedIn' }
    : { title: 'Lo que dicen mis colegas', subtitle: 'Dos personas con las que trabajé en Alleviate Financial Solutions.', verify: 'Ambos están en LinkedIn; más referencias a solicitud.', profile: 'Mi LinkedIn' };

  return (
    <div>
      <h2 className="font-display text-4xl">{t.title}</h2>
      <p className="n-muted mt-2 text-base">{t.subtitle}</p>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {profile.testimonials.map(q => (
          <figure key={q.id} className="border-l border-ink-blue pl-5">
            <blockquote className="n-text text-base leading-relaxed">
              <span className="font-display text-ink-blue" aria-hidden="true">“</span>
              {q.text}
              <span className="font-display text-ink-blue" aria-hidden="true">”</span>
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="n-text font-medium">{q.name}</span>
              <span className="n-muted">, {q.role}, {q.company}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="n-muted mt-8 text-sm">
        {t.verify}{' '}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
            {t.profile}
          </a>
        )}
      </p>
    </div>
  );
}
