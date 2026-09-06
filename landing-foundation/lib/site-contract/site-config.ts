export interface SiteCallToAction {
  readonly href: string;
  readonly label: string;
}

export interface SiteConfig {
  readonly canonicalUrl: string;
  readonly description: string;
  readonly id: string;
  readonly locale: string;
  readonly primaryCta: SiteCallToAction;
  readonly title: string;
}

const siteKeys = new Set(["canonicalUrl", "description", "id", "locale", "primaryCta", "title"]);
const ctaKeys = new Set(["href", "label"]);
const siteIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const hashTargetPattern = /^#[A-Za-z][\w:.-]*$/u;
const allowedCtaProtocols = new Set(["https:", "mailto:", "tel:"]);

function assertRecord(value: unknown, field: string): asserts value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError(`${field} must be an object`);
  }
}

function requireString(input: Record<string, unknown>, field: string): string {
  const value = input[field];
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${field} must be a non-empty string`);
  }
  return value.trim();
}

function requireSiteId(input: Record<string, unknown>): string {
  const id = requireString(input, "id");
  if (!siteIdPattern.test(id)) {
    throw new TypeError("id must be lowercase kebab-case");
  }
  return id;
}

function requireLocale(input: Record<string, unknown>): string {
  const locale = requireString(input, "locale");
  try {
    const canonicalLocale = Intl.getCanonicalLocales(locale)[0];
    if (canonicalLocale) {
      return canonicalLocale;
    }
  } catch {
    // Fall through to the stable domain error below.
  }
  throw new TypeError("locale must be a valid BCP 47 language tag");
}

function requireSafeHref(input: Record<string, unknown>): string {
  const href = requireString(input, "href");
  if (hashTargetPattern.test(href)) {
    return href;
  }

  if (href.startsWith("/") && !href.includes("\\")) {
    const base = new URL("https://landing.invalid/");
    const resolved = new URL(href, base);
    if (resolved.origin === base.origin) {
      return href;
    }
  }

  try {
    const url = new URL(href);
    if (allowedCtaProtocols.has(url.protocol) && !url.username && !url.password) {
      return href;
    }
  } catch {
    // Fall through to the stable domain error below.
  }
  throw new TypeError(
    "primaryCta.href must be a safe HTTPS, mail, phone, root-relative, or hash URL",
  );
}

function rejectUnknownKeys(
  input: Record<string, unknown>,
  allowed: ReadonlySet<string>,
  prefix = "",
): void {
  for (const key of Object.keys(input)) {
    if (!allowed.has(key)) {
      throw new TypeError(`Unknown field: ${prefix}${key}`);
    }
  }
}

export function defineSiteConfig(input: unknown): SiteConfig {
  assertRecord(input, "site config");
  rejectUnknownKeys(input, siteKeys);

  const canonicalUrl = requireString(input, "canonicalUrl");
  let canonical: URL;
  try {
    canonical = new URL(canonicalUrl);
  } catch {
    throw new TypeError("canonicalUrl must be an absolute HTTPS URL");
  }
  if (
    canonical.protocol !== "https:" ||
    canonical.username ||
    canonical.password ||
    canonical.search ||
    canonical.hash ||
    canonical.pathname !== "/"
  ) {
    throw new TypeError("canonicalUrl must be an absolute HTTPS URL");
  }

  const primaryCtaValue = input.primaryCta;
  assertRecord(primaryCtaValue, "primaryCta");
  rejectUnknownKeys(primaryCtaValue, ctaKeys, "primaryCta.");

  const primaryCta = Object.freeze({
    href: requireSafeHref(primaryCtaValue),
    label: requireString(primaryCtaValue, "label"),
  });

  return Object.freeze({
    canonicalUrl: canonical.href,
    description: requireString(input, "description"),
    id: requireSiteId(input),
    locale: requireLocale(input),
    primaryCta,
    title: requireString(input, "title"),
  });
}
