const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { blockAds } = require("../../utils/adblock");
const { RadioButtonPage } = require("../../pages/RadioButtonPage");

let browser, page, radioButtonPage;

Given("I open the radio button page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  radioButtonPage = new RadioButtonPage(page);
  await radioButtonPage.goto();
});

When("I select the {string} radio button", { timeout: 10000 }, async (label) => {
  await radioButtonPage.selectRadio(label);
});

Then("the result should be {string}", async (expected) => {
  const actual = await radioButtonPage.getResultText();
  expect(actual).toBe(expected);
  await browser.close();
});
