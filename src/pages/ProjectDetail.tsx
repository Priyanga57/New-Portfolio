import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon, ExternalLinkIcon, GithubIcon } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { SafeImage } from '../components/SafeImage';
import { ErrorState, LoadingGrid } from '../components/StateBlocks';
import { buttonStyles } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { useSeo } from '../hooks/useSeo';
import { breadcrumbSchema } from '../utils/seo';

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string; }>();
  const { projects, status, error, reload } = usePortfolio();

  const project = projects.find((item) => item.id === projectId);

  const jsonLd = useMemo(
    () =>
      project ?
        [
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: project.title, path: `/projects/${project.id}` }]
          )] :

        [],
    [project]
  );

  useSeo({
    title: project ? `${project.title} | Priyanga V S - Data Analyst` : 'Project | Priyanga V S - Data Analyst',
    description:
      project && project.description ?
        project.description.slice(0, 155) :
        'Data analytics project by Priyanga V S, Data Analyst.',
    path: `/projects/${projectId ?? ''}`,
    image: project?.image,
    jsonLd
  });

  if (status === 'loading') {
    return (
      <main className="mx-auto max-w-content px-5 py-20 sm:px-8">
        <LoadingGrid count={2} className="lg:grid-cols-2" />
      </main>);

  }

  if (status === 'error') {
    return (
      <main className="mx-auto max-w-content px-5 py-20 sm:px-8">
        <ErrorState message={error ?? 'This project could not be loaded right now.'} onRetry={reload} />
      </main>);

  }

  if (!project) {
    return (
      <main className="mx-auto max-w-content px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-fg">Project not found</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-muted">
          This project may have been renamed or removed from the portfolio.
        </p>
        <Link to="/projects" className={buttonStyles({ className: 'mt-8' })}>
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Back to projects
        </Link>
      </main>);

  }

  return (
    <main>
      <article>
        <header className="relative overflow-hidden border-b border-line">
          <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-primary">

              <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
              All projects
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {project.category ?
                <span className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
                  {project.category}
                </span> :
                null}
              {project.featured ?
                <span className="rounded-lg bg-primary px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary-fg">
                  Featured
                </span> :
                null}
            </div>

            <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            {project.description ?
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{project.description}</p> :
              null}

            {project.githubUrl || project.liveUrl ?
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl ?
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles({ size: 'sm' })}>

                    <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                    Live demo
                  </a> :
                  null}
                {project.githubUrl ?
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles({ variant: 'secondary', size: 'sm' })}>

                    <GithubIcon className="h-4 w-4" aria-hidden="true" />
                    View code
                  </a> :
                  null}
              </div> :
              null}
          </div>
        </header>

        <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
          <Reveal>
            <SafeImage
              src={project.image}
              alt={`${project.title} preview`}
              fallbackLabel={project.category ?? 'Data project'}
              className="aspect-[16/9] w-full rounded-2xl border border-line shadow-card" />

          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              {project.features.length > 0 ?
                <Reveal>
                  <section aria-labelledby="project-features-heading">
                    <h2
                      id="project-features-heading"
                      className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">

                      Key features
                    </h2>
                    <ul className="mt-5 space-y-3">
                      {project.features.map((feature) =>
                        <li
                          key={feature}
                          className="flex gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-muted">

                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      )}
                    </ul>
                  </section>
                </Reveal> :
                null}
            </div>

            <aside className="space-y-4">
              {project.technologies.length > 0 ?
                <Reveal>
                  <section
                    aria-labelledby="project-tech-heading"
                    className="rounded-2xl border border-line bg-surface p-5">

                    <h2
                      id="project-tech-heading"
                      className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">

                      Technologies
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) =>
                        <li
                          key={tech}
                          className="rounded-md border border-line bg-surface2 px-2.5 py-1 text-xs font-medium text-fg">

                          {tech}
                        </li>
                      )}
                    </ul>
                  </section>
                </Reveal> :
                null}
            </aside>
          </div>
        </div>
      </article>
    </main>);

}