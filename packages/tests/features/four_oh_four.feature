Feature: Four Oh Four
  As a user
  I want to be continue navigating the app when I go to a route that does not exist
  So that I can continue to manage my reminders

  Scenario: No previous route to navigate back to on a 404
  Scenario: The user goes to a route that does not exist
    Given the driver is ready
    When the app is navigated to "/404"
    Then the error component "is" visible
    And the error code "is" "100-002"
    Then there are "1" error buttons
    And the "1st" error button has the text "GO TO HOME"
    And the screenshot matches

  # TODO: Handle this when we have some routes
  Scenario: The user starts at a valid route then goes to a 404
  # Given the driver is ready
  # When the app is navigated to "/route-that-exists"
  # And the app is navigated to "/404"
  # Then there are "2" error buttons
  # And the "1st" error button has the text "GO TO HOME"
  # And the "2nd" error button has the text "GO BACK"
  # And the screenshot matches

  # 404 visuals covered by previous scenario
  Scenario: Navigate to home after a 404
    Given the driver is ready
    When the app is navigated to "/404"
    Then the error code "is" "100-002"
    When the "1st" error button is pressed
    Then the "logged out" home route "is" visible

  # TODO: Handle this when we have some routes
  Scenario: Navigate back from a 404 with history
  # Given the driver is ready
  # When the app is navigated to "/route-that-exists"
  # And the app is navigated to "/404"
  # And the "2nd" error button is pressed
  # Then the route is "/route-that-exists"

  # TODO: Handle this when we have some routes
  Scenario: Navigate to home from a 404 with history
  # Given the driver is ready
  # When the app is navigated to "/route-that-exists"
  # And the app is navigated to "/404"
  # And the "1st" error button is pressed
  # Then the "logged out" home route is visible

  Scenario: Previous route is same route on a 404 does not show back button
    Given the driver is ready
    When the app is navigated to "/404"
    And the app is navigated to "/404"
    Then there are "1" error buttons
    And the "1st" error button has the text "GO TO HOME"

  # TODO: Handle this when we have some routes
  Scenario: Navigating back when the last route is the same as the current route does not take you to the current route
# Given the driver is ready
# When the app is navigated to "/route-that-exists"
# And the app is navigated to "/404"
# And the app is navigated to "/404"
# Then there are "2" error buttons
# And the "2nd" error button has the text "GO BACK"
# When the "2nd" error button is pressed
# Then the route is "/route-that-exists"
