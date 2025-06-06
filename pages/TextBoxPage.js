const { faker } = require("@faker-js/faker");
const { BasePage } = require("./BasePage");

class TextBoxPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  fullNameInput = this.page.locator("#userName");
  emailInput = this.page.locator("#userEmail");
  currentAddressInput = this.page.locator("#currentAddress");
  permanentAddressInput = this.page.locator("#permanentAddress");
  submitButton = this.page.locator("#submit");
  outputBox = this.page.locator("#output");
  outputName = this.page.locator("#name");
  outputEmail = this.page.locator("#email");
  outputCurrentAddress = this.page.locator("p#currentAddress");
  outputPermanentAddress = this.page.locator("p#permanentAddress");

  async goto() {
    await this.open("https://demoqa.com/text-box");
  }

  async fillFormWithRandomData() {
    this.data = {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      currentAddress: faker.location.streetAddress(),
      permanentAddress: faker.location.secondaryAddress(),
    };

    await this.fullNameInput.fill(this.data.fullName);
    await this.emailInput.fill(this.data.email);
    await this.currentAddressInput.fill(this.data.currentAddress);
    await this.permanentAddressInput.fill(this.data.permanentAddress);
  }

  async submitForm() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  async getOutputData() {
    return {
      fullName: await this.outputName.textContent(),
      email: await this.outputEmail.textContent(),
      currentAddress: await this.outputCurrentAddress.textContent(),
      permanentAddress: await this.outputPermanentAddress.textContent(),
    };
  }
}

module.exports = { TextBoxPage };
