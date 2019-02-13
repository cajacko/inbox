Feature: Manage Reminders
  As a user
  I want to edit, delete, snooze and mark a reminder as done
  So that I can update my reminders as their status changes

  Background:
    Given we have logged in successfully
    When we add a reminder with the text "Item to delete"
    Then the reminder list count "is" "1"

  Scenario: The reminder hover menu displays correctly
    When the we hover over the "1st" reminder
    And the screenshot matches

  Scenario: The edit reminder scene displays correctly
    When the "1st" reminder is pressed
    Then the edit reminder scene "is" visible
    And the screenshot matches

# TODO: Check which of these are worth checking in here as well

# Scenario: Edit reminder scene displays correctly with no text
# Scenario: Go back from reminder scene by the cancel button
# @size-desktop
# Scenario: Go back from reminder scene by background button
# @platform-web @platform-android
# Scenario: Go back from reminder scene by device button
# Scenario: Auto focus on text input on mount
# Scenario: Edit reminder scene displays correctly with text
# Scenario: Edit reminder scene displays correctly with long text
# Scenario: Cannot save a reminder with no initial text
# Scenario: Cannot save a reminder with no text when edited
# Scenario: Cannot add too much text
# # This is only for checking the submit button works, full checking of saved
# # records happens in the "Successfully add a reminder" scenario
# Scenario: Submit action saves the reminder
# Scenario: Successfully add a reminder
# Scenario: New reminder displays correctly when not saved to cloud yet
# Scenario: New reminder displays correctly when saved to cloud
# Scenario: New reminder displays correctly when errors saving to cloud
# Scenario: Add new orders new item at the top
# @platform-web @non-headless
# Scenario: Close app when unsaved changes shows alert
