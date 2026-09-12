# Video-shotcraft: optional visual recipes

Use this reference when a brief calls for a product demo video, a distinctive animated explanation,
or a supplied video-shotcraft example. It is a source to inspect, not an installed tool or a default
dependency. Ordinary page layout and interaction feedback can use the existing HTML/CSS workflow.

## Select an outcome

| Need | Useful source | Landing implementation |
| --- | --- | --- |
| Validate a visual direction cheaply | HTML/CSS styleframe stage in the pipeline | Render a representative slice with actual copy before expanding the new design |
| Explain a product with motion | A specific recipe, variant, demo and its preview | Keep the visual idea; implement responsive browser behavior with the existing stack |
| Show a product in a short video | Remotion production workflow | Render a separate media asset; give the page an appropriate poster and accessible equivalent |

## Connect the source to the result

1. Inspect the exact selected card, implementation and visible preview. A name or README description
   is insufficient evidence of its appearance. Record source commit/path and what was actually viewed.
2. In `DESIGN.md`, record the useful decision: focal point, composition, sequence or motion, where it
   belongs, and how real content and narrow screens change it. Keep the site's identity and actions.
3. Separate video staging from browser interaction. The sample before/after slider below is animated
   by a frame clock in a 1920 × 1080 scene; it does not provide a working draggable web control.
   Implement semantics, keyboard/touch behavior, reduced motion and no-JavaScript content as needed.
4. Compare the rendered result with the selected qualities of the viewed source. Include the source,
   implementation location, desktop/mobile evidence and remaining differences in the existing handoff.

If a source cannot be viewed, label its use provisional and use an original local visual proposal
for the current checkpoint. Do not claim a faithful adaptation. If video production is selected,
check the actual Remotion release/license, rendering needs and media budget under `landing-tooling`.
Do not add Remotion, the workbench, sound design or a fixed video template to every site.

## Pinned basis

Inspected 12 September 2026 at commit `5e71af35a2daee492dd3ea93e5e8903f32dcd13c`:

- [Skill and supported outcomes](https://github.com/Vincentwei1021/video-shotcraft/blob/5e71af35a2daee492dd3ea93e5e8903f32dcd13c/SKILL.md).
- [Pipeline: styleframes and card-to-demo mapping](https://github.com/Vincentwei1021/video-shotcraft/blob/5e71af35a2daee492dd3ea93e5e8903f32dcd13c/references/pipeline.md).
- [Independent evidence-based review](https://github.com/Vincentwei1021/video-shotcraft/blob/5e71af35a2daee492dd3ea93e5e8903f32dcd13c/references/final-review.md).
- [Before/after video implementation](https://github.com/Vincentwei1021/video-shotcraft/blob/5e71af35a2daee492dd3ea93e5e8903f32dcd13c/demos/data/before-after-slider-scrub/BeforeAfterSliderScrub.tsx).
- [Audio attribution with unresolved early SFX sources](https://github.com/Vincentwei1021/video-shotcraft/blob/5e71af35a2daee492dd3ea93e5e8903f32dcd13c/assets/audio/ATTRIBUTION.md).

This is original project guidance with source links; no upstream code, media or installer is vendored.
Evaluate a source update against an actual requirement before changing the pin.
