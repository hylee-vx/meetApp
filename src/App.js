import React, { Component } from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import PieChartData from './PieChartData';
import ScatterPlotData from './ScatterPlotData';

import './App.css';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    eventsByLocation: null,
    currentLocation: 'all'
  };

  componentDidMount() {
    this.mounted = true;
    const { numberOfEvents } = this.state;

    getEvents().then(events => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, numberOfEvents),
          locations: extractLocations(events),
          eventsByLocation: events.length
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
      const eventsByLocation = locationEvents.length;
      this.setState({
        events: filteredEvents,
        eventsByLocation: eventsByLocation,
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
    const { events, locations, numberOfEvents, eventsByLocation } = this.state;
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
            <NumberOfEvents updateEventCount={this.updateEventCount} numberOfEvents={numberOfEvents} className="input-component" />
          </div>
        </div>

        <div className="data-vis-wrapper">
          <div className="pie-chart-wrapper">
            <h4>Events by type</h4>
            <PieChartData events={events} />
          </div>
          <div className="scatter-plot-wrapper">
            <h4>Events by location</h4>
            <ScatterPlotData locations={locations} events={events} />
          </div>
        </div>

        <h4>{`Displaying ${numberOfEvents} of ${eventsByLocation} events`}</h4>
        <EventList events={events} numberOfEvents={numberOfEvents} />
      </div>
    );
  }
};

export default App;