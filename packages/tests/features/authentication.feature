Feature: Authentication
  As a user
  I want only myself to access my data
  So that I can protect my personal information

  # Useful to chekc at the beginning, so it doesn't happen on sync
  Scenario: Invalid auth token on launch with successful background refresh
  # This is a login overlay, rather than standard login?
  Scenario: Invalid auth token on launch with unsuccessful background refresh causes you to login again
  # Check persisted data is kept, so unsaved changes will sync again

  Scenario: Invalid auth token when saving reminder with successful background refresh
  # Check reminder still gets saved

  Scenario: Invalid auth token when saving reminder with unsuccessful background refresh
  # Check reminder gets saved after login
  # So only clear the app state, if user logged out themselves, or they
  # relogin with a different user

  Scenario: Background sync with invalid token and successful background refresh
  Scenario: Background sync with invalid token and unsuccessful background refresh causes login required

  Scenario: Relogin displays correctly
  Scenario: Reopening the browser during relogin, clears the redux store
  Scenario: Login from relogin with different user, clears redux store
  Scenario: Login from relogin with same user keeps persisted data
