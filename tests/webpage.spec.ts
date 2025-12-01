import { test } from "@playwright/test";
import { generateRandomUser, selectRandomFromArray } from "../utils";
import {
  checkTextElementIsVisible,
  continueAfterAccountCreation,
  deleteUser,
  fillSignupDetails,
  signUp,
} from "./helpers";
import { WebPage } from "../pages/webpage";
import { goToSignupLogin, loadPage } from "./helpers";
import { getUserFullName } from "../utils/utils";

test("Register user", async ({ page }) => {
  const webPage = new WebPage(page);

  await loadPage(webPage);

  await goToSignupLogin(webPage);

  await checkTextElementIsVisible(webPage, "New User Signup!");

  const userData = generateRandomUser();

  await signUp(webPage, userData);

  await checkTextElementIsVisible(webPage, "ENTER ACCOUNT INFORMATION");

  await fillSignupDetails(webPage, userData);

  await checkTextElementIsVisible(webPage, "ACCOUNT CREATED!");

  await continueAfterAccountCreation(webPage);

  await checkTextElementIsVisible(
    webPage,
    `Logged in as ${getUserFullName(userData)}`
  );

  await deleteUser(webPage);

  await checkTextElementIsVisible(webPage, "ACCOUNT DELETED!");
});
