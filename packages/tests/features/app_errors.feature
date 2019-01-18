Feature: App Errors
  As a user
  I want to be able to use the app even when it has crashed
  So that I can manage my reminders

  Scenario: The app opens to the home scene
    Given the driver is ready
    When the app is navigated to "/"
    Then the error component is visible
    And the error code is "100-001"
    And the screenshot matches

  Scenario: The app has crashed at the root
    Given we have told the app to crash at the root
    And the driver is ready
    When the app is navigated to "/"
    Then the error component is visible
    And the screenshot matches

  Scenario: (Web) The user does not have JavaScript enabled
  Scenario: (Web) The JavaScript bundles failed to load
  Scenario: (Web) The JavaScript bundles timeout when loading
  Scenario: App Loading crashes
  Scenario: App Loading times out
  Scenario: The main router crashes
  Scenario: The entry route crashes

  Scenario: The user goes to a route that does not exist
    Given the driver is ready
    When the app is navigated to "/404"
    Then the error component is visible
    And the error code is "100-002"
    And the screenshot matches

  Scenario: Navigate to home after a 404
  Scenario: Navigate back from a 404
  Scenario: No previous route to navigate back to on a 404
  Scenario: Previous route is same route on a 404
