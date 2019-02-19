Feature: Menu
  As a user
  I want to use a menu
  So that I can configure the app

  Background:
    Given we add a hook with id "login" and type "success"
    And the driver is ready
    When the app is navigated to "/"
    And the login button is pressed
    Then the "logged in" home route "will be" visible
    And the menu "is not" visible
    When the menu button is pressed
    Then the menu "will be" visible

  Scenario: Menu displays correctly
    Then the screenshot matches

  @size-tablet @size-mobile
  Scenario: Hide menu by clicking background
    When the menu background button is pressed
    Then the menu "will not be" visible

  @size-tablet @size-mobile
  Scenario: Hide menu with close button
    When the menu close button is pressed
    Then the menu "will not be" visible

  @size-desktop
  Scenario: Hide menu on desktop with normal button
    When the menu button is pressed
    Then the menu "will not be" visible

  # TODO: Do this
  Scenario: Hide menu by using the device back button
  # TODO:
  Scenario: Keep desktop menu open when navigate between scenes
  # TODO:
  Scenario: Show close button on desktop when menu open

