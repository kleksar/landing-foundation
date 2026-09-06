import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const repoRoot = resolve(import.meta.dirname, "../..");

describe("standalone site", () => {
  it("installs and runs without workspace resolution", () => {
    const manifest = JSON.parse(readFileSync(resolve(repoRoot, "package.json"), "utf8")) as {
      workspaces?: unknown;
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      optionalDependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
      scripts?: Record<string, string>;
    };

    expect(manifest.workspaces).toBeUndefined();
    for (const version of Object.values({
      ...manifest.dependencies,
      ...manifest.devDependencies,
      ...manifest.optionalDependencies,
      ...manifest.peerDependencies,
    })) {
      expect(version).not.toMatch(/^(?:workspace:|catalog:)/u);
    }
    for (const command of Object.values(manifest.scripts ?? {})) {
      expect(command).not.toContain("--filter");
    }
  });
});
