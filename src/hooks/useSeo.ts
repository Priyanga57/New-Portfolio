import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: Record<string, unknown>[];
}

function upsertMeta(selectorAttr: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${selectorAttr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(selectorAttr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

const JSON_LD_ID = 'portfolio-json-ld';

export function useSeo({ title, description, path, image, jsonLd }: SeoOptions): void {
  useEffect(() => {
    document.title = title;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const canonical = `${origin}${path}`;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', 'index, follow');
    upsertCanonical(canonical);

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:site_name', 'Priyanga V S — Data Analyst Portfolio');

    upsertMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('name', 'twitter:image', image);
    }

    const existing = document.getElementById(JSON_LD_ID);
    if (existing) existing.remove();

    if (jsonLd && jsonLd.length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = JSON_LD_ID;
      script.textContent = JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, jsonLd]);
}