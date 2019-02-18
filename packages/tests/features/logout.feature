Feature: Logout
  As a user
  I want to logout of the app
  So that I can secure my data

  Background:
    Given we add a hook with id "login" and type "success"
    And the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    Then the "logged in" home route "will be" visible
    When the menu button is pressed
    Then the menu "will be" visible
    When the logout button is pressed

  Scenario: Logout succeeds
    Then an alert "is" visible
    And the alert says "Are you sure you want to logout?"
    When the alert "2nd" button is pressed
    Then the login scene "will be" visible

  Scenario: Cancel logout
    When the alert "1st" button is pressed
    Then the "logged in" home route "is" visible
    And the menu "is" visible

  Scenario: Logout deletes the redux cache
