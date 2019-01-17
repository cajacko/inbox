Feature: App Errors
  As a user
  I want to be able to use the app even when it has crashed
  So that I can manage my reminders

  Scenario: The app opens to the home scene
    Given the app is open
    When we navigate to "/"
    Then the error component is visible
    And the error code is "100-001"
    And the screenshot matches

  Scenario: The app has crashed at the root
  Scenario: (Web) The user does not have JavaScript enabled
  Scenario: (Web) The JavaScript bundles failed to load
  Scenario: (Web) The JavaScript bundles timeout when loading
  Scenario: App Loading crashes
  Scenario: App Loading times out
  Scenario: The main router crashes
  Scenario: The entry route crashes
  Scenario: The user goes to a route that does not exist
  Scenario: Navigate to home after a 404
  Scenario: Navigate back from a 404
  Scenario: No previous route to navigate back to on a 404
  Scenario: Previous route is same route on a 404

# Scenario: easy maths
#   Given a variable set to 1
#   When I increment the variable by 1
#   Then the variable should contain 2

# Scenario Outline: much more complex stuff
#   Given a variable set to <var>
#   When I increment the variable by <increment>
#   Then the variable should contain <result>

#   Examples:
#     | var | increment | result |
#     | 100 | 5         | 105    |
#     | 99  | 1234      | 1333   |
#     | 12  | 5         | 17     |
