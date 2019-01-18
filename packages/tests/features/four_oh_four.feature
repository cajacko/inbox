Feature: Four Oh Four
  As a user
  I want to be continue navigating the app when I go to a route that does not exist
  So that I can continue to manage my reminders

  Scenario: The user goes to a route that does not exist
    Given the driver is ready
    When the app is navigated to "/404"
    Then the error component is visible
    And the error code is "100-002"
    And the screenshot matches

  Scenario: Navigate to home after a 404

  # TODO: Handle this when we have some routes
  Scenario: Navigate back from a 404

  Scenario: No previous route to navigate back to on a 404

  # TODO: Handle this when we have some routes
  Scenario: Previous route is same route on a 404
