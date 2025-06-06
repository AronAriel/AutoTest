const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { launchPage } = require('../../utils/setupPage');
const { CheckboxPage } = require('../../pages/CheckboxPage');
const { blockAds } = require('../../utils/adblock');

let browser, page, checkboxPage;

Given('I open the checkbox page', { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  checkboxPage = new CheckboxPage(page);
  await checkboxPage.goto();
});

When('I expand all checkboxes', async () => {
  await checkboxPage.expandAll();
});

When('I select the {string} checkbox', async (label) => {
  await checkboxPage.selectCheckbox(label);
});

Then('{string} checkbox should be checked', async (label) => {
  const isChecked = await checkboxPage.isCheckboxChecked(label);
  expect(isChecked).toBe(true);
  await browser.close();
});
