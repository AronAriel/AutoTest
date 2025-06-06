class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * @param {string} url
   */
  async open(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}

module.exports = { BasePage };
