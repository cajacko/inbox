Feature: Repeating Reminders
  As a user
  I want to have reminders that come up at repeated intervals
  So that I can be reminded about things I have to do regularly

  # DISPLAY

  Scenario: Repeat button shows correctly in hover menu
  Scenario: Repeat button shows correctly in edit scene
  Scenario: Repeat button shows in the new reminder scene
  Scenario: Repeated is highlighted in the side menu
  Scenario: Repeated scene shows correctly

  # TODO:
  Scenario: Repeating reminder shows correctly in the edit scene

  Scenario: The repeat modal displays correctly with no repeat
  Scenario: The repeat modal displays correctly with a repeat
  Scenario: Selecting a repeat option displays correctly

  # BEHAVIOUR

  # No repeat
  Scenario: Non repeating reminder does not come back after done and 2 years later
  # Scenario: Repeat a reminder, clear the repeat, mark as done then it does not repeat

  # Generic repeat functionality
  # Scenario: A repeated reminder is triggered and was not marked as done
  # Scenario: A repeated reminder is triggered and was marked as done
  # Scenario: A repeated reminder is triggered on a snoozed reminder with a snooze date after the next repeat date
  # Scenario: A repeated reminder is triggered on a snoozed reminder with a snooze date before the next repeat date
  # Scenario: A deleted reminder does not repeat

  # Suggested repeats (Use data tables for checking various times)
  Scenario: Repeat a reminder daily works
# Scenario: Repeat a reminder weekly works
# Scenario: Repeat a reminder monthly works
# Scenario: Repeat a reminder yearly works

# Where it shows
# Scenario: A repeated reminder in the inbox shows the next occurance in snoozed
# Scenario: A repeated reminder in snoozed only shows the 1 instance
# Scenario: A repeated reminder marked as done shows 1 instance in the done scene
# Scenario: The last time a repeated reminder is marked as done, is the time it displays in in the done scene

# New reminders
# Scenario: Setting the repeat for a new reminder, highlights the icon and sets the repeat on save
# Scenario: Clearing the repeat for a new reminder, dulls the icon and does not set the repeat on save

# TODO: Handle custom repeats
# TODO: Show stop reminder when mark as done
# TODO: Warn someone if snoozing a reminder to after the next cron date