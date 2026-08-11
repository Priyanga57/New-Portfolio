import React, { useMemo } from 'react';
import { Hero } from '../sections/Hero';
import { MilestonePath } from '../sections/MilestonePath';
import { Skills } from '../sections/Skills';
import { Workflow } from '../sections/Workflow';
import { FeaturedProjects } from '../sections/FeaturedProjects';
import { ExperiencePreview } from '../sections/ExperiencePreview';
import { CertificatesPreview } from '../sections/CertificatesPreview';
import { AboutPreview } from '../sections/AboutPreview';
import { ContactCTA } from '../sections/ContactCTA';
import { useSeo } from '../hooks/useSeo';
import { personSchema, websiteSchema } from '../utils/seo';

export function Home() {
  const jsonLd = useMemo(() => [personSchema, websiteSchema()], []);

  useSeo({
    title: 'Priyanga V S | Data Analyst',
    description:
    'Data Analyst from Tamil Nadu, India working with SQL, Python, Excel and Power BI to clean, analyse and visualise data into KPI dashboards and business insights.',
    path: '/',
    jsonLd
  });

  return (
    <main>
      <Hero />
      <MilestonePath />
      <Skills />
      <Workflow />
      <FeaturedProjects />
      <ExperiencePreview />
      <CertificatesPreview />
      <AboutPreview />
      <ContactCTA />
    </main>
  );
}