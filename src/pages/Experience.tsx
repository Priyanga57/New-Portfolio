import React, { useMemo } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { EmptyState, ErrorState, LoadingGrid } from '../components/StateBlocks';
import { ContactCTA } from '../sections/ContactCTA';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useSeo } from '../hooks/useSeo';
import { breadcrumbSchema } from '../utils/seo';

export function Experience() {
  const { experience, status, error, reload } = usePortfolio();

  const jsonLd = useMemo(
    () => [
    breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Experience', path: '/experience' }]
    )],

    []
  );

  useSeo({
    title: 'Experience | Priyanga V S',
    description:
    'Professional experience of Priyanga V S across data science and analytics internships, including team lead responsibilities and key contributions.',
    path: '/experience',
    jsonLd
  });

  return (
    <main>
      <PageHeader
        eyebrow="Experience"
        title="Career timeline"
        description="Roles, periods and the contributions made in each — sourced directly from the live portfolio database." />
      

      <section className="py-12 sm:py-16" aria-labelledby="timeline-heading">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 id="timeline-heading" className="sr-only">
            Experience timeline
          </h2>
          {status === 'loading' ? <LoadingGrid count={3} className="lg:grid-cols-1" /> : null}
          {status === 'error' ?
          <ErrorState message={error ?? 'Experience could not be loaded right now.'} onRetry={reload} /> :
          null}
          {status === 'ready' && experience.length === 0 ?
          <EmptyState title="No experience entries yet" description="Entries will appear here once added." /> :
          null}
          {status === 'ready' && experience.length > 0 ? <ExperienceTimeline items={experience} /> : null}
        </div>
      </section>

      <ContactCTA />
    </main>);

}