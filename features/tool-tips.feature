Feature: Tool Tips

  @tooltips
    #TODO remove locators to the PAGE OBJECT
  Scenario: Check all tooltips
    Given I open the tool tips page
    Then the tooltip for "#toolTipButton" should be "You hovered over the Button"
    And the tooltip for "#toolTipTextField" should be "You hovered over the text field"
    And the tooltip for "#texToolTopContainer a:nth-child(1)" should be "You hovered over the Contrary"
    And the tooltip for "#texToolTopContainer a:nth-child(2)" should be "You hovered over the 1.10.32"
