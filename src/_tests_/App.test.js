import React from 'react';
import { shallow, mount } from 'enzyme';

import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mockdata';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});

describe('<App /> integration', () => {
    test('pass "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('pass "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClick(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    test('pass "numberOfEvents" state as a prop to Events List', () => {
        const AppWrapper = mount(<App />);
        AppWrapper.setState({
            numberOfEvents: 6
        });
        const AppNumberEventsState = AppWrapper.state('numberOfEvents');
        expect(AppNumberEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().numberOfEvents).toBe(AppNumberEventsState);
        AppWrapper.unmount();
    });

    test('get list of events matching the number in input field', async () => {
        const AppWrapper = mount(<App />);
        AppWrapper.setState({
            numberOfEvents: 6
        });
        const EventListWrapper = AppWrapper.find(EventList);
        const eventNumberProp = EventListWrapper.prop('numberOfEvents');
        expect(eventNumberProp).toBe(6);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.slice(0, eventNumberProp);
        expect(AppWrapper.state('numberOfEvents')).toBe(eventsToShow.length);
        AppWrapper.unmount();
    });

    test('get correct number of events to match user input', async () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        AppWrapper.setState({
            numberOfEvents: 6
        });
        NumberOfEventsWrapper.setState({
            numberEvents: 6
        });
        NumberOfEventsWrapper.find('.numberInput').simulate('change', {
            target: { value: 10 }
        });
        expect(NumberOfEventsWrapper.state('numberEvents')).toBe(10);
        const newNumberEvents = NumberOfEventsWrapper.state('numberEvents');
        const allEvents = await getEvents();
        const eventsToShow = allEvents.slice(0, newNumberEvents);
        expect(AppWrapper.state('numberOfEvents')).toBe(eventsToShow.length);
    });
});