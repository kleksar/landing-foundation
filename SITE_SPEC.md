# Starter site specification

## Goal

Prove that the shared landing foundation produces accessible, prerendered HTML and remains usable
without client JavaScript.

## Non-goals

- Representing a real brand or reusable visual identity.
- Forms, persistence, authentication, analytics, or external services.
- Runtime SSR or server actions.

## Audience and action

The audience is a developer evaluating the foundation. The primary action scrolls to the contract
summary on the same page.

## Routes

- `/` — the only public route.

## SEO and accessibility

Metadata and generated crawler files derive from `site.config.json`; `site.config.ts` only validates
and exports it. The page must have one `main`, one `h1`, a skip link, visible keyboard focus, useful
landmarks, and zero automatically detectable WCAG 2.2 A/AA violations.

## Acceptance scenarios

- Production output contains the heading, CTA, description, canonical link, `robots.txt`, and
  `sitemap.xml` before JavaScript runs.
- The CTA reaches `#foundation` with and without JavaScript.
- There are no browser console, page, request, or hydration errors.
- Mobile and desktop layouts have no horizontal overflow.
- Emitted assets stay within `tooling/bundle-budget/budgets.json`.
