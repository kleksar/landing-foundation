import { expect, type Page } from "@playwright/test";

function escapeRegularExpression(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

export async function expectPrimaryCtaTarget(page: Page): Promise<void> {
  const cta = page.locator("[data-primary-cta]");
  await expect(cta).toHaveCount(1);
  await expect(cta).toBeVisible();

  const href = await cta.getAttribute("href");
  expect(href).toBeTruthy();
  if (!href) {
    return;
  }

  if (href.startsWith("#")) {
    await cta.click();
    await expect(page.locator(href)).toBeInViewport();
    await expect(page).toHaveURL(new RegExp(`${escapeRegularExpression(href)}$`, "u"));
    return;
  }

  if (href.startsWith("/")) {
    const expectedUrl = new URL(href, page.url()).href;
    await cta.click();
    await expect(page).toHaveURL(expectedUrl);
    await expect(page.getByRole("main")).toBeVisible();
    return;
  }

  expect(href).toMatch(/^(?:https:|mailto:|tel:)/u);
}
