Feature: Manage Reminders
  As a user
  I want to edit, delete, snooze and mark a reminder as done
  So that I can update my reminders as their status changes

  Background:
    Given we have logged in successfully
    When we add a reminder with the text "Item to delete"
    Then the reminder list count "is" "1"

  Scenario: The edit reminder scene displays correctly
    When the "1st" reminder is pressed
    Then the edit reminder scene "is" visible
    Then the add reminder text "is" "Item to delete"
    And the screenshot matches

# This won't work, the hover state disappears when the screenshot is taken
# Keeping here in case we can, or to add as manual task
# Scenario: The reminder hover menu displays correctly
#   When the we hover over the "1st" reminder
#   And the screenshot matches
