const { Given } = require("@cucumber/cucumber");
const { launchPage } = require("../../utils/setupPage");
const { blockAds } = require("../../utils/adblock");
const { BasePage } = require("../../pages/BasePage");

let browser, page;

Given("I open the page {string}", { timeout: 30000 }, async function (url) {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  const basePage = new BasePage(page);
  await basePage.open(url);

  this.browser = browser;
  this.page = page;
});
