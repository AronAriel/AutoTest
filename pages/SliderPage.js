const { BasePage } = require("./BasePage");

class SliderPage extends BasePage {
  constructor(page) {
    super(page);
  }

  slider = this.page.locator('input[type="range"]');
  sliderOutput = this.page.locator("#sliderValue");

  async goto() {
    await this.open("https://demoqa.com/slider");
  }

  async setSliderValue(value) {
    await this.slider.waitFor({ state: "visible", timeout: 5000 });
    await this.slider.fill(value);
  }

  async getSliderValue() {
    return await this.sliderOutput.inputValue();
  }
}

module.exports = { SliderPage };
