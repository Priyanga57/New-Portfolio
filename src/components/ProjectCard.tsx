import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRightIcon, ExternalLinkIcon, GithubIcon, StarIcon } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { SafeImage } from './SafeImage';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.3) }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary">
      
      <div className="relative">
        <SafeImage
          src={project.image}
          alt={`${project.title} project preview`}
          fallbackLabel={project.category ?? 'Data project'}
          className="aspect-[16/10] w-full"
          imageClassName="transition-transform duration-500 group-hover:scale-[1.04]" />
        
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {project.category ?
          <span className="rounded-lg border border-line bg-bg/85 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted backdrop-blur">
              {project.category}
            </span> :

          <span />
          }
          {project.featured ?
          <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary-fg">
              <StarIcon className="h-3 w-3" aria-hidden="true" />
              Featured
            </span> :
          null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
          <Link to={`/projects/${project.id}`} className="transition-colors hover:text-primary">
            {project.title}
          </Link>
        </h3>

        {project.description ?
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p> :
        null}

        {project.features.length > 0 ?
        <ul className="mt-4 space-y-1.5">
            {project.features.slice(0, 3).map((feature) =>
          <li key={feature} className="flex gap-2 text-[0.83rem] leading-relaxed text-muted">
                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span className="line-clamp-1">{feature}</span>
              </li>
          )}
          </ul> :
        null}

        {project.technologies.length > 0 ?
        <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) =>
          <li
            key={tech}
            className="rounded-md border border-line bg-surface2 px-2 py-1 text-[0.7rem] font-medium text-muted transition-colors group-hover:border-line-strong group-hover:text-fg">
            
                {tech}
              </li>
          )}
            {project.technologies.length > 5 ?
          <li className="rounded-md px-2 py-1 text-[0.7rem] font-medium text-muted">
                +{project.technologies.length - 5}
              </li> :
          null}
          </ul> :
        null}

        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-line pt-4">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            
            Case study
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
          {project.githubUrl ?
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
            
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
              <span>Code</span>
              <span className="sr-only">for {project.title} on GitHub</span>
            </a> :
          null}
          {project.liveUrl ?
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
            
              <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
              <span>Live</span>
              <span className="sr-only">demo of {project.title}</span>
            </a> :
          null}
        </div>
      </div>
    </motion.article>);

}