import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { localMarkdownLinks, markdownLinkErrors } from "./skill-links.ts";

const repoRoot = resolve(import.meta.dirname, "../..");
const skillsRoot = resolve(repoRoot, ".agents/skills");
const requiredSkills = [
  "landing-content",
  "landing-design",
  "landing-intake",
  "landing-tooling",
  "tdd-change",
  "visual-qa",
];

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
    expect(skillDirectories).toEqual(expect.arrayContaining(requiredSkills));

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

  it("routes every local workflow from AGENTS", () => {
    const agents = readFileSync(resolve(repoRoot, "AGENTS.md"), "utf8");
    const paths = [...agents.matchAll(/\.agents\/skills\/[a-z0-9-]+\/SKILL\.md/gu)].map(
      (match) => match[0],
    );
    expect([...new Set(paths)].sort()).toEqual(
      expect.arrayContaining(requiredSkills.map((name) => `.agents/skills/${name}/SKILL.md`)),
    );
    for (const path of paths) {
      expect(existsSync(resolve(repoRoot, path)), path).toBe(true);
    }
  });

  it("imports the shared instruction entrypoint in Claude Code", () => {
    const claude = readFileSync(resolve(repoRoot, "CLAUDE.md"), "utf8");
    expect(claude).toMatch(/^@(?:\.\/)?AGENTS\.md\s*$/mu);
  });

  it("resolves local links and heading fragments throughout skills and their references", () => {
    const files = readdirSync(skillsRoot, { recursive: true, encoding: "utf8" })
      .filter((path) => path.endsWith(".md"))
      .map((path) => resolve(skillsRoot, path));
    expect(files.length).toBeGreaterThanOrEqual(requiredSkills.length);
    expect(files.flatMap(markdownLinkErrors)).toEqual([]);
  });

  it("connects both design planning and rendered review to the local UX/UI adapter", () => {
    const adapter = resolve(skillsRoot, "landing-design/references/ux-ui-agent-skills.md");
    for (const skill of ["landing-design", "visual-qa"]) {
      const file = resolve(skillsRoot, skill, "SKILL.md");
      const destinations = localMarkdownLinks(readFileSync(file, "utf8")).map((link) =>
        resolve(dirname(file), link.split("#")[0] ?? ""),
      );
      expect(destinations, skill).toContain(adapter);
    }
  });
});

describe("skill link validation", () => {
  const fixtures: string[] = [];

  afterEach(() => {
    for (const directory of fixtures.splice(0)) {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  function fixture(files: Record<string, string>): string {
    const root = mkdtempSync(resolve(tmpdir(), "landing-skill-links-"));
    fixtures.push(root);
    for (const [path, source] of Object.entries(files)) {
      const file = resolve(root, path);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, source);
    }
    return root;
  }

  it("accepts cross-skill, file-only and same-file heading links without fetching external URLs", () => {
    const root = fixture({
      "review/SKILL.md": [
        "# Rendered review",
        "[adapter](../design/references/adapter.md#design-planning)",
        "[file](../design/references/adapter.md)",
        "[here](#rendered-review)",
        "[external](https://example.invalid/missing.md#absent)",
        "```md",
        "[example](missing.md#absent)",
        "```",
      ].join("\n"),
      "design/references/adapter.md": "# Adapter\n\n## Design planning\n",
    });
    expect(markdownLinkErrors(resolve(root, "review/SKILL.md"))).toEqual([]);
  });

  it("reports a missing relative target with the source file and destination", () => {
    const root = fixture({ "review/SKILL.md": "[adapter](../design/missing.md)" });
    const file = resolve(root, "review/SKILL.md");
    expect(markdownLinkErrors(file)).toEqual([`${file}: missing file ../design/missing.md`]);
  });

  it("reports broken cross-file and same-file anchors even when both files exist", () => {
    const root = fixture({
      "review/SKILL.md": "# Review\n[adapter](../design/SKILL.md#missing)\n[here](#absent)",
      "design/SKILL.md": "# Design planning\n",
    });
    const file = resolve(root, "review/SKILL.md");
    expect(markdownLinkErrors(file)).toEqual([
      `${file}: missing heading ../design/SKILL.md#missing`,
      `${file}: missing heading #absent`,
    ]);
  });
});
