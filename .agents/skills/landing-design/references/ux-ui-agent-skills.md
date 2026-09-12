# UX/UI reference adapter

Use only the section relevant to the current task. This is a project-authored adaptation of selected
ideas, not an installation of the upstream kit or its slash commands. The guidance below works
offline; rereading the pinned upstream guidance is optional. This does not waive inspection of a
visual reference supplied or selected for the current design. If unavailable, record that limit;
do not claim to have inspected an external example.

## Design planning

Extend the existing `DESIGN.md`, not a second brief or token document:

- Turn the brief into an attention hierarchy: what the visitor should notice first, the supporting
  evidence, and the next action. Tie the composition to those roles and the real copy.
- Inspect section rhythm at page scale. Repetition that aids comparison is useful; repeated boxes
  with no content-based reason may flatten hierarchy. Change composition where it improves the
  reading path, not to meet an alternating-layout quota.
- For an explicitly different variant, compare with the previous design if available. Identify
  concrete changes in composition, typography, density and imagery as relevant, not just palette.
  Without the previous design, label the direction a proposal, not a verified difference.
- For a supplied or selected reference relevant to the brief, open the actual page, image or design
  region. Record its URL/path and one concrete applied decision: e.g. its comparison layout informs
  our service table's alignment and narrow-screen reading order. Separate a code/source read from
  viewing the rendered design. A catalog name is neither an inspected example nor permission to
  reuse its logo, imagery or fonts. No external catalog or minimum reference count is required.
- For an existing site, identify the observed problem before choosing a new treatment. Preserve
  approved identity, routes, copy, actions and interaction semantics. Polishing one component does
  not authorize a page-wide redesign.

Keep decisions in the existing composition/type/color sections. For implementation, follow
[landing-design's slice checkpoint](../SKILL.md#review-and-hand-off): inspected source or an explicitly
original choice → specific design decision → representative HTML/CSS → wide/narrow inspection →
full implementation. Keep the compact decision/evidence trail in `PROJECT.md`, not a second brief.
No separate score, mood document or full design-system migration is a prerequisite.

## Rendered review

Judge the served production build against the brief and `DESIGN.md`:

- Open the actual desktop/mobile images of the first screen and full page; screenshot filenames,
  DOM assertions and capture success alone are not visual review. Inspect hierarchy, section rhythm
  and consistency of type, surfaces and controls. Compare to the brief, `DESIGN.md` and the relevant
  inspected references. Distinguish documented choices from accidental inconsistencies;
  familiar patterns and restrained designs are not defects by themselves.
- Exercise the primary action and relevant states. An accessible name or selected appearance
  does not prove a control works. Use local tests or safe test destinations; do not submit real
  leads, make purchases or contact people merely to test a control.
- Stress the actual language, long headings and narrow widths. Check the components/states the
  site has, not hypothetical dialogs, tables or empty states. Review additional themes or motion
  modes when supported or required; lack of dark mode or decorative animation is not a defect.
  Existing reduced-motion and no-JavaScript checks remain necessary for implemented animation.
- For each actionable finding, record severity, location/state/viewport, observed evidence, user
  impact and a focused fix. A screenshot or measurement supports an observation; a source location
  can explain its cause. Separate taste recommendations from reproducible failures.
- Finish with unresolved findings and what could not be checked. No mandatory number of criticisms,
  synthetic overall score or repeated critique loop. A clean audit is valid. If rendering is blocked,
  report static findings only and mark visual/interactive outcomes unverified.

Root TDD and existing test commands remain authoritative. An audit-only request ends with findings;
apply fixes only when authorized, then rerun the affected checks.

## Deliberate differences from upstream

Do not reject pure black or white, equal cards, repeated layouts, system fonts, punctuation, a single
radius or no animation solely because the kit dislikes them. These are opinions, not universal
acceptance criteria. Respect the approved design and language. Use local
[design checks](design-checks.md) for accessibility targets, not a taste score as evidence of WCAG
conformance. No compulsory DTCG schema, palette, lucide dependency, framework adapter or light/dark
pair is introduced.

The kit's scripts and `npm run verify` are not installed here. Do not report its gate counts as our
results. In particular, `taste_audit.mjs` uses `file://` inputs, heuristics and an optional
skip-with-success path when Playwright is absent. It cannot substitute for tests against our served
React Router build. Later executable adoption needs a separate adaptation and failing/passing
fixtures here; do not fetch or execute a remote installer to follow this reference.

## Pinned sources and maintenance

Reviewed on 12 September 2026: `plugin87/ux-ui-agent-skills`, version `2.5.1` in
[package.json](https://github.com/plugin87/ux-ui-agent-skills/blob/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/package.json),
commit `2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd`.

| Source | Selected use |
| --- | --- |
| [Design taste](https://github.com/plugin87/ux-ui-agent-skills/blob/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/taste/design-taste.md) | Brief-driven hierarchy/composition; not aesthetic bans |
| [Design review](https://github.com/plugin87/ux-ui-agent-skills/blob/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/workflows/design-review.md) | Task walkthrough/findings; not weighted acceptance scores |
| [Design critic](https://github.com/plugin87/ux-ui-agent-skills/blob/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/.claude/agents/design-critic.md) | Rendered evidence beyond gates; not mandatory rejection/themes |
| [Redesign](https://github.com/plugin87/ux-ui-agent-skills/blob/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/.claude/skills/redesign/SKILL.md) | Diagnose before restyling; preserve working behavior |
| [Taste audit implementation](https://github.com/plugin87/ux-ui-agent-skills/blob/2ffb677aa02b225c8a3da1b7f31d9ebb7c38f1dd/scripts/taste_audit.mjs) | Inspected limitations; not installed or executed |

The package and README declare MIT; no standalone license/notice file was present in the inspected
tree. We link to the source and write scoped guidance rather than vendor its files. This is not
clearance for third-party brand assets. Before copying upstream code/assets later, check applicable
terms and preserve required notices.

Update for a demonstrated workflow gap: review the new commit and relevant source diff, reconcile
conflicts with project rules, rerun relevant brief evaluations, then change the pin in a reviewable
commit. Do not follow `main` automatically or run `npx ... init --force` in this project.
