import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { EmptyState, ErrorState, LoadingGrid } from '../components/StateBlocks';
import { buttonStyles } from '../components/Button';

export function FeaturedProjects() {
  const { projects, status, error, reload } = usePortfolio();

  const featured = projects.filter((project) => project.featured);
  const shown = (featured.length > 0 ? featured : projects).slice(0, 3);

  return (
    <section className="border-b border-line py-16 sm:py-20" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div id="featured-heading">
          <SectionHeading
            eyebrow="Selected work"
            title="Featured analytics projects"
            description="Dashboards, models and analyses built end to end — from raw data to the decision it supports."
            action={
            <Link to="/projects" className={buttonStyles({ variant: 'secondary', size: 'sm' })}>
                All projects
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            } />
          
        </div>

        <div className="mt-10">
          {status === 'loading' ? <LoadingGrid /> : null}
          {status === 'error' ?
          <ErrorState message={error ?? 'Projects could not be loaded right now.'} onRetry={reload} /> :
          null}
          {status === 'ready' && shown.length === 0 ?
          <EmptyState title="No projects published yet" description="Projects will appear here once added." /> :
          null}
          {status === 'ready' && shown.length > 0 ?
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((project, index) =>
            <ProjectCard key={project.id} project={project} index={index} />
            )}
            </div> :
          null}
        </div>
      </div>
    </section>);

}