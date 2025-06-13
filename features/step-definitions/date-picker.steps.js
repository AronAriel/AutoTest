const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { DatePickerPage } = require("../../pages/DatePickerPage");

let datePickerPage;

When("I select the date {string}", { timeout: 15000 }, async function (date) {
  datePickerPage = new DatePickerPage(this.page);
  await datePickerPage.selectDate(date);
});

Then(
  "selected value in field {string} should contain {string}",
  { timeout: 10000 },
  async function (fieldId, expectedValue) {
    const input = this.page.locator(`#${fieldId}`);
    await expect(input).toHaveValue(expectedValue);
  }
);
