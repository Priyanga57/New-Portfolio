import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { buttonStyles } from '../components/Button';
import { useSeo } from '../hooks/useSeo';

export function NotFound() {
  useSeo({
    title: 'Page not found | Priyanga V S — Data Analyst',
    description: 'The page you were looking for is not available on the portfolio of Priyanga V S, Data Analyst.',
    path: '/404'
  });

  return (
    <main className="mx-auto flex max-w-content flex-col items-center px-5 py-28 text-center sm:px-8">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        The page you were looking for doesn&apos;t exist. Head back to the portfolio home.
      </p>
      <Link to="/" className={buttonStyles({ className: 'mt-8' })}>
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        Back home
      </Link>
    </main>);

}