Feature: Alerts

  @alerts
  Scenario: Simple alert appears
    Given I open the page "https://demoqa.com/alerts"
    When I navigate to the alerts page
    When I click the alert button
    Then I should see an alert with message "You clicked a button"

  @alerts
  Scenario: Delayed alert appears after 5 seconds
    Given I open the page "https://demoqa.com/alerts"
    When I navigate to the alerts page
    When I click the timer alert button
    Then I should see an alert with message "This alert appeared after 5 seconds"

  @alerts
  Scenario: Confirm alert appears and is accepted
    Given I open the page "https://demoqa.com/alerts"
    When I navigate to the alerts page
    When I click the confirm button
    And I accept the confirm alert
    Then the confirm result should be "You selected Ok"

  @alerts
  Scenario: Prompt alert appears and input is handled
    Given I open the page "https://demoqa.com/alerts"
    When I navigate to the alerts page
    When I click the prompt button
    And I enter "Test User" in the prompt alert
    Then the prompt result should be "You entered Test User"
