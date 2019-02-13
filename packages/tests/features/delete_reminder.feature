Feature: Manage Reminders
  As a user
  I want to be able to delete reminders
  So that I can remove reminders I do not need

  Background:
    Given we have logged in successfully
    When we add a reminder with the text "Item to delete"
    Then the reminder list count "is" "1"

  Scenario: The reminder hover menu has a delete button
    Then the "1st" reminder "delete" button "is not" visible
    When the we hover over the "1st" reminder
    Then the "1st" reminder "delete" button "is" visible

  Scenario: The add reminder scene does not have the delete button
    When the add reminder button is pressed
    Then the add reminder scene "is" visible
    And the edit scene "delete button" "is not" visible

  Scenario: The edit reminder scene has the delete button
    When the "1st" reminder is pressed
    Then the edit reminder scene "is" visible
    And the edit scene "delete button" "is" visible

  Scenario: Delete a reminder successfully via the hover button
    When the we hover over the "1st" reminder
    And the "1st" reminder hover "delete" button is pressed
    Then the reminder list count "is" "0"

  Scenario: Delete a reminder successfully via the edit menu
    When the "1st" reminder is pressed
    And the edit scene "delete button" is pressed
    Then the edit reminder scene "is not" visible
    And the reminder list count "is" "0"

  # When deleting a reminder does not sync, there is no visible changes? Should
  # this be changed? But how?
  @platform-web
  Scenario: When closing the tab with pending deletions, the alert is not shown
    When we add a hook with id "deleteReminder" and type "delay"
    And the "1st" reminder is pressed
    And the edit scene "delete button" is pressed
    When the close browser tab button is pressed
    Then an alert "is not" visible
