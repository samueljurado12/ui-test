import { test } from "./fixtures";
import {
  confirmAccountCreation,
  deleteUser,
  fillSignupDetails,
  signUp,
  loadPage,
  registerNewUserAndLogout,
  login,
  checkSuccessfulLogin,
  checkFailureLogin,
  logout,
} from "./helpers";
import { generateRandomUser, getUserFullName } from "../utils";

test("Register user", async ({ webPage }) => {
  const userData = generateRandomUser();

  await webPage.load();

  await signUp(webPage, userData);

  await fillSignupDetails(webPage, userData);

  await confirmAccountCreation(webPage);

  await checkSuccessfulLogin(webPage, getUserFullName(userData));

  await deleteUser(webPage);
});

test("Login user with correct email and password", async ({ webPage }) => {
  const userData = generateRandomUser();
  /*
   * We need to register an user to have the valid credentials,
   * we won´t check anything until the user is registered
   */
  await registerNewUserAndLogout(webPage, userData);

  await loadPage(webPage);

  await login(webPage, userData.email, userData.password);

  await checkSuccessfulLogin(webPage, getUserFullName(userData));

  await deleteUser(webPage);
});

test("Login user with incorrect email and password", async ({ webPage }) => {
  const userData = generateRandomUser();

  await loadPage(webPage);

  // As we haven´t registered the user, email and password won´t exist
  await login(webPage, userData.email, userData.password);

  await checkFailureLogin(webPage);
});

test("Logout user", async ({ webPage }) => {
  const userData = generateRandomUser();
  /*
   * We need to register an user before testing logout functionality,
   * we won´t check anything until the user is registered
   */
  await registerNewUserAndLogout(webPage, userData);

  await loadPage(webPage);

  await login(webPage, userData.email, userData.password);

  await checkSuccessfulLogin(webPage, getUserFullName(userData));

  await logout(webPage);
});
