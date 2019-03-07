Feature: Snooze Suggestions
  As a user
  I want to quickly snooze reminders to times I regulary use
  So that I can more quickly snooze reminders

  # TODO: different screenshots for outline stuff

  # BEHAVIOUR

  Scenario: Later this week snoozes to the correct time
  Scenario: Later today snoozes to the correct time
  Scenario: Next week snoozes to the correct time
  Scenario: Next weekend snoozes to the correct time
  Scenario: This weekend snoozes to the correct time
  Scenario: Tomorrow snoozes to the correct time

  # TODO: Capture screenshots as well
  # WHEN TO SHOW SUGGESTIONS
  Scenario Outline: Later this week shows
    Given we set the day to <day>
    And we have logged in successfully
    When we add a reminder with the text "Item to be snoozed"
    And the we hover over the "1st" reminder
    And the "1st" reminder hover "snooze" button is pressed
    Then the "later today" snooze suggestions visiblity "is" <shows>
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
    Then the "today" snooze suggestions visiblity "is" <shows>
    And the header loading icon "will not be" visible
    And the screenshot matches

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
    And the screenshot matches

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
    And the screenshot matches

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
    And the screenshot matches

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
    And the screenshot matches

    Examples:
      | day       | shows |
      | monday    | true  |
      | tuesday   | true  |
      | wednesday | true  |
      | thursday  | true  |
      | friday    | true  |
      | saturday  | true  |
      | sunday    | true  |

  # TODO: Handle custom time suggestions

  Scenario Outline: Custom times show
    Examples:
      | time            | suggestion | shows |
      | beforeMorning   | morning    | true  |
      | beforeMorning   | afternoon  | true  |
      | beforeMorning   | evening    | true  |
      | beforeAfternoon | morning    | false |
      | beforeAfternoon | afternoon  | true  |
      | beforeAfternoon | evening    | true  |
      | beforeEvening   | morning    | false |
      | beforeEvening   | afternoon  | false |
      | beforeEvening   | evening    | true  |

  Scenario: When we're past the set evening time, the time suggestions do not show
# We go straight to the time selection

# Error if somehow a past date tries to get submitted (as could happen if wait a
# bit)
