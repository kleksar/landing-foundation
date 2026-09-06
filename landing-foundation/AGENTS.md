# Landing foundation

This repository is being developed into a reusable template for independently designed, statically
prerendered landing pages and small websites. The target is one site per repository.

## Select the task

Read `PROJECT.md` when present and classify the current user request. For a new client site, a
substantial brief revision or a resumed client project, read `.agents/skills/landing-intake/SKILL.md`.
An explicit new-client request takes precedence over copied foundation context: use an independent
client copy and replace its `PROJECT.md`; preserve the source template. Do not infer a client from
demo copy or a chat title. Routine edits with sufficient client context go directly to the relevant
specification and TDD workflow.

For page structure, substantive copywriting or content revision, read
`.agents/skills/landing-content/SKILL.md`. With sufficient saved context, use it directly; do not
repeat intake. A narrow wording edit does not require replanning the page.

For visual direction or substantial design planning, read `.agents/skills/landing-design/SKILL.md`.
Preserve accepted decisions; a local visual fix does not require a new concept. Use `visual-qa`
for reviewing rendered output, not as a prerequisite for writing a design specification.

For choosing or replacing libraries and implementation resources, read
`.agents/skills/landing-tooling/SKILL.md`. Apply it to actual requirements; routine work using
established choices does not need another tools survey.

For client work, the current request, `PROJECT.md`, `SITE_SPEC.md` and `DESIGN.md` guide the increment.
The foundation roadmap is historical background for that client; do not continue template development
instead of the requested site. The entry procedure is described in `docs/workflow.md`.

## Foundation stage

For foundation maintenance, read `docs/roadmap.md`. It records scope, stage status, acceptance and next
increment. This is a standalone starter under development, not a released template. Do not describe
planned functionality as implemented.

Complete only the increment selected for the current session. Resolve its review findings and finish
with evidence and a handoff; do not automatically implement the remaining roadmap in the same turn.
Split a stage further when it contains independently reviewable changes.

Use subagents for bounded analysis, implementation, or critique where they add value. Keep ownership
of writes explicit. Each stage receives an independent read-only review; address concrete findings
before closing it. Record unresolved limitations instead of hiding them behind another review loop.

## Sources of truth

- Foundation scope and stage status: `docs/roadmap.md`.
- Client intent, decisions, open questions and next action: `PROJECT.md`.
- Current architecture and its historical decisions: `docs/architecture.md`, `docs/adr/`.
- Test strategy: `docs/testing.md`.
- Site behavior and copy: `SITE_SPEC.md`.
- Site visual rules: `DESIGN.md`.
- Public metadata and crawler input: `site.config.json`.
- Rendering mode: `rendering.config.json`.
- Dependency versions: `package.json` and `bun.lock`.

Read the nearest nested `AGENTS.md` before editing. Update affected instructions and tests in the
increment that changes their paths or behavior. Do not duplicate rules across instruction files.

## TDD workflow

For every behavior change:

1. Add the smallest test that expresses the requested behavior.
2. Run it and confirm it fails for the expected reason.
3. Add the minimum production change.
4. Run the targeted test until green, then refactor without changing behavior.
5. Run `bun run verify` before handoff.

Never weaken assertions or update snapshots only to obtain green. Remove obsolete tests only with
the feature or architecture they protect, and explain which behavior remains covered. Intake-only
or documentation-only changes need no new code tests or application/browser run: check the affected
context, local links and `git diff --check`. Evaluate changed agent instructions on relevant briefs.
If a required check cannot run, report the command, blocker, and unverified result; never call it
a passing check.

## Boundaries

- Scope is frontend landing pages and small static websites. Lead sourcing, bots, client messaging,
  job queues, backend services, and a general-purpose site builder are outside this repository.
- Preserve independent client designs. Shared code must not impose a section order, palette, font,
  copy formula, or animation style.
- Each repository contains one site. Keep configuration helpers in `lib/site-contract` and build/test
  helpers in `tooling`; do not introduce a multi-site registry or generator.
- Preserve `ssr: false` and complete prerendering. Use browser APIs only after hydration, never
  during module evaluation or the initial render.
- Use stable dependencies with exact pins. Alpha, beta, RC, canary, and experimental APIs are
  excluded unless an ADR explicitly approves them.
- Prefer platform APIs and existing dependencies. A new dependency needs a concrete use case and tests.
- Add libraries and skill references when a task needs them; do not load or install a whole catalog.
- Keep client facts, assets, and preferences out of shared examples unless explicitly cleared for reuse.
- Do not invent business facts, testimonials, prices, or successful form delivery.
- Never place secrets in source, loaders, generated HTML, test fixtures, or agent instructions.
- Hosting instructions and rehearsal belong to their planned stage. Access to code does not itself
  authorize purchases, account changes, or publication.

## Definition of done

The selected increment meets its acceptance criteria, independent review findings are resolved or
explicitly recorded, and the next step is clear. For behavior changes, the intended red test was
observed and the affected checks pass. Before a site is released, all routes prerender; HTML is usable
without JavaScript; browser, accessibility, responsive, and bundle checks pass. Dependency and lockfile
changes are explained. A blocked verification is a limitation, not evidence of release readiness.
Update `PROJECT.md` with the actual outcome and next action before handing work to another session.
