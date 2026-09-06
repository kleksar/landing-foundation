import { resolve } from "node:path";

import { defineConfig } from "@playwright/test";

const repoRoot = import.meta.dirname;

export default defineConfig({
  testDir: resolve(repoRoot, "tests/e2e"),
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  outputDir: resolve(repoRoot, "test-results"),
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: resolve(repoRoot, "playwright-report") }],
  ],
  use: {
    baseURL: "http://127.0.0.1:4173",
    locale: "en-US",
    screenshot: "only-on-failure",
    timezoneId: "UTC",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        channel: "chromium",
        contextOptions: { reducedMotion: "reduce" },
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        channel: "chrome",
        contextOptions: { reducedMotion: "no-preference" },
      },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        contextOptions: { reducedMotion: "no-preference" },
      },
    },
    {
      name: "webkit",
      use: {
        browserName: "webkit",
        contextOptions: { reducedMotion: "no-preference" },
      },
    },
  ],
  webServer: {
    cwd: repoRoot,
    command: "bun run preview",
    reuseExistingServer: false,
    timeout: 120_000,
    url: "http://127.0.0.1:4173",
  },
});
