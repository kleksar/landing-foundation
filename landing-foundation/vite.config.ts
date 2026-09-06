import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { crawlerAssetsPlugin } from "./lib/site-contract/crawler-assets.ts";

import { siteConfig } from "./site.config.ts";

export default defineConfig({
  build: {
    manifest: true,
  },
  plugins: [tailwindcss(), crawlerAssetsPlugin(siteConfig.canonicalUrl), reactRouter()],
  preview: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
});
