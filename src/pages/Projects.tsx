import React, { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { SearchIcon, XIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ProjectCard } from '../components/ProjectCard';
import { EmptyState, ErrorState, LoadingGrid } from '../components/StateBlocks';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useSeo } from '../hooks/useSeo';
import { breadcrumbSchema } from '../utils/seo';
import { cn } from '../utils/parse';

type CategoryFilter = string;

export function Projects() {
  const { projects, status, error, reload } = usePortfolio();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [technology, setTechnology] = useState('All');

  const jsonLd = useMemo(
    () =>
    [
    breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' }]
    )],

    []
  );

  useSeo({
    title: 'Projects | Priyanga V S — Data Analyst',
    description:
    'Data analytics projects by Priyanga V S covering dashboards, exploratory analysis and machine learning built with SQL, Python, Excel and Power BI.',
    path: '/projects',
    jsonLd
  });

  const categories = useMemo(() => {
    const values = projects.map((project) => project.category).filter((value): value is string => Boolean(value));
    return ['All', 'Featured', ...Array.from(new Set(values))];
  }, [projects]);

  const technologies = useMemo(() => {
    const values = projects.flatMap((project) => project.technologies);
    return ['All', ...Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (category === 'Featured' && !project.featured) return false;
      if (category !== 'All' && category !== 'Featured' && project.category !== category) return false;
      if (technology !== 'All' && !project.technologies.includes(technology)) return false;
      if (!term) return true;
      const haystack = [
      project.title,
      project.description,
      project.category ?? '',
      project.technologies.join(' '),
      project.features.join(' ')].

      join(' ').
      toLowerCase();
      return haystack.includes(term);
    });
  }, [projects, query, category, technology]);

  const hasFilters = query.trim().length > 0 || category !== 'All' || technology !== 'All';

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setTechnology('All');
  };

  return (
    <main>
      <PageHeader
        eyebrow="Projects"
        title="Analytics projects, end to end"
        description="Search and filter by category or technology to find the work most relevant to your team." />
      

      <section className="py-12 sm:py-16" aria-labelledby="projects-list-heading">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <h2 id="projects-list-heading" className="sr-only">
            Project list
          </h2>

          {status === 'ready' && projects.length > 0 ?
          <div className="space-y-5">
              <div className="relative max-w-md">
                <SearchIcon
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true" />
              
                <label htmlFor="project-search" className="sr-only">
                  Search projects
                </label>
                <input
                id="project-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, technology or category"
                className="w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-fg placeholder:text-muted focus:border-primary focus:outline-none" />
              
              </div>

              <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                <div
                className="flex min-w-max gap-2 pb-1"
                role="group"
                aria-label="Filter projects by category">
                
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
              </div>

              {technologies.length > 1 ?
            <div className="flex flex-wrap items-center gap-3">
                  <label htmlFor="technology-filter" className="text-xs uppercase tracking-[0.14em] text-muted">
                    Technology
                  </label>
                  <select
                id="technology-filter"
                value={technology}
                onChange={(event) => setTechnology(event.target.value)}
                className="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-fg focus:border-primary focus:outline-none">
                
                    {technologies.map((item) =>
                <option key={item} value={item}>
                        {item}
                      </option>
                )}
                  </select>
                  {hasFilters ?
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
                
                      <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      Clear filters
                    </button> :
              null}
                </div> :
            null}

              <p className="text-sm text-muted" aria-live="polite">
                {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
              </p>
            </div> :
          null}

          <div className="mt-8">
            {status === 'loading' ? <LoadingGrid count={6} /> : null}
            {status === 'error' ?
            <ErrorState message={error ?? 'Projects could not be loaded right now.'} onRetry={reload} /> :
            null}
            {status === 'ready' && projects.length === 0 ?
            <EmptyState title="No projects published yet" description="Projects will appear here once added." /> :
            null}
            {status === 'ready' && projects.length > 0 && filtered.length === 0 ?
            <EmptyState
              title="No matching projects"
              description="Try a different search term, category or technology." /> :

            null}
            {status === 'ready' && filtered.length > 0 ?
            <LayoutGroup>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((project, index) =>
                  <ProjectCard key={project.id} project={project} index={index} />
                  )}
                  </AnimatePresence>
                </div>
              </LayoutGroup> :
            null}
          </div>
        </div>
      </section>
    </main>);

}