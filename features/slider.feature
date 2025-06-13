Feature: Slider

  @slider
  Scenario: Slide to 75
    Given I open the page "https://demoqa.com/slider"
    When I navigate to the slider page
    When I move the slider to "75"
    Then the slider should show value "75"
