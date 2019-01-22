Feature: App Errors
  As a user
  I want to be able to use the app even when it has crashed
  So that I can manage my reminders

  Scenario: The app opens to the home scene
    Given the driver is ready
    When the app is navigated to "/"
    Then the "logged out" home route "is" visible
    And the screenshot matches

  Scenario: The app has crashed at the root
    Given we add a hook with id "root" and type "crash"
    And the driver is ready
    When the app is navigated to "/"
    Then the error component "is" visible
    And the error code "is" "100-004"
    And the screenshot matches

  @web
  Scenario: (Web) The user does not have JavaScript enabled
    Given we add a hook with id "javascript" and type "off"
    And the driver is ready
    When the app is navigated to "/"
    Then the error component "is" visible
    And the error code "is" "100-005"
    And the screenshot matches

  @web
  Scenario: (Web) The JavaScript bundles failed to load
    Given we add a hook with id "javascript" and type "networkError"
    And the driver is ready
    When the app is navigated to "/"
    Then the error component "is" visible
    And the error code "is" "100-006"
    And the screenshot matches

  @web
  Scenario: (Web) The JavaScript bundles takes very long to load
  # Is no timeout, just loads indefinitely because the users internet may be
  # shit. Keep this scenario though so we know what to expect
  # TODO: Could show an error after a while, and still load afterwards

  Scenario: The main router crashes
    Given we add a hook with id "mainRouter" and type "crash"
    And the driver is ready
    When the app is navigated to "/"
    Then the error component "is" visible
    And the error code "is" "100-007"
    And the screenshot matches

  # TODO: Handle this when we have some routes
  Scenario: The entry route crashes
