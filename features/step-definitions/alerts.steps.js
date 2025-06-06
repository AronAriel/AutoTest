const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { AlertsPage } = require("../../pages/AlertsPage");
const { blockAds } = require("../../utils/adblock");

let browser, page, alerts;

Given("I open the alerts page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  alerts = new AlertsPage(page);
  await alerts.goto({ waitUntil: "domcontentloaded" });
});

When("I click the alert button", async () => {
  await alerts.clickAlertButton();
});

Then("I should see an alert with message {string}", async (message) => {
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe(message);
    await dialog.accept();
  });

  await page.waitForSelector("#alertButton", { state: "attached" });
  await browser.close();
});

When("I click the timer alert button", async () => {
  await alerts.clickTimerAlertButton();
  await page.waitForSelector("#timerAlertButton", { state: "attached" });
});

When("I click the confirm button", async () => {
  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });
  await alerts.clickConfirmButton();
  await page.waitForSelector("#confirmResult", { state: "visible" });
});

Then("the confirm result should be {string}", async (result) => {
  const text = await alerts.getConfirmResult();
  expect(text).toContain(result);
  await browser.close();
});

When("I click the prompt button", async () => {
  page.once("dialog", async (dialog) => {
    await dialog.accept("Test User");
  });
  await alerts.clickPromptButton();
  await page.waitForSelector("#promptResult", { state: "visible" });
});

Then("the prompt result should be {string}", async (result) => {
  const text = await alerts.getPromptResult();
  expect(text).toContain(result);
  await browser.close();
});

When("I accept the confirm alert", async () => {
  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });

  await alerts.clickConfirmButton();
  await page.waitForSelector("#confirmResult", { state: "visible" });
});

When("I enter {string} in the prompt alert", async (input) => {
  page.once("dialog", async (dialog) => {
    await dialog.accept(input);
  });

  await alerts.clickPromptButton();
  await page.waitForSelector("#promptResult", { state: "visible" });
});
