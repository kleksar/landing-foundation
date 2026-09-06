import { describe, expect, it } from "vitest";

import { defineSiteConfig } from "./site-config.ts";

const validConfig = {
  id: "starter",
  title: "Landing Foundation",
  description: "A verified starting point for AI-authored landing pages.",
  locale: "en",
  canonicalUrl: "https://example.com/",
  primaryCta: {
    label: "Inspect the foundation",
    href: "#foundation",
  },
} as const;

describe("defineSiteConfig", () => {
  it("returns an immutable valid configuration", () => {
    const config = defineSiteConfig(validConfig);

    expect(config).toEqual(validConfig);
    expect(Object.isFrozen(config)).toBe(true);
    expect(Object.isFrozen(config.primaryCta)).toBe(true);
  });

  it.each(["id", "title", "description", "locale"] as const)("rejects a missing %s", (field) => {
    const config = { ...validConfig } as Record<string, unknown>;
    delete config[field];

    expect(() => defineSiteConfig(config)).toThrow(field);
  });

  it("requires an absolute HTTPS canonical URL", () => {
    expect(() => defineSiteConfig({ ...validConfig, canonicalUrl: "/relative" })).toThrow(
      "canonicalUrl",
    );
    expect(() => defineSiteConfig({ ...validConfig, canonicalUrl: "http://example.com" })).toThrow(
      "canonicalUrl",
    );
    expect(() =>
      defineSiteConfig({ ...validConfig, canonicalUrl: "https://example.com/page?draft=1" }),
    ).toThrow("canonicalUrl");
    expect(() =>
      defineSiteConfig({ ...validConfig, canonicalUrl: "https://user:secret@example.com/" }),
    ).toThrow("canonicalUrl");
    expect(() =>
      defineSiteConfig({ ...validConfig, canonicalUrl: "https://example.com/campaign/" }),
    ).toThrow("canonicalUrl");
  });

  it("requires a lowercase kebab-case site id", () => {
    for (const id of ["Starter Site", "starter_site", "../starter", "-starter"]) {
      expect(() => defineSiteConfig({ ...validConfig, id })).toThrow("id");
    }
  });

  it("requires a valid locale and returns its canonical spelling", () => {
    expect(defineSiteConfig({ ...validConfig, locale: "en-us" }).locale).toBe("en-US");
    expect(() => defineSiteConfig({ ...validConfig, locale: "not_a_locale" })).toThrow("locale");
  });

  it.each([
    "#details",
    "/pricing",
    "https://example.com/demo",
    "mailto:team@example.com",
    "tel:+12025550123",
  ])("accepts a safe CTA href: %s", (href) => {
    expect(
      defineSiteConfig({ ...validConfig, primaryCta: { ...validConfig.primaryCta, href } }),
    ).toMatchObject({ primaryCta: { href } });
  });

  it.each([
    "javascript:alert(1)",
    "data:text/html,bad",
    "http://example.com",
    "//example.com",
    "/\\evil.example",
  ])("rejects an unsafe CTA href: %s", (href) => {
    expect(() =>
      defineSiteConfig({ ...validConfig, primaryCta: { ...validConfig.primaryCta, href } }),
    ).toThrow("primaryCta.href");
  });

  it("rejects unknown fields so agents cannot invent configuration", () => {
    expect(() => defineSiteConfig({ ...validConfig, inventedOption: true })).toThrow(
      "inventedOption",
    );
  });
});
