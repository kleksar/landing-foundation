---
name: landing-design
description: Define or implement a new landing page's visual direction, including from an existing DESIGN.md, or substantially redesign a site. Keep local visual fixes scoped; use visual-qa for rendered acceptance.
---

# Landing design

Read `AGENTS.md`, the current request, `PROJECT.md`, `SITE_SPEC.md` and existing `DESIGN.md`.
Inspect supplied or selected visual references and assets relevant to the design decision. If a
reference cannot be opened, record that limitation and use an available source or an explicitly
original treatment; do not claim to have viewed it. Use intake only for a new or materially changed
brief; use content work only if required content is missing. An existing
client context does not need another questionnaire. Work on the requested design increment.

`DESIGN.md` owns visual decisions; keep copy and action behavior in `SITE_SPEC.md`. Adapt layout
to the actual text, including long headings and the requested language. Propose a necessary content
change explicitly instead of silently shortening facts, deleting conditions or changing the CTA.
The starter's appearance is replaceable demo content, not a brand to carry into each client copy.

## Choose a direction with a reason

Preserve agreed identity and direction. If none exists, select one coherent direction tied to the
visitor's task, content density and available material. Explain the key visual choices concretely:
what receives attention, how the eye moves and why the treatment suits this task. Adjectives such
as premium or friendly do not replace layout, type and component decisions.

Distinguish user-approved decisions, choices made under delegated authority, and proposals awaiting
feedback. Use existing delegation; do not request approval for every font size or force a menu of
concepts. Do not rebadge a new proposal as user-approved. If a real preference blocks the next step,
follow the intake question rule; otherwise complete useful work within the granted scope.

No universal palette, typeface, rounded-card layout, section rhythm or animation style is required.
Familiar patterns can be useful; choose them for this page. Meaningful variation comes from hierarchy,
composition, information density, imagery and interaction emphasis, not a color swap or novelty alone.

For a new site implementation, a new direction, a deliberately different variant, or a substantive
redesign, use the
[UX/UI reference adapter](references/ux-ui-agent-skills.md#design-planning). It connects selected
upstream guidance to this workflow without installing another instruction stack. Skip it for a
local visual fix. With a complete `DESIGN.md`, apply its decisions and the implementation/review
steps below without reopening agreed choices or writing another specification.

## Make DESIGN.md usable for implementation

Record only rules needed by the actual page, using compact prose or tables. Cover:

- **Composition:** map the agreed sections to a specific layout. Give content widths, columns,
  alignment, spacing rhythm and priority of the first screen. Identify the defining visual treatment.
  Explain narrow-screen reading order and how grids, tables and actions reflow; do not just say
  responsive. Base breakpoint choices on content fit, and avoid fixed heights that clip real text.
- **Typography:** identify heading, body and UI roles; select font stacks, weights, sizes or fluid
  ranges, line height and text measure. State whether font files are available, system fallbacks are
  used or a family is only a candidate. Check needed glyphs, weights and licensing before delivery;
  do not claim downloaded fonts or exact cross-platform appearance without checking them.
- **Color and geometry:** give concrete values for the roles used: surfaces, text, actions, boundaries
  and focus. Specify relevant foreground/background pairs, spacing, radii and borders so components
  belong together. Use local semantic CSS values when implemented; no new token format is required.
  Check color pairs before claiming verified contrast; a palette calculation is not a full WCAG audit.
- **Components:** define the appearance and keyboard focus of the controls the page actually uses,
  including relevant hover, active and unavailable states. For requested forms, cover labels, help,
  validation and delivery states consistent with the specification. Do not create a form, spinner,
  success state or component catalog just to fill a style guide. Keep native interaction semantics;
  hover alone must not carry essential information or access to an action.
- **Assets:** state available sources, intended role, crop/aspect ratio and narrow-screen treatment
  for images that are needed. Separate available assets from planned ones. Do not present generated
  or stock objects as the client's work. With missing photos, choose an honest text/graphic treatment
  or record the dependency; do not block unrelated design work or insert mandatory gallery slots.
- **Motion:** define its purpose and the trigger, property, duration/easing and reduced-motion behavior
  for effects actually chosen. No animation is a valid decision. Preserve essential content before
  hydration, without JavaScript and under reduced motion; entrance effects must not gate reading.
  Do not install an animation library for a design document. Later implementation starts with the
  existing stack and platform capabilities, adding a dependency only for an actual requirement.

Read [design checks](references/design-checks.md) when specifying accessibility targets or reviewing
these decisions. Record concrete constraints and unverified items, not a declaration of compliance.

## Review and hand off

Check internal consistency: text on each surface and state, usable focus, type hierarchy, a plausible
narrow-screen arrangement, available assets and action semantics. Compare with the brief and agreed
content. Correct an observed mismatch; do not repeat speculative critique until someone assigns a
high score. Visual taste is not measured by a valid Markdown file or a contrast ratio.

A design-only task ends with the specification and a brief `PROJECT.md` update preserving decisions,
limitations and the next useful action. Do not claim that layout, fonts, animations or responsive
behavior have been rendered or tested if they have only been described.

When implementation or a rendered proposal is authorized, build a representative HTML/CSS slice
before extending a new visual direction across the page. Use the actual content, a real action and
the defining component so it tests hierarchy and content fit, not just colors. Inspect the actual
wide and narrow images, correct observed mismatches, then extend the design. This is an implementation
checkpoint, not another user approval. If rendering is blocked, record the limit; the direction
remains visually unverified. A PDF, Figma file or separate prototype project is not required.

Use the root TDD workflow for behavior changes and
[visual-qa](../visual-qa/SKILL.md) for first rendered acceptance of the completed site or redesign,
including when implementation started from an existing `DESIGN.md`. Record evidence in `PROJECT.md`
as required by `AGENTS.md`. Preparing instructions or a design-only specification does not itself
authorize implementation or publication, and does not require a browser.
