import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * `next build` writes plain HTML/CSS/JS to ./out, uploaded as-is by
 * .github/workflows/deploy.yml. No Node runtime on the host.
 *
 * GitHub Pages specifics baked in here:
 *  - output: "export"        — required, Pages has no server.
 *  - trailingSlash: true     — emits about/index.html, which is the only shape
 *                              GitHub Pages serves at /about/ without a redirect.
 *  - images.unoptimized      — no Image Optimization API on Pages.
 *  - public/.nojekyll        — stops Jekyll from stripping the _next/ folder.
 *  - public/CNAME            — keeps the custom domain on every deploy.
 *
 * Deploying this repo as a PROJECT page (user.github.io/repo) instead of a
 * user page? Set basePath + assetPrefix to "/repo" here and in lib/site.ts.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
