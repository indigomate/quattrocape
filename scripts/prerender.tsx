import React from "react";
import { loadEnv } from "vite";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { LandingView } from "../src/App";
import ServicePage from "../src/pages/ServicePage";
import PrivacyPage from "../src/pages/PrivacyPage";
import TermsPage from "../src/pages/TermsPage";
import {
  homeMeta,
  services,
  SITE_URL as DEFAULT_SITE_URL,
  structuredData,
} from "../src/lib/content";
const SITE_URL = (
  process.env.VITE_SITE_URL ||
  loadEnv("production", process.cwd(), "").VITE_SITE_URL ||
  DEFAULT_SITE_URL
).replace(/\/$/, "");
const template = readFileSync("dist/index.html", "utf8")
  .replace(/<title>.*?<\/title>/s, "")
  .replace(/<meta name="description"[^>]*>/, "");
const escape = (v: string) =>
  v
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const routes = [
  {
    path: "/",
    ...homeMeta,
    element: <LandingView />,
    data: structuredData(undefined, SITE_URL),
  },
  ...Object.entries(services).map(([slug, s]) => ({
    path: `/${slug}`,
    title: s.title,
    description: s.description,
    element: <ServicePage />,
    data: structuredData(slug as keyof typeof services, SITE_URL),
  })),
  {
    path: "/privacy",
    title: "Privacy Policy | QuattroCape",
    description:
      "How QuattroCape handles your chauffeur enquiry and personal information.",
    element: <PrivacyPage />,
    data: null,
  },
  {
    path: "/terms",
    title: "Booking Terms | QuattroCape",
    description:
      "Booking terms for QuattroCape airport pickups and private daily tours.",
    element: <TermsPage />,
    data: null,
  },
];
for (const page of routes) {
  const url = SITE_URL + page.path,
    image = SITE_URL + "/images/services/private-day-tours.png";
  const head = `<title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}"/><link rel="canonical" href="${escape(url)}"/><meta name="robots" content="index, follow, max-image-preview:large"/><meta property="og:type" content="website"/><meta property="og:site_name" content="QuattroCape"/><meta property="og:locale" content="en_ZA"/><meta property="og:title" content="${escape(page.title)}"/><meta property="og:description" content="${escape(page.description)}"/><meta property="og:url" content="${escape(url)}"/><meta property="og:image" content="${image}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(page.title)}"/><meta name="twitter:description" content="${escape(page.description)}"/><meta name="twitter:image" content="${image}"/>${page.data ? `<script id="seo-jsonld" type="application/ld+json">${JSON.stringify(page.data).replaceAll("<", "\\u003c")}</script>` : ""}`;
  const body = renderToString(
    <StaticRouter location={page.path}>{page.element}</StaticRouter>,
  );
  const dir = resolve("dist", page.path.slice(1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    resolve(dir, "index.html"),
    template
      .replace("<!--seo-head-->", head)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`),
  );
}
// Private routes must not inherit the homepage's indexable metadata.
for (const path of ["login", "admin"]) {
  mkdirSync(`dist/${path}`, { recursive: true });
  writeFileSync(
    `dist/${path}/index.html`,
    template.replace(
      "<!--seo-head-->",
      '<title>Staff access | QuattroCape</title><meta name="robots" content="noindex, nofollow"/>',
    ),
  );
}
writeFileSync(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /login\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((p) => `\n  <url><loc>${SITE_URL}${p.path}</loc></url>`).join("")}\n</urlset>\n`,
);
console.log(
  `Prerendered ${routes.length} public pages with metadata and structured data.`,
);
