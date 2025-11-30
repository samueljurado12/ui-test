import { test } from "@playwright/test";
import { generateRandomUser, selectRandomFromArray } from "../utils";
import { checkTextElementIsVisible, signUp } from "./helpers";
import { setTimeout } from "timers/promises";
import { WebPage } from "../pages/webpage";
import { goToSignupLogin, loadPage } from "./helpers";

test("Register user", async ({ page }) => {
  const webPage = new WebPage(page);
  
  await loadPage(webPage);
  
  await goToSignupLogin(webPage);
  
  await checkTextElementIsVisible(webPage, "New User Signup!");

  const userData = generateRandomUser();

  await signUp(webPage, userData);

  await checkTextElementIsVisible(webPage, "ENTER ACCOUNT INFORMATION");

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
  await page.getByLabel("First name").fill(userData.firstName);
  await page.getByLabel("Last name").fill(userData.lastName);
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

  await checkTextElementIsVisible(webPage, "ACCOUNT CREATED!");

  await test.step("Continue after account creation", async () => {

  await page.getByRole("link", { name: "Continue" }).click();
  
  });
 await checkTextElementIsVisible(webPage, `Logged in as ${name}`);

  await test.step("Delete account", async () => {

  await page.getByRole("link", { name: "Delete Account" }).click();
  await setTimeout(2000) // Wait for 2 seconds to ensure the account deletion is processed
  });

  await checkTextElementIsVisible(webPage, "ACCOUNT DELETED!");

});
