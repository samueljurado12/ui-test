import { test as base } from "@playwright/test";
import { WebPage } from "../../pages";
import { generateRandomUser } from "../../utils";
import { UserData } from "../../models";

type MyFixtures = {
  webPage: WebPage;
  userData: UserData;
};

export const test = base.extend<MyFixtures>({
  webPage: async ({ page }, use) => {
    const webPage = new WebPage(page);
    await use(webPage);
  },

  userData: async ({}, use) => {
    const userData = generateRandomUser();
    await use(userData);
  },
});
