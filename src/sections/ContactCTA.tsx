import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, MailIcon } from 'lucide-react';
import { profile } from '../data/profile';
import { buttonStyles } from '../components/Button';
import { Reveal } from '../components/Reveal';

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24" aria-labelledby="cta-heading">
      <div className="dot-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <div className="rounded-2xl border border-line bg-surface px-6 py-12 text-center shadow-card sm:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Available for opportunities</p>
            <h2
              id="cta-heading"
              className="mx-auto mt-4 max-w-2xl font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">

              Looking for a Data Analyst who can turn your data into decisions?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              Happy to talk about analyst, BI or reporting roles - or to walk through any project in detail.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className={buttonStyles()}>
                Get in touch
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={`mailto:${profile.email}`} className={buttonStyles({ variant: 'secondary' })}>
                <MailIcon className="h-4 w-4" aria-hidden="true" />
                {profile.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

}