import React, { useMemo } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Skills } from '../sections/Skills';
import { ContactCTA } from '../sections/ContactCTA';
import { useSeo } from '../hooks/useSeo';
import { breadcrumbSchema } from '../utils/seo';

export function SkillsPage() {
  const jsonLd = useMemo(
    () => [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Skills', path: '/skills' },
      ]),
    ],
    []
  );

  useSeo({
    title: 'Skills | Priyanga V S — Data Analyst',
    description:
      'Technical skills of Priyanga V S — SQL, Python, Pandas, Power BI, Excel, Machine Learning, and more. Built for data extraction, cleaning, analysis and business intelligence.',
    path: '/skills',
    jsonLd,
  });

  return (
    <main>
      <PageHeader
        eyebrow="Skills"
        title="Technical toolkit for data analysis"
        description="The stack used day to day across data extraction, cleaning, modeling and visualization."
      />
      <Skills />
      <ContactCTA />
    </main>
  );
}
