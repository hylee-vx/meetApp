import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import Event from '../Event';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mockdata';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
        let AppWrapper;
        given('the user hasn\'t specified a number of events to view', () => {
            AppWrapper = mount(<App />);
        });

        when('the user views the list of events', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        then('the user should see a list of 32 events', () => {
            // mockData has total of 10 items
            const EventWrapper = AppWrapper.find(Event);
            expect(EventWrapper.find('.event').length).toBeLessThanOrEqual(32);
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then, and }) => {
        let AppWrapper, NumberOfEventsWrapper, allEvents;
        given('the main page is open', () => {
            AppWrapper = mount(<App />);
        });

        when('the user types a number in the "Number of Events" input field', () => {
            AppWrapper.update();
            NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            NumberOfEventsWrapper.find('.numberInput').simulate('change', {
                target: { value: 5 }
            });
        });

        then('the number of events should be changed to that number', async () => {
            allEvents = await getEvents();
            expect(AppWrapper.state('numberOfEvents')).toBe(5);
        });

        and('the user should receive a list of that number of events', () => {
            const eventCount = AppWrapper.state('numberOfEvents');
            const eventsToShow = allEvents.slice(0, eventCount);
            expect(eventsToShow.length).toBe(5);
        });
    });
});