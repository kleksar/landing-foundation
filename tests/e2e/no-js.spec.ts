import { expect, test } from "@playwright/test";

import { expectPrimaryCtaTarget } from "./primary-cta";

test.use({ javaScriptEnabled: false });

test("essential content remains available without JavaScript", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expectPrimaryCtaTarget(page);
});
