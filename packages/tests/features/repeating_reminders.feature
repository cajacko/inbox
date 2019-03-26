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

# 1 - no repeat
# 2 - daily, weekly, monthly, yearly (check unhappy paths)
# 3 - Clearing repeat does not repeat
# 4 - Repeat and snooze stuff
# 5 - Handle custom repeats

# TODO: repeat is a new icon in the edit/add menu and hover
# The dropdown things displays correctly, with no repeat and with various
# repeat types
# Does a repeated icon have a separate icon?
# A repeated list in menu/scene?
# Repeat type (none, daily, weekly, monthly, yearly, customised) displays
# correctly
# Customised displays correctly for each type
# Cant repeat done? Or does it undone it?
# Repeat brings the reminder into the inbox when the time ellapses, test on
# each suggested type and customised one
# Set repeat then mark as done, still comes up
# Mark a repeat as done, asks if you want to stop repeating
# Mark a repeat as done, still repeats
# Snooze a repeat to a date after the next repeat cron, doesn't trigger the
# repeat until the snooze ellapses
# Alert if snooze a repeated reminder past the next cron date?
