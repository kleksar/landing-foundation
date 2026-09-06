import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const skillsRoot = resolve(import.meta.dirname, "../../.agents/skills");

function frontmatterValue(source: string, field: string): string | undefined {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/u)?.[1];
  return frontmatter
    ?.split("\n")
    .find((line) => line.startsWith(`${field}:`))
    ?.slice(field.length + 1)
    .trim();
}

describe("project skills", () => {
  it("provide focused, uniquely named workflows", () => {
    expect(existsSync(skillsRoot)).toBe(true);

    const skillDirectories = readdirSync(skillsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    expect(skillDirectories).toEqual(expect.arrayContaining(["tdd-change", "visual-qa"]));

    const names = new Set<string>();
    for (const directory of skillDirectories) {
      const source = readFileSync(resolve(skillsRoot, directory, "SKILL.md"), "utf8");
      const name = frontmatterValue(source, "name");
      const description = frontmatterValue(source, "description");

      expect(name).toBe(directory);
      expect(description?.length).toBeGreaterThan(20);
      expect(source).not.toContain("TODO");
      expect(names.has(name ?? "")).toBe(false);
      names.add(name ?? "");
    }
  });
});
