const { When, Then, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { FormPage } = require("../../pages/FormPage");

let formPage;

When("I navigate to the automation practice form page", { timeout: 20000 }, async function () {
  formPage = new FormPage(this.page);
  await formPage.goto({ waitUntil: "domcontentloaded" });
});

When("I fill all mandatory fields", { timeout: 20000 }, async function () {
  await formPage.fillMandatoryFields();
});

When("I submit the form", { timeout: 10000 }, async function () {
  await formPage.submitForm();
});

Then("I should see a modal with text {string}", { timeout: 10000 }, async function (expectedText) {
  await expect(formPage.modalTitle).toBeVisible({ timeout: 10000 });
  const modalText = await formPage.getModalText();
  expect(modalText).toContain(expectedText);
});

Then("the form fields should contain the entered data", async function () {
  expect(await formPage.firstName.inputValue()).toBe(formPage.fakeName);
  expect(await formPage.lastName.inputValue()).toBe(formPage.fakeSurname);
  expect(await formPage.email.inputValue()).toBe(formPage.fakeEmail);
  expect(await formPage.mobile.inputValue()).toBe(formPage.fakeMobile);
  expect(await formPage.address.inputValue()).toBe(formPage.fakeAddress);
});

