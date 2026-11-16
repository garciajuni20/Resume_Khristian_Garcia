import type { CSSProperties, ReactNode } from 'react';
import InkArt from './InkArt';
import InkPortrait from './InkPortrait';
import { useLang } from '../../context/LanguageContext';

/** Like the line under a banknote vignette: what the plate shows (scripts/ink-assets.py, prompt in cv_jobs5.json) */
const PLATE = {
  en: 'Volcán de Agua and La Antigua Guatemala, World Heritage since 1979',
  es: 'Volcán de Agua y La Antigua Guatemala, Patrimonio de la Humanidad (1979)',
};

type Props = {
  /** Alt text of the portrait */
  name: string;
  /** "Role · stack": printed as two lines, the role first */
  headline: string;
  /** Read after the name by screen readers only, e.g. ", Resume" */
  titleSuffix?: string;
  /** Header sizing per page (min-height of the engraving area) */
  className?: string;
  /** Width of the engraving from lg up */
  artClassName?: string;
  children?: ReactNode;
};

const delay = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as CSSProperties;

/**
 * The banknote header shared by Home and /resume: the engraving of Antigua
 * Guatemala, the portrait in its guilloché window, the name in Bodoni and the
 * headline. Whatever the page adds (pitch, contact, actions) comes as children.
 *
 * Entrance (first page of a visit only, see "Entrance" in index.css): the
 * guilloché is engraved around the portrait while the photo develops, the name
 * rises line by line out of its baseline, the engraving is printed in from the
 * sky down. Text the visitor reads (the children) is never hidden, so nothing
 * waits on the animation and the largest paint is not delayed.
 */
export default function InkMasthead({ name, headline, titleSuffix, className = '', artClassName = 'lg:w-[52%]', children }: Props) {
  const { lang } = useLang();
  const [role, stack] = headline.split(' · ');
  return (
    <header className={`relative pt-6 lg:pt-12 ${className}`}>
      <figure className={`pointer-events-none relative -mx-4 sm:mx-0 lg:absolute lg:right-0 lg:top-2 ${artClassName}`}>
        <InkArt name="ink-hero" className="ink-print ink-iris aspect-[20/11]" />
        {/* under the plate, like a banknote vignette; between sm and lg the name row overlaps that corner */}
        <figcaption className="n-muted enter-fade mt-1 px-4 text-right text-[11px] leading-tight sm:hidden lg:-mt-3 lg:block lg:px-0" style={delay(1150)}>
          {PLATE[lang]}
        </figcaption>
      </figure>
      <div className="relative mt-2 flex items-center gap-5 sm:-mt-12 sm:gap-7 lg:mt-0">
        {/* one portrait, zoomed down on phones: the ring is drawn once in the HTML */}
        <InkPortrait alt={name} width={148} className="n-text max-sm:[zoom:0.838]" />
        <div className="min-w-0">
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl">
            <span className="enter-line"><span style={delay(120)}>Khristian</span></span>
            <span className="enter-line"><span style={delay(210)}>Garcia</span></span>
            {titleSuffix && <span className="sr-only">{titleSuffix}</span>}
          </h1>
          <p className="enter-fade mt-3 max-w-[22rem] text-base leading-snug" style={delay(420)}>
            <span className="n-text block font-medium">{role}</span>
            {stack && <span className="n-muted block [text-wrap:balance]">{stack}</span>}
          </p>
        </div>
      </div>
      {children}
    </header>
  );
}
