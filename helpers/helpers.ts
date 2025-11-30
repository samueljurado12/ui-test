import test, { expect, Page } from "@playwright/test";

export const checkTextElementIsVisible = async (page: Page, text: string) => {
    await test.step(`Check expected text "${text}" is visible`, async () => {
      const locatorToCheck = await page.getByText(text);
      if(!locatorToCheck) {
        throw new Error(`Text "${text}" not found on the page.`);
      }
      await expect(locatorToCheck).toBeVisible();
      });
}

