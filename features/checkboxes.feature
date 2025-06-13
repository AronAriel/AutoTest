Feature: Checkboxes

  This feature verifies selecting checkboxes and validating their state.

  @checkboxes @smoke
  Scenario Outline: Select and validate a checkbox
    Given I open the page "https://demoqa.com/checkbox"
    When I navigate to the checkbox page
    When I expand all checkboxes
    And I select the "<checkbox>" checkbox
    Then "<checkbox>" checkbox should be checked

  Examples:
    | checkbox        |
    | Notes           |
    | Angular         |
    | General         |
    | Excel File.doc  |
    | Word File.doc   |