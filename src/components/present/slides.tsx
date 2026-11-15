import type { ReactNode } from 'react';
import type { Lang, ProfileData } from '../../types';
import { INK_TEXT, inkFigures, type InkTone } from '../../data/ink';
import { SITE_URL } from '../../data/routes';
import { orderExperience } from '../../utils/experienceOrder';
import InkArt from '../ink/InkArt';
import InkPortrait from '../ink/InkPortrait';
import { Figure, LEAD, RoleSheet, TITLE, Wins } from './parts';

export type Slide = { title: string; body: ReactNode };

/** The roles told one per sheet, in the ledger's reverse-chronological order */
const ROLE_SLIDES = ['alleviate-de', 'alleviate-mid', 'idt-gnoc'];
/** The career arc, stamped like the resume section (CareerArc) */
const STAGE_ART: Array<{ art: string; tone: InkTone }> = [
  { art: 'ink-remesas', tone: 'teal' },
  { art: 'ink-bi', tone: 'blue' },
  { art: 'ink-data', tone: 'blue' },
];

/** Seven sheets, all built from the profile data: nothing here is new copy about the work */
export function buildSlides(data: ProfileData, lang: Lang): Slide[] {
  const en = lang === 'en';
  const figures = inkFigures(lang);
  const ordered = orderExperience(data.experience);
  const roles = ordered.filter(e => ROLE_SLIDES.includes(e.id));
  const flowber = data.experience.find(e => e.id === 'flowber-freelance');
  const linkedin = data.links.find(l => /linkedin/i.test(l.href));
  const host = SITE_URL.replace(/^https:\/\//, '').replace(/\/$/, '');

  const slides: Slide[] = [
    {
      title: data.name,
      body: (
        <div>
          <div className="flex items-center gap-6 md:gap-10">
            <InkPortrait alt={data.name} width={104} className="n-text shrink-0 md:hidden" />
            <InkPortrait alt={data.name} width={170} className="n-text hidden shrink-0 md:block" />
            <div className="min-w-0">
              <h2 className="font-display leading-[0.95] text-[clamp(2.6rem,7vw,6.5rem)]">Khristian Garcia</h2>
              <p className="n-muted mt-3 text-[clamp(1rem,1.6vw,1.45rem)]">{data.headline}</p>
            </div>
          </div>
          <dl className="mt-10 grid border-t border-n-border md:grid-cols-3">
            {figures.map((f, i) => (
              <div key={f.n} className={`py-5 md:px-8 ${i === 0 ? 'md:pl-0' : 'border-t border-n-border md:border-l md:border-t-0'}`}>
                <dt className="n-text order-2 mt-2 text-base">{f.label}</dt>
                <dd className={`font-display whitespace-nowrap leading-none tabular-nums text-[clamp(2.2rem,3.6vw,3.4rem)] ${INK_TEXT[f.tone]}`}>
                  <Figure text={f.value[0]} />
                  {f.value[1] && (
                    <>
                      <span className="n-muted mx-2 align-[0.12em] font-sans text-[0.5em]" aria-hidden="true">→</span>
                      <span className="sr-only">{en ? ' to ' : ' a '}</span>
                      <Figure text={f.value[1]} />
                    </>
                  )}
                </dd>
                <dd className="n-muted mt-1 text-sm">{f.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      ),
    },
  ];

  if (data.arc) {
    const arc = data.arc;
    slides.push({
      title: arc.title,
      body: (
        <div>
          <h2 className={TITLE}>{arc.title}</h2>
          <p className={`${LEAD} mt-3`}>{arc.intro}</p>
          <ol className="mt-6 grid border-t border-n-border md:grid-cols-3">
            {arc.acts.map((act, i) => {
              const stage = STAGE_ART[i] ?? STAGE_ART[STAGE_ART.length - 1];
              return (
                <li key={act.title} className={`py-5 md:pr-8 ${i > 0 ? 'border-t border-n-border md:border-l md:border-t-0 md:pl-8' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="n-muted text-sm tabular-nums">{act.period}</p>
                    <InkArt name={stage.art} className={`h-16 w-16 shrink-0 ${INK_TEXT[stage.tone]}`} />
                  </div>
                  <h3 className="font-display -mt-3 text-[clamp(1.6rem,2.4vw,2.3rem)] leading-tight">{act.title}</h3>
                  <p className="n-muted mt-3 text-[clamp(0.95rem,1.15vw,1.1rem)] leading-relaxed">{act.text}</p>
                  <p className={`mt-4 border-t border-n-border pt-3 text-[clamp(0.95rem,1.15vw,1.1rem)] ${INK_TEXT[stage.tone]}`}>{act.proof}</p>
                </li>
              );
            })}
          </ol>
        </div>
      ),
    });
  }

  roles.forEach(e => slides.push({ title: e.role, body: <RoleSheet e={e} lang={lang} /> }));

  if (flowber) {
    const f = figures.find(x => x.tone === 'coral');
    slides.push({
      title: 'Flowber',
      body: (
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] md:gap-14">
          <div className="min-w-0">
            <h2 className={TITLE}>Flowber</h2>
            <p className="n-text mt-3 text-[clamp(1rem,1.4vw,1.25rem)]">{flowber.role}</p>
            {flowber.story && (
              <>
                <p className={`${LEAD} mt-6`}>{flowber.story.lead}</p>
                <Wins wins={flowber.story.wins} tone="coral" />
              </>
            )}
          </div>
          <div className="flex items-center gap-6 md:block">
            <InkArt name="ink-barberia" className="h-20 w-20 text-ink-coral md:h-36 md:w-36" />
            {f && (
              <div className="md:mt-8">
                <p className="font-display leading-none text-ink-coral text-[clamp(2.4rem,4vw,3.6rem)]"><Figure text={f.value[0]} /></p>
                <p className="n-text mt-2 text-base">{f.label}</p>
                <p className="n-muted text-sm">{f.note}</p>
              </div>
            )}
          </div>
        </div>
      ),
    });
  }

  slides.push({
    title: en ? 'Contact' : 'Contacto',
    body: (
      <div className="grid items-center gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-14">
        <InkPortrait alt={data.name} width={150} className="n-text hidden md:block" />
        <div className="min-w-0">
          <h2 className={TITLE}>{en ? 'Contact' : 'Contacto'}</h2>
          <p className={`${LEAD} mt-3`}>{data.headline}</p>
          <dl className="mt-8 border-t border-n-border text-[clamp(1rem,1.4vw,1.25rem)]">
            {[
              [en ? 'Email' : 'Correo', data.email, `mailto:${data.email}`],
              [en ? 'Site' : 'Sitio', host, SITE_URL],
              ...(linkedin ? [['LinkedIn', linkedin.href.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, ''), linkedin.href]] : []),
            ].map(([k, v, href]) => (
              <div key={k} className="grid gap-1 border-b border-n-border py-3 sm:grid-cols-[8rem_minmax(0,1fr)]">
                <dt className="n-muted">{k}</dt>
                <dd className="min-w-0 break-words">
                  <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="n-text underline decoration-n-border underline-offset-4 hover:decoration-current n-focus">
                    {v}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    ),
  });

  return slides;
}
