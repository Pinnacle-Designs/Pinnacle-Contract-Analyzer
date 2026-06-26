import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isGhPages && {
    output: "export",
    basePath: basePath || undefined,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
