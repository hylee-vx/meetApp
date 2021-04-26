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

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all')
        ? events
        : events.filter(event => event.location === location);
      const numberLocationEvents = locationEvents.slice(0, eventCount);
      this.setState({
        events: numberLocationEvents,
        numberOfEvents: eventCount
      });
    });
  }

  render() {
    const { events, locations, numberOfEvents } = this.state;
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={events} numberOfEvents={numberOfEvents} />
      </div>
    );
  }
};

export default App;