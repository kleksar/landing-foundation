---
name: visual-qa
description: Review a landing page visually and behaviorally across fixed viewports when responsive, interaction, or design verification is requested.
---

# Visual Qa

Read root `SITE_SPEC.md` and `DESIGN.md`, build production output, and test the served build rather
than source assumptions. Use deterministic local assets, UTC, a fixed locale, reduced motion, and fixed
mobile and desktop viewports.

Check the first viewport and full page for clipping, overlap, unintended overflow, broken typography,
missing assets, weak focus, and responsive hierarchy. Exercise primary interactions with semantic
selectors. Capture console errors, page errors, failed first-party requests, accessibility results, and
screenshots as evidence.

Never accept a screenshot by blindly updating the baseline. Explain whether the product or the test is
wrong, fix the responsible layer, and rerun the affected check. Keep a visual-only task scoped to the
site's design and interactions; do not change unrelated configuration or tooling.
