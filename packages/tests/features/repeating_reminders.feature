Feature: Repeating Reminders
  As a user
  I want to have reminders that come up at repeated intervals
  So that I can be reminded about things I have to do regularly

  # TODO:
  # What happens to the due date of a reminder when remove repeat, what if it
  # was snoozed as well?
  #
  # Remove reminder does not make you pick a date
  #
  # The repeating reminders list does not show it as done. If mark as done
  # within the repeated list then it removes the repeat (with warning)
  #
  # When mark a repeated item in INBOX as done, then it comes back from repeat,
  # it is not marked as done anymore

  # DISPLAY

  Scenario: Repeat button shows correctly in hover menu
  Scenario: Repeat button shows correctly in edit scene
  Scenario: Repeat button shows in the new reminder scene
  Scenario: Repeated is highlighted in the side menu
  Scenario: Repeated scene shows correctly

  # TODO:
  Scenario: Repeating reminder shows correctly in the edit scene

  Scenario: The repeat modal displays correctly with no repeat

  # Scenario Outline with daily/weekly etc
  # Scenario: The repeat modal displays correctly with a repeat
  # Scenario: Selecting a repeat option displays the date picker (text for pick a start date?)
  # Scenario: Picking a date shows the same confirm modal as snooze (..fill in scenarios)
  # - Error if past date, can select custom time, same time suggestions as snooze

  # BEHAVIOUR

  # No repeat
  Scenario: Non repeating reminder does not come back after done and 2 years later
  # Scenario: Repeat a reminder, clear the repeat, mark as done then it does not repeat

  # Generic repeat functionality
  Scenario: A repeated reminder is triggered and was not marked as done
  # Scenario: A repeated reminder is triggered and was marked as done
  # Scenario: A repeated reminder is triggered on a snoozed reminder with a snooze date after the next repeat date
  # Scenario: A repeated reminder is triggered on a snoozed reminder with a snooze date before the next repeat date
  # Scenario: A deleted reminder does not repeat

  # Suggested repeats (Use data tables for checking various times)
  Scenario: Repeat a reminder daily works
# Scenario: Repeat a reminder weekly works
# Scenario: Repeat a reminder monthly works
# Scenario: Repeat a reminder yearly works
# Scenario: Cancelling a repeat works

# Where it shows
# Scenario: A repeated reminder in the inbox shows the next occurance in snoozed
# Scenario: A repeated reminder in snoozed only shows the 1 instance
# Scenario: A repeated reminder marked as done shows 1 instance in the done scene
# Scenario: The last time a repeated reminder is marked as done, is the time it displays in in the done scene

# New reminders
# Scenario: Setting the repeat for a new reminder, highlights the icon and sets the repeat on save
# Scenario: Clearing the repeat for a new reminder, dulls the icon and does not set the repeat on save

# Ensure works for edited and new reminders
# Scenario: Does not repeats does not show calendar

# TODO: Handle custom repeats
# TODO: Show stop reminder when mark as done
# TODO: Warn someone if snoozing a reminder to after the next cron date
