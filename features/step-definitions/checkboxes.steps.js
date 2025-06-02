const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");

let browser, page;
// TODO You are using timeout waiter 20000 is it really usefully? may be better to use
//Use "domcontentloaded" for pages where you need to start testing immediately after the DOM has loaded.
// Use "load" for pages where it is important to wait for all resources to load (for example, if the test depends on images or external scripts).
// Use "networkidle" for pages with dynamic content where you need to wait for all network requests to complete.
// What step usually happens after the page loads? Maybe it's worth adding a separate step to check the visibility and presence of an element on the page?
Given("I open the checkbox page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await page.goto("https://demoqa.com/checkbox", {
    waitUntil: "domcontentloaded",
  });
});
//TODO remove locators to the PAGE OBJECT
When("I expand all checkboxes", async () => {
  await page.click('button[title="Expand all"]');
});
//TODO maybe change to the "I select the....
When("I check the {string} checkbox", { timeout: 10000 }, async (label) => {
  const labelLocator = page.locator(`.rct-node >> text=${label}`);
  await labelLocator.waitFor({ state: "visible", timeout: 10000 });
  await labelLocator.click();
});
//TODO remove locators to the PAGE OBJECT
Then("{string} checkbox should be checked", async (label) => {
  const checked = await page
    .locator(`.rct-node >> text=${label}`)
    .locator("..")
    .locator(".rct-icon-check")
    .isVisible();
  expect(checked).toBe(true);
  await browser.close();
});
