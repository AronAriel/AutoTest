const { When, Then, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { TextBoxPage } = require("../../pages/TextBoxPage");

let textBox;

When("I navigate to the text box page", { timeout: 20000 }, async function () {
  textBox = new TextBoxPage(this.page);
  await textBox.goto({ waitUntil: "domcontentloaded" });
});

When("I fill the text box form with random data", { timeout: 10000 }, async function () {
  await textBox.fillFormWithRandomData();
});

When("I submit the text box form", { timeout: 10000 }, async function () {
  await textBox.submitForm();
});

Then("the output should match the input data", { timeout: 10000 }, async function () {
  const output = await textBox.getOutputData();
  const input = textBox.data;
  expect(output.fullName).toContain(input.fullName);
  expect(output.email).toContain(input.email);
  expect(output.currentAddress).toContain(input.currentAddress);
  expect(output.permanentAddress).toContain(input.permanentAddress);
});

