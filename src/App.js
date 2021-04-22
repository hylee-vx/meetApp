import React from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
    </div>
  );
};

export default App;