const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class TooltipsPage extends BasePage {
  constructor(page) {
    super(page);
  }

  elementsMap = {
    button: {
      elementSelector: "#toolTipButton",
      tooltipSelector: "#buttonToolTip .tooltip-inner",
    },
    textField: {
      elementSelector: "#toolTipTextField",
      tooltipSelector: "#textFieldToolTip .tooltip-inner",
    },
    contraryLink: {
      elementSelector: "#texToolTopContainer a:nth-child(1)",
      tooltipSelector: "#contraryTexToolTip .tooltip-inner",
    },
    sectionLink: {
      elementSelector: "#texToolTopContainer a:nth-child(2)",
      tooltipSelector: "#sectionToolTip .tooltip-inner",
    },
  };

  async goto() {
    await this.open("https://demoqa.com/tool-tips");
  }

  async hoverAndCheckTooltip(elementName, expectedText) {
    const elementData = this.elementsMap[elementName];
    if (!elementData) {
      throw new Error(`Unknown element name: ${elementName}`);
    }

    const element = this.page.locator(elementData.elementSelector);
    const tooltipSelector = elementData.tooltipSelector;

    await this.page.bringToFront();
    await element.scrollIntoViewIfNeeded();
    await this.page.waitForSelector(elementData.elementSelector, {
      state: "visible",
      timeout: 5000,
    });

    await element.hover();

    await this.page.waitForSelector(tooltipSelector, {
      state: "visible",
      timeout: 5000,
    });

    const tooltip = this.page.locator(tooltipSelector);
    const text = await tooltip.textContent();
    const trimmed = text?.trim();

    return trimmed === expectedText;
  }
}

module.exports = { TooltipsPage };
