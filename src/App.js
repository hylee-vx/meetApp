import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

import './App.css';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all'
  };

  componentDidMount() {
    this.mounted = true;
    const { numberOfEvents } = this.state;

    getEvents().then(events => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, numberOfEvents),
          locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = location => {
    getEvents().then(events => {
      const locationEvents = (location === 'all')
        ? events
        : events.filter(event => event.location === location);
      const { numberOfEvents } = this.state;
      const filteredEvents = locationEvents.slice(0, numberOfEvents);
      this.setState({
        events: filteredEvents,
        currentLocation: location
      });
    });
  }


  updateEventCount = eventCount => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount
    });
    this.updateEvents(currentLocation);
  }

  render() {
    const { events, locations, numberOfEvents } = this.state;
    return (
      <div className="App">
        <h1 className="app-name">JS MeetApp</h1>
        <div className="app-inputs">
          <div className="city-input">
            <p className="input-label city-label">Search cities: </p>
            <CitySearch locations={locations} updateEvents={this.updateEvents} className="input-component" />
          </div>
          <div className="number-input">
            <p className="input-label number-label">Show number of events:</p>
            <NumberOfEvents updateEventCount={this.updateEventCount} className="input-component" />
          </div>
        </div>
        <EventList events={events} numberOfEvents={numberOfEvents} />
      </div>
    );
  }
};

export default App;