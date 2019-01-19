Feature: Splash Screen
  As a user
  I want to see a loading screen when the app is initialising
  So that I know the app is working

  Scenario: The splash screen shows whilst the app is loading
    Given we add a hook with id "splashScreen" and type "stall"
    And the driver is ready
    When the app is navigated to "/"
    Then the splash screen "is" visible

  Scenario: The splash screen hides when content is ready
    Given the driver is ready
    When the app is navigated to "/"
    Then the splash screen "is not" visible
    And the home route is visible

  # Dont check the error code, as that should be covered by the module which
  # failed to load. Here just check an error is show
  Scenario: An error is displayed when the splash screen encounters an error
    Given we add a hook with id "splashScreen" and type "error"
    And the driver is ready
    When the app is navigated to "/"
    Then the splash screen "is not" visible
    And the error component "is" visible

  Scenario: If the app takes too long to load and error is shown
    Given we add a hook with id "splashScreen" and type "stall"
    And the driver is ready
    When the app is navigated to "/"
    Then the splash screen "is" visible
    And the error component "will be" visible
    And the error code "will be" "100-009"

  Scenario: When app loading completes after the timeout error, the content is shown
    Given we add a hook with id "splashScreen" and type "stall"
    And the driver is ready
    When the app is navigated to "/"
    Then the splash screen "is" visible
    And the error component "is" visible
    And the error code "will be" "100-009"
    And the splash screen "will not be" visible
    And the home route is visible
