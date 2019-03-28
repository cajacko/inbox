# Custom time suggestions are handled in snooze_suggestions.feature
Feature: Snooze Custom Date
  As a user
  I want to snooze reminders to a specific date and time
  So that I can get reminded at the specific time I want to

  # Scenario: Can navigate back from date picker via back button
  # Scenario: Can navigate back from time picker via back button

  # Can navigate months
  # Can scroll and select time

  Scenario: Snoozing to a custom date sets the correct date
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "8" in the date picker is pressed
    And the snooze confirm save button is pressed
    Then the header loading icon "will not be" visible
    And the due date of the only reminder "is" "2019-03-08 06:30"

  Scenario: Snoozing to the morning suggestion sets the correct time
  Scenario: Snoozing to the afternoon suggestion sets the correct time
  Scenario: Snoozing to the evening suggestion sets the correct time
  Scenario: Snoozing to a custom time sets the correct time

  Scenario: Snoozing to a custom date and suggested time sets the correct date and time
  Scenario: Snoozing to a custom date and a custom time sets the correct date and time

  Scenario: Accepting the default custom snooze date and time sets the correct date and time

  Scenario: Changing the date updates the label on the confirm modal
  Scenario: Changing the time updates the label on the confirm modal

# Scenario: Default custom date
#     | day      | timeOfDay       | time  |
#     | today    | beforeMorning   | 17:30 |
#     | today    | beforeAfternoon | 17:30 |
#     | today    | beforeEvening   | 17:30 |
#     | today    | afterEvening    | 23:45 |
#     | tomorrow | beforeMorning   | 06:30 |
#     | tomorrow | beforeAfternoon | 06:30 |
#     | tomorrow | beforeEvening   | 06:30 |
#     | tomorrow | afterEvening    | 06:30 |
