const { Given, When, Then, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { FormPage } = require("../../pages/FormPage");
const { blockAds } = require("../../utils/adblock");

let browser, page, formPage;

Given(
  "I open the automation practice form page",
  { timeout: 20000 },
  async () => {
    ({ browser, page } = await launchPage());
    await blockAds(page);
    formPage = new FormPage(page);
    await formPage.goto({ waitUntil: "domcontentloaded" });
  }
);

When("I fill all mandatory fields", { timeout: 20000 }, async () => {
  await formPage.fillMandatoryFields();
});

When("I submit the form", { timeout: 10000 }, async () => {
  await formPage.submitForm();
});

Then(
  "I should see a modal with text {string}",
  { timeout: 10000 },
  async (expectedText) => {
    await expect(formPage.modalTitle).toBeVisible({ timeout: 10000 });
    const modalText = await formPage.getModalText();
    expect(modalText).toContain(expectedText);
  }
);

Then("the form fields should contain the entered data", async () => {
  expect(await formPage.firstName.inputValue()).toBe(formPage.fakeName);
  expect(await formPage.lastName.inputValue()).toBe(formPage.fakeSurname);
  expect(await formPage.email.inputValue()).toBe(formPage.fakeEmail);
  expect(await formPage.mobile.inputValue()).toBe(formPage.fakeMobile);
  expect(await formPage.address.inputValue()).toBe(formPage.fakeAddress);
});

After(async () => {
  if (browser) {
    await browser.close();
  }
});
