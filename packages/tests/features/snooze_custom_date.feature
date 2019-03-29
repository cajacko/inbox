# Custom time suggestions are handled in snooze_suggestions.feature
Feature: Snooze Custom Date
  As a user
  I want to snooze reminders to a specific date and time
  So that I can get reminded at the specific time I want to

  # Scenario: Can navigate back from date picker via back button
  # Scenario: Can navigate back from time picker via back button

  # Can navigate months
  # Can scroll and select time

  # TODO: Existing snooze date shows that snooze when click custom snooze

  Scenario: Snoozing to a custom date sets the correct date
    Given we set the day to monday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "8" in the date picker is pressed
    And the snooze scene custom save button is pressed
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

  Scenario Outline: Default custom date
    Given we set the time to <timeOfDay>
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And <day> in the date picker is pressed
    Then the snooze scene custom time "is" <time>

    Examples:
      | day      | timeOfDay       | time  |
      | today    | beforeMorning   | 17:30 |
      | today    | beforeAfternoon | 17:30 |
      | today    | beforeEvening   | 17:30 |
      | today    | afterEvening    | 23:45 |
      | tomorrow | beforeMorning   | 06:30 |
      | tomorrow | beforeAfternoon | 06:30 |
      | tomorrow | beforeEvening   | 06:30 |
      | tomorrow | afterEvening    | 06:30 |

  Scenario Outline: Custom time shows the correct suggestion label text
    Given we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "7" in the date picker is pressed
    And the snooze confirm change time button is pressed
    And the "customised" snooze time suggestion is pressed
    And the snooze time is set to <time>
    Then the snooze scene custom time label "is" <label>

    Examples:
      | time  | label     |
      | 05:00 | Custom    |
      | 06:30 | Morning   |
      | 08:00 | Custom    |
      | 12:30 | Afternoon |
      | 15:00 | Custom    |
      | 17:30 | Evening   |
      | 20:00 | Custom    |
