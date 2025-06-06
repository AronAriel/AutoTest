const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { blockAds } = require("../../utils/adblock");
const { DatePickerPage } = require("../../pages/DatePickerPage");

let page;
let browser;
let datePickerPage;

Given("I open the date picker page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  datePickerPage = new DatePickerPage(page);
  await datePickerPage.goto();
});

When("I select the date {string}", { timeout: 15000 }, async (date) => {
  await datePickerPage.selectDate(date);
});

Then("the selected date should be {string}", { timeout: 10000 }, async (expectedDate) => {
  const actualDate = await datePickerPage.getSelectedDate();
  expect(actualDate).toBe(expectedDate);
  await browser.close();
});
