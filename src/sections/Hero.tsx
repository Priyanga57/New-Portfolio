import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { ArrowRightIcon, DownloadIcon, GithubIcon, LinkedinIcon, MapPinIcon } from 'lucide-react';
import { heroKeywords, profile } from '../data/profile';
import { usePortfolio } from '../contexts/PortfolioContext';
import { buttonStyles } from '../components/Button';
import { HeroVisual } from './HeroVisual';
import { downloadFile } from '../utils/downloadFile';

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { resume, projects, certificates, experience, status } = usePortfolio();

  const stats = [
  { label: 'Projects', value: projects.length },
  { label: 'Certifications', value: certificates.length },
  { label: 'Internships', value: experience.length }].
  filter((stat) => stat.value > 0);

  const fade = (delay: number): MotionProps =>
  reduceMotion ?
  {} :
  {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: 'easeOut' }
  };

  return (
    <section className="relative overflow-hidden border-b border-line" aria-labelledby="hero-heading">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full opacity-70 blur-3xl"
        style={{ background: 'var(--glow)' }}
        aria-hidden="true" />
      

      <div className="relative mx-auto grid max-w-content items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          <motion.p
            {...fade(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted">
            
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Open to Data Analyst roles
            <span className="hidden items-center gap-1 border-l border-line pl-2 sm:inline-flex">
              <MapPinIcon className="h-3 w-3" aria-hidden="true" />
              {profile.location}
            </span>
          </motion.p>

          <motion.h1
            {...fade(0.06)}
            id="hero-heading"
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            
            {profile.name}
            <span className="mt-2 block text-primary">{profile.role}</span>
          </motion.h1>

          <motion.p {...fade(0.12)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline} {profile.summary}
          </motion.p>

          <motion.ul {...fade(0.18)} className="mt-6 flex flex-wrap gap-2">
            {heroKeywords.map((keyword) =>
            <li
              key={keyword}
              className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-fg">
              
                {keyword}
              </li>
            )}
          </motion.ul>

          <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/projects" className={buttonStyles()}>
              View My Work
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            {resume.url && (
              <button
                type="button"
                onClick={() => downloadFile(resume.url!, 'Priyanga_VS_Resume.pdf')}
                className={buttonStyles({ variant: 'secondary' })}
                aria-label="Download Priyanga's resume as PDF">
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </button>
            )}
            <Link to="/contact" className={buttonStyles({ variant: 'secondary' })}>
              Let&apos;s Connect
            </Link>
            <span className="flex items-center gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-primary hover:text-primary">
                
                <GithubIcon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-primary hover:text-primary">
                
                <LinkedinIcon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
              </a>
            </span>
          </motion.div>

          {status === 'ready' && stats.length > 0 ?
          <motion.dl {...fade(0.3)} className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {stats.map((stat) =>
            <div key={stat.label} className="rounded-xl border border-line bg-surface px-4 py-3">
                  <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">{stat.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-fg">{stat.value}</dd>
                </div>
            )}
            </motion.dl> :
          null}
        </div>

        <HeroVisual />
      </div>
    </section>);

}