const { BasePage } = require("./BasePage");

class AlertsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  alertButton = this.page.locator("#alertButton");
  timerAlertButton = this.page.locator("#timerAlertButton");
  confirmButton = this.page.locator("#confirmButton");
  promptButton = this.page.locator("#promtButton");
  confirmResult = this.page.locator("#confirmResult");
  promptResult = this.page.locator("#promptResult");

  async goto() {
    await this.open("https://demoqa.com/alerts");
  }

  async clickAlertButton() {
    await this.alertButton.click();
  }

  async clickTimerAlertButton() {
    await this.timerAlertButton.click();
  }

  async clickConfirmButton() {
    await this.confirmButton.click();
  }

  async clickPromptButton() {
    await this.promptButton.click();
  }

  async getConfirmResult() {
    return this.confirmResult.textContent();
  }

  async getPromptResult() {
    return this.promptResult.textContent();
  }
}

module.exports = { AlertsPage };
