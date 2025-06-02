const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { blockAds } = require("../../utils/adblock");

let browser, page;

Given("I open the slider page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  await page.goto("https://demoqa.com/slider"),
    { timeout: 10000 },
    { waitUntil: "domcontentloaded" };
});

When("I move the slider to {string}", { timeout: 10000 }, async (value) => {
  await page.locator('input[type="range"]').fill(value);
});
//TODO remove locators to the PAGE OBJECT
Then(
  "the slider should show value {string}",
  { timeout: 10000 },
  async (expectedValue) => {
    const value = await page.locator("#sliderValue").inputValue();
    expect(value).toBe(expectedValue);
    await browser.close();
  }
);
