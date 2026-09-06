# ADR-0002: One site per repository

- Status: accepted
- Date: 2026-09-06
- Supersedes: the workspace structure and dependency catalog in [ADR-0001](0001-foundation-stack.md).

## Context

Client landing pages are developed in separate chats and need independent designs and releases.
The monorepo prototype introduces a generator, workspace discovery, cross-app boundaries, and
identity uniqueness that do not help a repository containing one client site.

## Decision

Move the starter to the repository root. Keep its page code in `app/`, configuration helpers in
`lib/site-contract/`, and build/test helpers in `tooling/`. Use one package manifest with exact
versions, one lockfile, one TypeScript configuration, and direct root commands.

Remove `create:landing`, its skill, internal workspace package manifests, and multi-site-only tests.
Preserve individual-site configuration validation, prerendering, crawler generation, bundle budgets,
static 404 behavior, and browser checks. React Router, Vite, React, Bun, Node, dependency versions,
and the current browser mode are not changed as part of this migration.

## Consequences

A new client site starts from an independent copy of the foundation. No common component library
prescribes its composition or visual style. Improvements to the foundation do not propagate into
client repositories automatically.

The lockfile is regenerated for the single package; obsolete workspace declarations and dependencies
used only by removed tooling disappear. Existing package-manager settings remain unless a concrete
incompatibility requires a separate change.

TDD covers the standalone behavior before the move. Generator and workspace-only tests are removed
with their corresponding implementation; site behavior checks remain. Verification results are
recorded in the [roadmap](../roadmap.md), not inferred from this decision.

Client intake, richer skills, browser compatibility expansion, hosting, and release automation remain
separate stages. This migration establishes the source layout without implementing those workflows.
