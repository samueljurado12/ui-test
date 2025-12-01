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
