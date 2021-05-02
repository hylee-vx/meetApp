Feature: Show/hide an event's details

Scenario: An event element is collapsed by default
Given the main page is open
When the user first views the list of events
Then the user should see each event is collapsed by default

Scenario: User can expand an event to see its details
Given all event elements are collapsed
When the user clicks on the "Show details" button on an event
Then the event should expand so the user can see its details

Scenario: User can collapse an event to hide its details
Given an event element is expanded
When the user clicks on the "Hide details" button
Then the event should collapse to hide its details