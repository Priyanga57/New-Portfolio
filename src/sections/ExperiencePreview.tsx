import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { SectionHeading } from '../components/SectionHeading';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { EmptyState, ErrorState, LoadingGrid } from '../components/StateBlocks';
import { buttonStyles } from '../components/Button';

export function ExperiencePreview() {
  const { experience, status, error, reload } = usePortfolio();
  const shown = experience.slice(0, 3);

  return (
    <section className="border-b border-line bg-surface py-16 sm:py-20" aria-labelledby="experience-preview-heading">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div id="experience-preview-heading">
          <SectionHeading
            eyebrow="Experience"
            title="Where the analysis has been applied"
            description="Internship and team-lead roles across data science and analytics teams."
            action={
            <Link to="/experience" className={buttonStyles({ variant: 'secondary', size: 'sm' })}>
                Full timeline
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            } />
          
        </div>

        <div className="mt-10">
          {status === 'loading' ? <LoadingGrid count={2} className="lg:grid-cols-2" /> : null}
          {status === 'error' ?
          <ErrorState message={error ?? 'Experience could not be loaded right now.'} onRetry={reload} /> :
          null}
          {status === 'ready' && shown.length === 0 ? <EmptyState title="No experience entries yet" /> : null}
          {status === 'ready' && shown.length > 0 ? <ExperienceTimeline items={shown} compact /> : null}
        </div>
      </div>
    </section>);

}