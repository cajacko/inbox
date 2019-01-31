Feature: Add Reminder
  As a user
  I want to add a reminder to my list
  So that I can keep track things I need to get done

  Scenario: Add button displays correctly
    Given we add a hook with id "login" and type "success"
    And the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    Then the "logged in" home route "will be" visible
    And the add reminder button "is" visible
    And the screenshot matches

  Scenario: Edit reminder scene displays correctly with text
  Scenario: Edit reminder scene displays correctly with no text
  Scenario: Edit reminder scene displays correctly with long text
  Scenario: Cannot save a reminder with no text
  Scenario: Cannot add too much text

  Scenario: Successfully add a reminder
  Scenario: Cancel adding a reminder

  Scenario: New reminder displays correctly when not saved to cloud yet
  Scenario: New reminder displays correctly when saved to cloud
  Scenario: New reminder displays correctly when errors saving to cloud
  Scenario: Close app when unsaved changes shows alert

