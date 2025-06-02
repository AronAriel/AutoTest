const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { launchPage } = require("../../utils/setupPage");
const { blockAds } = require("../../utils/adblock");

let page;
let browser;

Given("I open the date picker page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  await page.goto("https://demoqa.com/date-picker", {
    waitUntil: "domcontentloaded",
  });
});
//TODO remove locators to the PAGE OBJECT
When("I select the date {string}", { timeout: 15000 }, async function (date) {
  const input = page.locator("#datePickerMonthYearInput");
  await input.waitFor({ state: "visible", timeout: 10000 });
  await input.click();
  await input.fill("");
  await input.type(date);
  await input.press("Enter");
  await page.waitForTimeout(1000);
});
//TODO remove locators to the PAGE OBJECT
Then(
  "the selected date should be {string}",
  { timeout: 10000 },
  async function (expectedDate) {
    const input = page.locator("#datePickerMonthYearInput");
    const value = await input.inputValue();
    expect(value).toBe(expectedDate);
    await browser.close();
  }
);
