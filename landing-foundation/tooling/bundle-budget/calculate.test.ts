import { describe, expect, it } from "vitest";

import { calculateInitialAssets } from "./calculate";

describe("calculateInitialAssets", () => {
  it("counts a shared static import exactly once", () => {
    const manifest = {
      "entry-a.ts": {
        file: "assets/entry-a.js",
        isEntry: true,
        imports: ["shared.ts"],
        css: ["assets/app.css"],
      },
      "entry-b.ts": {
        file: "assets/entry-b.js",
        isEntry: true,
        imports: ["shared.ts"],
      },
      "shared.ts": { file: "assets/shared.js" },
    };

    expect(calculateInitialAssets(manifest)).toEqual({
      javascript: ["assets/entry-a.js", "assets/entry-b.js", "assets/shared.js"],
      css: ["assets/app.css"],
    });
  });

  it("excludes dynamic imports from the initial graph", () => {
    const manifest = {
      "entry.ts": {
        file: "assets/entry.js",
        isEntry: true,
        dynamicImports: ["optional.ts"],
      },
      "optional.ts": { file: "assets/optional.js" },
    };

    expect(calculateInitialAssets(manifest).javascript).toEqual(["assets/entry.js"]);
  });

  it("fails on references to missing static chunks", () => {
    expect(() =>
      calculateInitialAssets({
        "entry.ts": {
          file: "assets/entry.js",
          isEntry: true,
          imports: ["missing.ts"],
        },
      }),
    ).toThrow("missing.ts");
  });
});
