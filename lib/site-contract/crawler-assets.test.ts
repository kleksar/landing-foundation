import { describe, expect, it } from "vitest";

import { createCrawlerAssets } from "./crawler-assets.ts";

describe("createCrawlerAssets", () => {
  it("derives crawler files from the canonical origin", () => {
    const assets = createCrawlerAssets("https://example.com/");

    expect(assets["robots.txt"]).toContain("Sitemap: https://example.com/sitemap.xml");
    expect(assets["sitemap.xml"]).toContain("<loc>https://example.com/</loc>");
  });

  it("escapes the canonical URL before placing it in XML", () => {
    const assets = createCrawlerAssets("https://example.com/a&b/");

    expect(assets["sitemap.xml"]).toContain("<loc>https://example.com/a&amp;b/</loc>");
  });
});
