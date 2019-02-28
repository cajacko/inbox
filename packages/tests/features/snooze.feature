Feature: Snooze
  As a user
  I want to snooze reminders
  So that I can get reminded at a more appropiate date

  Background:
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    Then the reminder list count "is" "1"
    And the header loading icon "will not be" visible

  # DISPLAY

  Scenario: Snooze button displays correctly in hover menu
    Then the "1st" reminder "snooze" button "is not" visible
    When the we hover over the "1st" reminder
    Then the "1st" reminder "snooze" button "is" visible

  Scenario: Snooze button displays correctly in edit scene
    When the "1st" reminder is pressed
    Then the edit reminder scene "is" visible
    And the edit scene "snooze button" "is" visible

  Scenario: Add reminder scene has snooze button
    When the add reminder button is pressed
    Then the add reminder scene "is" visible
    And the edit scene "snooze button" "is" visible

  Scenario: Snoozed is highlighted in side menu
    When we navigate to the "snoozed" scene
    And the menu button is pressed
    Then the menu "will be" visible
    And the header loading icon "will not be" visible
    And the screenshot matches

  Scenario: Snoozed scene displays correctly

  # Scenario: Swipe to snooze displays correctly
  Scenario: Snoozed reminder has snooze icon
  Scenario: Snoozed reminder displays correctly in edit scene
# Snooze icon is coloured

# Scenario: Snooze menu displays correctly from hover
# Scenario: Snooze menu displays correctly

# Scenario: Custom snooze date menu displays correctly
# Scenario: Custom snooze date time displays correctly

# BEHAVIOUR

# Scenario: Snooze a reminder via the hover menu
# Scenario: Snooze a reminder via the edit scene
# Scenario: Snooze reminder from swipe left

# Scenario: Can snooze reminder that is done

# Scenario: Can swipe to snooze from done scene
# Scenario: Can swipe to snooze from snooze scene
# Scenario: Can navigate to the snoozed scene from the menu

# Scenario: Snozoe a reminder, mark as done, then mark as undone
