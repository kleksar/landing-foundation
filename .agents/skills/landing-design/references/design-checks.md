# Design checks and rationale

Sources checked on 6 September 2026. Use this reference when planning accessibility targets or
maintaining the skill. These criteria constrain implementation; reading them is not evidence that
a page passes them. Exact colors, type scales and motion timings remain project decisions.

## Accessibility targets

The repository targets [WCAG 2.2 A/AA](https://www.w3.org/TR/WCAG22/). Relevant design constraints:

- Text contrast: 4.5:1 for ordinary text, 3:1 for large text as defined by WCAG, with its stated
  exceptions. Required component/state indicators and meaningful graphics generally need 3:1
  against adjacent colors under 1.4.11. Check actual color pairs and backgrounds, not hex values
  in isolation; images, transparency, hover and focus may change the result.
- Keep focus visible and not entirely obscured by authored content. Convey meaning through more
  than color. A decorative border and a boundary needed to identify a control are different cases.
- [Target size, 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html):
  24 by 24 CSS pixels or an applicable exception, including sufficient spacing. Larger targets can
  be a sensible project choice; do not describe 44px as the AA minimum.
- [Reflow, 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow): plan for 320 CSS px width
  for vertical content, retaining information/function without two-dimensional page scrolling.
  Some intrinsically two-dimensional content has exceptions. Also preserve text resizing to 200%.

Do not use these points as a complete accessibility audit or infer compliance from document review.
Implementation needs keyboard, zoom, browser and rendered-state checks. The W3C Understanding
pages explain the normative criteria; they are informative rather than the standard itself.

## Motion and typography

- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
  explains the user's request to reduce nonessential motion. Design a useful reduced-motion state;
  do not remove information or feedback with an indiscriminate animation reset. Keeping initial
  content usable without JavaScript is also an existing repository constraint.
- [Carbon: Typography style strategies](https://carbondesignsystem.com/elements/typography/style-strategies/)
  ties type hierarchy and density to productive or expressive tasks and discusses combining them
  when the user's task changes. We adopt the task-based reasoning, not IBM's fonts, scales or look.
  This source does not prove that a particular visual style suits our clients or improves conversion.

## Evidence to retain

For a specification, record chosen values, their status and any calculations actually performed.
For an implemented proposal, inspect real copy, loaded fonts/assets, narrow/wide layouts and
interaction states. Keep only evidence needed to assess the current increment. A library choice,
an adjective such as premium or an aesthetic score does not substitute for seeing the result.
