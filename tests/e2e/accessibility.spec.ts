import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("passes automated WCAG 2.2 A/AA checks", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("exposes landmarks and a visible keyboard focus", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

  const cta = page.locator("[data-primary-cta]");
  await cta.focus();
  expect(await cta.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
});
