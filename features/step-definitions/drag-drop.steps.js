const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { blockAds } = require("../../utils/adblock");

let browser, page;

Given("I open the drag and drop page", { timeout: 40000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);

  await page.goto("https://demoqa.com/droppable", { waitUntil: "domcontentloaded" });
  console.log("page loaded");

  await page.waitForLoadState("domcontentloaded");

  await page.evaluate(() => {
    const fixedBan = document.querySelector("#fixedban");
    const footer = document.querySelector("footer");
    if (fixedBan) fixedBan.remove();
    if (footer) footer.remove();
  });

  const simpleTab = page.locator("#droppableExample-tab-simple");
  if (await simpleTab.isVisible()) {
    await simpleTab.click();
    console.log("simple tab clicked");
  }

  await page.waitForTimeout(2000);
});
//TODO remove locators to the PAGE OBJECT
When(
  "I drag the source element to the target",
  { timeout: 30000 },
  async () => {
    const container = page.locator("#droppableExample-tabpane-simple");
    await container.waitFor({ state: "visible", timeout: 20000 });

    const source = container.locator("#draggable");
    const target = container.locator("#droppable").nth(0);

    await source.waitFor({ state: "visible", timeout: 20000 });
    await target.waitFor({ state: "visible", timeout: 20000 });

    await source.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const sourceBound = await source.boundingBox();
    const targetBound = await target.boundingBox();

    if (!sourceBound || !targetBound) {
      throw new Error("resource bounding box not found");
    }

    await page.mouse.move(
      sourceBound.x + sourceBound.width / 2,
      sourceBound.y + sourceBound.height / 2
    );
    await page.mouse.down();
    await page.mouse.move(
      targetBound.x + targetBound.width / 2,
      targetBound.y + targetBound.height / 2
    );
    await page.mouse.up();

    await page.waitForTimeout(2000);
  }
);

Then("the drop should be successful", { timeout: 20000 }, async () => {
  const dropText = await page
    .locator("#droppableExample-tabpane-simple #droppable p")
    .textContent();

  expect(dropText.trim()).toBe("Dropped!");

  await browser.close();
});
