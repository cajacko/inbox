# All snooze suggestions are handled by snooze_suggestions.feature
# All checking that the actual snoozed date is set coreectly happens in
# snooze_suggestions.feature and snooze_custom_date.feature
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
    Given we have logged in successfully
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
    Then the "snoozed" route "will be" visible
    And the header loading icon "will not be" visible
    And the "1st" reminder "snooze" icon "is" visible
    And the screenshot matches

  # Don't think we can automate this yet
  # Scenario: Swipe to snooze displays correctly

  # Snooze icon is coloured
  Scenario: Snoozed reminder displays correctly in edit scene
    Given we preload the api with "10" "snoozed" reminders
    And we have logged in successfully
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "will be" visible
    And the header loading icon "will not be" visible
    When the "1st" reminder is pressed
    Then the edit reminder scene "is" visible
    And the screenshot matches


  # BEHAVIOUR

  Scenario: Reminders with a due date in the future show in the snoozed scene
    Given we preload the api with "10" "snoozed" reminders
    And we have logged in successfully
    Then the header loading icon "will not be" visible
    And the reminder list count "is" "0"
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "will be" visible
    And the reminder list count "is" "10"

  Scenario: When a reminders due date is up, it moves from snoozed to done, on load
    Given we preload the api with "10" "snoozed" reminders
    And we have logged in successfully
    Then the header loading icon "will not be" visible
    And the reminder list count "is" "0"
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "will be" visible
    And the reminder list count "is" "10"
    When we add a hook with id "now" and type "plus2Days"
    And we reload the app
    Then the "snoozed" route "will be" visible
    And the reminder list count "is" "0"
    When we navigate to the "home" scene
    Then the "home" route "is" visible
    And the reminder list count "is" "10"

  # Checks the following scenario as well
  # Scenario: Snoozed cron runs when loggedin from persisted state
  Scenario: When a reminders due date is up, it moves from snoozed to done, on cron
    Given we add a hook with id "syncCron" and type "none"
    And we add a hook with id "snoozeCronInterval" and type "short"
    And we add a hook with id "snoozeCron" and type "none"
    And we preload the api with "10" "snoozed" reminders
    And we have logged in successfully
    Then the header loading icon "will not be" visible
    And the reminder list count "is" "0"
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "will be" visible
    And the header loading icon "will not be" visible
    And the reminder list count "is" "10"
    When we add a hook with id "now" and type "plus2Days"
    And we remove the hook with id "snoozeCron"
    Then the reminder list count "will be" "0"
    When we navigate to the "home" scene
    Then the "home" route "will be" visible
    And the reminder list count "is" "10"

  Scenario: When a reminders due date is up, it moves from snoozed to done, on sync success
    Given we add a hook with id "syncCronInterval" and type "short"
    And we add a hook with id "syncCron" and type "none"
    And we add a hook with id "snoozeCron" and type "none"
    And we preload the api with "10" "snoozed" reminders
    And we have logged in successfully
    Then the header loading icon "will not be" visible
    And the reminder list count "is" "0"
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "will be" visible
    And the header loading icon "will not be" visible
    And the reminder list count "is" "10"
    When we add a hook with id "now" and type "plus2Days"
    And we remove the hook with id "syncCron"
    Then the reminder list count "will be" "0"
    When we navigate to the "home" scene
    Then the "home" route "will be" visible
    And the reminder list count "is" "10"

  # This can't happen, if we're not logged in, there's nothing in the redux
  # store. When we login, there won't be anything to update from snoozed, you
  # need to wait until that first sync happens, which triggers the check anyways
  # Scenario: Snoozed is updated on login

  # Not worth testing this
  # Scenario: Snoozed cron does not run if not logged in

  Scenario: Snoozed cron runs after login
    Given we add a hook with id "syncCron" and type "none"
    And we add a hook with id "snoozeCronInterval" and type "short"
    And we preload the api with "10" "snoozed" reminders
    And we have logged in successfully
    Then the header loading icon "will not be" visible
    And the reminder list count "is" "0"
    When we add a hook with id "now" and type "plus2Days"
    And we remove the hook with id "snoozeCron"
    Then the reminder list count "will be" "10"

  # More advanced displays and behaviour of suggested times are checked in
  # snooze_suggestions.feature
  Scenario: Snooze menu displays correctly from hover
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the snooze reminder modal "is" visible
    And the screenshot matches

  Scenario: Snooze menu displays correctly from edit scene
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the "1st" reminder is pressed
    And the edit scene "snooze button" is pressed
    Then the snooze reminder modal "is" visible
    And the screenshot matches

  # Can't be tested yet
  # Scenario: Snooze menu displays correctly from swipe

  # More advanced displays and behaviour of custom date and times are checked in
  # snooze_custom_date.feature
  Scenario: Custom snooze date menu displays correctly from edit scene
  Scenario: Custom snooze date time displays correctly from edit scene

  Scenario: Custom snooze date menu displays correctly from hover
  Scenario: Custom snooze date time displays correctly from hover

  Scenario: Custom snooze date menu displays correctly from swipe
  Scenario: Custom snooze date time displays correctly from swipe

# IDEAS

# Scenario: Snooze a reminder via the hover menu
# Scenario: Snooze a reminder via the edit scene
# Scenario: Snooze reminder from swipe left

# Scenario: Can snooze reminder that is done

# Scenario: Can swipe to snooze from done scene
# Scenario: Can swipe to snooze from snooze scene
# Scenario: Can navigate to the snoozed scene from the menu

# Scenario: Snooze a reminder, mark as done, then mark as undone
# Where should it go, should the due date be reset?
