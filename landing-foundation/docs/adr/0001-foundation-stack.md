# ADR-0001: Landing foundation stack

- Status: superseded in part by [ADR-0002](0002-standalone-site.md) for repository structure and
  dependency declarations; stack and runtime decisions remain in effect.
- Date: 2026-09-03

## Decision

Use Bun 1.4.0 workspaces, React 19.2.8, React Router 8.3.1 Framework Mode, Vite 8.2.2,
TypeScript 7.0.2, Tailwind CSS 4.3.3, Biome 2.5.12, Vitest 4.1.11, and Playwright 1.62.1. Every public
route is prerendered with `ssr: false`.

## Context

The repository will host 10–20 landing pages authored primarily by coding agents. A single TSX language
surface, version-matched framework documentation, exact dependency catalog, and executable contracts
reduce ambiguity and drift.

Astro 7 has a stronger zero-JavaScript default, but its complete `.astro` checker currently requires
TypeScript 6. Reconsider Astro when the embedded-language toolchain supports TypeScript 7 and only if a
representative React Router landing cannot meet the agreed client-JavaScript and Core Web Vitals budget.

## Consequences

React hydrates the page, so JavaScript budgets are blocking. Node remains a compatibility runtime for
the React Router CLI; production output remains static. Vue, RSC, MDX, prerelease dependencies, and
experimental Vite flags are outside the baseline.

Dependencies use exact catalog pins and a frozen lockfile with integrity hashes. New resolution has a
72-hour minimum release age. The initial lock has narrowly documented bootstrap exceptions for
same-day Biome binaries and React DOM types; remove those exceptions after the waiting window during
the next dependency maintenance pass.

Bun 1.4 isolated installs did not reliably expose Biome's nested native executable in clean
cross-platform installs. The root optional binary declarations are a temporary package-manager
workaround; they are tooling only and are never part of a deployed static site. Remove them when a
clean isolated-install regression test passes without the workaround.
