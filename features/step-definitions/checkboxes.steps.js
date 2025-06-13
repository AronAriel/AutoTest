const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { CheckboxPage } = require('../../pages/CheckboxPage');

let checkboxPage;

When('I navigate to the checkbox page', { timeout: 20000 }, async function () {
  checkboxPage = new CheckboxPage(this.page);
  await checkboxPage.goto();
});

When('I expand all checkboxes', async function () {
  await checkboxPage.expandAll();
});

When('I select the {string} checkbox', async function (label) {
  await checkboxPage.selectCheckbox(label);
});

Then('{string} checkbox should be checked', async function (label) {
  const isChecked = await checkboxPage.isCheckboxChecked(label);
  expect(isChecked).toBe(true);
});
