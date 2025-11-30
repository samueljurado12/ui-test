import { test } from "@playwright/test";
import { generateRandomNameAndEmail, selectRandomFromArray } from "../generators";
import { checkTextElementIsVisible } from "../helpers";
import { setTimeout } from "timers/promises";

test("Register user", async ({ page }) => {
  await test.step("Navigate to home page and check visibility", async () => {
  await page.goto("/");

  const consentButton = await page.getByRole("button", { name: "Consent" });
  if (await consentButton.isVisible()) {
    await consentButton.click({ force: true });
  }

  await page.getByAltText("Website for automation practice").isVisible();

  });

  await test.step("Go to Signup / Login page", async () => {
  const signUpLink = page.getByRole("link", { name: "Signup / Login" });
  await signUpLink.click();

  });

  await checkTextElementIsVisible(page, "New User Signup!");

  const {name, email} = generateRandomNameAndEmail();

  await test.step("Fill signup form and submit", async () => {
  /**Functionality can be extracted until here.  */

  const signupForm = await page.getByText("New User Signup!").locator("..");

  await signupForm.getByRole("textbox", { name: "Name" }).fill(name);
  await signupForm.getByRole("textbox", { name: "Email" }).fill(email);
  await signupForm.getByRole("button", { name: "Signup" }).click();
  });

  await checkTextElementIsVisible(page, "ENTER ACCOUNT INFORMATION");

await test.step("Fill account information and submit", async () => {
  const title = await page.getByText("Title").locator("..").getByText(selectRandomFromArray(["Mr.", "Mrs."]));
  await title.check();
  await page.getByLabel("Password").fill("Password123");
  /*
  * I think there should be a better way of selecting these combo boxes, but
  * I couldn't find it. Neither using getByLabel nor getByRole worked here.
  * I also tried to first get the Date of Birth label, navigate to the parent as for the title,
  * and then try to get the select boxes, but no luck either.
  */
  await page.locator("#days").selectOption("15");
  await page.locator("#months").selectOption("May");
  await page.locator("#years").selectOption("1990");
  await page.getByLabel("Sign up for our newsletter!").check();
  await page.getByLabel("Receive special offers from our partners!").check();
  await page.getByLabel("First name").fill(name.split(" ")[0]);
  await page.getByLabel("Last name").fill(name.split(" ")[1]);
  /*
  * Looking by label here conflicts with the Company field inside Address Information section.
  */
  await page.getByRole("textbox", { name: "Company", exact: true }).fill("Example Company");
  /*
  * Looking by label here conflicts with the Address 2 field inside Address 2 Information section.
  */
  await page
    .getByRole("textbox", 
        { 
          name: "Address * (Street address, P.O. Box, Company name, etc.)"
        })
    .fill("123 Example St");
  await page.getByRole("textbox", {name: "Address 2"}).fill("Apt 4B");
  await page.getByLabel("Country").selectOption("Canada");
  await page.getByLabel("State").fill("Example State");
  await page.getByLabel("City").fill("Example City");

  /*
  * Zipcode label is pointing to City field, so we have to use role here 
  * as we are updating the city field above.
  */
  await page.locator('#zipcode').fill("A1B 2C3");
  await page.getByLabel("Mobile Number").fill("123-456-7890");
  await page.getByRole("button", { name: "Create Account" }).click();
  });

  await checkTextElementIsVisible(page, "ACCOUNT CREATED!");

  await test.step("Continue after account creation", async () => {

  await page.getByRole("link", { name: "Continue" }).click();
  
  });
 await checkTextElementIsVisible(page, `Logged in as ${name}`);

  await test.step("Delete account", async () => {

  await page.getByRole("link", { name: "Delete Account" }).click();
  await setTimeout(2000) // Wait for 2 seconds to ensure the account deletion is processed
  });

  await checkTextElementIsVisible(page, "ACCOUNT DELETED!");

});
