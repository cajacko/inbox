Feature: Login
  As a user
  I want to login into the app
  So that I can manage my reminders

  Scenario: Login displays correctly
    Given we add a hook with id "loggedIn" and type "false"
    And the driver is ready
    When the app is navigated to "/"
    Then the app logo "is" visible
    And the login button "is" visible
    And the app version matches the expected version
    And the screenshot matches

  @web
  Scenario: User logs in successfully
    Given we add a hook with id "login" and type "success"
    And the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    And the login details are entered
    And the Google login submit button is pressed
    Then the "logged in" home route is visible
    And the screenshot matches

  @web
  Scenario: Error from Google
    Given we add a hook with id "login" and type "googleFailed"
    And the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    And the login details are entered
    And the Google login submit button is pressed
    Then the login scene is visible
    And the login error text "is" "Google failed to log you in, try again"
    And the screenshot matches

  @web
  Scenario: Error from our server
    Given we add a hook with id "login" and type "serverFailed"
    And the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    And the login details are entered
    And the Google login submit button is pressed
    Then the error component "is" visible
    And the error code "is" "new"
    And there are "2" error buttons
    And the "1st" error button has the text "LOGIN"
    And the "2nd" error button has the text "GO BACK"
    And the screenshot matches

  @web
  Scenario: Error from our server and go back
  @web
  Scenario: Error from our server and login again
