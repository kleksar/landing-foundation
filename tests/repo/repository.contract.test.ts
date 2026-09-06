import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { defineSiteConfig } from "../../lib/site-contract/site-config.ts";

const repoRoot = resolve(import.meta.dirname, "../..");

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8"));
}

describe("repository architecture", () => {
  it("provides a private site with nonempty local commands", () => {
    const packageJson = readJson(resolve(repoRoot, "package.json")) as {
      name?: unknown;
      private?: unknown;
      scripts?: Record<string, unknown>;
    };
    expect(packageJson.private).toBe(true);
    for (const script of ["build", "dev", "preview", "test:e2e", "test:e2e:built", "typecheck"]) {
      const command = packageJson.scripts?.[script];
      expect(command, `script ${script}`).toEqual(expect.any(String));
      if (typeof command !== "string") {
        throw new TypeError(`script ${script} must be a string`);
      }
      expect(command.trim().length).toBeGreaterThan(0);
    }
  });

  it("keeps site context and explicit rendering inputs at the root", () => {
    for (const requiredFile of [
      "AGENTS.md",
      "DESIGN.md",
      "SITE_SPEC.md",
      "package.json",
      "react-router.config.ts",
      "rendering.config.json",
      "site.config.json",
      "site.config.ts",
    ]) {
      expect(existsSync(resolve(repoRoot, requiredFile)), requiredFile).toBe(true);
    }

    expect(readJson(resolve(repoRoot, "rendering.config.json"))).toEqual({
      prerender: true,
      ssr: false,
    });
    defineSiteConfig(readJson(resolve(repoRoot, "site.config.json")));
  });

  it("derives crawler assets instead of storing drift-prone public copies", () => {
    const publicRoot = resolve(repoRoot, "public");
    expect(existsSync(resolve(publicRoot, "robots.txt"))).toBe(false);
    expect(existsSync(resolve(publicRoot, "sitemap.xml"))).toBe(false);
  });

  it("runs CI with immutable actions and local pinned executables", () => {
    const workflow = readFileSync(resolve(repoRoot, ".github/workflows/ci.yml"), "utf8");
    const rootPackage = readJson(resolve(repoRoot, "package.json")) as {
      scripts?: Record<string, unknown>;
    };

    expect(workflow).toContain("runs-on: ubuntu-24.04");
    expect(workflow).toContain("actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1");
    expect(workflow).toContain("persist-credentials: false");
    expect(workflow).toContain("actions/setup-node@820762786026740c76f36085b0efc47a31fe5020");
    expect(workflow).toContain("oven-sh/setup-bun@0c5077e51419868618aeaa5fe8019c62421857d6");
    expect(workflow).toContain("bunx --no-install playwright install --with-deps chromium");
    expect(workflow).toContain("bun run audit");
    expect(workflow).toContain("actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a");
    expect(rootPackage.scripts?.audit).toBe("bun audit");
  });

  it("never reuses a possibly unrelated landing preview in browser tests", () => {
    const playwrightConfig = readFileSync(resolve(repoRoot, "playwright.config.ts"), "utf8");

    expect(playwrightConfig).toContain("reuseExistingServer: false");
  });

  it("builds a fresh production artifact for standalone browser-test commands", () => {
    const rootPackage = readJson(resolve(repoRoot, "package.json")) as {
      scripts?: Record<string, unknown>;
    };
    expect(rootPackage.scripts?.["test:e2e"]).toBe("bun run build && bun run test:e2e:built");
    expect(rootPackage.scripts?.verify).toContain("bun run test:e2e:built");
  });
});
