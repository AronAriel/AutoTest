const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { SelectMenuPage } = require("../../pages/SelectMenuPage.js");
const { blockAds } = require("../../utils/adblock");

let browser, page, selectMenu;

Given("I open the select menu page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  selectMenu = new SelectMenuPage(page);
  await selectMenu.goto({ waitUntil: "domcontentloaded" });
});

When("I select {string} from select value", async (option) => {
  await selectMenu.selectFromSelectValue(option);
});

When("I select {string} from select one", async (option) => {
  await selectMenu.selectFromSelectOne(option);
});

When("I select {string} from old select menu", async (option) => {
  await selectMenu.selectFromOldSelectMenuByText(option);
});

When(
  "I select multiple values from multi select dropdown: {string}",
  async (options) => {
    const opts = options.split(/,\s*/);
    await selectMenu.selectFromMultiSelectDropDown(opts);
  }
);
//TODO do not hard code elements in the step
// rewrite to the "Selected value in field {string} contain {value}" async(field, value) {
Then("the selected values should be correct", async () => {
  const selectValue = await selectMenu.getSelectedSelectValue();
  expect(selectValue?.trim()).toBe("Group 2, option 1");

  const selectOneValue = await selectMenu.getSelectedSelectOneValue();
  expect(selectOneValue?.trim()).toBe("Other");

  const oldSelectValue = await selectMenu.getSelectedOldSelectMenuValue();
  expect(oldSelectValue?.trim()).toBe("Green");

  const multiSelected = await selectMenu.getSelectedMultiSelectDropDownValues();
  expect(multiSelected).toEqual(expect.arrayContaining(["Black", "Blue"]));
  await browser.close();
});
