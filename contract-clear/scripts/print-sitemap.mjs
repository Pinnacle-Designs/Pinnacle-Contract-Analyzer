#!/usr/bin/env node
/**
 * Print sitemap.xml for the marketing site (GitHub Pages trailing-slash URLs).
 * Usage: node scripts/print-sitemap.mjs
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://pinnaclecontractanalyzer.com";
const LASTMOD = process.env.SITEMAP_LAST_MODIFIED?.slice(0, 10) ?? new Date().toISOString().slice(0, 10);

const routes = [
  { loc: `${BASE}/`, changefreq: "weekly", priority: "1.0" },
  { loc: `${BASE}/pricing/`, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE}/contact/`, changefreq: "monthly", priority: "0.6" },
  { loc: `${BASE}/terms/`, changefreq: "yearly", priority: "0.4" },
  { loc: `${BASE}/privacy/`, changefreq: "yearly", priority: "0.4" },
  { loc: `${BASE}/disclaimer/`, changefreq: "yearly", priority: "0.4" },
  { loc: `${BASE}/cookies/`, changefreq: "yearly", priority: "0.3" },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `<url>
<loc>${r.loc}</loc>
<lastmod>${LASTMOD}</lastmod>
<changefreq>${r.changefreq}</changefreq>
<priority>${r.priority}</priority>
</url>`
  )
  .join("\n")}
</urlset>
`;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(xml);
console.error(`\nWrote ${outPath}`);
