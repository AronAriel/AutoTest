Feature: Select Menu

  @selectmenu
  Scenario: Dropdown selections work correctly
    Given I open the page "https://demoqa.com/select-menu"
    When I navigate to the select menu page
    When I select "Group 2, option 1" from select value
    And I select "Other" from select one
    And I select "Green" from old select menu
    And I select multiple values from multi select dropdown: "Black, Blue"
    Then Selected value in field "select value" should contain "Group 2, option 1"
    And Selected value in field "select one" should contain "Other"
    And Selected value in field "old select menu" should contain "Green"
    And Selected value in field "multi select dropdown" should contain "Black"
    And Selected value in field "multi select dropdown" should contain "Blue"
