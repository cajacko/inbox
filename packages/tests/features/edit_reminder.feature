Feature: Edit reminder
  As a user
  I want to edit my reminders
  So that I can change the reminder details as they need updating

  Background:
    Given we have logged in successfully
    Then the reminder list count "is" "0"
    When we add a reminder with the text "Edit a reminder"
    Then the reminder list count "is" "1"
    And the "1st" reminder status "will be" "Saved"

  Scenario: The reminder hover menu has an edit button
    Then the "1st" reminder "edit" button "is not" visible
    When the we hover over the "1st" reminder
    Then the "1st" reminder "edit" button "is" visible

  Scenario: The reminder hover edit button goes to the edit scene
    When the we hover over the "1st" reminder
    And the "1st" reminder hover "edit" button is pressed
    Then the edit reminder scene "is" visible

  Scenario: Editing a reminders text and saving, saves the text
    When the "1st" reminder is pressed
    And the text " - edited" is typed into the add reminder input
    And the add reminder save button is pressed
    Then the text for the "1st" reminder "is" "Edit a reminder - edited"

  Scenario: Edited reminder displays correctly when not saved to cloud yet
    When we add a hook with id "sync" and type "delay"
    And the "1st" reminder is pressed
    And the text " - edited" is typed into the add reminder input
    And the add reminder save button is pressed
    Then the "1st" reminder status "is" "Saving"

  Scenario: Edited reminder displays correctly when saved to cloud
    When the "1st" reminder is pressed
    And the text " - edited" is typed into the add reminder input
    And the add reminder save button is pressed
    Then the "1st" reminder status "will be" "Saved"

  Scenario: Edited reminder displays correctly when errors saving to cloud
    When we add a hook with id "sync" and type "error"
    And the "1st" reminder is pressed
    And the text " - edited" is typed into the add reminder input
    And the add reminder save button is pressed
    Then the "1st" reminder status "will be" "Error"

  Scenario: Edit a reminder orders it to the top
    When we add a reminder with the text "1st item"
    And the "2nd" reminder is pressed
    And the text " - edited" is typed into the add reminder input
    And the add reminder save button is pressed
    Then the text for the "1st" reminder "is" "Edit a reminder - edited"

  @bug
  Scenario: Editing the text on a snoozed reminder keeps it as snoozed
    When we add a reminder with the text "1st item"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the "tomorrow" snooze suggestion is pressed
    And the header loading icon "will not be" visible
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "will be" visible
    And the "1st" reminder is pressed
    And the text " - edited" is typed into the add reminder input
    And the add reminder save button is pressed
    Then the reminder list count "is" "1"
