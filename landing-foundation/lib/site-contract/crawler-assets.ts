import type { Plugin } from "vite";

export interface CrawlerAssets {
  readonly "robots.txt": string;
  readonly "sitemap.xml": string;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function createCrawlerAssets(canonicalUrl: string): CrawlerAssets {
  const sitemapUrl = new URL("sitemap.xml", canonicalUrl).href;
  return {
    "robots.txt": `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`,
    "sitemap.xml": [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      `  <url><loc>${escapeXml(canonicalUrl)}</loc></url>`,
      "</urlset>",
      "",
    ].join("\n"),
  };
}

export function crawlerAssetsPlugin(canonicalUrl: string): Plugin {
  return {
    name: "landing-crawler-assets",
    generateBundle() {
      for (const [fileName, source] of Object.entries(createCrawlerAssets(canonicalUrl))) {
        this.emitFile({ fileName, source, type: "asset" });
      }
    },
  };
}
