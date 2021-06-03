# meetapp

A serverless, progressive web application (PWA) built with React that connects with the Google Calendar API to fetch upcoming events. The serverless function is hosted by AWS, and the app is built using the Test-Driven Development (TDD) approach.

The application is deployed on GitHub Pages [here](https://hylee-vx.github.io/meetapp/).
##### NB as the app is in testing mode, your email address must be added to an access list first 

## Key Features
* The default view returns a list of 32 events in all cities
* Users can filter events by city and by number of events, to return a specific number of events in a specific city or all cities
* The default view for each event displays the event title, location, start time and date
* Users can expand each event to display the event description and link to the event on Google Calendar
* The app displays a pie chart of the numbers of each type of event and a scatterchart of the numbers of events in each city, reflecting the user's search criteria
* Users can use the application offline and add a shortcut to their desktop or mobile homescreen (Android only)

## Technologies
* React
* uses Google Calendar API and OAuth2 authentication flow
* uses AWS lambda serverless functions for authorisation
* Recharts for data visualisation
