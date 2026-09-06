---
name: tdd-change
description: Implement behavioral changes in this landing repository through an observable red-green-refactor cycle and verified production output.
---

# Tdd Change

Read the nearest `AGENTS.md`, root `SITE_SPEC.md`, and relevant existing tests. Define one
observable acceptance behavior and add the smallest test at the lowest useful layer.

1. Run the targeted test and confirm the expected failure. A syntax, fixture, or environment failure is
   not valid red evidence.
2. Make the minimum production change that satisfies the behavior.
3. Run the targeted test until green, then refactor without broadening scope.
4. Run affected repository, build, prerender, browser, accessibility, responsive, and budget checks.
5. Finish with `bun run verify`.

Do not delete or weaken assertions, add arbitrary waits, globally disable accessibility rules, or
update snapshots only to obtain green. For a purely visual request, express interaction and
accessibility acceptance first; add a golden screenshot only after the intended design is approved.
