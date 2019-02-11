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

  @platform-web @platform-android
  Scenario: Go back from reminder scene by device button
    When the add reminder button is pressed
    Then the add reminder scene "is" visible
    When the device back button is pressed
    Then the add reminder scene "is not" visible

  Scenario: Auto focus on text input on mount
    When the add reminder button is pressed
    Then the add reminder text input "is" focussed

  Scenario: Edit reminder scene displays correctly with text
    When the add reminder button is pressed
    And the text "Edit reminder scene" is typed into the add reminder input
    Then the add reminder text "is" "Edit reminder scene"
    Then the screenshot matches

  Scenario: Edit reminder scene displays correctly with long text
    When the add reminder button is pressed
    And the text "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" is typed into the add reminder input
    Then the screenshot matches

  Scenario: Cannot save a reminder with no initial text
    When the add reminder button is pressed
    Then the add reminder save button "is" disabled
    When the add reminder save button is pressed
    Then the add reminder scene "is" visible

  Scenario: Cannot save a reminder with no text when edited
    When the add reminder button is pressed
    And the text "Cannot save a reminder" is typed into the add reminder input
    Then the add reminder save button "is not" disabled
    When the add reminder input is cleared
    Then the add reminder save button "is" disabled
    When the add reminder save button is pressed
    Then the add reminder scene "is" visible

  Scenario: Cannot add too much text
    When the add reminder button is pressed
    And the text "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." is typed into the add reminder input
    Then the add reminder text "is" "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore "

  Scenario: Successfully add a reminder
  # Ensure check db records as well
  Scenario: New reminder displays correctly when not saved to cloud yet
  Scenario: New reminder displays correctly when saved to cloud
  Scenario: New reminder displays correctly when errors saving to cloud
  Scenario: Close app when unsaved changes shows alert

