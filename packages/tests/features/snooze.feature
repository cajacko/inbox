# All snooze suggestions are handled by snooze_suggestions.feature
# All checking that the actual snoozed date is set coreectly happens in
# snooze_suggestions.feature and snooze_custom_date.feature
Feature: Snooze
  As a user
  I want to snooze reminders
  So that I can get reminded at a more appropiate date

  # TODO:
  Scenario: Can't snooze to a date in the past via suggestion
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the header loading icon "will not be" visible
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And we add a hook with id "now" and type "plus2Days"
    And the "later today" snooze suggestion is pressed
    Then the snooze error modal "is" visible
    And the screenshot matches

  Scenario: Can't snooze to a date in the past via custom date
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the header loading icon "will not be" visible
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "8" in the date picker is pressed
    And the snooze confirm change time button is pressed
    And the "customised" snooze time suggestion is pressed
    And the snooze time is set to "01:00"
    And the snooze confirm save button is pressed
    Then the snooze error modal "is" visible
    And the screenshot matches

  Scenario: The snooze error modal from a suggestion will take you back to the suggested snooze dates
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the header loading icon "will not be" visible
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And we add a hook with id "now" and type "plus2Days"
    And the "later today" snooze suggestion is pressed
    Then the snooze error modal "is" visible
    When the snooze error back button is pressed
    Then the snooze reminder date suggestions "is" visible

  Scenario: The snooze error modal from a custom date will take you back to the confirm modal
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the header loading icon "will not be" visible
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "8" in the date picker is pressed
    And the snooze confirm change time button is pressed
    And the "customised" snooze time suggestion is pressed
    And the snooze time is set to "01:00"
    And the snooze confirm save button is pressed
    Then the snooze error modal "is" visible
    When the snooze error back button is pressed
    Then the snooze reminder confirm modal "is" visible

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
    Given we add a hook with id "now" and type "fixed1"
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the snooze reminder modal "is" visible
    And the header loading icon "will not be" visible
    And the screenshot matches

  Scenario: Snooze menu displays correctly from edit scene
    Given we add a hook with id "now" and type "fixed1"
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the "1st" reminder is pressed
    And the edit scene "snooze button" is pressed
    Then the snooze reminder modal "is" visible
    And the header loading icon "will not be" visible
    And the screenshot matches

  # Can't be tested yet
  # Scenario: Snooze menu displays correctly from swipe

  # More advanced displays and behaviour of custom date and times are checked in
  # snooze_custom_date.feature
  Scenario: Custom snooze date picker displays correctly from edit scene
    Given we add a hook with id "now" and type "fixed1"
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the "1st" reminder is pressed
    And the edit scene "snooze button" is pressed
    And the snooze scene custom date button is pressed
    Then the snooze custom date scene "is" visible
    And the header loading icon "will not be" visible
    And the screenshot matches

  Scenario: Custom snooze confirm displays correctly from edit scene
    Given we add a hook with id "now" and type "fixed1"
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the "1st" reminder is pressed
    And the edit scene "snooze button" is pressed
    And the snooze scene custom date button is pressed
    And day "7" in the date picker is pressed
    Then the header loading icon "will not be" visible
    And the screenshot matches

  Scenario: Custom snooze time suggestions displays correctly from edit scene
    Given we add a hook with id "now" and type "fixed1"
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the "1st" reminder is pressed
    And the edit scene "snooze button" is pressed
    And the snooze scene custom date button is pressed
    And day "7" in the date picker is pressed
    And the snooze confirm change time button is pressed
    Then the header loading icon "will not be" visible
    And the screenshot matches

  Scenario: Custom snooze time picker displays correctly from edit scene
    Given we add a hook with id "now" and type "fixed1"
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the "1st" reminder is pressed
    And the edit scene "snooze button" is pressed
    And the snooze scene custom date button is pressed
    And day "7" in the date picker is pressed
    And the snooze confirm change time button is pressed
    And the "customised" snooze time suggestion is pressed
    Then the header loading icon "will not be" visible
    And the screenshot matches

  Scenario: Custom snooze date picker displays correctly from hover
    Given we add a hook with id "now" and type "fixed1"
    And we add a hook with id "now" and type "fixed1"
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    Then the snooze custom date scene "is" visible
    And the header loading icon "will not be" visible
    And the screenshot matches

  Scenario: Custom snooze confirm displays correctly from hover
    Given we add a hook with id "now" and type "fixed1"
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "7" in the date picker is pressed
    Then the header loading icon "will not be" visible
    And the screenshot matches

  Scenario: Custom snooze time suggestions displays correctly from hover
    Given we add a hook with id "now" and type "fixed1"
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "7" in the date picker is pressed
    And the snooze confirm change time button is pressed
    Then the header loading icon "will not be" visible
    And the screenshot matches

  Scenario: Custom snooze time picker displays correctly from hover
    Given we add a hook with id "now" and type "fixed1"
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "7" in the date picker is pressed
    And the snooze confirm change time button is pressed
    And the "customised" snooze time suggestion is pressed
    Then the header loading icon "will not be" visible
    And the screenshot matches

  # Can't test yet
  # Scenario: Custom snooze date picker displays correctly from swipe
  # Scenario: Custom snooze confirm displays correctly from swipe
  # Scenario: Custom snooze time suggestions displays correctly from swipe
  # Scenario: Custom snooze time picker displays correctly from swipe

  Scenario: Selecting a snooze suggestion from the hover menu closes the modal
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the snooze reminder modal "is" visible
    And the "later today" snooze suggestion is pressed
    And the snooze reminder modal "is not" visible
    And the edit reminder scene "is not" visible

  Scenario: Selecting a snooze suggestion from the edit menu closes both modals
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the "1st" reminder is pressed
    And the edit scene "snooze button" is pressed
    Then the snooze reminder modal "is" visible
    And the "later today" snooze suggestion is pressed
    And the snooze reminder modal "is not" visible
    And the edit reminder scene "is not" visible

  Scenario: Selecting a custom snooze date from the hover menu closes the modal
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the snooze reminder modal "is" visible
    When the snooze scene custom date button is pressed
    And day "7" in the date picker is pressed
    And the snooze scene custom save button is pressed
    And the snooze reminder modal "is not" visible
    And the edit reminder scene "is not" visible

  Scenario: Selecting a custom snooze date from the edit menu closes both modals
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the "1st" reminder is pressed
    And the edit scene "snooze button" is pressed
    Then the snooze reminder modal "is" visible
    When the snooze scene custom date button is pressed
    And day "7" in the date picker is pressed
    And the snooze scene custom save button is pressed
    And the snooze reminder modal "is not" visible
    And the edit reminder scene "is not" visible

  Scenario: Snooze an existing reminder via the hover menu
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    Then the reminder list count "is" "1"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the snooze reminder modal "is" visible
    And the "later today" snooze suggestion is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "will be" visible
    And the reminder list count "is" "1"

  Scenario: Snooze an existing reminder via the edit scene
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    Then the reminder list count "is" "1"
    And the "1st" reminder is pressed
    And the edit scene "snooze button" is pressed
    Then the snooze reminder modal "is" visible
    And the "later today" snooze suggestion is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "will be" visible
    And the reminder list count "is" "1"

  # Cant test this yet
  # Scenario: Snooze an existing reminder from swipe left

  Scenario: Snooze a reminder when create it does not save it
    Given we have logged in successfully
    Then the reminder list count "is" "0"
    And the add reminder button is pressed
    And the text "Snooze as create" is typed into the add reminder input
    And the edit scene "snooze button" is pressed
    And the "later today" snooze suggestion is pressed
    Then the snooze reminder modal "is not" visible
    And the add reminder scene "is" visible
    When the add reminder cancel button is pressed
    Then the add reminder scene "is not" visible
    And the reminder list count "is" "0"
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "will be" visible
    And the reminder list count "is" "0"

  Scenario: Snooze a reminder when create it, then save, snoozes the reminder
    Given we have logged in successfully
    Then the reminder list count "is" "0"
    When the add reminder button is pressed
    And the text "Snooze as create" is typed into the add reminder input
    And the edit scene "snooze button" is pressed
    And the "later today" snooze suggestion is pressed
    When the add reminder save button is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "snoozed" scene
    Then the "snoozed" route "will be" visible
    And the reminder list count "is" "1"

  Scenario: Snooze a reminder when create it turns the snooze icon orange
    Given we have logged in successfully
    Then the reminder list count "is" "0"
    And the add reminder button is pressed
    And the text "Snooze as create" is typed into the add reminder input
    And the edit scene "snooze button" is pressed
    And the "later today" snooze suggestion is pressed
    Then the snooze reminder modal "is not" visible
    And the add reminder scene "is" visible
    And the header loading icon "will not be" visible
    And the screenshot matches

  # Takes out the done status
  Scenario: Can snooze reminder that is done
    Given we preload the redux state with "1" "done" reminders
    And we have logged in successfully
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "snoozed" scene
    Then the reminder list count "is" "0"
    When we navigate to the "done" scene
    Then the reminder list count "is" "1"
    When the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the "later today" snooze suggestion is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "snoozed" scene
    Then the reminder list count "is" "1"

  # Can't test yet
  # Scenario: Can swipe to snooze from done scene
  # Scenario: Can swipe to snooze from snooze scene

  Scenario: Can navigate to the snoozed scene from the menu
    Given we have logged in successfully
    When the menu button is pressed
    Then the menu "will be" visible
    And the menu "snoozed" button is pressed
    Then the "snoozed" route "is" visible

  Scenario: Snooze a reminder, mark as done, then mark as undone, does not retain snooze dueDate
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the "1st" reminder is pressed
    And the edit scene "snooze button" is pressed
    And the "later today" snooze suggestion is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "snoozed" scene
    Then the reminder list count "is" "1"
    When the "1st" reminder is pressed
    And the edit scene "done button" is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "done" scene
    Then the reminder list count "is" "1"
    When the "1st" reminder is pressed
    And the edit scene "done button" is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we navigate to the "snoozed" scene
    Then the reminder list count "is" "0"
    When we navigate to the "home" scene
    Then the reminder list count "is" "1"

  # As the other tests preload the data
  Scenario: Snoozing an existing reminder works
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    Then the reminder list count "is" "1"
    And the "1st" reminder is pressed
    And the edit scene "snooze button" is pressed
    Then the snooze reminder modal "is" visible
    And the "later today" snooze suggestion is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we add a hook with id "now" and type "plus2Days"
    And we reload the app
    Then the reminder list count "will be" "1"

  # As the other tests preload the data
  Scenario: Snoozing a new reminder works
    Given we have logged in successfully
    Then the reminder list count "is" "0"
    When the add reminder button is pressed
    And the text "Snooze as create" is typed into the add reminder input
    And the edit scene "snooze button" is pressed
    And the "later today" snooze suggestion is pressed
    When the add reminder save button is pressed
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    When we add a hook with id "now" and type "plus2Days"
    And we reload the app
    Then the reminder list count "will be" "1"
