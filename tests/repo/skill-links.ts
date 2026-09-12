import { readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";

// These repository instructions use inline links and ATX headings. This is a local
// integrity check for that syntax, not a Markdown renderer or an external URL checker.
function withoutCodeFences(source: string): string {
  let fence: string | undefined;
  return source
    .split("\n")
    .map((line) => {
      const marker = line.match(/^ {0,3}(`{3,}|~{3,})/u)?.[1];
      if (marker && !fence) {
        fence = marker;
        return "";
      }
      if (marker && fence && marker[0] === fence[0] && marker.length >= fence.length) {
        fence = undefined;
        return "";
      }
      return fence ? "" : line;
    })
    .join("\n");
}

export function localMarkdownLinks(source: string): string[] {
  return [...withoutCodeFences(source).matchAll(/\[[^\]\n]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/gu)]
    .map((match) => match[1] ?? "")
    .filter((link) => !/^(?:[a-z][a-z\d+.-]*:|\/\/)/iu.test(link));
}

function headingAnchors(source: string): Set<string> {
  const anchors = new Set<string>();
  for (const match of withoutCodeFences(source).matchAll(/^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$/gmu)) {
    const base = (match[1] ?? "")
      .replace(/\[([^\]]+)\]\([^)]*\)/gu, "$1")
      .replace(/<[^>]*>/gu, "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\p{M}_\-\s]/gu, "")
      .replace(/\s/gu, "-");
    let anchor = base;
    let suffix = 0;
    while (anchors.has(anchor)) {
      anchor = `${base}-${++suffix}`;
    }
    anchors.add(anchor);
  }
  return anchors;
}

export function markdownLinkErrors(sourcePath: string): string[] {
  const errors: string[] = [];
  for (const link of localMarkdownLinks(readFileSync(sourcePath, "utf8"))) {
    const [path = "", fragment] = link.split("#", 2);
    const target = path ? resolve(dirname(sourcePath), decodeURIComponent(path)) : sourcePath;
    if (!statSync(target, { throwIfNoEntry: false })?.isFile()) {
      errors.push(`${sourcePath}: missing file ${link}`);
      continue;
    }
    if (
      fragment &&
      !headingAnchors(readFileSync(target, "utf8")).has(decodeURIComponent(fragment))
    ) {
      errors.push(`${sourcePath}: missing heading ${link}`);
    }
  }
  return errors;
}
