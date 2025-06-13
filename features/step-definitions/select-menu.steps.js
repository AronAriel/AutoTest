const { When, Then, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { SelectMenuPage } = require("../../pages/SelectMenuPage.js");

let selectMenu;

When("I navigate to the select menu page", { timeout: 20000 }, async function () {
  selectMenu = new SelectMenuPage(this.page);
  await selectMenu.goto({ waitUntil: "domcontentloaded" });
});

When("I select {string} from select value", async function (option) {
  await selectMenu.selectFromSelectValue(option);
});

When("I select {string} from select one", async function (option) {
  await selectMenu.selectFromSelectOne(option);
});

When("I select {string} from old select menu", async function (option) {
  await selectMenu.selectFromOldSelectMenuByText(option);
});

When("I select multiple values from multi select dropdown: {string}", async function (options) {
  const opts = options.split(/,\s*/);
  await selectMenu.selectFromMultiSelectDropDown(opts);
});

Then("Selected value in field {string} should contain {string}", async function (field, expectedValue) {
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

