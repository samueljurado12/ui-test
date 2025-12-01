import { test } from "./fixtures";
import {
  checkTextElementIsVisible,
  continueAfterAccountCreation,
  deleteUser,
  fillSignupDetails,
  signUp,
  goToSignupLogin,
  loadPage,
  registerNewUserAndLogout,
  login,
} from "./helpers";
import { generateRandomUser, getUserFullName } from "../utils";

test("Register user", async ({ webPage }) => {
  await webPage.load();

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

test("Login user with correct email and password", async ({ webPage }) => {
  const userData = generateRandomUser();
  /*
   * We need to register an user to have the valid credentials,
   * we won´t check anything until the user is registered
   */
  await registerNewUserAndLogout(webPage, userData);

  await loadPage(webPage);

  await goToSignupLogin(webPage);
  await checkTextElementIsVisible(webPage, "Login to your account");

  await login(webPage, userData.email, userData.password);

  await checkTextElementIsVisible(
    webPage,
    `Logged in as ${getUserFullName(userData)}`
  );

  await deleteUser(webPage);
  await checkTextElementIsVisible(webPage, "ACCOUNT DELETED!");
});
