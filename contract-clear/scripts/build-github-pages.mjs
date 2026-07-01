import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stashDir = path.join(root, ".gh-pages-stash");

const toStash = [
  "src/app/api",
  "src/app/auth",
  "src/app/account",
  "src/app/dashboard",
  "src/app/login",
  "src/app/signup",
  "src/app/forgot-password",
  "src/app/reset-password",
  "src/app/preview",
  "src/middleware.ts",
];

function copyPath(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

function removeDirSafe(dir) {
  if (!fs.existsSync(dir)) return;
  try {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
  } catch {
    spawnSync(
      process.platform === "win32" ? "cmd" : "sh",
      [
        process.platform === "win32" ? "/c" : "-c",
        process.platform === "win32" ? `rmdir /s /q "${dir}"` : `rm -rf "${dir}"`,
      ],
      { stdio: "ignore", shell: false }
    );
  }
}

function stash() {
  if (fs.existsSync(stashDir)) fs.rmSync(stashDir, { recursive: true, force: true });
  fs.mkdirSync(stashDir, { recursive: true });

  for (const rel of toStash) {
    const src = path.join(root, rel);
    if (!fs.existsSync(src)) continue;
    const dest = path.join(stashDir, rel);
    copyPath(src, dest);
    fs.rmSync(src, { recursive: true, force: true });
  }
}

function restore() {
  for (const rel of toStash) {
    const stashed = path.join(stashDir, rel);
    if (!fs.existsSync(stashed)) continue;
    const dest = path.join(root, rel);
    if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
    copyPath(stashed, dest);
  }
  if (fs.existsSync(stashDir)) fs.rmSync(stashDir, { recursive: true, force: true });
}

function isDevServerRunning() {
  return fs.existsSync(path.join(root, ".next", "dev", "lock"));
}

function injectAdSenseIntoHtml(outDir, clientId) {
  if (!clientId?.startsWith("ca-pub-")) return;

  const meta = `<meta name="google-adsense-account" content="${clientId}">`;
  const script = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}" crossorigin="anonymous"></script>`;
  let updated = 0;

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.name.endsWith(".html")) continue;

      let html = fs.readFileSync(full, "utf8");
      if (html.includes("adsbygoogle.js")) continue;

      if (!html.includes('name="google-adsense-account"')) {
        html = html.replace("</head>", `${meta}\n${script}\n</head>`);
      } else {
        html = html.replace("</head>", `${script}\n</head>`);
      }
      fs.writeFileSync(full, html, "utf8");
      updated += 1;
    }
  }

  if (fs.existsSync(outDir)) {
    walk(outDir);
    console.error(`Injected AdSense into ${updated} HTML file(s) in ${outDir}`);
  }
}

process.env.GITHUB_PAGES = "true";

if (isDevServerRunning() && !process.env.CI) {
  console.error(
    "\nbuild:gh-pages — stop `npm run dev` first (it shares the .next folder).\n"
  );
  process.exit(1);
}

stash();

let exitCode = 1;
try {
  removeDirSafe(path.join(root, ".next"));

  const build = spawnSync("npm", ["run", "build"], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
    shell: true,
  });

  exitCode = build.status ?? 1;

  if (exitCode === 0) {
    const clientId =
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || "ca-pub-1014488780102797";
    injectAdSenseIntoHtml(path.join(root, "out"), clientId);
  }
} finally {
  restore();
}

process.exit(exitCode);
