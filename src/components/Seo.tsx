import { useEffect } from 'react';

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const SITE_NAME = 'QuattroCape';
const SITE_URL = 'https://quattrocape.com';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=85&w=2400';

function setOrCreateMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(url: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}

function setJsonLd(data?: Record<string, unknown> | Array<Record<string, unknown>>) {
  const existing = document.head.querySelector('#seo-jsonld');
  if (existing) existing.remove();
  if (!data) return;

  const script = document.createElement('script');
  script.id = 'seo-jsonld';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export function Seo({ title, description, path = '/', image = DEFAULT_IMAGE, type = 'website', jsonLd }: SeoProps) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;
    document.title = title;
    setCanonical(canonical);

    setOrCreateMeta('name', 'description', description);
    setOrCreateMeta('name', 'robots', 'index, follow, max-image-preview:large');

    setOrCreateMeta('property', 'og:type', type);
    setOrCreateMeta('property', 'og:site_name', SITE_NAME);
    setOrCreateMeta('property', 'og:title', title);
    setOrCreateMeta('property', 'og:description', description);
    setOrCreateMeta('property', 'og:url', canonical);
    setOrCreateMeta('property', 'og:image', image);

    setOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('name', 'twitter:title', title);
    setOrCreateMeta('name', 'twitter:description', description);
    setOrCreateMeta('name', 'twitter:image', image);

    setJsonLd(jsonLd);
  }, [title, description, path, image, type, jsonLd]);

  return null;
}

