import { test as base } from "@playwright/test";
import { WebPage } from "../../pages";

type MyFixtures = {
  webPage: WebPage;
};

export const test = base.extend<MyFixtures>({
  webPage: async ({ page }, use) => {
    const webPage = new WebPage(page);
    await use(webPage);
  },
});
