import { test, expect } from "@playwright/test";
import { TooltipsPage } from "../pages/ToolTipsPage";
import { blockAds } from "../utils/adblock.js";

test("Check all tooltips", async ({ page }) => {
  const tooltipsPage = new TooltipsPage(page);
  await blockAds(page);
  await tooltipsPage.goto();

  expect(
    await tooltipsPage.hoverAndCheckTooltip("button", "You hovered over the Button")
  ).toBe(true);

  expect(
    await tooltipsPage.hoverAndCheckTooltip("textField", "You hovered over the text field")
  ).toBe(true);

  expect(
    await tooltipsPage.hoverAndCheckTooltip("contraryLink", "You hovered over the Contrary")
  ).toBe(true);

  expect(
    await tooltipsPage.hoverAndCheckTooltip("sectionLink", "You hovered over the 1.10.32")
  ).toBe(true);
});
