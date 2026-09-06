import type { SiteConfig } from "./site-config.ts";

export type MetadataDescriptor =
  | { readonly title: string }
  | { readonly name: string; readonly content: string }
  | { readonly property: string; readonly content: string }
  | {
      readonly tagName: "link";
      readonly rel: "canonical";
      readonly href: string;
    };

export function buildMetadata(site: SiteConfig): readonly MetadataDescriptor[] {
  return [
    { title: site.title },
    { name: "description", content: site.description },
    { property: "og:title", content: site.title },
    { property: "og:description", content: site.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: site.canonicalUrl },
    { tagName: "link", rel: "canonical", href: site.canonicalUrl },
  ];
}
