---
name: visual-qa
description: Inspect rendered landing pages and interactions at first acceptance of a new site or substantial visual change, and for responsive, interaction or design review. Keep narrow regressions scoped.
---

# Visual Qa

Read the current brief in `PROJECT.md`, root `SITE_SPEC.md` and `DESIGN.md`, build production output,
and test the served build rather than source assumptions. Use deterministic local assets, UTC, a
fixed locale, reduced motion, and fixed mobile and desktop viewports.

Check the first viewport and full page for clipping, overlap, unintended overflow, broken typography,
missing assets, weak focus, and responsive hierarchy. Exercise primary interactions with semantic
selectors. Capture console errors, page errors, failed first-party requests, accessibility results, and
screenshots as evidence. Open the actual first-screen and full-page images at both widths; successful
capture and DOM assertions do not establish that the layout was inspected.

For first acceptance of a new site, a substantial visual change, or a design critique, use the
[UX/UI reference adapter](../landing-design/references/ux-ui-agent-skills.md#rendered-review).
For a narrow regression check, review only the affected behavior and layout. Passing technical
checks does not establish visual quality; a source-only review is not rendered verification.
Give the independent reviewer the brief, `DESIGN.md`, relevant reference evidence and the actual
rendered images; a diff alone cannot support visual acceptance. Record inspected images, viewport
sizes, interaction/check results and unresolved findings in `PROJECT.md` using the root evidence
rule. If the build or image inspection is blocked, report that limit and leave visual acceptance open.

Never accept a screenshot by blindly updating the baseline. Explain whether the product or the test is
wrong, fix the responsible layer, and rerun the affected check. Keep a visual-only task scoped to the
site's design and interactions; do not change unrelated configuration or tooling.
