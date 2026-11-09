import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
const paths = [
  "/",
  "/airport-transfers",
  "/private-day-tours",
  "/privacy",
  "/terms",
];
const titles = new Set<string>();
const canonicals = new Set<string>();
for (const path of paths) {
  const html = readFileSync(
    resolve("dist", path.slice(1), "index.html"),
    "utf8",
  );
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${path}: one visible H1`,
  );
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title);
  assert.ok(!titles.has(title), "unique title");
  titles.add(title);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical);
  assert.ok(!canonicals.has(canonical), "unique canonical");
  canonicals.add(canonical);
  assert.ok(!html.includes("noindex"), `${path}: public route is indexable`);
  assert.ok(
    !/€|3-Day|Weekly|full-stay|self-drive rentals/i.test(html),
    `${path}: no retired offers`,
  );
  for (const [, src] of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
    if (
      src.startsWith("/assets/") ||
      src.startsWith("/images/") ||
      src === "/favicon.svg"
    )
      assert.ok(
        existsSync(resolve("dist", src.slice(1))),
        `asset exists: ${src}`,
      );
  }
  for (const [, raw] of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
  )) {
    const data = JSON.parse(raw);
    for (const node of data["@graph"] || []) {
      if (node["@type"] === "Service") {
        assert.equal(node.offers.priceCurrency, "ZAR");
        assert.ok([1000, 5000].includes(node.offers.price));
      }
    }
  }
  if (path === "/" || path.includes("transfers") || path.includes("tours")) {
    assert.ok(html.includes("Request availability"));
    assert.ok(html.includes('type="checkbox" required=""'));
  }
}
for (const p of ["admin", "login"])
  assert.match(
    readFileSync(`dist/${p}/index.html`, "utf8"),
    /noindex, nofollow/,
  );
const sitemap = readFileSync("dist/sitemap.xml", "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, 5);
assert.ok(!/login|admin|stay-chauffeur/.test(sitemap));
const config = JSON.parse(readFileSync("vercel.json", "utf8"));
assert.ok(
  config.redirects.some(
    (r: { source: string; permanent: boolean }) =>
      r.source === "/stay-chauffeur" && r.permanent,
  ),
);
console.log(
  "SEO checks passed: five rendered routes, unique metadata, ZAR offers, local assets, booking form, private-route noindex, sitemap and legacy redirect.",
);
