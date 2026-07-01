#!/usr/bin/env node
/**
 * Write public/ads.txt for Google AdSense.
 * Set ADSENSE_PUBLISHER_ID=pub-XXXXXXXXXXXXXXXX or NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "public", "ads.txt");

const explicit = process.env.ADSENSE_PUBLISHER_ID?.trim();
const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

let pubId = explicit?.startsWith("pub-") ? explicit : undefined;
if (!pubId && client?.startsWith("ca-pub-")) {
  pubId = client.replace(/^ca-/, "");
}

let content;
if (pubId) {
  content = `# Google AdSense — https://pinnaclecontractanalyzer.com/ads.txt
google.com, ${pubId}, DIRECT, f08c47fec0942fa0
`;
  console.error(`Wrote ads.txt for ${pubId}`);
} else {
  content = `# Add your AdSense publisher line before applying:
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
#
# Generate automatically:
#   ADSENSE_PUBLISHER_ID=pub-XXXXXXXXXXXXXXXX npm run ads-txt
#   — or —
#   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX npm run ads-txt
`;
  console.error("Wrote ads.txt placeholder (no publisher ID in env)");
}

writeFileSync(outPath, content, "utf8");
console.log(content);
