# Testing strategy

Tests protect the single site's observable behavior and its static production artifact. Stage results
are recorded in the [roadmap](roadmap.md). The previous monorepo's verification remains historical
in [baseline](baseline.md).

## TDD

1. Add the smallest test for one observable behavior and run it alone.
2. Confirm it fails for the intended reason; environment or syntax failures are not red evidence.
3. Make the minimum implementation green, then refactor under the targeted test.
4. Run the affected layer and finish with `bun run verify` from the repository root.

Do not weaken assertions or update snapshots merely to obtain green. Documentation-only changes
need no tests for wording or headings. For intake-only and documentation-only work, use the
scoped checks in `AGENTS.md`; starting a browser is not a prerequisite for recording a brief.
Changed agent instructions are evaluated on task scenarios, not inferred to work from valid YAML.

## Layers and commands

| Layer | Command | What it protects |
| --- | --- | --- |
| Unit | `bun run test:unit` | Configuration validation, metadata, crawler output, bundle graph calculation, static request resolution |
| Repository | `bun run test:repo` | Standalone entry points, local context, rendering policy, repository skills, and CI configuration |
| Build | `bun run build` | React Router prerendering of the site's routes |
| Build contracts | `bun run test:contracts` | Emitted HTML, metadata, crawler files, manifest graph, compressed HTML/JS/CSS, and individual image budgets |
| Browser | `bun run test:e2e` | Hydration, primary CTA with and without JS, exact 404 behavior, browser/network errors, accessibility, focus, and responsive overflow |
| Compatibility | `bun run test:compat` | The same browser acceptance suite in Chrome Stable, Firefox, and WebKit with normal motion |

Unit tests live beside their helpers in `lib/site-contract` and `tooling`. Repository and production
contracts live in `tests/repo` and `tests/contracts`; Playwright tests live in `tests/e2e`.
All commands target the root site without a workspace filter.

`test:e2e` always builds fresh production output. `verify` already builds and runs build contracts,
then invokes internal `test:e2e:built` (`playwright test --project=chromium`) against that same artifact.
`test:compat` also builds fresh; `test:compat:built` reuses an existing build. Run compatibility
before release and after changes to browser-sensitive behavior, CSS, or dependencies. It is separate
from the frequent `verify` loop and its CI job. An unavailable browser is a blocked check, not a pass.
`test:contracts` also expects a prior build. `bun run audit` is a separate dependency check.

## Migration coverage

Stage 2.2 removes 22 generator unit tests, two cross-workspace import-boundary tests, the multi-site
identity-uniqueness test, and the workspace-discovery test together with the architecture they protect.
This does not remove configuration validation or individual-site behavior checks. Standalone contracts
replace workspace assumptions; the existing production HTML, crawler, bundle, 404, CTA, no-JS,
accessibility, and responsive checks remain relevant and move with the site.

## Browser and visual scope

One Playwright configuration defines four projects. All reuse `tests/e2e` and the same production
preview server, fixed locale and timezone. Use the package commands: bare `playwright test` selects
all four projects.

| Project | Browser | Motion preference | Command |
| --- | --- | --- | --- |
| `chromium` | Pinned full browser, `channel: "chromium"`, modern headless | `reduce` | `bun run test:e2e` / `bun run verify` |
| `chrome` | Installed Google Chrome Stable, `channel: "chrome"` | `no-preference` | `bun run test:compat` |
| `firefox` | Playwright's pinned Firefox build | `no-preference` | `bun run test:compat` |
| `webkit` | Playwright's pinned WebKit build | `no-preference` | `bun run test:compat` |

Install the main browser once and again when the Playwright pin changes:

```bash
bunx --no-install playwright install chromium --no-shell
```

For compatibility, install the additional engines and ensure Google Chrome Stable is present:

```bash
bunx --no-install playwright install firefox webkit
```

If Chrome is absent, `bunx --no-install playwright install chrome` installs it system-wide;
this command can replace an existing Chrome installation. It is not part of normal setup or CI.
On a clean supported Linux host, add `--with-deps` to the required browser installation command
to install OS libraries. CI installs only full Chromium, with `--no-shell`.

The `chromium` channel opts into the full browser's modern headless mode; the default channel-less
headless Chromium uses a separate shell. Firefox and WebKit are Playwright builds. WebKit on Linux
is not Safari on macOS or iOS, and a narrow viewport is not a real mobile device.
These distinctions follow [Playwright's browser documentation](https://playwright.dev/docs/browsers).

Normal motion in compatibility tests permits animation; passing this suite does not assess animation
quality or prove both preferences work in every engine. Inspect approved motion, reduced motion,
mobile/desktop rendering and relevant real-device behavior for each site. Automation also does not
prove visual quality or complete accessibility. Actual versions, execution conditions and limitations
of stage 4.2 are recorded in [browser acceptance](evaluations/browsers.md).

Visual baselines are added only after a site's design is approved. Review screenshot diffs before
accepting them. Lighthouse remains a possible diagnostic, not an implemented or required score gate.
