const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { AlertsPage } = require("../../pages/AlertsPage");

let alerts;

When("I navigate to the alerts page", { timeout: 20000 }, async function () {
  alerts = new AlertsPage(this.page);
  await alerts.goto({ waitUntil: "domcontentloaded" });
});

When("I click the alert button", async function () {
  await alerts.clickAlertButton();
});

Then("I should see an alert with message {string}", async function (message) {
  this.page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe(message);
    await dialog.accept();
  });

  await this.page.waitForSelector("#alertButton", { state: "attached" });
});

When("I click the timer alert button", async function () {
  await alerts.clickTimerAlertButton();
  await this.page.waitForSelector("#timerAlertButton", { state: "attached" });
});

When("I click the confirm button", async function () {
  this.page.once("dialog", async (dialog) => {
    await dialog.accept();
  });

  await alerts.clickConfirmButton();
  await this.page.waitForSelector("#confirmResult", { state: "visible" });
});

Then("the confirm result should be {string}", async function (result) {
  const text = await alerts.getConfirmResult();
  expect(text).toContain(result);
});

When("I click the prompt button", async function () {
  this.page.once("dialog", async (dialog) => {
    await dialog.accept("Test User");
  });

  await alerts.clickPromptButton();
  await this.page.waitForSelector("#promptResult", { state: "visible" });
});

Then("the prompt result should be {string}", async function (result) {
  const text = await alerts.getPromptResult();
  expect(text).toContain(result);
});

When("I accept the confirm alert", async function () {
  this.page.once("dialog", async (dialog) => {
    await dialog.accept();
  });

  await alerts.clickConfirmButton();
  await this.page.waitForSelector("#confirmResult", { state: "visible" });
});

When("I enter {string} in the prompt alert", async function (input) {
  this.page.once("dialog", async (dialog) => {
    await dialog.accept(input);
  });

  await alerts.clickPromptButton();
  await this.page.waitForSelector("#promptResult", { state: "visible" });
});
