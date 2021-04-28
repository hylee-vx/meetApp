Feature: Specify number of events

Scenario: When user hasn't specified a number, 32 is the default number
Given the user hasn't specified a number of events to view
When the user views the list of events
Then the user should see a list of 32 events

Scenario: User can change the number of events they want to see
Given the main page is open
When the user types a number in the "Number of Events" input field
Then the number of events should be changed to that number
And the user should receive a list of that number of events