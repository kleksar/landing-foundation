import { resolve } from "node:path";

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: import.meta.dirname,
  testMatch: "pilot.spec.ts",
  outputDir: resolve(import.meta.dirname, "../../../test-results/visual-pilot"),
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4179",
    browserName: "chromium",
    channel: "chromium",
    locale: "ru-RU",
    timezoneId: "UTC",
    reducedMotion: "reduce",
    launchOptions: process.env.PILOT_CHROMIUM_PATH
      ? { executablePath: process.env.PILOT_CHROMIUM_PATH }
      : undefined,
  },
  webServer: {
    command: "python3 -m http.server 4179 --bind 127.0.0.1",
    cwd: import.meta.dirname,
    url: "http://127.0.0.1:4179",
    reuseExistingServer: false,
  },
});
