import { test } from "./fixtures";
import {
  checkTextElementIsVisible,
  continueAfterAccountCreation,
  deleteUser,
  fillSignupDetails,
  signUp,
  goToSignupLogin,
  loadPage,
  registerNewUser,
} from "./helpers";
import { generateRandomUser, getUserFullName } from "../utils";

test.beforeEach(async ({ webPage }) => {
  await loadPage(webPage);
});

test("Register user", async ({ webPage }) => {
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
