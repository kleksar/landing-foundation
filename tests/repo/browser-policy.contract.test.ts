import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import browserConfig from "../../playwright.config";

const manifest = JSON.parse(
  readFileSync(resolve(import.meta.dirname, "../../package.json"), "utf8"),
) as { scripts: Record<string, string> };

const policies = (browserConfig.projects ?? []).map((project) => ({
  name: project.name,
  browserName: project.use?.browserName,
  channel: project.use?.channel,
  reducedMotion: project.use?.contextOptions?.reducedMotion,
}));

describe("browser execution policy", () => {
  it("keeps the verification loop on full Chromium with reduced motion", () => {
    expect(policies.find((project) => project.name === "chromium")).toEqual({
      name: "chromium",
      browserName: "chromium",
      channel: "chromium",
      reducedMotion: "reduce",
    });
    expect(manifest.scripts["test:e2e:built"]).toBe("playwright test --project=chromium");
    expect(manifest.scripts.verify).toContain("bun run test:e2e:built");
    expect(manifest.scripts.verify).not.toContain("test:compat");
  });

  it("runs the same site against three explicit compatibility browsers with normal motion", () => {
    expect(policies.filter((project) => project.name !== "chromium")).toEqual([
      {
        name: "chrome",
        browserName: "chromium",
        channel: "chrome",
        reducedMotion: "no-preference",
      },
      {
        name: "firefox",
        browserName: "firefox",
        channel: undefined,
        reducedMotion: "no-preference",
      },
      {
        name: "webkit",
        browserName: "webkit",
        channel: undefined,
        reducedMotion: "no-preference",
      },
    ]);
    expect(manifest.scripts["test:compat"]).toBe("bun run build && bun run test:compat:built");
    expect(manifest.scripts["test:compat:built"]).toBe(
      "playwright test --project=chrome --project=firefox --project=webkit",
    );
  });
});
