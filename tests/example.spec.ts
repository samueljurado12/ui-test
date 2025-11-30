import { test, expect } from "@playwright/test";

test("Register user", async ({ page }) => {
  await page.goto("/");

  // Missing expect home page is visible

  const consentButton = await page.getByRole("button", { name: "Consent" });
  if (await consentButton.isVisible()) {
    await consentButton.click({ force: true });
  }

  const signUpLink = page.getByRole("link", { name: "Signup / Login" });
  await signUpLink.click();

  const stringToCheck = "New User Signup!";
  const locator = page.getByText(stringToCheck);
  await expect(locator).toBeVisible();
});
