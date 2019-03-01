Feature: Snooze
  As a user
  I want to snooze reminders
  So that I can get reminded at a more appropiate date

  # DISPLAY

  Scenario: Snooze button displays correctly in hover menu
    Given we have logged in successfully
    When we add a reminder with the text "Item to be done"
    Then the "1st" reminder "snooze" button "is not" visible
    When the we hover over the "1st" reminder
    Then the "1st" reminder "snooze" button "is" visible

  Scenario: Snooze button displays correctly in edit scene
    Given we have logged in
    When we add a reminder with the text "Item to be done"
    And the "1st" reminder is pressed
    Then the edit reminder scene "is" visible
    And the edit scene "snooze button" "is" visible

  Scenario: Add reminder scene has snooze button
    Given we have logged in successfully
    When the add reminder button is pressed
    Then the add reminder scene "is" visible
    And the edit scene "snooze button" "is" visible

  Scenario: Snoozed is highlighted in side menu
    Given we have logged in successfully
    When we navigate to the "snoozed" scene
    And the menu button is pressed
    Then the menu "will be" visible
    And the header loading icon "will not be" visible
    And the screenshot matches

  # Next scenario covers this
  # Scenario: Snoozed reminder has snooze icon
  Scenario: Snoozed scene displays correctly
    Given we preload the api with "10" "snoozed" reminders
    And we have logged in successfully
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "is" visible
    And the header loading icon "will not be" visible
    And the "1st" reminder "snooze" icon "is" visible
    And the screenshot matches

  # TODO:
  # Don't think we can automate this
  # Scenario: Swipe to snooze displays correctly

  # Snooze icon is coloured
  Scenario: Snoozed reminder displays correctly in edit scene
    Given we preload the api with "10" "snoozed" reminders
    And we have logged in successfully
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "is" visible
    And the header loading icon "will not be" visible
    When the "1st" reminder is pressed
    Then the edit reminder scene "is" visible
    And the screenshot matches


  # BEHAVIOUR

  Scenario: Reminders with a due date in the future show in the snoozed scene
  Scenario: When a reminders due date is up, it moves from snoozed to done, on cron
  Scenario: When a reminders due date is up, it moves from snoozed to done, on load
  Scenario: When a reminders due date is up, it moves from snoozed to done, on sync success

# IDEAS

# Scenario: Snooze menu displays correctly from hover
# Scenario: Snooze menu displays correctly

# Scenario: Custom snooze date menu displays correctly
# Scenario: Custom snooze date time displays correctly

# Scenario: Snooze a reminder via the hover menu
# Scenario: Snooze a reminder via the edit scene
# Scenario: Snooze reminder from swipe left

# Scenario: Can snooze reminder that is done

# Scenario: Can swipe to snooze from done scene
# Scenario: Can swipe to snooze from snooze scene
# Scenario: Can navigate to the snoozed scene from the menu

# Scenario: Snozoe a reminder, mark as done, then mark as undone
# Where should it go, should the due date be reset?
