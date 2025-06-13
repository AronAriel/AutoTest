const { When, Then, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { TooltipsPage } = require("../../pages/ToolTipsPage");

let tooltipsPage;

When("I navigate to the tool tips page", { timeout: 20000 }, async function () {
  tooltipsPage = new TooltipsPage(this.page);
  await tooltipsPage.goto({ waitUntil: "domcontentloaded" });
});

Then("the tooltip for {string} should be {string}", { timeout: 15000 }, async function (selector, expectedText) {
  const result = await tooltipsPage.hoverAndCheckTooltip(selector, expectedText);
  expect(result).toBe(true);
});

