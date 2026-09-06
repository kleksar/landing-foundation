# Conditional candidates

Checked on 2026-09-06. Read only the rows relevant to the task. These are source-reviewed candidates,
not installed dependencies, benchmark winners or integrations verified in this starter. Recheck the
chosen release and API before adding it; the dated snapshot below is not an instruction to freeze
future client sites on these versions.

| Required outcome | Starting point | When an addition earns its place |
| --- | --- | --- |
| Layout, buttons, links, simple feedback | Existing CSS/Tailwind and semantic HTML | No component library for appearance alone; retain the site's own DESIGN rules |
| Simple disclosure or modal | Native [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) or [dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) | Check the particular feature's browser support; `open` alone is not modal behavior |
| Composed popup/selection behavior | [Base UI](https://base-ui.com/react/overview/quick-start) | Unstyled primitives when composition/focus/positioning warrants them; inspect the specific component's portal and prerender behavior |
| State/layout transitions, springs or gestures | CSS first; [Motion](https://motion.dev/docs/react-installation) for a concrete need | Use only relevant features; [initial state renders into HTML](https://motion.dev/docs/react-motion-component), so entrance opacity must not hide essential content before JS |
| Large-image viewing with touch zoom and keyboard controls | [PhotoSwipe React example](https://photoswipe.com/react-image-gallery/) | Enhances an ordinary linked image grid; no mandatory React wrapper. Initialize after hydration and destroy on cleanup |
| A few interface icons | Text or suitable existing SVG; [Lucide React](https://lucide.dev/guide/react/getting-started) when its style fits | Import selected icons; [DynamicIcon](https://lucide.dev/guide/react/advanced/dynamic-icon-component) adds unnecessary complexity for fixed content |

For PhotoSwipe, [setup](https://photoswipe.com/getting-started/) needs real image dimensions and
working image links; use actual available files. [Keyboard and focus options](https://photoswipe.com/options/)
are documented, but test focus return, series boundaries, gestures and reduced motion in the site.
Its v6 work is not the stable v5 release. Missing originals do not become available through a viewer.

## Release snapshot, with the original cutoff preserved

Published package metadata was read directly from npm (`time`, `dist-tags`, release metadata).
The cutoff column means available by the end of 2026-09-03 UTC. Later releases are explicitly separate.

| Package / primary metadata | Stable at cutoff | Latest observed on 2026-09-06 | Declared license / React compatibility |
| --- | --- | --- | --- |
| [@base-ui/react](https://registry.npmjs.org/@base-ui%2freact) | 1.7.0, 2026-08-04 | 1.8.0, 2026-09-04 | MIT; React and React DOM 17/18/19 major ranges |
| [motion](https://registry.npmjs.org/motion) | 13.2.0, 2026-09-02 | 13.2.0 | MIT; peers 18/19, installation docs require React 18.2+ |
| [lucide-react](https://registry.npmjs.org/lucide-react) | 1.40.0, 2026-09-03 | 1.41.0, 2026-09-04 | ISC; React 16.5.1+/17/18/19 ranges; preserve inherited MIT notices too |
| [photoswipe](https://registry.npmjs.org/photoswipe) | 5.4.4, 2024-05-24 | 5.4.4 | MIT; no React peer requirement |

Compare official [Base UI releases](https://base-ui.com/react/overview/releases) and
[PhotoSwipe v5.4.4](https://github.com/dimsemenov/PhotoSwipe/releases/tag/v5.4.4) with the actual
package selected. A metadata range containing this starter's React version does not prove a
successful build or interaction. No advisory audit or bundle measurement for these candidates was
performed for this reference. Motion's paid products have separate terms; the base package's MIT
license does not automatically cover them. [Lucide licensing](https://lucide.dev/license) includes
notices inherited from Feather.

## Assets and loading cost

For a font chosen in DESIGN, start from the author or [Google Fonts' source repository](https://github.com/google/fonts).
The latter provides per-family files and licenses; inspect the selected family, glyphs, weights and
license rather than downloading the whole collection. Local font files can avoid a new runtime
service, but their loading, fallbacks and rendering still need checking. Client and generated media
need honest provenance; this list does not prescribe a universal stock-photo or font aesthetic.

[Motion's bundle guidance](https://motion.dev/docs/react-reduce-bundle-size) distinguishes initial
code from loaded features. Treat its figures as author measurements, not the site's emitted bytes.
Measure actual JS, CSS and image output against the repository budget during integration. Include
all deferred chunks and consider font/video bytes and external requests as well; the existing bundle
checker is not a complete network-performance audit.

[Bun's exact option](https://bun.com/docs/pm/cli/add#exact) records a specific version. After the
selection-only step, an authorized implementation pins that checked version and commits its lockfile.
