import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, GraduationCapIcon } from 'lucide-react';
import { education, profile } from '../data/profile';
import { Reveal } from '../components/Reveal';
import { buttonStyles } from '../components/Button';

export function AboutPreview() {
  return (
    <section className="border-b border-line bg-surface py-16 sm:py-20" aria-labelledby="about-preview-heading">
      <div className="mx-auto grid max-w-content gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">About</p>
            <h2
              id="about-preview-heading"
              className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              
              An analyst focused on clarity, not complexity
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{profile.summaryFull}</p>
            <Link to="/about" className={buttonStyles({ variant: 'secondary', size: 'sm', className: 'mt-6' })}>
              More about me
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-line bg-bg p-6 shadow-card">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <GraduationCapIcon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-fg">{education.degree}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{education.institution}</p>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-5 text-sm">
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">Period</dt>
                <dd className="mt-1 font-medium text-fg">{education.period}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">CGPA</dt>
                <dd className="mt-1 font-medium text-fg">{education.cgpa}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>);

}