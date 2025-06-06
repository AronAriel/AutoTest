const { BasePage } = require("./BasePage");

class DatePickerPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  dateInput = this.page.locator("#datePickerMonthYearInput");
  monthDropdown = this.page.locator(".react-datepicker__month-select");
  yearDropdown = this.page.locator(".react-datepicker__year-select");
  dayButton = (day) =>
    this.page.locator(
      `.react-datepicker__day:not(.react-datepicker__day--outside-month):has-text("${day}")`
    );

  async goto() {
    await this.open("https://demoqa.com/date-picker");
    await this.dateInput.waitFor({ state: "visible" });
  }

  /**
   * @param {string} dateString format: "06/15/2025"
   */
  async selectDate(dateString) {
    const [month, day, year] = dateString.split("/").map(Number);

    await this.dateInput.click();

    await this.yearDropdown.selectOption(String(year));
    await this.monthDropdown.selectOption(String(month - 1));

    const dayLocator = this.dayButton(day);
    await dayLocator.waitFor({ state: "visible", timeout: 3000 });
    await dayLocator.click();
  }

  async getSelectedDate() {
    return await this.dateInput.inputValue();
  }
}

module.exports = { DatePickerPage };
