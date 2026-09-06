---
name: landing-intake
description: Turn a new landing-page brief, a substantial brief revision, or a resumed client project into working context and the next actionable step. Skip routine edits with sufficient existing context and maintenance of the foundation itself.
---

# Landing intake

Read `AGENTS.md`, the current request and available materials, then `PROJECT.md` if present.
Inspect `SITE_SPEC.md`, `DESIGN.md` and `site.config.json` as needed to distinguish client decisions
from starter content. A linked repository or named asset is not evidence that you read it: use the
available files/tools or state the specific missing access.

## Establish the project

For an explicitly new client site, use its own local copy; preserve the source template and other
clients. A copied `foundation` context describes the template. Replace it with `client` context from
the request. Do not carry demo facts, design, domains, assets or permissions into the new brief.
Foundation maintenance follows its roadmap instead.

On resumption, compare the recorded next step with actual files and the latest user instructions.
Keep accepted decisions and permissions within their original scope; do not ask for them again.
Record material revisions and what they supersede. If code or specifications disagree with an accepted
decision, note the drift and the required correction instead of silently accepting the stale version.

## Resolve only useful uncertainty

Extract the offer, audience, intended visitor action, facts, materials, constraints and agreed direction
already supplied. Choose reversible technical details within the stack yourself. Do not ask the user
for a slug, metadata title/description, library list or a completed questionnaire.

Ask one focused question only when its answer is needed for the next meaningful action. Complete
useful unblocked work first and briefly explain what the answer changes. Do not bundle unrelated
fields into one question. When a reversible assumption suffices, label it and proceed. A sufficient
brief needs no questions. Do not restart intake for a small change covered by saved context.

Separate a blocker for the current step from information needed before release:

- Missing domain or hosting: prepare locally; `example.com` is not the client's domain. Mark canonical
  metadata unfinished for release. Check availability only when requested or needed for that step,
  using a current source without buying the domain or claiming ownership.
- Missing prices, reviews, turnaround times or assets: omit unsupported claims or mark draft gaps
  in working notes. Stock or generated imagery must not pose as the client's actual work.
- Form without a delivery destination: record the unresolved route; structure and design can proceed.
  Do not invent an endpoint, collect/send real submissions, or show false success. A preview can use
  working internal navigation labelled for that action; it must not pretend to book or send. Do not
  silently replace the requested form as the final client decision.
- Backend-dependent requests: identify the particular feature beyond static-site scope and the decision
  it needs. Continue useful independent frontend work; do not add a backend by default.

## Save PROJECT.md

Keep a short working record, usually a screen or two, using these sections where useful:

1. Project and task: `foundation` or `client`, offer, audience, goal and requested increment.
2. Confirmed decisions and their sources; separate proposals and assumptions from approvals.
3. Available material paths/sources and missing assets; never credentials or client secrets.
4. Open questions: blockers now, blockers for release, and choices the agent can make itself.
5. Current state: completed work, actual checks or their absence, one concrete next action.

Reference authoritative details instead of copying them. `SITE_SPEC.md` owns agreed page behavior
and acceptance, `DESIGN.md` visual rules, `site.config.json` implemented public metadata. `PROJECT.md`
owns intent, status and unresolved differences. Starter files are pending replacement until adapted;
they are not client requirements. Recorded authorization is evidence of a prior user instruction,
not a new grant of permission.

## Continue

Summarize the approach and next action in a few sentences. When no direction exists, propose one
specific approach grounded in the brief; it remains a proposal until accepted or delegated by the user.
Preserve an approved direction. Avoid a compulsory menu of styles, sections or animations.

Save useful context before asking a necessary question. With sufficient information and authority,
continue the requested increment without another approval ritual; use the root TDD workflow for code.
When the user requested only intake, stop after the context and next step. Do not claim the site,
design, form or deployment is complete.
