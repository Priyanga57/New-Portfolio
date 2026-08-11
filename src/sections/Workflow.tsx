import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { workflowStages } from '../data/profile';

export function Workflow() {
  return (
    <section className="border-b border-line bg-surface py-16 sm:py-20" aria-labelledby="workflow-heading">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <h2
          id="workflow-heading"
          className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">

          How the work moves
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Every project follows the same path - from raw records to a decision someone can actually act on.
        </p>

        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {workflowStages.map((stage, index) =>
            <li key={stage.label} className="relative">
              <Reveal delay={Math.min(index * 0.07, 0.3)} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-bg p-5">
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-fg">{stage.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{stage.description}</p>
                </div>
              </Reveal>
              {index < workflowStages.length - 1 ?
                <ArrowRightIcon
                  className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-line-strong md:block"
                  aria-hidden="true" /> :

                null}
            </li>
          )}
        </ol>
      </div>
    </section>);

}