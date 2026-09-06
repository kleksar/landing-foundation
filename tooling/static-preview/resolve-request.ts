import { statSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";

function isInside(root: string, candidate: string): boolean {
  const pathFromRoot = relative(root, candidate);
  return (
    pathFromRoot === "" ||
    (!isAbsolute(pathFromRoot) && pathFromRoot !== ".." && !pathFromRoot.startsWith(`..${sep}`))
  );
}

function isFile(path: string): boolean {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

export function resolveRequest(documentRoot: string, requestUrl: string): string | null {
  if (requestUrl.includes("\\") || requestUrl.includes("\0")) {
    return null;
  }

  const baseUrl = new URL("http://landing.invalid/");
  let url: URL;
  let pathname: string;
  try {
    url = new URL(requestUrl, baseUrl);
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return null;
  }
  if (url.origin !== baseUrl.origin || pathname.includes("\\") || pathname.includes("\0")) {
    return null;
  }

  const root = resolve(documentRoot);
  const relativePath = pathname.replace(/^\/+/, "");
  const exactPath = resolve(root, relativePath);
  const candidates = relativePath
    ? [exactPath, resolve(exactPath, "index.html"), resolve(root, `${relativePath}.html`)]
    : [resolve(root, "index.html")];

  return candidates.find((candidate) => isInside(root, candidate) && isFile(candidate)) ?? null;
}
