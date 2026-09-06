import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { resolveRequest } from "./resolve-request.ts";

let documentRoot: string;

beforeEach(() => {
  documentRoot = mkdtempSync(join(tmpdir(), "landing-static-preview-"));
  mkdirSync(resolve(documentRoot, "about"));
  mkdirSync(resolve(documentRoot, "assets"));
  writeFileSync(resolve(documentRoot, "index.html"), "home");
  writeFileSync(resolve(documentRoot, "about/index.html"), "about");
  writeFileSync(resolve(documentRoot, "assets/app.js"), "app");
});

afterEach(() => {
  rmSync(documentRoot, { force: true, recursive: true });
});

describe("resolveRequest", () => {
  it.each([
    ["/", "index.html"],
    ["/about", "about/index.html"],
    ["/about/", "about/index.html"],
    ["/assets/app.js?v=1", "assets/app.js"],
  ])("maps %s to an emitted file", (requestUrl, expectedPath) => {
    expect(resolveRequest(documentRoot, requestUrl)).toBe(resolve(documentRoot, expectedPath));
  });

  it("does not fall back to the home page for a missing route", () => {
    expect(resolveRequest(documentRoot, "/missing")).toBeNull();
  });

  it.each(["/..%2Fsecret.txt", "/%2e%2e%2fsecret.txt", "/\\evil"])(
    "rejects an unsafe path: %s",
    (requestUrl) => {
      expect(resolveRequest(documentRoot, requestUrl)).toBeNull();
    },
  );
});
