import { Locator, Page } from "@playwright/test";
import { setTimeout } from "timers/promises";
import { UserData } from "../models";

export class WebPage {
  readonly page: Page;
  readonly signupLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = this.page.getByRole("link", {
      name: "Signup / Login",
    });
  }

  goToSignupLogin = async () => await this.signupLoginLink.click();

  findElementByText = async (text: string) => await this.page.getByText(text);

  load = async () => {
    await this.page.goto("/");

    const consentButton = await this.page.getByRole("button", {
      name: "Consent",
    });
    if (await consentButton.isVisible())
      await consentButton.click({ force: true });
  };

  signUp = async (name: string, email: string) => {
    const signupForm = await this.page
      .getByText("New User Signup!")
      .locator("..");

    await signupForm.getByRole("textbox", { name: "Name" }).fill(name);
    await signupForm.getByRole("textbox", { name: "Email" }).fill(email);
    await signupForm.getByRole("button", { name: "Signup" }).click();
  };

  fillSignupDetails = async (userData: UserData) => {
    const title = await this.page
      .getByText("Title")
      .locator("..")
      .getByText(userData.title)
      .check();
    await this.page.getByLabel("Password").fill(userData.password);
    /*
     * I think there should be a better way of selecting these combo boxes, but
     * I couldn't find it. Neither using getByLabel nor getByRole worked here.
     * I also tried to first get the Date of Birth label, navigate to the parent as for the title,
     * and then try to get the select boxes, but no luck either.
     */
    if (userData.dateOfBirth) {
      await this.page
        .locator("#days")
        .selectOption(userData.dateOfBirth.day.toString());
      await this.page
        .locator("#months")
        .selectOption(userData.dateOfBirth.month);
      await this.page
        .locator("#years")
        .selectOption(userData.dateOfBirth.year.toString());
    }

    if (userData.newsletterSubscribed)
      await this.page.getByLabel("Sign up for our newsletter!").check();
    if (userData.specialOffersSubscribed)
      await this.page
        .getByLabel("Receive special offers from our partners!")
        .check();
    await this.page.getByLabel("First name").fill(userData.firstName);
    await this.page.getByLabel("Last name").fill(userData.lastName);
    /*
     * Looking by label here conflicts with the Company field inside Address Information section.
     */
    await this.page
      .getByRole("textbox", { name: "Company", exact: true })
      .fill(userData.company || "");
    /*
     * Looking by label here conflicts with the Address 2 field inside Address 2 Information section.
     */
    await this.page
      .getByRole("textbox", {
        name: "Address * (Street address, P.O. Box, Company name, etc.)",
      })
      .fill(userData.address.address);
    await this.page.getByRole("textbox", { name: "Address 2" }).fill("");
    await this.page
      .getByLabel("Country")
      .selectOption(userData.address.country);
    await this.page.getByLabel("State").fill(userData.address.state);
    await this.page.getByLabel("City").fill(userData.address.city);

    /*
     * Zipcode label is pointing to City field, so we have to use role here
     * as we are updating the city field above.
     */
    await this.page.locator("#zipcode").fill(userData.address.zipCode);
    await this.page.getByLabel("Mobile Number").fill(userData.phoneNumber);

    await this.page.getByRole("button", { name: "Create Account" }).click();
  };

  clickContinueAfterAccountCreation = async () => {
    await this.page.getByRole("link", { name: "Continue" }).click();
  };

  login = async (email: string, password: string) => {
    const loginForm = await this.page
      .getByText("Login to your account")
      .locator("..");

    await loginForm.getByRole("textbox", { name: "Email" }).fill(email);
    await loginForm.getByRole("textbox", { name: "Password" }).fill(password);
    await loginForm.getByRole("button", { name: "Login" }).click();
  };

  logout = async () => {
    await this.page.getByRole("link", { name: "Logout" }).click();
    await setTimeout(2000); // Wait for 2 seconds to ensure the logout is processed
  };

  deleteAccount = async () => {
    await this.page.getByRole("link", { name: "Delete Account" }).click();
    await setTimeout(2000); // Wait for 2 seconds to ensure the account deletion is processed
  };
}
