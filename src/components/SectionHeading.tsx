import React from 'react';
import { cn } from '../utils/parse';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  level?: 'h1' | 'h2';
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = 'h2',
  align = 'left',
  action,
  className
}: SectionHeadingProps) {
  const Heading = level;
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between',
        centered && 'sm:flex-col sm:items-center',
        className
      )}>
      
      <div className={cn('max-w-2xl', centered && 'text-center')}>
        {eyebrow ?
        <p
          className={cn(
            'mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary',
            centered && 'justify-center'
          )}>
          
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {eyebrow}
          </p> :
        null}
        <Heading
          className={cn(
            'font-display font-semibold tracking-tight text-fg',
            level === 'h1' ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-[2.1rem]'
          )}>
          
          {title}
        </Heading>
        {description ? <p className="mt-4 text-base leading-relaxed text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>);

}