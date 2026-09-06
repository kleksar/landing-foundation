import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve } from "node:path";

import { resolveRequest } from "./resolve-request.ts";

const contentTypes: Readonly<Record<string, string>> = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const rootArgument = process.argv[2];
if (!rootArgument) {
  throw new TypeError("Usage: bun server.ts <document-root>");
}

const documentRoot = resolve(process.cwd(), rootArgument);
const host = process.env.LANDING_PREVIEW_HOST ?? "127.0.0.1";
const port = Number.parseInt(process.env.LANDING_PREVIEW_PORT ?? "4173", 10);
if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
  throw new TypeError("LANDING_PREVIEW_PORT must be a valid TCP port");
}

const server = createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  const path = resolveRequest(documentRoot, request.url ?? "/");
  if (!path) {
    response.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    });
    response.end("Not found\n");
    return;
  }

  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Length": statSync(path).size,
    "Content-Type": contentTypes[extname(path).toLowerCase()] ?? "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
  });
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  createReadStream(path).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Static preview: http://${host}:${port}`);
});
