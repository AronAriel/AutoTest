const { chromium } = require("playwright");
const { setDefaultTimeout, Before, After } = require("@cucumber/cucumber");
setDefaultTimeout(20 * 1000);

let browser;
let page;

async function getPage() {
  if (!browser) {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
  }
  return page;
}

Before(async function () {
  if (!browser) {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
  }
  this.page = page;
  this.closeBrowser = async () => {
    if (browser) {
      await browser.close();
      browser = null;
      page = null;
    }
  };
});

After(async function () {
  await this.closeBrowser();
});

module.exports = { getPage };
