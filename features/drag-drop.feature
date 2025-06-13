Feature: Drag and Drop

  @drag
  Scenario: Drag the box to the drop zone
    Given I open the page "https://demoqa.com/droppable"
    When I navigate to the drag and drop page
    When I drag the source element to the target
    Then the drop should be successful
