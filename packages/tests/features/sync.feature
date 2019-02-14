Feature: Sync data
  As a user
  I want my data to be saved and synced across devices
  So that I have the latest chanegs on all my devices

  # TODO: Ensure this is the only api request we make atm
  Scenario: All unsynced changes get synced on poll
  Scenario: Sync triggered on launch after rehydrate
  Scenario: Persisted changes not in the cloud, gets synced on launch
  Scenario: Multiple syncs cannot happen
  Scenario: Sync changes the cloud status of all reminders being synced
  Scenario: Sync turns the header status icon to loading
  Scenario: Sync error turns the header status icon to error
  Scenario: Sync does not start on mount when not logged in
  Scenario: Sync cron stops when logout
  Scenario: Sync cron starts again when login
  Scenario: Sync cron starts on init if logged in
  Scenario: Sync result does not dispatch if logout between sync
