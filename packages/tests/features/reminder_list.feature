Feature: Reminder List
  As a user
  I want to see a list of my reminders
  So that I can keep track things I need to get done

  Scenario: Reminder list displays correctly
    Given we preload the redux state with "10" reminders
    And we have logged in successfully
    Then the reminder list "is" visible
    And the header loading icon "will not be" visible
    And the reminder list count "is" "10"
    And the screenshot matches

  Scenario: Reminder list displays correctly with no reminders
    Given we have logged in successfully
    Then the reminder list "is not" visible
    And the no reminders component "is" visible
    And the header loading icon "will not be" visible
    And the reminder list count "is" "0"
    And the screenshot matches

  Scenario: Reminder list displays correctly with lots of reminders
    Given we preload the redux state with "30" reminders
    And we have logged in successfully
    And the header loading icon "will not be" visible
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
    And we add a hook with id "sync" and type "minorDelay"
    And we have logged in successfully
    Then the reminder list count "is" "0"
    And the header loading icon "will not be" visible
    And the header error button "is not" visible
    And the reminder list count "is" "10"

  Scenario: Loading latest reminders displays correctly
    Given we add a hook with id "sync" and type "delay"
    And we have logged in successfully
    Then the reminder list count "is" "0"
    And the header loading icon "is" visible

  Scenario: Loading latest reminders and errors displays correctly
    Given we add a hook with id "sync" and type "error"
    And we have logged in successfully
    Then the reminder list count "is" "0"
    And the header error button "will be" visible

  Scenario: Reminders persisted in state show immediately on next load
    Given we add a hook with id "sync" and type "delay"
    And we preload the redux state with "10" reminders
    And we have logged in successfully
    Then the reminder list count "is" "10"

  Scenario: New reminders with persisted get loaded in on page load
    Given we preload the api with "10" reminders
    And we preload the redux state with "10" reminders
    And we have logged in successfully
    Then the reminder list count "is" "10"
    And the header loading icon "is" visible
    And the header loading icon "will not be" visible
    And the reminder list count "is" "20"

  @platform-ios @platform-android
  Scenario: Pull down from top triggers a reload
  @platform-ios @platform-android
  Scenario: Pull down from top and erros displays correctly
  @platform-ios @platform-android
  Scenario: Pull down from top loading displays correctly

  Scenario: Home reminder list only displays reminders with no status

# Don't think we need any fetch more functionality yet, but here's some
# scenarios just in case
# Scenario: Initial load only pulls in 20 reminders
# Scenario: Fetch more is triggered as we scroll to the bottom of the list
# Scenario: Fetch more loading displays correctly
# Scenario: Fetch more error displays correctly
# Scenario: Fetch more end of list displays correctly
# Scenario: Fetch more retry works
# Scenario: Fetch more gets the next 20 reminders

