Feature: Done
  As a user
  I want to mark, unmark and view done reminders
  So that I can update my reminders as I do them

  Background:
    Given we have logged in successfully
    When we add a reminder with the text "Item to delete"
    Then the reminder list count "is" "1"

  Scenario: Done button shows on hover menu
    Then the "1st" reminder "done" button "is not" visible
    When the we hover over the "1st" reminder
    Then the "1st" reminder "done" button "is" visible

  Scenario: The add reminder scene does not have the done button
    When the add reminder button is pressed
    Then the add reminder scene "is" visible
    And the edit scene "done button" "is not" visible

  Scenario: The edit reminder scene has the done button
    When the "1st" reminder is pressed
    Then the edit reminder scene "is" visible
    And the edit scene "done button" "is" visible

  # TODO: Check is in done list, don't think can do this yet, do manually
  # Scenario: Mark a reminder as done successfully via the swipe menu
  #   When the "1st" reminder is swiped "right"
  #   Then the reminder list count "is" "0"

  # TODO: Check is in done list
  Scenario: Mark a reminder as done successfully via the hover button
    When the we hover over the "1st" reminder
    And the "1st" reminder hover "done" button is pressed
    Then the reminder list count "is" "0"

  # TODO: Check is in done list
  Scenario: Mark a reminder as done successfully via the edit menu
    When the "1st" reminder is pressed
    And the edit scene "done button" is pressed
    Then the edit reminder scene "is not" visible
    And the reminder list count "is" "0"


  Scenario: Done list displays correctly
  # Header color is correct

  Scenario: Done is highlighted in side menu
  Scenario: Can navigate to done scene via side menu
  Scenario: A done reminder displays with the done icon
  Scenario: Unmarking a reminder as done puts it back in the inbox list
