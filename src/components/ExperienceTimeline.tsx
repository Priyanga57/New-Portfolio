import React from 'react';
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from 'lucide-react';
import type { ExperienceItem } from '../types/portfolio';
import { Reveal } from './Reveal';

interface ExperienceTimelineProps {
  items: ExperienceItem[];
  compact?: boolean;
}

export function ExperienceTimeline({ items, compact = false }: ExperienceTimelineProps) {
  return (
    <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-8">
      {items.map((item, index) =>
      <li key={item.id} className="relative">
          <span
          aria-hidden="true"
          className="absolute -left-[1.72rem] top-6 flex h-3 w-3 items-center justify-center rounded-full border-2 border-bg bg-primary sm:-left-[2.22rem]" />
        
          <Reveal delay={Math.min(index * 0.06, 0.3)}>
            <article className="rounded-2xl border border-line bg-surface p-5 shadow-card transition-colors duration-300 hover:border-line-strong sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-fg">{item.title}</h3>
                  {item.company ?
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      <BriefcaseIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.company}
                    </p> :
                null}
                </div>
                <div className="flex flex-col items-start gap-1 text-xs text-muted sm:items-end">
                  {item.period ?
                <span className="inline-flex items-center gap-1.5">
                      <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.period}
                    </span> :
                null}
                  {item.location ?
                <span className="inline-flex items-center gap-1.5">
                      <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.location}
                    </span> :
                null}
                </div>
              </div>

              {item.contributions.length > 0 ?
            <ul className="mt-4 space-y-2">
                  {(compact ? item.contributions.slice(0, 2) : item.contributions).map((contribution) =>
              <li key={contribution} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span>{contribution}</span>
                    </li>
              )}
                </ul> :
            null}
            </article>
          </Reveal>
        </li>
      )}
    </ol>);

}