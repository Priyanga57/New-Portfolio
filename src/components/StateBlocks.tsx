import React from 'react';
import { AlertTriangleIcon, RefreshCwIcon, SearchXIcon } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../utils/parse';

export function LoadingGrid({ count = 3, className }: {count?: number;className?: string;}) {
  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)} aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading content</span>
      {Array.from({ length: count }).map((_, index) =>
      <div key={index} className="overflow-hidden rounded-2xl border border-line bg-surface">
          <div className="h-40 w-full animate-pulse bg-surface2" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-2/3 animate-pulse rounded bg-surface2" />
            <div className="h-3 w-full animate-pulse rounded bg-surface2" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-surface2" />
          </div>
        </div>
      )}
    </div>);

}

export function ErrorState({ message, onRetry }: {message: string;onRetry?: () => void;}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-6 py-12 text-center">
      
      <AlertTriangleIcon className="h-6 w-6 text-warning" aria-hidden="true" />
      <p className="max-w-md text-sm leading-relaxed text-muted">{message}</p>
      {onRetry ?
      <Button variant="secondary" size="sm" onClick={onRetry}>
          <RefreshCwIcon className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button> :
      null}
    </div>);

}

export function EmptyState({ title, description }: {title: string;description?: string;}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-14 text-center">
      <SearchXIcon className="h-6 w-6 text-muted" aria-hidden="true" />
      <p className="font-display text-lg font-semibold text-fg">{title}</p>
      {description ? <p className="max-w-md text-sm leading-relaxed text-muted">{description}</p> : null}
    </div>);

}