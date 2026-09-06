import { expect, test } from "@playwright/test";

import { expectPrimaryCtaTarget } from "./primary-cta";

test("loads the prerendered landing without browser errors", async ({ baseURL, page }) => {
  const errors: string[] = [];
  const firstPartyOrigin = new URL(baseURL ?? "http://127.0.0.1:4173").origin;
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => {
    if (new URL(request.url()).origin === firstPartyOrigin) {
      errors.push(`${request.method()} ${request.url()} failed`);
    }
  });
  page.on("response", (response) => {
    if (new URL(response.url()).origin === firstPartyOrigin && response.status() >= 400) {
      errors.push(`${response.request().method()} ${response.url()} returned ${response.status()}`);
    }
  });

  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("[data-primary-cta]")).toBeVisible();
  expect(errors).toEqual([]);
});

test("primary CTA reaches its target", async ({ page }) => {
  await page.goto("/");
  await expectPrimaryCtaTarget(page);
});

test("unknown routes return a real 404", async ({ request }) => {
  const response = await request.get("/__missing-prerender__");
  expect(response.status()).toBe(404);
});
