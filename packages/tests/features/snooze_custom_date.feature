# Custom time suggestions are handled in snooze_suggestions.feature
Feature: Snooze Custom Date
  As a user
  I want to snooze reminders to a specific date and time
  So that I can get reminded at the specific time I want to

  Scenario: Can navigate back from date picker via back button
  Scenario: Can navigate back from time picker via back button

# TODO: Cannot snooze past date
# TODO: Cannot snooze past time

# Can navigate months
# Can scroll and select time

# Select custom date normally
# The first time we see the confirm modal, the time is the last suggested time for the day
# Whats the suggested time when past evening
# Whats the suggested time if near midnight?

# Select custom time when first see confirm modal
# Reselect date
# Reselect time

# Error if somehow a past date tries to get submitted (as could happen if wait a
# bit)
