Feature: Logout
  As a user
  I want to logout of the app
  So that I can secure my data

  @smoke
  Scenario: Logout succeeds
    Given we have logged in successfully
    When the menu button is pressed
    Then the menu "will be" visible
    When the logout button is pressed
    Then an alert "is" visible
    And the alert says "Are you sure you want to logout?"
    When the alert "2nd" button is pressed
    Then the login scene "will be" visible

  Scenario: Cancel logout
    Given we have logged in successfully
    When the menu button is pressed
    Then the menu "will be" visible
    When the logout button is pressed
    And the alert "1st" button is pressed
    Then the "logged in" home route "is" visible
    And the menu "is" visible

  @smoke
  Scenario: Logout deletes the redux cache
    Given we preload the api with "10" reminders
    And we have logged in successfully
    Then the reminder list count "will be" "10"
    When the menu button is pressed
    Then the menu "will be" visible
    When the logout button is pressed
    And the alert "2nd" button is pressed
    Then the login scene "will be" visible
    When we add a hook with id "sync" and type "delay"
    When we have logged in successfully
    Then the reminder list count "is" "0"

