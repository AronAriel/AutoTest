Feature: Automation Practice Form
#TODO How do you check random data filled on the form?
  @form
  Scenario: Fill mandatory fields and submit form successfully
    Given I open the automation practice form page
    When I fill all mandatory fields
    And I submit the form
    Then I should see a modal with text "Thanks for submitting the form"
