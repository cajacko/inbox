Feature: Sync data
  As a user
  I want my data to be saved and synced across devices
  So that I have the latest chanegs on all my devices

  # TODO: Fillin scenarios

  # TRIGGERS

  Scenario: Sync triggers on poll, when logged in
  # Given we add a hook with id "syncCronInterval" and type "short"
  # And we have logged in successfully
  # Then a sync request with the type "cron" "will be" dispatched
  # And the sync request count "is" "2"
  # And the sync request types "is" "LOGIN, CRON"

  Scenario: Sync triggers on poll when logged in from persisted state
  # Given we add a hook with id "syncCronInterval" and type "short"
  # And we have opened the app in a logged in state
  # Then the sync request count "will be" "2"
  # And the sync request types "is" "REHYDRATE, CRON"

  Scenario: Sync triggers on launch when logged in from persisted state
  # Given we have opened the app in a logged in state
  # Then the sync request count "will be" "1"
  # And the sync request types "is" "REHYDRATE"

  Scenario: Sync triggers on login
  # Given we have logged in successfully
  # And the sync request count "will be" "1"
  # And the sync request types "is" "LOGIN"

  Scenario: Sync triggered when save a new post
  # Given we add a hook with id "syncCron" and type "none"
  # And we have logged in successfully
  # When we add a reminder with the text "Sync triggered when save a new post"
  # Then the sync request count "will be" "2"
  # And the sync request types "is" "REHYDRATE, SET_REMINDER"

  Scenario: Sync triggered when mark a reminder as done

  Scenario: Sync triggered when edit a post
  # Given we add a hook with id "syncCron" and type "none"
  # And we preload the api with "1" reminders
  # And we have logged in successfully
  # When we edit the "1st" reminder with the text "- edited"
  # Then the sync request count "will be" "2"
  # And the sync request types "is" "REHYDRATE, SET_REMINDER"

  Scenario: Sync triggered when delete a post
  # Given we add a hook with id "syncCron" and type "none"
  # And we preload the api with "1" reminders
  # And we have logged in successfully
  # When we delete the "1st" reminder
  # Then the sync request count "will be" "2"
  # And the sync request types "is" "REHYDRATE, SET_REMINDER"

  # DOES NOT TRIGGER

  Scenario: Sync does not get triggered on launch if not logged in
  Scenario: Sync does not get triggered on poll if not logged in
  Scenario: Sync does not trigger when cancel edit post
  Scenario: Sync does not get triggered on poll when logged in, then logged out

  # SYNC POST BEHAVIOUR
  Scenario: Sync posts all new reminders
  Scenario: Sync posts all edited reminders
  Scenario: Sync does not post reminders that have not changed
  Scenario: Sync posts rehydrated changes that were not saved

  # SYNC GET BEHAVIOUR
  Scenario: Sync updates reminder list with new reminders from api
  Scenario: Sync returns new data that includes the posted edits
  Scenario: Sync does not discard new changes which occured whilst a sync was happening
  Scenario: Sync results do not get put in the store if they return whilst logged out

  # SYNC STATUS (Include reminders that should and should not change in each of
  # the below)
  Scenario: Sync requested updates the synced reminders status to saving
  Scenario: Sync success updates the synced reminders status to saved
  Scenario: Sync error updates the synced reminders status to saved

  # The header status button is tested in fetch_status.feature
  Scenario: Sync requested updates the header fetch status to saving
  Scenario: Sync success updates the header fetch status to saved
  Scenario: Sync error updates the header fetch status to error

  # SYNC THROTTLING
  Scenario: Sync cannot be triggered whilst another sync is in progress
  # So that we don't get a nother sync happening immediately after another, just
  # because of the cron, is ok if it's from an edit as that should get synced
  # right away
  Scenario: Sync cron is restarted after every sync

