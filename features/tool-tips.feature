Feature: Tool Tips

  @tooltips
  Scenario: Check all tooltips
    Given I open the page "https://demoqa.com/tooltips"
    When I navigate to the tool tips page
    Then the tooltip for "button" should be "You hovered over the Button"
    And the tooltip for "textField" should be "You hovered over the text field"
    And the tooltip for "contraryLink" should be "You hovered over the Contrary"
    And the tooltip for "sectionLink" should be "You hovered over the 1.10.32"
