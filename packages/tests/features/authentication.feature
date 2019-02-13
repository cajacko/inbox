Feature: Authentication
  As a user
  I want only myself to access my data
  So that I can protect my personal information

  Scenario: Invalid auth token on launch with successful background refresh
  Scenario: Invalid auth token on launch with login required
  # Check persisted data is kept, so unsaved changes will sync again

  Scenario: Invalid auth token when saving reminder with successful background refresh
  # Check reminder still gets saved

  Scenario: Invalid auth token when saving reminder with login required
  # Check reminder gets saved after login
  # So only clear the app state, if user logged out themselves, or they
  # relogin with a different user

  Scenario: Background sync with invalid token and successful background refresh
  Scenario: Background sync with invalid token and login required
