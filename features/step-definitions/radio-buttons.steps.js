const { When, Then, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { RadioButtonPage } = require("../../pages/RadioButtonPage");

let radioButtonPage;

When("I navigate to the radio button page", { timeout: 20000 }, async function () {
  radioButtonPage = new RadioButtonPage(this.page);
  await radioButtonPage.goto();
});

When("I select the {string} radio button", { timeout: 10000 }, async function (label) {
  await radioButtonPage.selectRadio(label);
});

Then("the result should be {string}", async function (expected) {
  const actual = await radioButtonPage.getResultText();
  expect(actual).toBe(expected);
});

