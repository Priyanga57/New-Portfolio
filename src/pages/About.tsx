import React, { useMemo } from 'react';
import { GraduationCapIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { Workflow } from '../sections/Workflow';
import { ContactCTA } from '../sections/ContactCTA';
import { education, profile } from '../data/profile';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useSeo } from '../hooks/useSeo';
import { breadcrumbSchema, personSchema } from '../utils/seo';

export function About() {
  const { projects, certificates, experience, status } = usePortfolio();

  const jsonLd = useMemo(
    () => [
      personSchema,
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
    []
  );

  useSeo({
    title: 'About | Priyanga V S — Data Analyst',
    description:
      'About Priyanga V S — a Data Analyst studying B.Tech in Artificial Intelligence & Data Science, working across SQL, Python, Power BI and Excel for reporting and business intelligence.',
    path: '/about',
    jsonLd,
  });

  const facts = [
    { label: 'Projects',       value: projects.length     },
    { label: 'Certifications', value: certificates.length  },
    { label: 'Internships',    value: experience.length   },
  ].filter((fact) => fact.value > 0);

  return (
    <main>
      <PageHeader
        eyebrow="About"
        title="Data Analyst turning raw data into decisions"
        description={profile.tagline}
      />

      {/* ── Personal Introduction ── */}
      <section className="border-b border-line py-16 sm:py-20" aria-labelledby="about-intro-heading">
        <div className="mx-auto grid max-w-content gap-10 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <div>
              <h2
                id="about-intro-heading"
                className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
              >
                Professional introduction
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">{profile.summaryFull}</p>

              <h3 className="mt-10 font-display text-lg font-semibold tracking-tight text-fg">
                Analytical mindset
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Work starts with the question, not the chart. Datasets are validated and cleaned before
                modeling, and reporting is structured so that a stakeholder can read the outcome without
                needing the analysis explained to them.
              </p>

              <h3 className="mt-8 font-display text-lg font-semibold tracking-tight text-fg">
                Career direction
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Focused on Data Analyst, Business Analyst, BI and reporting roles where SQL, Python and
                Power BI are used to support recurring decisions rather than one-off requests.
              </p>
            </div>
          </Reveal>

          {/* ── Education + Stats sidebar ── */}
          <div className="space-y-4">
            <Reveal delay={0.06}>
              <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <GraduationCapIcon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-fg">
                  Education
                </h3>
                <p className="mt-3 text-sm font-medium text-fg">{education.degree}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{education.institution}</p>
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

            {status === 'ready' && facts.length > 0 ? (
              <Reveal delay={0.12}>
                <dl className="grid grid-cols-3 gap-3">
                  {facts.map((fact) => (
                    <div key={fact.label} className="rounded-xl border border-line bg-surface px-4 py-3">
                      <dt className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 font-display text-xl font-semibold text-fg">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      <Workflow />
      <ContactCTA />
    </main>
  );
}