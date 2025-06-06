const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { blockAds } = require("../../utils/adblock");
const { SliderPage } = require("../../pages/SliderPage");

let browser, page, sliderPage;

Given("I open the slider page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  sliderPage = new SliderPage(page);
  await sliderPage.goto();
});

When("I move the slider to {string}", { timeout: 10000 }, async (value) => {
  await sliderPage.setSliderValue(value);
});

Then("the slider should show value {string}", { timeout: 10000 }, async (expectedValue) => {
  const actualValue = await sliderPage.getSliderValue();
  expect(actualValue).toBe(expectedValue);
  await browser.close();
});
