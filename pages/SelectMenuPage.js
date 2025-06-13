const { BasePage } = require("./BasePage");

class SelectMenuPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.selectValueDropdown = this.page.locator("#withOptGroup");
    this.selectValueMenu = this.page.locator(
      "xpath=//div[contains(@class, 'menu') and contains(@class, 'css')]"
    );

    this.selectValueResult = this.page.locator(
      "xpath=//*[@id='withOptGroup']//*[contains(@class, 'singleValue')]"
    );

    this.selectOneDropdown = this.page.locator("#selectOne");
    this.selectOneMenu = this.page.locator(
      "xpath=//div[contains(@class, 'menu') and contains(@class, 'css')]"
    );
    this.selectOneResult = this.page.locator(
      "xpath=//*[@id='selectOne']//*[contains(@class, 'singleValue')]"
    );

    this.oldSelectMenuDropdown = this.page.locator("#oldSelectMenu");

    this.multiSelectInput = this.page.locator("#react-select-4-input");
    this.multiSelectMenu = this.page.locator(
      "xpath=//div[contains(@class, 'menu') and contains(@class, 'css')]"
    );
    this.multiSelectValues = this.page.locator(
      "//div[contains(@class, '-multiValue')]/div[contains(text(), '')]"
    );

    this.carsDropdown = this.page.locator("#cars");
  }

  async goto() {
    await this.open("https://demoqa.com/select-menu");
  }

  async selectFromSelectValue(optionText) {
    await this.selectValueDropdown.click();
    await this.page
      .locator(
        `//div[contains(@class, 'menu') and contains(@class, 'css')]//div[contains(text(),"${optionText}")]`
      )
      .click();
  }

  async getSelectedSelectValue() {
    return (await this.selectValueResult.textContent()).trim();
  }

  async selectFromSelectOne(optionText) {
    await this.selectOneDropdown.click();
    await this.page
      .locator(
        `//div[contains(@class, 'menu') and contains(@class, 'css')]//div[contains(text(),"${optionText}")]`
      )
      .click();
  }

  async getSelectedSelectOneValue() {
    return (await this.selectOneResult.textContent()).trim();
  }

  async selectFromOldSelectMenuByText(optionText) {
    const value = await this.oldSelectMenuDropdown
      .locator("option", { hasText: optionText })
      .evaluate((option) => option.value);

    if (!value) throw new Error(`Option with text "${optionText}" not found`);

    await this.oldSelectMenuDropdown.selectOption(value);
  }

  async getSelectedOldSelectMenuValue() {
    return (
      await this.oldSelectMenuDropdown.locator("option:checked").textContent()
    ).trim();
  }

  async selectFromMultiSelectDropDown(options) {
    for (const option of options) {
      await this.multiSelectInput.fill(option);
      await this.page
        .locator(
          `//div[contains(@class, 'menu') and contains(@class, 'css')]//div[contains(text(),"${option}")]`
        )
        .click();
    }
  }

  async getSelectedMultiSelectDropDownValues() {
    await this.multiSelectValues
      .first()
      .waitFor({ state: "visible", timeout: 2000 });
    const values = await this.multiSelectValues.allTextContents();
    return values.map((v) => v.trim());
  }

  async selectMultipleCars(options) {
    await this.carsDropdown.waitFor({ state: "visible" });

    for (const option of options) {
      await this.carsDropdown
        .locator(`option[value="${option}"]`)
        .waitFor({ state: "visible" });
    }

    await this.carsDropdown.selectOption(options);
  }

  async getSelectedCarsValues() {
    return this.carsDropdown.locator("option:checked").allTextContents();
  }
}

module.exports = { SelectMenuPage };
