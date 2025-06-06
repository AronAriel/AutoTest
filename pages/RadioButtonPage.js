const { BasePage } = require("./BasePage");

class RadioButtonPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  radioLabel = (label) => this.page.locator(`label:has-text("${label}")`);
  resultText = this.page.locator(".text-success");

  async goto() {
    await this.open("https://demoqa.com/radio-button");
  }

  async selectRadio(label) {
    const radioButton = this.radioLabel(label);
    await radioButton.waitFor({ state: "visible", timeout: 10000 });
    await radioButton.click();
  }

  async getResultText() {
    return (await this.resultText.textContent()).trim();
  }
}

module.exports = { RadioButtonPage };
