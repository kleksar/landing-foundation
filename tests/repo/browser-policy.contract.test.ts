import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
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

  it("provides a separate CI acceptance run with installed browsers and visible failures", () => {
    const path = resolve(import.meta.dirname, "../../.github/workflows/compatibility.yml");
    expect(existsSync(path), "compatibility workflow must exist at checkout root").toBe(true);
    // Parse real YAML with the project's Bun runtime; no additional parser dependency.
    const workflow = JSON.parse(
      execFileSync(
        "bun",
        ["-e", "console.log(JSON.stringify(Bun.YAML.parse(await Bun.stdin.text())))"],
        { input: readFileSync(path, "utf8"), encoding: "utf8" },
      ),
    );
    expect(workflow.on).toHaveProperty("workflow_dispatch");
    expect(workflow.on.push.branches).toContain("main");
    expect(workflow.on.push.paths).toEqual(
      expect.arrayContaining([
        ".github/workflows/compatibility.yml",
        "playwright.config.ts",
        "package.json",
        "bun.lock",
        "tests/e2e/**",
      ]),
    );
    const job = workflow.jobs.compatibility;
    expect(job["continue-on-error"]).not.toBe(true);
    const commands = job.steps.flatMap((step: { run?: string }) => step.run ?? []);
    const acceptance = commands.findIndex((run: string) => run.startsWith("bun run test:compat"));
    expect(acceptance, "run the existing suite, including a fresh build").toBeGreaterThan(-1);
    for (const prerequisite of [
      "bun install --frozen-lockfile",
      "bunx --no-install playwright install --with-deps firefox webkit",
      "bunx --no-install playwright install chrome --force",
    ]) {
      expect(commands.indexOf(prerequisite), prerequisite).toBeGreaterThan(-1);
      expect(commands.indexOf(prerequisite), prerequisite).toBeLessThan(acceptance);
    }
    for (const step of job.steps.filter((step: { run?: string }) => step.run)) {
      expect(step.if).toBeUndefined();
      expect(step["continue-on-error"]).not.toBe(true);
      expect(step.run).not.toMatch(/\|\|\s*true|--pass-with-no-tests/);
    }
  });
});
