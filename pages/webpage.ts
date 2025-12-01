import { Locator, Page } from "@playwright/test";

export class WebPage {
  readonly page: Page;
  readonly signupLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = this.page.getByRole("link", {
      name: "Signup / Login",
    });
  }

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

  goToSignupLogin = async () => await this.signupLoginLink.click();

  findElementByText = async (text: string) => await this.page.getByText(text);
}
