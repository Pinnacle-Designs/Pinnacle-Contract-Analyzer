import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const isGhPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? "";
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  ...(isGhPages && {
    output: "export",
    basePath: basePath || undefined,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  ...(!isGhPages && {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Frame-Options", value: "DENY" },
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            {
              key: "Permissions-Policy",
              value: "camera=(), microphone=(), geolocation=()",
            },
          ],
        },
      ];
    },
  }),
};

export default nextConfig;
