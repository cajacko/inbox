Feature: Logout
  As a user
  I want to logout of the app
  So that I can secure my data

  Scenario: Logout succeeds
    Given the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    Then the "logged in" home route "will be" visible
    When the menu button is pressed
    Then the menu "will be" visible
    And the screenshot matches
    When the logout button is pressed
    Then the login scene "will be" visible