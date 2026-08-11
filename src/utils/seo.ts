import { education, profile } from '../data/profile';

export const personSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN'
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: education.institution
  },
  knowsAbout: [
    'Data Analysis',
    'SQL',
    'Python',
    'Power BI',
    'Excel',
    'Business Intelligence',
    'Data Visualization'],

  sameAs: [profile.linkedin, profile.github]
};

export function websiteSchema(): Record<string, unknown> {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${profile.name} - ${profile.role}`,
    url: origin,
    inLanguage: 'en'
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string; }>): Record<string, unknown> {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`
    }))
  };
}