import React, { useEffect, useState } from 'react';
import { BarChart3Icon } from 'lucide-react';
import { cn } from '../utils/parse';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fallbackLabel?: string;
}

/** Renders a branded analytics fallback whenever an image is missing or fails to load. */
export function SafeImage({ src, alt, className, imageClassName, fallbackLabel }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showFallback = !src || failed;

  return (
    <div className={cn('relative overflow-hidden bg-surface2', className)}>
      {showFallback ?
      <div
        className="dot-backdrop flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center"
        role="img"
        aria-label={alt}>
        
          <BarChart3Icon className="h-6 w-6 text-primary" aria-hidden="true" />
          {fallbackLabel ?
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{fallbackLabel}</span> :
        null}
        </div> :

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={cn('h-full w-full object-cover', imageClassName)} />

      }
    </div>);

}