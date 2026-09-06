import { describe, expect, it } from "vitest";

import { buildMetadata } from "./metadata.ts";
import { defineSiteConfig } from "./site-config.ts";

const site = defineSiteConfig({
  id: "starter",
  title: "Landing Foundation",
  description: "A verified starting point for AI-authored landing pages.",
  locale: "en",
  canonicalUrl: "https://example.com/",
  primaryCta: { label: "Inspect the foundation", href: "#foundation" },
});

describe("buildMetadata", () => {
  it("builds one deterministic descriptor for each required field", () => {
    const metadata = buildMetadata(site);

    expect(metadata).toEqual([
      { title: site.title },
      { name: "description", content: site.description },
      { property: "og:title", content: site.title },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: site.canonicalUrl },
      { tagName: "link", rel: "canonical", href: site.canonicalUrl },
    ]);
  });

  it("does not emit duplicate metadata keys", () => {
    const metadata = buildMetadata(site);
    const keys = metadata.map((item) =>
      "title" in item
        ? "title"
        : "name" in item
          ? `name:${item.name}`
          : "property" in item
            ? `property:${item.property}`
            : `${item.tagName}:${item.rel}`,
    );

    expect(new Set(keys).size).toBe(keys.length);
  });
});
