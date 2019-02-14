Feature: Reminder List
  As a user
  I want to see a list of my reminders
  So that I can keep track things I need to get done

  Scenario: Reminder list displays correctly
    Given we preload the redux state with "10" reminders
    And we have logged in successfully
    Then the reminder list "is" visible
    And the reminder list loading icon "will not be" visible
    And the reminder list count "is" "10"
    And the screenshot matches

  Scenario: Reminder list displays correctly with no reminders
    Given we have logged in successfully
    Then the reminder list "is not" visible
    And the no reminders component "is" visible
    And the reminder list loading icon "will not be" visible
    And the reminder list count "is" "0"
    And the screenshot matches

  Scenario: Reminder list displays correctly with lots of reminders
    Given we preload the redux state with "30" reminders
    And we have logged in successfully
    And the reminder list loading icon "will not be" visible
    Then the reminder list "is" visible
    And the reminder list count "is" "30"
    And the screenshot matches

  # Can't get the scroll to work in puppeteer although works manually
  # Scenario: Reminder list can be scrolled (Covered by next scenario)
  # Scenario: Reminder list displays correctly when at the end of the list
  #   # Has additonal space for the add button
  #   Given we preload the redux state with "30" reminders
  #   And we have logged in successfully
  #   When we scroll to the bottom of the reminder list
  #   Then the screenshot matches

  Scenario: New reminders get loaded in on page load
    Given we preload the api with "10" reminders
    And we have logged in successfully
    Then the reminder list count "is" "0"
    And the reminder list loading icon "will not be" visible
    And the reminder list count "is" "10"

  Scenario: Loading latest reminders with no existing reminders displays correctly
    Given we add a hook with id "getReminders" and type "delay"
    And we have logged in successfully
    Then the reminder list count "is" "0"
    And the reminder list loading icon "is" visible
    Then the screenshot matches

  # This scenario covers the following as well
  # Scenario: Reminders persisted in state show immediately on next load
  Scenario: Loading latest reminders with existing reminders displays correctly
    Given we add a hook with id "getReminders" and type "delay"
    And we preload the redux state with "10" reminders
    And we have logged in successfully
    Then the reminder list count "is" "10"
    And the reminder list loading icon "is" visible
    Then the screenshot matches

  Scenario: Loading latest reminders with no existing reminders and errors displays correctly
    Given we add a hook with id "getReminders" and type "error"
    And we have logged in successfully
    Then the reminder list count "is" "0"
    And the reminder list loading icon "will not be" visible
    And the reminder list loading error "is" visible
    Then the screenshot matches

  Scenario: Loading latest reminders with existing reminders and errors displays correctly
    Given we add a hook with id "getReminders" and type "error"
    And we preload the redux state with "10" reminders
    And we have logged in successfully
    Then the reminder list count "is" "10"
    And the reminder list loading icon "will not be" visible
    And the reminder list loading error "is" visible
    Then the screenshot matches

  @platform-ios @platform-android
  Scenario: Pull down from top triggers a reload
  @platform-ios @platform-android
  Scenario: Pull down from top and erros displays correctly
  @platform-ios @platform-android
  Scenario: Pull down from top loading displays correctly

# Don't think we need any fetch more functionality yet
# Scenario: Initial load only pulls in 20 reminders
# Scenario: Fetch more is triggered as we scroll to the bottom of the list
# Scenario: Fetch more loading displays correctly
# Scenario: Fetch more error displays correctly
# Scenario: Fetch more end of list displays correctly
# Scenario: Fetch more retry works
# Scenario: Fetch more gets the next 20 reminders

