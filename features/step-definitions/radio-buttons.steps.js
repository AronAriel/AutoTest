const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { blockAds } = require("../../utils/adblock");

let browser, page;

Given("I open the radio button page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  await page.goto("https://demoqa.com/radio-button", {
    waitUntil: "domcontentloaded",
  });
});
//TODO remove locators to the PAGE OBJECT
When(
  "I select the {string} radio button",
  { timeout: 10000 },
  async (label) => {
    const radioButton = page.locator(`label:has-text("${label}")`);
    await radioButton.waitFor({ state: "visible", timeout: 10000 });
    await radioButton.click();
  }
);

Then("the result should be {string}", async (expected) => {
  const result = await page.locator(".text-success").textContent();
  expect(result.trim()).toBe(expected);
  await browser.close();
});
