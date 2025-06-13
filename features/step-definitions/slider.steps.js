const { When, Then, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { SliderPage } = require("../../pages/SliderPage");

let sliderPage;

When("I navigate to the slider page", { timeout: 20000 }, async function () {
  sliderPage = new SliderPage(this.page);
  await sliderPage.goto();
});

When("I move the slider to {string}", { timeout: 10000 }, async function (value) {
  await sliderPage.setSliderValue(value);
});

Then("the slider should show value {string}", { timeout: 10000 }, async function (expectedValue) {
  const actualValue = await sliderPage.getSliderValue();
  expect(actualValue).toBe(expectedValue);
});

