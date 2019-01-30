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
    Then an alert "is" visible
    And the alert says "Are you sure you want to logout"
    And the alert has "2" buttons
    And the alert "1st" button says "CANCEL"
    And the alert "2nd" button says "LOGOUT"
    And the screenshot matches
    When the alert "2nd" button is pressed
    Then the login scene "will be" visible

  Scenario: Cancel logout
    Given the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    Then the "logged in" home route "will be" visible
    When the menu button is pressed
    Then the menu "will be" visible
    When the logout button is pressed
    And the alert "1st" button is pressed
    Then the "logged in" home route "is" visible
    And the menu "is" visible