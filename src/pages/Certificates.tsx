import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { CertificateCard } from '../components/CertificateCard';
import { EmptyState, ErrorState, LoadingGrid } from '../components/StateBlocks';
import { Reveal } from '../components/Reveal';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useSeo } from '../hooks/useSeo';
import { breadcrumbSchema } from '../utils/seo';
import { cn } from '../utils/parse';
import type { Certificate } from '../types/portfolio';

export function Certificates() {
  const { certificates, status, error, reload } = usePortfolio();
  const [category, setCategory] = useState('All');
  const [preview, setPreview] = useState<Certificate | null>(null);

  const jsonLd = useMemo(
    () => [
    breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Certificates', path: '/certificates' }]
    )],

    []
  );

  useSeo({
    title: 'Certifications | Priyanga V S',
    description:
    'Data analytics and data science certifications earned by Priyanga V S, covering Python, data analysis and data storytelling.',
    path: '/certificates',
    jsonLd
  });

  useEffect(() => {
    if (!preview) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreview(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [preview]);

  const categories = useMemo(() => {
    const values = certificates.
    map((certificate) => certificate.category).
    filter((value): value is string => Boolean(value));
    return ['All', ...Array.from(new Set(values))];
  }, [certificates]);

  const filtered = useMemo(
    () => category === 'All' ? certificates : certificates.filter((item) => item.category === category),
    [certificates, category]
  );

  return (
    <main>
      <PageHeader
        eyebrow="Certificates"
        title="Certifications and credentials"
        description="Verified learning across data science, analysis with Python and communicating results clearly." />
      

      <section className="py-12 sm:py-16" aria-labelledby="certificates-heading">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <h2 id="certificates-heading" className="sr-only">
            Certificate gallery
          </h2>

          {status === 'ready' && categories.length > 1 ?
          <div className="-mx-5 mb-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <div className="flex min-w-max gap-2 pb-1" role="group" aria-label="Filter certificates by category">
                {categories.map((item) =>
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={cn(
                  'rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                  category === item ?
                  'border-primary bg-primary-soft text-primary' :
                  'border-line bg-surface text-muted hover:text-fg'
                )}>
                
                    {item}
                  </button>
              )}
              </div>
            </div> :
          null}

          {status === 'loading' ? <LoadingGrid count={6} /> : null}
          {status === 'error' ?
          <ErrorState message={error ?? 'Certificates could not be loaded right now.'} onRetry={reload} /> :
          null}
          {status === 'ready' && filtered.length === 0 ?
          <EmptyState title="No certificates to show" description="Certificates will appear here once added." /> :
          null}
          {status === 'ready' && filtered.length > 0 ?
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((certificate, index) =>
            <Reveal key={certificate.id} delay={Math.min(index * 0.05, 0.25)} className="h-full">
                  <CertificateCard certificate={certificate} onPreview={setPreview} />
                </Reveal>
            )}
            </div> :
          null}
        </div>
      </section>

      <AnimatePresence>
        {preview ?
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          
            <button
            type="button"
            aria-label="Close certificate preview"
            onClick={() => setPreview(null)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm" />
          
            <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.title} certificate preview`}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-bg">
            
              <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
                <div>
                  <h2 className="font-display text-base font-semibold text-fg">{preview.title}</h2>
                  {preview.issuer ? <p className="mt-0.5 text-sm text-muted">{preview.issuer}</p> : null}
                </div>
                <button
                type="button"
                autoFocus
                onClick={() => setPreview(null)}
                aria-label="Close certificate preview"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-fg">
                
                  <XIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-auto bg-surface2 p-4">
                <img
                src={preview.image}
                alt={`${preview.title} certificate`}
                className="mx-auto w-full max-w-2xl rounded-lg" />
              
              </div>
            </motion.div>
          </motion.div> :
        null}
      </AnimatePresence>
    </main>);

}