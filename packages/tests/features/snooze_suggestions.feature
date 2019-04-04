Feature: Snooze Suggestions
  As a user
  I want to quickly snooze reminders to times I regulary use
  So that I can more quickly snooze reminders

  # BEHAVIOUR

  Scenario: Later this week snoozes to the correct time
    Given we set the day to monday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the header loading icon "will not be" visible
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the "later this week" snooze suggestion is pressed
    And the header loading icon "will not be" visible
    Then the due date of the only reminder "is" "2019-03-06 06:30"

  Scenario: Later today snoozes to the correct time
    Given we set the day to monday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the header loading icon "will not be" visible
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the "later today" snooze suggestion is pressed
    And the header loading icon "will not be" visible
    Then the due date of the only reminder "is" "2019-03-04 17:30"

  Scenario: Next week snoozes to the correct time
    Given we set the day to monday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the header loading icon "will not be" visible
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the "next week" snooze suggestion is pressed
    And the header loading icon "will not be" visible
    Then the due date of the only reminder "is" "2019-03-11 06:30"

  Scenario: Next weekend snoozes to the correct time
    Given we set the day to saturday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the header loading icon "will not be" visible
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the "next weekend" snooze suggestion is pressed
    And the header loading icon "will not be" visible
    Then the due date of the only reminder "is" "2019-03-16 06:30"

  Scenario: This weekend snoozes to the correct time
    Given we set the day to monday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the header loading icon "will not be" visible
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the "this weekend" snooze suggestion is pressed
    And the header loading icon "will not be" visible
    Then the due date of the only reminder "is" "2019-03-09 06:30"

  Scenario: Tomorrow snoozes to the correct time
    Given we set the day to monday
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the header loading icon "will not be" visible
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the "tomorrow" snooze suggestion is pressed
    And the header loading icon "will not be" visible
    Then the due date of the only reminder "is" "2019-03-05 06:30"

  # WHEN TO SHOW SUGGESTIONS

  Scenario Outline: Later this week shows
    Given we set the day to <day>
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the "later this week" snooze suggestions visiblity "is" <shows>
    And the header loading icon "will not be" visible
    And the screenshot matches, <day>, <shows>

    Examples:
      | day       | shows |
      | monday    | true  |
      | tuesday   | true  |
      | wednesday | true  |
      | thursday  | false |
      | friday    | false |
      | saturday  | false |
      | sunday    | false |

  Scenario Outline: Later today shows
    Given we set the time to <time>
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the "later today" snooze suggestions visiblity "is" <shows>
    And the header loading icon "will not be" visible
    And the screenshot matches, <time>, <shows>

    Examples:
      | time            | shows |
      | beforeMorning   | true  |
      | beforeAfternoon | true  |
      | beforeEvening   | true  |
      | afterEvening    | false |

  Scenario Outline: Next week shows
    Given we set the day to <day>
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the "next week" snooze suggestions visiblity "is" <shows>
    And the header loading icon "will not be" visible
    And the screenshot matches, <day>, <shows>

    Examples:
      | day       | shows |
      | monday    | true  |
      | tuesday   | true  |
      | wednesday | true  |
      | thursday  | true  |
      | friday    | true  |
      | saturday  | true  |
      | sunday    | false |

  Scenario Outline: Next weekend shows
    Given we set the day to <day>
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the "next weekend" snooze suggestions visiblity "is" <shows>
    And the header loading icon "will not be" visible
    And the screenshot matches, <day>, <shows>

    Examples:
      | day       | shows |
      | monday    | false |
      | tuesday   | false |
      | wednesday | false |
      | thursday  | false |
      | friday    | false |
      | saturday  | true  |
      | sunday    | true  |

  Scenario Outline: This weekend shows
    Given we set the day to <day>
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the "this weekend" snooze suggestions visiblity "is" <shows>
    And the header loading icon "will not be" visible
    And the screenshot matches, <day>, <shows>

    Examples:
      | day       | shows |
      | monday    | true  |
      | tuesday   | true  |
      | wednesday | true  |
      | thursday  | true  |
      | friday    | false |
      | saturday  | false |
      | sunday    | false |

  Scenario Outline: Tomorrow shows
    Given we set the day to <day>
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the "tomorrow" snooze suggestions visiblity "is" <shows>
    And the header loading icon "will not be" visible
    And the screenshot matches, <day>, <shows>

    Examples:
      | day       | shows |
      | monday    | true  |
      | tuesday   | true  |
      | wednesday | true  |
      | thursday  | true  |
      | friday    | true  |
      | saturday  | true  |
      | sunday    | true  |

  Scenario Outline: Custom times show on the current day
    Given we set the time to <time>
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "4" in the date picker is pressed
    And the snooze confirm change time button is pressed
    Then the "morning" snooze time suggestions visiblity "is" <morning>
    And the "afternoon" snooze time suggestions visiblity "is" <afternoon>
    And the "evening" snooze time suggestions visiblity "is" <evening>
    And the header loading icon "will not be" visible
    And the screenshot matches, <time>, <morning>, <afternoon>, <evening>

    Examples:
      | time            | morning | afternoon | evening |
      | beforeMorning   | true    | true      | true    |
      | beforeAfternoon | false   | true      | true    |
      | beforeEvening   | false   | false     | true    |

  Scenario: When we're snoozing to the current day and past the set evening time, the time suggestions do not show
    Given we set the time to afterEvening
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "4" in the date picker is pressed
    And the snooze confirm change time button is pressed
    Then the time suggestions component "is not" visible
    And the custom time picker "is" visible

  Scenario Outline: Custom times show on a future day
    Given we set the time to <time>
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    And the snooze scene custom date button is pressed
    And day "5" in the date picker is pressed
    And the snooze confirm change time button is pressed
    Then the "morning" snooze time suggestions visiblity "is" <morning>
    And the "afternoon" snooze time suggestions visiblity "is" <afternoon>
    And the "evening" snooze time suggestions visiblity "is" <evening>
    And the header loading icon "will not be" visible
    And the screenshot matches, <time>, <morning>, <afternoon>, <evening>

    Examples:
      | time            | morning | afternoon | evening |
      | beforeMorning   | true    | true      | true    |
      | beforeAfternoon | true    | true      | true    |
      | beforeEvening   | true    | true      | true    |
      | afterEvening    | true    | true      | true    |
