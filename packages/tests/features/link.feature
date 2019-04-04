Feature: Link
  As a user
  I want to quickly follow links I put in my reminders
  So that I can more quickly go to the link I saved

  Scenario: Link displays correctly
    Given we have logged in successfully
    When we add a reminder with the text "Link https://google.com"
    And the header loading icon "will not be" visible
    And the screenshot matches

  # Scenario: Long link still stays on 1 line
  Scenario: Long link displays correctly
    Given we have logged in successfully
    When we add a reminder with the text "Link https://google.com/path/to/something/or/another/thing/to/go/to/another/place/and/another/really/long/one"
    And the header loading icon "will not be" visible
    And the screenshot matches

  # Tested via the normal reminder list test screenshots
  # Scenario: Link does not show for reminder with no link

  Scenario Outline: When a reminder contains a link the link box is shown
    Given we have logged in successfully
    When we add a reminder with the text <text>
    Then the "1st" reminder link visibility "is" <visibility>
    Then the "1st" reminder link "is" <link>

    Examples:
      | visibility | link                                                          | text                                                          |
      | true       | https://google.com                                            | https://google.com                                            |
      | false      | null                                                          | No link                                                       |
      | true       | https://google.com/?hello=true                                | https://google.com/?hello=true                                |
      | true       | https://google.com/?hello=true&test=blue                      | https://google.com/?hello=true&test=blue                      |
      | true       | https://google.com#hello=true                                 | https://google.com#hello=true                                 |
      | true       | https://google.com#hello=true&test=blue                       | https://google.com#hello=true&test=blue                       |
      | true       | https://google.com/?hello=true&test=blue#hello=true&test=blue | https://google.com/?hello=true&test=blue#hello=true&test=blue |
      | true       | https://google.com                                            | content https://google.com content                            |
      | true       | https://google.com                                            | https://google.com content                                    |
      | true       | https://google.com                                            | content https://google.com content https://amazon.com         |

  # TODO: Figure out how to test
  # Scenario: Tapping the link takes you to the page (In a new tab)
  #   Given we have logged in successfully
  #   When we add a reminder with the text "Link https://google.com"
  #   And we tap on the "1st" reminder link
  #   Then the browser tab count "is" "2"
  #   And the active tab url "is" "https://google.com"

  # TODO: Manual check
  # Scenario: Animating a link reminder close works

  Scenario: Hover menu looks correct with link
    Given we have logged in successfully
    When we add a reminder with the text "Link https://google.com"
    And the we hover over the "1st" reminder
    Then the header loading icon "will not be" visible
    And the screenshot matches
