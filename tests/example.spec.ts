import { test, expect } from "@playwright/test";

test("example", async ({ page }) => {
  await page.goto("/");

  const title = page.locator("text=Hello Next.js!");

  // Assert that the title is visible.
  expect(await title.isVisible()).toBe(true);
});
