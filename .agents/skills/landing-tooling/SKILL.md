---
name: landing-tooling
description: Select libraries, browser capabilities and asset sources for a landing page's agreed design and interactions. Use before adding or replacing tools, or when planning implementation resources; routine edits using established choices need no new selection exercise.
---

# Landing tooling

Read `AGENTS.md`, the current request, `PROJECT.md`, `SITE_SPEC.md`, `DESIGN.md`, `package.json`
and the relevant existing code. Preserve accepted content, behavior and visual direction. Select
only for the current increment; sufficient context does not require repeating intake or design.

## Decide from the required behavior

Translate the actual requirement into the smallest useful technical decision. Start with native
HTML, CSS and existing dependencies. A custom font does not require a font service; a hover effect
does not require a motion engine; a contact link does not require a form stack. Reuse an existing
suitable solution rather than adding a second system for the same job.

Do not turn minimal dependencies into a requirement to hand-build complex focus, touch, zoom or
positioning behavior. Choose a narrow maintained library when it meaningfully reduces implementation
and testing work for the requested interaction. Explain the benefit over the platform approach.
Select one recommendation; discuss another option only when its tradeoff changes the decision.
Keep the client's visual rules: a behavior primitive is not permission to adopt a default UI theme.

Read [conditional candidates](references/conditional-candidates.md) for the relevant category when
needed. This small list is a starting point, not a required stack or a list of installed packages.
A candidate outside it is allowed with the same checks. Do not research every category for every site.

For a product video, a distinctive animated explanation, or a supplied video-shotcraft example, read
[optional visual recipes](references/video-shotcraft.md). Select a concrete source and verify the
adapted result; a Remotion demo is not automatically a responsive, interactive web component.

## Check the chosen release, not its reputation

For a proposed new package, consult its official documentation, release history and published package
metadata. Record the check date and exact release, stable status, relevant peer/runtime requirements,
license and source links. Check deprecation and known advisories relevant to the intended use. A
`latest` tag alone does not prove stability or compatibility. Use a current compatible stable release;
recent useful improvements matter, but a recent release date alone does not justify replacement.
If working to a historical cutoff, distinguish releases available then from today's information.

Check the API actually needed, not just the package version: an otherwise stable package may expose
preview features. Match the repository's React, Vite and build runtime; preserve static prerendering.
For DOM-oriented packages, define post-hydration initialization and cleanup. Keep meaningful content
and the primary action usable before JavaScript; describe the enhancement's fallback. Include relevant
keyboard/focus and reduced-motion acceptance rather than claiming the library guarantees accessibility.

Separate evidence levels: author documentation, inspected metadata, and tested local integration.
If a source or version cannot be verified, mark the choice provisional and record the exact remaining
check. Continue useful planning; do not invent a pin, compatibility result or successful installation.

Estimate cost in terms of added runtime, CSS, assets, third-party requests and maintenance. Author
bundle figures are not this site's measurement. After integration compare the production output with
its baseline and `tooling/bundle-budget/budgets.json`, including deferred code. Do not silently raise
budgets or call a dynamic import zero cost. Keep unused components and extra frameworks out.

## Choose usable resources and agent capabilities

For needed photos, fonts, icons or media, distinguish files actually inspected from a client's
statement that they exist and from items still to be obtained. Record the source and permission or
license status near the asset decision. Preserve required notices when copying licensed material.
A visual reference does not grant permission to reuse its images, typeface or code. Do not remove
watermarks as a substitute for obtaining approved source assets, or present stock/generated images
as the client's work. Choose an honest temporary
approach for missing material; do not block unrelated implementation or change agreed content silently.

For fonts, check the actual required glyphs and weights and permitted web use when files are obtained.
Choose local files or an external service deliberately; keep a readable fallback. For photos, plan
appropriate dimensions, responsive variants and loading priority; do not ship every original at full
size. Apply the actual asset budget when preparing files, not a guessed size in a planning document.

Repository skills guide the work; tools and plugins provide capabilities; npm packages affect the
site/build. These are different decisions. Use an available capability for a concrete missing task,
not a plugin count. Inspect a third-party skill and its license before adapting it; retain its source.
Do not run a remote installer merely to read instructions or assume a skill/plugin is connected because
its URL is known. Record an access limitation and continue with available tools where possible.

## Save a small implementation handoff

Keep technical choices in a short section of `PROJECT.md`: requirement → choice and reason → evidence
and remaining checks. Resource decisions belong with their existing context in `DESIGN.md`; preserve
agreed copy in `SITE_SPEC.md`. No separate catalog, manifest, scoring spreadsheet or ADR is required
for an ordinary choice. An outcome of no new dependencies is complete and useful.

For selection-only work, stop with these decisions and the next implementation step. Do not install,
build or change application code to substantiate a document-only task. When implementation is already
requested, continue within that authorization: follow root TDD, pin the checked version exactly,
review the lockfile diff, run the required checks and inspect the rendered interaction. Use
`bun add --exact package@version` with the verified package and version, not an unexamined `latest`.
Do not report selection or source review as a working integration.
