# Custom time suggestions are handled in snooze_suggestions.feature
Feature: Snooze Custom Date
  As a user
  I want to snooze reminders to a specific date and time
  So that I can get reminded at the specific time I want to

  # TODO: Scenario: Can navigate back from date picker via back button
  # TODO: Scenario: Can navigate back from time picker via back button

  # TODO: Can navigate months
  # TODO: Can scroll and select time

  # TODO: Existing snooze date shows that snooze when click custom snooze

  # This would be the same test, as must pick a date
  # Scenario: Accepting the default custom snooze date and time sets the correct date and time
  Scenario: Snoozing to a custom date sets the correct date
    Given we set the day to monday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    Then the header loading icon "will not be" visible
    When the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "8" in the date picker is pressed
    And the snooze scene custom save button is pressed
    Then the header loading icon "will not be" visible
    And the due date of the only reminder "is" "2019-03-08 06:30"

  Scenario Outline: Snoozing to a custom date and suggested time sets the correct date and time
    Given we set the day to monday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    Then the header loading icon "will not be" visible
    When the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "10" in the date picker is pressed
    And the snooze confirm change time button is pressed
    And the <suggestion> snooze time suggestion is pressed
    And the snooze scene custom save button is pressed
    Then the header loading icon "will not be" visible
    And the due date of the only reminder "is" 2019-03-10 <time>

    Examples:
      | suggestion | time  |
      | morning    | 06:30 |
      | afternoon  | 12:30 |
      | evening    | 17:30 |

  Scenario: Snoozing to a custom date and a custom time sets the correct date and time
    Given we set the day to monday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    Then the header loading icon "will not be" visible
    When the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "10" in the date picker is pressed
    And the snooze confirm change time button is pressed
    And the "customised" snooze time suggestion is pressed
    And the snooze time is set to 15:30
    And the snooze scene custom save button is pressed
    Then the header loading icon "will not be" visible
    And the due date of the only reminder "is" "2019-03-10 15:30"

  @snooze-labels
  Scenario: Changing the date updates the label on the confirm modal
    Given we set the day to monday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "7" in the date picker is pressed
    Then the snooze scene custom date label "is" "Thu 7 Mar"
    When the snooze scene custom date button is pressed
    And day "8" in the date picker is pressed
    Then the snooze scene custom date label "is" "Fri 8 Mar"

  @snooze-labels
  Scenario: Changing the time updates the label on the confirm modal
    Given we set the day to monday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "7" in the date picker is pressed
    Then the snooze scene custom time value "is" "06:30"
    When the snooze confirm change time button is pressed
    And the "customised" snooze time suggestion is pressed
    And the snooze time is set to "15:30"
    Then the snooze scene custom time value "is" "15:30"

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
