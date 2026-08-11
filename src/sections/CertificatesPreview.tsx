import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { SectionHeading } from '../components/SectionHeading';
import { CertificateCard } from '../components/CertificateCard';
import { EmptyState, ErrorState, LoadingGrid } from '../components/StateBlocks';
import { buttonStyles } from '../components/Button';
import { Reveal } from '../components/Reveal';

export function CertificatesPreview() {
  const { certificates, status, error, reload } = usePortfolio();
  const shown = certificates.slice(0, 3);

  return (
    <section className="border-b border-line py-16 sm:py-20" aria-labelledby="certificates-preview-heading">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div id="certificates-preview-heading">
          <SectionHeading
            eyebrow="Credentials"
            title="Certifications and continued learning"
            action={
            <Link to="/certificates" className={buttonStyles({ variant: 'secondary', size: 'sm' })}>
                All certificates
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            } />
          
        </div>

        <div className="mt-10">
          {status === 'loading' ? <LoadingGrid /> : null}
          {status === 'error' ?
          <ErrorState message={error ?? 'Certificates could not be loaded right now.'} onRetry={reload} /> :
          null}
          {status === 'ready' && shown.length === 0 ? <EmptyState title="No certificates published yet" /> : null}
          {status === 'ready' && shown.length > 0 ?
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((certificate, index) =>
            <Reveal key={certificate.id} delay={Math.min(index * 0.06, 0.24)} className="h-full">
                  <CertificateCard certificate={certificate} />
                </Reveal>
            )}
            </div> :
          null}
        </div>
      </div>
    </section>);

}