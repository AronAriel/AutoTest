const { test, expect } = require("@playwright/test");
const { AlertsPage } = require("../pages/AlertsPage");
const { blockAds } = require("../utils/adblock");

test.describe("Alerts on ToolsQA", () => {
  /** @type {import('../pages/AlertsPage').AlertsPage} */
  let alerts;

  test.beforeEach(async ({ page }) => {
    alerts = new AlertsPage(page);
    await blockAds(page);
    await alerts.goto();
  });

  test("Simple alert appears", async ({ page }) => {
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toBe("You clicked a button");
      await dialog.accept();
    });
    await alerts.clickAlertButton();
  });

  test("Delayed alert appears after 5 seconds", async ({ page }) => {
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBe("This alert appeared after 5 seconds");
      await dialog.accept();
    });
    await alerts.clickTimerAlertButton();
    await page.waitForTimeout(6000);
  });

  test("Confirm alert appears and is accepted", async ({ page }) => {
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toBe("Do you confirm action?");
      await dialog.accept();
    });
    await alerts.clickConfirmButton();
    await expect(alerts.confirmResult).toHaveText("You selected Ok");
  });

  test("Prompt alert appears and input is handled", async ({ page }) => {
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe("Please enter your name");
      await dialog.accept("Test User");
    });
    await alerts.clickPromptButton();
    await expect(alerts.promptResult).toHaveText("You entered Test User");
  });
});
