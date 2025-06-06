Feature: Date Picker

  @date
  Scenario: Select a specific date
    Given I open the date picker page
    When I select the date "06/15/2025"
    #TODO Why you do not use "Selected value in field {string} should contain {string}" ?
    Then the selected date should be "06/15/2025"
