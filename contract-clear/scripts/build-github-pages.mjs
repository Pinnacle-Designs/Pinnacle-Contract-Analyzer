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

process.env.GITHUB_PAGES = "true";

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
} finally {
  restore();
}

process.exit(exitCode);
