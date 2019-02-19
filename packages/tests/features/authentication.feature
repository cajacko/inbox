Feature: Authentication
  As a user
  I want only myself to access my data
  So that I can protect my personal information

  Scenario: When sync is unauthorised the app silently logs the user back in successfully
    Given we add a hook with id "syncCron" and type "none"
    And we have logged in successfully
    Then the "1st" sync request will be "SUCCESS"
    When we revoke the id token
    And we reload the app
    Then the "2nd" sync request will be "ERROR"
    And the "3rd" sync request will be "SUCCESS"

  Scenario: When silent login fails, the relogin scene is displayed correctly
    Given we add a hook with id "syncCron" and type "none"
    And we have logged in successfully
    Then the "1st" sync request will be "SUCCESS"
    When we revoke the id token
    And we add a hook with id "refreshIdToken" and type "error"
    And we reload the app
    Then the "2nd" sync request will be "ERROR"
    Then the "3rd" sync request will be "ERROR"
    And the relogin scene "will be" visible
    And the screenshot matches

  Scenario: Reloggin in hydrates the previous state
    Given we preload the api with "10" reminders
    And we add a hook with id "syncCron" and type "none"
    And we have logged in successfully
    Then the "1st" sync request will be "SUCCESS"
    And the reminder list count "is" "10"
    When we revoke the id token
    And we add a hook with id "refreshIdToken" and type "error"
    And we reload the app
    Then the relogin scene "will be" visible
    Given we add a hook with id "sync" and type "delay"
    When we have relogged in successfully
    Then the reminder list count "is" "10"

  Scenario: Reloggin in with a different user does not hydrate the state
    Given we preload the api with "10" reminders
    And we add a hook with id "syncCron" and type "none"
    And we have logged in successfully
    Then the "1st" sync request will be "SUCCESS"
    And the reminder list count "is" "10"
    When we revoke the id token
    And we add a hook with id "refreshIdToken" and type "error"
    And we reload the app
    Then the relogin scene "will be" visible
    Given we add a hook with id "sync" and type "delay"
    And we add a hook with id "setUser" and type "user2"
    When we have relogged in successfully
    Then the reminder list count "is" "0"

  Scenario: Reopening the app during relogin, clears the store and displays the normal login scene
    Given we preload the api with "10" reminders
    And we add a hook with id "syncCron" and type "none"
    And we have logged in successfully
    Then the "1st" sync request will be "SUCCESS"
    And the reminder list count "is" "10"
    When we revoke the id token
    And we add a hook with id "refreshIdToken" and type "error"
    And we reload the app
    Then the relogin scene "will be" visible
    When we reload the app
    Then the login scene "will be" visible
    And the relogin scene "is not" visible
    Given we add a hook with id "sync" and type "delay"
    When we have relogged in successfully
    Then the reminder list count "is" "0"
