Feature: Offline
As a user
I want to manage my reminders whilst Offline
So that I can manage my reminders in any condition

# TODO: Implement tests
# Handled by fetch_status.feature
# Scenario: When offline the header indicates this
# Scenario: When transition from online to offline the header display updates
# Scenario: When transition from offline to online the header display updates
# Scenario: All content downloaded to the app is available when offline
#   Given we preload the api with "10" reminders
#   And we have logged in successfully
#   Then the reminder list count "will be" "10"
#   When we set the network as "offline"
#   And we reload the app
#   Then the "home" route "will be" visible
#   And the reminder list count "will be" "10"

# Scenario: Can add local reminder when offline
#   Given we have logged in successfully
#   When we set the network as "offline"
#   And we reload the app
#   Then the "home" route "will be" visible
#   When we add a reminder with the text "Offline item"
#   Then the text for the "1st" reminder "is" "Offline item"
#   And the reminder list count "will be" "1"

# Scenario: Reminder added offline is synced when connected
#   Given we have logged in successfully
#   When we set the network as "offline"
#   And we reload the app
#   Then the "home" route "will be" visible
#   When we add a reminder with the text "Offline item"
#   Then api data "will be" "none"
#   When we set the network as "online"
#   Then api data "will be" "offlineItem"

# Scenario: Sync does not try if offline
#   Given we add a hook with id "syncCron" and type "none"
#   And we have logged in successfully
#   Then the sync request count "will be" "1"
#   When we set the network as "offline"
#   Then the sync request count "is" "1"
#   When we add a reminder with the text "Offline item"
#   Then the sync request count "is" "1"
#   When we set the network as "online"
#   Then the sync request count "will be" "2"
