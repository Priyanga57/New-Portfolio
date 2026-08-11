import React from 'react';
import { CalendarIcon, ExternalLinkIcon, MaximizeIcon } from 'lucide-react';
import type { Certificate } from '../types/portfolio';
import { SafeImage } from './SafeImage';

interface CertificateCardProps {
  certificate: Certificate;
  onPreview?: (certificate: Certificate) => void;
}

export function CertificateCard({ certificate, onPreview }: CertificateCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary">
      <div className="relative">
        <SafeImage
          src={certificate.image}
          alt={`${certificate.title} certificate`}
          fallbackLabel={certificate.issuer ?? 'Certificate'}
          className="aspect-[4/3] w-full"
          imageClassName="object-contain bg-surface2 p-2 transition-transform duration-500 group-hover:scale-[1.03]" />
        
        {certificate.image && onPreview ?
        <button
          type="button"
          onClick={() => onPreview(certificate)}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-bg/85 text-muted opacity-0 backdrop-blur transition-all duration-200 hover:text-primary focus-visible:opacity-100 group-hover:opacity-100"
          aria-label={`Enlarge ${certificate.title} certificate`}>
          
            <MaximizeIcon className="h-4 w-4" aria-hidden="true" />
          </button> :
        null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {certificate.category ?
        <span className="mb-2 w-fit rounded-md border border-line bg-surface2 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
            {certificate.category}
          </span> :
        null}
        <h3 className="font-display text-base font-semibold leading-snug tracking-tight text-fg">
          {certificate.title}
        </h3>
        {certificate.issuer ? <p className="mt-1.5 text-sm text-muted">{certificate.issuer}</p> : null}
        {certificate.date ?
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted">
            <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {certificate.date}
          </p> :
        null}
        {certificate.link ?
        <a
          href={certificate.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-sm font-medium text-primary">
          
            View certificate
            <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">for {certificate.title}</span>
          </a> :
        null}
      </div>
    </article>);

}