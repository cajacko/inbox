Feature: Fetch Status
  As a user
  I want to know when data has not be saved
  So that I can ensure my data syncs later

  # TODO: Fill in these tests

  # Check displays correctly
  Scenario: No status icon is visible when the last network request was successful
  # And the header loading icon "is not" visible
  # And the header error button "is not" visible

  Scenario: Loading icon displays correctly in header when making a network request
  Scenario: Loading icon does not show the error dialog when pressed

  Scenario: A quick network request does not show the loading icon
  Scenario: If the loading icon does show it will show for a minimum of 2 seconds

  Scenario: Network error displays an error button in the header
  # Given we add a hook with id "getReminders" and type "error"
  # And we have logged in successfully
  # And the header error button "will be" visible
  # When the header error button is pressed
  # Then the network error dialog text "is" "There was an error syncing data, wait or try again"

  Scenario: Network error dialog displays correctly

  Scenario: Dismiss network error dialog by background
  Scenario: Dismiss network error dialog by close button
  Scenario: Dismiss network error dialog by back button
  Scenario: Tapping retry on the network error dialog, dismisses the dialog and runs sync again

# TODO: Part of the offline feature, so do then
# Scenario: When offline the fetch status shows the offline button
# Scenario: Pressing the offline button shows the offline message
# Scenario: When the device comes back online the header status updates
