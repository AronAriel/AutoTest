Feature: Date Picker

  @date
  Scenario: Select a specific date
    Given I open the page "https://demoqa.com/date-picker"
    When I select the date "06/15/2025"
    Then selected value in field "datePickerMonthYearInput" should contain "06/15/2025"