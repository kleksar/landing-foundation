import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const evidence = resolve(import.meta.dirname, "../../../test-results/visual-pilot/evidence");

for (const variant of ["a", "b"]) {
  for (const width of [1440, 390]) {
    test(`${variant} at ${width}px`, async ({ browser, page }) => {
      mkdirSync(evidence, { recursive: true });
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("requestfailed", (request) => errors.push(request.url()));
      const response = await page.goto(`/${variant}.html`);
      expect(response?.status()).toBe(200);
      await page.screenshot({
        path: resolve(evidence, `${variant}-${width}-first.jpg`),
        quality: 85,
      });
      await page.screenshot({
        path: resolve(evidence, `${variant}-${width}-full.jpg`),
        fullPage: true,
        quality: 85,
      });
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Контроль геометрии прямо на линии",
      );
      const primary = page.getByRole("link", { name: "Посмотреть параметры", exact: true });
      await expect(primary).toHaveAttribute("href", "#parameters");
      await expect(
        page.getByRole("link", { name: "Обсудить задачу", exact: true }),
      ).toHaveAttribute("href", "mailto:demo@example.com");
      const dimensions = await page.evaluate(() => ({
        viewport: innerWidth,
        document: document.documentElement.scrollWidth,
      }));
      expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
      for (let tab = 0; tab < 8; tab += 1) {
        await page.keyboard.press("Tab");
        if (await primary.evaluate((element) => document.activeElement === element)) break;
      }
      const focus = await primary.evaluate((element) => ({
        focused: document.activeElement === element,
        outline: getComputedStyle(element).outlineStyle,
        width: getComputedStyle(element).outlineWidth,
      }));
      expect(focus.focused).toBe(true);
      expect(focus.outline).not.toBe("none");
      expect(Number.parseFloat(focus.width)).toBeGreaterThan(0);
      await page.screenshot({
        path: resolve(evidence, `${variant}-${width}-focus.jpg`),
        quality: 85,
      });
      await primary.press("Enter");
      await expect(page).toHaveURL(/#parameters$/u);
      await expect(page.locator("#parameters")).toBeInViewport();
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      const result = {
        variant,
        viewport: { width, height: 900 },
        browser: browser.version(),
        dimensions,
        focus,
        primaryAction: "keyboard Enter navigated to visible #parameters",
        accessibilityViolations: accessibility.violations,
        errors,
      };
      writeFileSync(
        resolve(evidence, `${variant}-${width}.json`),
        `${JSON.stringify(result, null, 2)}\n`,
      );
      expect(errors).toEqual([]);
      expect(accessibility.violations).toEqual([]);
    });
  }

  test(`${variant} without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    try {
      await page.goto(`${baseURL}/${variant}.html`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.getByRole("link", { name: "Посмотреть параметры", exact: true }).click();
      await expect(page).toHaveURL(/#parameters$/u);
      await expect(page.locator("#parameters")).toBeInViewport();
    } finally {
      await context.close();
    }
  });
}
