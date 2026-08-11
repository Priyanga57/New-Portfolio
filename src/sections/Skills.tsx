import React from 'react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { skillGroups } from '../data/profile';

export function Skills() {
  return (
    <section className="border-b border-line py-16 sm:py-20" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div id="skills-heading">
          <SectionHeading
            eyebrow="Technical toolkit"
            title="Skills built for analysis, reporting and decision support"
            description="The stack used day to day across data extraction, cleaning, modeling and visualization." />
          
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.label} delay={Math.min(index * 0.05, 0.25)} className="h-full">
                <article className="h-full rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-line-strong">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-fg">
                      {group.label}
                    </h3>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) =>
                    <li
                      key={item}
                      className="rounded-md border border-line bg-surface2 px-2.5 py-1 text-xs font-medium text-muted">
                      
                        {item}
                      </li>
                    )}
                  </ul>
                </article>
              </Reveal>);

          })}
        </div>
      </div>
    </section>);

}