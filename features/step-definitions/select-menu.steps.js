const { Given, When, Then, After } = require("@cucumber/cucumber");
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

When("I select multiple values from multi select dropdown: {string}", async (options) => {
  const opts = options.split(/,\s*/);
  await selectMenu.selectFromMultiSelectDropDown(opts);
});

Then("Selected value in field {string} should contain {string}", async (field, expectedValue) => {
  const fieldNameMap = {
    "select value": () => selectMenu.getSelectedSelectValue(),
    "select one": () => selectMenu.getSelectedSelectOneValue(),
    "old select menu": () => selectMenu.getSelectedOldSelectMenuValue(),
    "multi select dropdown": () => selectMenu.getSelectedMultiSelectDropDownValues(),
    "cars": () => selectMenu.getSelectedCarsValues(),
  };

  const getter = fieldNameMap[field.toLowerCase()];
  if (!getter) {
    throw new Error(`Unknown field name: "${field}". Valid keys are: ${Object.keys(fieldNameMap).join(", ")}`);
  }

  const actual = await getter();

  if (Array.isArray(actual)) {
    expect(actual).toEqual(expect.arrayContaining([expectedValue]));
  } else {
    expect(actual?.trim()).toContain(expectedValue);
  }
});

After(async () => {
  if (browser) {
    await browser.close();
  }
});
