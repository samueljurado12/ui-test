import test, { expect } from "@playwright/test";
import { UserData } from "../../models";
import { WebPage } from "../../pages";
import { getUserFullName } from "../../utils";

export const registerNewUser = async (page: WebPage, userData: UserData) => {
  await page.load();
  await page.goToSignupLogin();
  await page.signUp(getUserFullName(userData), userData.email);
  await page.fillSignupDetails(userData);
  await page.clickContinueAfterAccountCreation();
};

export const checkTextElementIsVisible = async (
  page: WebPage,
  text: string
) => {
  await test.step(`Check expected text "${text}" is visible`, async () => {
    const locatorToCheck = await page.findElementByText(text);
    if (!locatorToCheck) {
      throw new Error(`Text "${text}" not found on the page.`);
    }
    await expect(locatorToCheck).toBeVisible();
  });
};
