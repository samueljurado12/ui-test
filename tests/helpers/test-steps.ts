import test, { expect } from "@playwright/test";
import { WebPage } from "../../pages";
import { UserData } from "../../models";
import { getUserFullName } from "../../utils/utils";

export const loadPage = async (page: WebPage) => {
  await test.step("Navigate to home page and check visibility", async () => {
    await page.load();

    await checkTextElementIsVisible(page, "Home");
  });
};

export const goToSignupLogin = async (page: WebPage) => {
  await test.step("Go to Signup / Login page", async () => {
    page.goToSignupLogin();
  });
};

export const signUp = async (page: WebPage, user: UserData) => {
  await test.step("Fill signup form and submit", async () => {
    await page.signUp(getUserFullName(user), user.email);
  });
};

export const fillSignupDetails = async (page: WebPage, userData: UserData) => {
  await test.step("Fill account information and submit", async () => {
    page.fillSignupDetails(userData);
  });
};

export const continueAfterAccountCreation = async (page: WebPage) => {
  await test.step("Continue after account creation", async () => {
    await page.clickContinueAfterAccountCreation();
  });
};

export const registerNewUser = async (page: WebPage, userData: UserData) => {
  await test.step("Register new user", async () => {
    await page.goToSignupLogin();
    await page.signUp(getUserFullName(userData), userData.email);
    await page.fillSignupDetails(userData);
    await page.clickContinueAfterAccountCreation();
  });
};

export const deleteUser = async (page: WebPage) => {
  await test.step("Delete account", async () => {
    await page.deleteAccount();
  });
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
