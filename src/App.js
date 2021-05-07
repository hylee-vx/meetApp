import React, { Component } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import EventGenre from './EventGenre';

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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map(location => {
      const number = events.filter(event => event.location === location).length;
      const city = location.split(' ').shift();
      return { city, number };
    });
    return data;
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

        <div className="data-vis-wrapper">
          <h4>Events by type</h4>
          <EventGenre events={events} />
          <h4>Events by location</h4>
          <ResponsiveContainer height={400} >
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                type="number"
                dataKey="number"
                name="number of events"
                allowDecimals={false}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#82ca9d" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <EventList events={events} numberOfEvents={numberOfEvents} />
      </div>
    );
  }
};

export default App;