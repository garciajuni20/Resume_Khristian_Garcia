import type { WorkflowStep } from '../types';

type Props = { workflow: { title: string; intro: string; steps: WorkflowStep[] } };

/**
 * Four moves that repeat in every role, in order; data comes from profile-*.ts.
 * Set in ink: Bodoni step numbers (the content really is a sequence), hairline
 * columns, no boxes. It is a Section in the page outline like its neighbours.
 */
export default function HowIWork({ workflow }: Props) {
  return (
    <section id="how-i-work" data-outline={workflow.title} className="mt-14 scroll-mt-24" aria-labelledby="how-i-work-title">
      <h2 id="how-i-work-title" className="font-display n-text text-3xl">{workflow.title}</h2>
      <p className="n-muted mt-1 max-w-xl text-sm">{workflow.intro}</p>
      <ol className="mt-6 grid border-t border-n-border sm:grid-cols-2 lg:grid-cols-4">
        {workflow.steps.map((step, i) => (
          <li
            key={step.title}
            className={`py-5 sm:pr-6 ${i > 0 ? 'border-t border-n-border sm:border-t-0' : ''} ${i % 2 === 1 ? 'sm:border-l sm:pl-6' : ''} ${i > 1 ? 'sm:border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-6' : ''}`}
          >
            <span className="font-display text-4xl leading-none" aria-hidden="true">{i + 1}</span>
            <h3 className="n-text mt-3 text-base font-semibold leading-snug">{step.title}</h3>
            <p className="n-muted mt-1.5 text-sm leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
