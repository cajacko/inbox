Feature: Done
  As a user
  I want to mark, unmark and view done reminders
  So that I can update my reminders as I do them

  Background:
    Given we have logged in successfully
    When we add a reminder with the text "Item to be done"
    Then the reminder list count "is" "1"
    And the header loading icon "will not be" visible

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

  # Check is in done list, don't think can do this yet, do manually
  # Scenario: Mark a reminder as done successfully via the swipe menu
  #   When the "1st" reminder is swiped "right"
  #   Then the reminder list count "is" "0"
  # Scenario: Cannot swipe done on done scene

  Scenario: Mark a reminder as done successfully via the hover button
    When the we hover over the "1st" reminder
    And the "1st" reminder hover "done" button is pressed
    Then the reminder list count "will be" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "done" scene
    Then the reminder list count "is" "1"
    And the text for the "1st" reminder "is" "Item to be done"

  Scenario: Mark a reminder as done successfully via the edit menu
    When the "1st" reminder is pressed
    And the edit scene "done button" is pressed
    Then the edit reminder scene "is not" visible
    And the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "done" scene
    Then the reminder list count "is" "1"
    And the text for the "1st" reminder "is" "Item to be done"

  # Also does this scenario
  # Scenario: A done reminder displays with the done icon
  Scenario: Done list displays correctly
    When the we hover over the "1st" reminder
    And the "1st" reminder hover "done" button is pressed
    Then the reminder list count "will be" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "done" scene
    Then the "done" route "is" visible
    And the "1st" reminder "done" icon "is" visible
    And the header loading icon "will not be" visible
    And the screenshot matches

  Scenario: Done is highlighted in side menu
    When we navigate to the "done" scene
    And the menu button is pressed
    Then the menu "will be" visible
    And the header loading icon "will not be" visible
    And the screenshot matches

  Scenario: Can navigate to done scene via side menu
    When the menu button is pressed
    Then the menu "will be" visible
    And the menu "done" button is pressed
    Then the "done" route "is" visible

  # Covers the following as well
  # Scenario: Unmark a reminder as done via the hover menu
  Scenario: Unmarking a reminder as done puts it back in the inbox list
    When the we hover over the "1st" reminder
    And the "1st" reminder hover "done" button is pressed
    Then the reminder list count "will be" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "done" scene
    Then the reminder list count "is" "1"
    And the text for the "1st" reminder "is" "Item to be done"
    When the we hover over the "1st" reminder
    And the "1st" reminder hover "done" button is pressed
    Then the reminder list count "will be" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "home" scene
    Then the reminder list count "is" "1"
    And the text for the "1st" reminder "is" "Item to be done"

  # Check is green
  Scenario: Done reminder displays correctly in edit scene
    When the "1st" reminder is pressed
    Then the edit reminder scene "is" visible
    And the edit scene "done button" is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "done" scene
    And the "1st" reminder is pressed
    Then the screenshot matches

  Scenario: Unmark a reminder as done via the edit menu
    When the "1st" reminder is pressed
    Then the edit reminder scene "is" visible
    And the edit scene "done button" is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "done" scene
    Then the reminder list count "is" "1"
    And the text for the "1st" reminder "is" "Item to be done"
    When the "1st" reminder is pressed
    Then the edit reminder scene "is" visible
    And the edit scene "done button" is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "home" scene
    Then the reminder list count "is" "1"
    And the text for the "1st" reminder "is" "Item to be done"

  Scenario: Can mark a snoozed reminder as done
