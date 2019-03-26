Feature: Repeating Reminders
  As a user
  I want to have reminders that come up at repeated intervals
  So that I can be reminded about things I have to do regularly

  Scenario:: Repeat dropdown displays correctly on custom date confirm modal
  Scenario: Repeat dropdown displays correctly if the reminder is already a repeated one
  Scenario: A repeating reminder has the repeated icon in the list view

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
