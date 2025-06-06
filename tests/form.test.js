const { test, expect } = require("@playwright/test");
const { FormPage } = require("../pages/FormPage");
const { blockAds } = require("../utils/adblock");

test.describe("Automation Practice Form", () => {
  test("should fill mandatory fields and submit form successfully", async ({
    page,
  }) => {

    const formPage = new FormPage(page);
    await blockAds(page);

    await formPage.goto();
    await formPage.fillMandatoryFields();
    await formPage.submitForm();

    await expect(formPage.modalTitle).toBeVisible({ timeout: 10000 });
    const modalText = await formPage.getModalText();
    expect(modalText).toContain("Thanks for submitting the form");
  });
});
