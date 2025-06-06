const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { blockAds } = require("../../utils/adblock");
const { DragAndDropPage } = require("../../pages/DragAndDropPage");

let browser, page, dragAndDropPage;

Given("I open the drag and drop page", { timeout: 40000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  dragAndDropPage = new DragAndDropPage(page);
  await dragAndDropPage.goto();
});

When("I drag the source element to the target", { timeout: 30000 }, async () => {
  await dragAndDropPage.dragSourceToTarget();
});

Then("the drop should be successful", { timeout: 20000 }, async () => {
  const text = await dragAndDropPage.getDropResultText();
  expect(text).toBe("Dropped!");
  await browser.close();
});
