const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { DragAndDropPage } = require("../../pages/DragAndDropPage");

let dragAndDropPage;

When("I navigate to the drag and drop page", { timeout: 40000 }, async function () {
  dragAndDropPage = new DragAndDropPage(this.page);
  await dragAndDropPage.goto();
});

When("I drag the source element to the target", { timeout: 30000 }, async () => {
  await dragAndDropPage.dragSourceToTarget();
});

Then("the drop should be successful", { timeout: 20000 }, async () => {
  const text = await dragAndDropPage.getDropResultText();
  expect(text).toBe("Dropped!");
});