import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, resolve } from "node:path";
import { gzipSync } from "node:zlib";

import { describe, expect, it } from "vitest";

import { defineSiteConfig, type SiteConfig } from "../../lib/site-contract/index.ts";
import {
  type BuildManifest,
  calculateInitialAssets,
} from "../../tooling/bundle-budget/calculate.ts";

const repoRoot = resolve(import.meta.dirname, "../..");
const budgets = JSON.parse(
  readFileSync(resolve(repoRoot, "tooling/bundle-budget/budgets.json"), "utf8"),
) as {
  maxHtmlDocumentGzip: number;
  singleImage: number;
  totalCssGzip: number;
  totalJsGzip: number;
};

interface SiteBuild {
  readonly clientRoot: string;
  readonly siteConfig: SiteConfig;
}

const site: SiteBuild = {
  clientRoot: resolve(repoRoot, "build/client"),
  siteConfig: defineSiteConfig(
    JSON.parse(readFileSync(resolve(repoRoot, "site.config.json"), "utf8")),
  ),
};

function collectFiles(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });
}

function readOutput(build: SiteBuild, relativePath: string): string {
  return readFileSync(resolve(build.clientRoot, relativePath), "utf8");
}

function decodeHtml(value: string): string {
  return value.replace(
    /&(?:#(\d+)|#x([\da-f]+)|amp|apos|gt|lt|quot);/giu,
    (entity, decimal, hex) => {
      if (decimal) {
        return String.fromCodePoint(Number.parseInt(decimal, 10));
      }
      if (hex) {
        return String.fromCodePoint(Number.parseInt(hex, 16));
      }
      const namedEntities: Readonly<Record<string, string>> = {
        "&amp;": "&",
        "&apos;": "'",
        "&gt;": ">",
        "&lt;": "<",
        "&quot;": '"',
      };
      return namedEntities[entity.toLowerCase()] ?? entity;
    },
  );
}

function elementAttributes(
  html: string,
  elementName: string,
): ReadonlyArray<Record<string, string>> {
  const elements = html.matchAll(new RegExp(`<${elementName}\\b([^>]*)>`, "giu"));
  return [...elements].map((element) => {
    const attributes: Record<string, string> = {};
    for (const attribute of element[1]?.matchAll(
      /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/gu,
    ) ?? []) {
      const name = attribute[1]?.toLowerCase();
      if (name) {
        attributes[name] = decodeHtml(attribute[2] ?? attribute[3] ?? attribute[4] ?? "");
      }
    }
    return attributes;
  });
}

function metadataContent(
  html: string,
  attribute: "name" | "property",
  value: string,
): string | undefined {
  return elementAttributes(html, "meta").find((attributes) => attributes[attribute] === value)
    ?.content;
}

describe("production build", () => {
  it("emits a self-contained static client artifact", () => {
    expect(existsSync(resolve(site.clientRoot, "index.html"))).toBe(true);
    expect(collectFiles(site.clientRoot).some((file) => extname(file) === ".js")).toBe(true);
    expect(readOutput(site, "index.html")).not.toContain("build/server");
  });

  it("puts essential homepage content and metadata in HTML before JavaScript runs", () => {
    const html = readOutput(site, "index.html");
    const canonicalLink = elementAttributes(html, "link").find(
      (attributes) => attributes.rel === "canonical",
    );
    const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/iu)?.[1] ?? "");

    expect(html).toMatch(/^<!doctype html>/iu);
    expect(elementAttributes(html, "html")[0]?.lang).toBe(site.siteConfig.locale);
    expect(title).toBe(site.siteConfig.title);
    expect(metadataContent(html, "name", "description")).toBe(site.siteConfig.description);
    expect(metadataContent(html, "property", "og:title")).toBe(site.siteConfig.title);
    expect(metadataContent(html, "property", "og:url")).toBe(site.siteConfig.canonicalUrl);
    expect(canonicalLink?.href).toBe(site.siteConfig.canonicalUrl);
    expect(decodeHtml(html)).toContain(site.siteConfig.primaryCta.label);
    expect(html.match(/<main(?:\s|>)/giu)).toHaveLength(1);
    expect(html.match(/<h1(?:\s|>)/giu)).toHaveLength(1);
    expect(html.toLowerCase()).not.toContain("noindex");
  });

  it("gives every prerendered route a complete static document", () => {
    const documents = collectFiles(site.clientRoot).filter(
      (file) => extname(file) === ".html" && !file.endsWith("__spa-fallback.html"),
    );
    expect(documents.length).toBeGreaterThan(0);

    for (const document of documents) {
      const html = readFileSync(document, "utf8");
      expect(html, document).toMatch(/^<!doctype html>/iu);
      expect(html.match(/<main(?:\s|>)/giu), document).toHaveLength(1);
      expect(html.match(/<h1(?:\s|>)/giu), document).toHaveLength(1);
      expect(html.match(/<title>[\s\S]+<\/title>/iu), document).not.toBeNull();
      expect(html.toLowerCase(), document).not.toContain("noindex");
    }
  });

  it("emits crawler files from the canonical config", () => {
    expect(readOutput(site, "robots.txt")).toContain(
      `Sitemap: ${new URL("sitemap.xml", site.siteConfig.canonicalUrl).href}`,
    );
    expect(readOutput(site, "sitemap.xml")).toContain(`<loc>${site.siteConfig.canonicalUrl}</loc>`);
  });

  it("keeps the Vite static entry graph resolvable", () => {
    const manifest = JSON.parse(readOutput(site, ".vite/manifest.json")) as BuildManifest;
    const assets = calculateInitialAssets(manifest);
    expect(assets.javascript.length).toBeGreaterThan(0);
    for (const asset of [...assets.javascript, ...assets.css]) {
      expect(existsSync(resolve(site.clientRoot, asset)), asset).toBe(true);
    }
  });

  it("stays below deterministic total JS/CSS and per-document HTML ceilings", () => {
    const files = collectFiles(site.clientRoot);
    const totalGzipBytes = (extension: string) =>
      files
        .filter((file) => extname(file) === extension)
        .reduce((total, file) => total + gzipSync(readFileSync(file)).byteLength, 0);

    expect(totalGzipBytes(".js")).toBeLessThanOrEqual(budgets.totalJsGzip);
    expect(totalGzipBytes(".css")).toBeLessThanOrEqual(budgets.totalCssGzip);
    for (const htmlFile of files.filter((file) => extname(file) === ".html")) {
      expect(gzipSync(readFileSync(htmlFile)).byteLength, htmlFile).toBeLessThanOrEqual(
        budgets.maxHtmlDocumentGzip,
      );
    }
  });

  it("does not emit an oversized raster image", () => {
    const rasterExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
    const rasterFiles = collectFiles(site.clientRoot).filter((file) =>
      rasterExtensions.has(extname(file).toLowerCase()),
    );

    for (const file of rasterFiles) {
      expect(statSync(file).size, file).toBeLessThanOrEqual(budgets.singleImage);
    }
  });
});
