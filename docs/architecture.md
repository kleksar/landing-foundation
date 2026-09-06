# Architecture

One repository contains one independently designed site. There is one `package.json`, one
`bun.lock`, and one root TypeScript configuration. The migration decision is recorded in
[ADR-0002](adr/0002-standalone-site.md); stage acceptance is tracked in the [roadmap](roadmap.md).

## Structure

- `app/`: React Router routes, components, styles, and document rendering.
- `public/`: static assets copied into the production output.
- `lib/site-contract/`: configuration validation, metadata, and crawler generation.
- `tooling/bundle-budget/`: bundle graph calculations and budget configuration.
- `tooling/static-preview/`: the local static server and request resolution.
- `tests/`: repository contracts, production build contracts, and browser tests.

Client intent, decisions, missing inputs and the next action live in `PROJECT.md`; entry and resumption
are described in [workflow](workflow.md). Site behavior lives in root `SITE_SPEC.md`, visual direction
in `DESIGN.md`, public metadata in `site.config.json`, and rendering policy in `rendering.config.json`.
Small TypeScript wrappers
validate JSON and adapt it to framework APIs. The Vite crawler plugin derives `robots.txt` and
`sitemap.xml` from the canonical configuration; generated files are not edited by hand.

There are no internal workspace packages, sibling applications, workspace discovery, or site generator.
Local helpers use relative imports. The starter page is replaceable client content, not a shared
section library or a prescribed design. Code reuse must not impose a palette, font, copy formula,
section order, or animation style.

## Runtime and output

Bun installs dependencies and runs tasks. React Router Framework Mode uses Vite, `ssr: false`, and
complete prerendering. Its CLI runs under Node; `[run] bun = false` preserves that runtime boundary.
`bun run dev`, `bun run build`, and `bun run preview` run from the repository root.

Static hosting receives only `build/client`. `build/server` is a build-time artifact; production
requires no Node or Bun process. Local E2E serves the production output with exact-file semantics,
so an unknown route is a real 404 instead of an SPA fallback. Hosting recipes and rehearsal belong
to stage 5.

Canonical URLs are HTTPS origin roots such as `https://example.com/`. Subpath deployment remains
unsupported until Vite asset bases, router basenames, crawler URLs, and hosting behavior are changed
and tested together. Preserving this restriction is part of the migration.

Client repositories evolve independently. Improvements to the foundation do not automatically
modify delivered sites. Intake records project context; the content workflow prepares the page's
structure, copy and behavior in `SITE_SPEC.md`. The design workflow records project-specific visual
rules in `DESIGN.md`; a written specification does not replace rendered review. The tooling workflow
records justified technical choices in `PROJECT.md` and asset decisions in `DESIGN.md`. Its conditional
candidates are not installed dependencies or verified integrations. Hosting remains a later stage.
