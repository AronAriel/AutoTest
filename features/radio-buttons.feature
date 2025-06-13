Feature: Radio Buttons

  @radio
  Scenario: Select "Yes" radio button
    Given I open the page "https://demoqa.com/radio-button"
    When I navigate to the radio button page
    When I select the "Yes" radio button
    Then the result should be "Yes"

  Scenario: Select "Impressive" radio button
    Given I open the page "https://demoqa.com/radio-button"
    When I navigate to the radio button page
    When I select the "Impressive" radio button
    Then the result should be "Impressive"
