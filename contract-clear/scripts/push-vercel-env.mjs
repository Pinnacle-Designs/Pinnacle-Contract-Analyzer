import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const productionAppUrl = "https://pinnacle-contract-analyzer.vercel.app";
const productionMarketingUrl = "https://pinnaclecontractanalyzer.com";

const skipKeys = new Set(["VERCEL_OIDC_TOKEN"]);
const sensitiveKeys = new Set([
  "ANTHROPIC_API_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "SUPABASE_SERVICE_ROLE_KEY",
]);

function parseEnv(content) {
  const vars = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    vars[key] = value;
  }
  return vars;
}

function isPlaceholder(value) {
  return !value || value.includes("...") || value === "xxx";
}

function addEnv(key, value) {
  const args = [
    "vercel",
    "env",
    "add",
    key,
    "production",
    "--value",
    value,
    "--yes",
    "--force",
    sensitiveKeys.has(key) ? "--sensitive" : "--no-sensitive",
  ];
  const result = spawnSync("npx", args, {
    cwd: root,
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  if (result.status !== 0) {
    throw new Error(`Failed to add ${key}`);
  }
}

const vars = parseEnv(fs.readFileSync(path.join(root, ".env.local"), "utf8"));

for (const [key, rawValue] of Object.entries(vars)) {
  if (skipKeys.has(key)) continue;

  let value = rawValue;
  if (key === "NEXT_PUBLIC_APP_URL") {
    value = productionAppUrl;
  }
  if (key === "NEXT_PUBLIC_SITE_URL") {
    value = productionMarketingUrl;
  }

  if (isPlaceholder(value)) {
    console.log(`Skipping ${key} — not set`);
    continue;
  }

  console.log(`Adding ${key} → production`);
  addEnv(key, value);
}

console.log("Done.");
