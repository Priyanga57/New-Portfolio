import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-xs text-muted">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRightIcon className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="text-fg">
              {eyebrow}
            </li>
          </ol>
        </nav>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{description}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>);

}