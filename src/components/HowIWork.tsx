import { motion, useReducedMotion } from 'framer-motion';
import type { WorkflowStep } from '../types';
import { FLUID } from '../utils/animations';

type Props = { workflow: { title: string; intro: string; steps: WorkflowStep[] } };

/** Four numbered moves that repeat in every role; data comes from profile-*.ts. */
export default function HowIWork({ workflow }: Props) {
  const reduce = useReducedMotion();
  return (
    <section className="n-border mt-10 rounded-3xl border bg-n-bg p-6 sm:p-8" aria-labelledby="how-i-work">
      <h2 id="how-i-work" className="n-text text-2xl font-semibold tracking-tight">{workflow.title}</h2>
      <p className="n-muted mt-1 max-w-xl text-sm">{workflow.intro}</p>
      <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workflow.steps.map((step, i) => (
          <motion.li
            key={step.title}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: FLUID }}
            className="n-callout relative rounded-2xl p-4"
          >
            <span className="font-mono-geist text-2xl font-semibold text-n-accent" aria-hidden="true">{i + 1}</span>
            <h3 className="n-text mt-2 text-base font-semibold leading-snug">{step.title}</h3>
            <p className="n-muted mt-1.5 text-sm leading-relaxed">{step.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
