Feature: Login
  As a user
  I want to login into the app
  So that I can manage my reminders

  Scenario: Login displays correctly
    Given we add a hook with id "loggedIn" and type "false"
    And the driver is ready
    When the app is navigated to "/"
    Then the login scene "is" visible
    Then the login title "is" visible
    And the login button "is" visible
    And the app version matches the expected version
    And the screenshot matches

  @web
  Scenario: User logs in successfully
    Given we add a hook with id "login" and type "success"
    And the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    Then the "logged in" home route "will be" visible
    And the screenshot matches

  @web
  Scenario: Error from Google
    Given we add a hook with id "login" and type "googleFailed"
    And the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    Then the login error text "will be" "Failed to login with Google, maybe your email or password was incorrect"
    And the screenshot matches

  @web
  Scenario: Desktop check
    Given we add a hook with id "login" and type "googleFailed"
    And the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    Then the login error text "will be" "Failed to login with Google, maybe your email or password was incorrect"
    And the screenshot matches

