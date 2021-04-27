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
    numberOfEvents: 32
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then(events => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = location => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all')
        ? events
        : events.filter(event => event.location === location);
      const { numberOfEvents } = this.state;
      const filteredEvents = locationEvents.slice(0, numberOfEvents);
      this.setState({
        events: filteredEvents
      });
    });
  }

  updateEventCount = eventCount => {
    this.setState({
      numberOfEvents: eventCount
    });
  }

  render() {
    const { events, locations, numberOfEvents } = this.state;
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEventCount={this.updateEventCount} />
        <EventList events={events} numberOfEvents={numberOfEvents} />
      </div>
    );
  }
};

export default App;