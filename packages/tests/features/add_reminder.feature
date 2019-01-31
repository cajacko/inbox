Feature: Add Reminder
  As a user
  I want to add a reminder to my list
  So that I can keep track things I need to get done

  Background:
    Given we add a hook with id "login" and type "success"
    And the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    Then the "logged in" home route "will be" visible

  Scenario: Add button displays correctly
    Then the add reminder button "is" visible
    And the screenshot matches

  Scenario: Add reminder button takes you to the add reminder scene
    When the add reminder button is pressed
    Then the add reminder scene "is" visible

  Scenario: Edit reminder scene displays correctly with no text
    When the add reminder button is pressed
    Then the screenshot matches

  Scenario: Go back from reminder scene by the cancel button
    When the add reminder button is pressed
    Then the add reminder scene "is" visible
    When the add reminder cancel button is pressed
    Then the add reminder scene "is not" visible

  @size-desktop
  Scenario: Go back from reminder scene by background button
    When the add reminder button is pressed
    Then the add reminder scene "is" visible
    When the modal background button is pressed
    Then the add reminder scene "is not" visible

  Scenario: Go back from reminder scene by device button

  Scenario: Edit reminder scene displays correctly with text
  Scenario: Edit reminder scene displays correctly with long text
  Scenario: Auto focus on text input on mount
  Scenario: Cannot save a reminder with no text
  Scenario: Cannot add too much text

  Scenario: Successfully add a reminder
  # Ensure check db records as well
  Scenario: Cancel adding a reminder

  Scenario: New reminder displays correctly when not saved to cloud yet
  Scenario: New reminder displays correctly when saved to cloud
  Scenario: New reminder displays correctly when errors saving to cloud
  Scenario: Close app when unsaved changes shows alert

