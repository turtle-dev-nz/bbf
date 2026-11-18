import { existsSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Staging builds (`vite build --mode staging`) must never be indexed.
 * Belt and braces, because not every host honours every mechanism:
 * - <meta name="robots"> in index.html (works everywhere, incl. GitHub Pages)
 * - robots.txt that disallows everything (replaces the production one)
 * - _headers with X-Robots-Tag (Cloudflare Pages / Workers static assets)
 * - sitemap.xml removed so nothing advertises staging URLs
 */
function noIndex(): Plugin {
  let outDir = "dist";

  return {
    name: "bbf-noindex",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    transformIndexHtml() {
      return [
        {
          tag: "meta",
          attrs: { name: "robots", content: "noindex, nofollow" },
          injectTo: "head-prepend",
        },
      ];
    },
    closeBundle() {
      writeFileSync(resolve(outDir, "robots.txt"), "User-agent: *\nDisallow: /\n");
      writeFileSync(resolve(outDir, "_headers"), "/*\n  X-Robots-Tag: noindex, nofollow\n");

      const sitemap = resolve(outDir, "sitemap.xml");
      if (existsSync(sitemap)) rmSync(sitemap);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  plugins: [react(), mode === "staging" && noIndex()],
}));
