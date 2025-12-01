import test, { expect } from "@playwright/test";
import { WebPage } from "../../pages";
import { UserData } from "../../models";
import { getUserFullName } from "../../utils";
import {
  checkTextElementIsVisible,
  registerNewUser,
} from "./test-steps-helpers";

export const loadPage = async (page: WebPage) => {
  await test.step("Navigate to home page and check visibility", async () => {
    await page.load();

    await checkTextElementIsVisible(page, "Home");
  });
};

export const signUp = async (page: WebPage, user: UserData) => {
  await test.step("Go to Signup / Login and sign up a new user", async () => {
    await page.goToSignupLogin();
    await checkTextElementIsVisible(page, "New User Signup!");
    await page.signUp(getUserFullName(user), user.email);
  });
};

export const fillSignupDetails = async (page: WebPage, userData: UserData) => {
  await test.step("Fill account information and submit", async () => {
    await checkTextElementIsVisible(page, "ENTER ACCOUNT INFORMATION");
    await page.fillSignupDetails(userData);
  });
};

export const confirmAccountCreation = async (page: WebPage) => {
  await test.step("Check account created succesfully and click continue", async () => {
    await checkTextElementIsVisible(page, "ACCOUNT CREATED!");
    await page.clickContinueAfterAccountCreation();
  });
};

export const registerNewUserAndLogout = async (
  page: WebPage,
  userData: UserData
) => {
  await test.step("Register new user and logging out before test", async () => {
    await registerNewUser(page, userData);
    await page.logout();
  });
};

export const login = async (page: WebPage, email: string, password: string) =>
  await test.step("Go to Signup / Login and login user with provided credentials", async () => {
    await page.goToSignupLogin();
    await checkTextElementIsVisible(page, "Login to your account");
    await page.login(email, password);
  });

export const logout = async (page: WebPage) => {
  await test.step("Logout user", async () => {
    await page.logout();
    await checkTextElementIsVisible(page, "Login to your account");
  });
};

export const deleteUser = async (page: WebPage) => {
  await test.step("Delete account", async () => {
    await page.deleteAccount();
    await checkTextElementIsVisible(page, "ACCOUNT DELETED!");
  });
};

export const checkSuccessfulLogin = async (
  page: WebPage,
  userFullName: string
) => await checkTextElementIsVisible(page, `Logged in as ${userFullName}`);

export const checkFailureLogin = async (page: WebPage) =>
  await checkTextElementIsVisible(page, "Your email or password is incorrect!");

export const checkFailureSignUp = async (page: WebPage) =>
  await checkTextElementIsVisible(page, "Email address already exist!");
