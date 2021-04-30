import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mockdata';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppWrapper;
        given('the main page is open', () => {
            AppWrapper = mount(<App />);
        });

        when('the user first views the list of events', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        then('the user should see each event is collapsed by default', () => {
            const EventWrapper = AppWrapper.find(Event);
            expect(EventWrapper.find('.event-summary')).toHaveLength(mockData.length);
            expect(EventWrapper.find('.event-details')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let EventWrapper;
        given('all event elements are collapsed', () => {
            const event = mockData[0];
            EventWrapper = shallow(<Event event={event} />);
            expect(EventWrapper.find('.event-summary')).toHaveLength(1);
            expect(EventWrapper.find('.event-details')).toHaveLength(0);
        });

        when('the user clicks on the "Show details" button on an event', () => {
            expect(EventWrapper.find('button')).toHaveLength(1);
            EventWrapper.find('button').simulate('click');
        });

        then('the event should expand so the user can see its details', () => {
            expect(EventWrapper.find('.event-details')).toHaveLength(1);
            expect(EventWrapper.find('.event-details').children()).toHaveLength(2);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let EventWrapper;
        given('an event element is expanded', () => {
            const event = mockData[0];
            EventWrapper = shallow(<Event event={event} />);
            expect(EventWrapper.find('.event-summary')).toHaveLength(1);
            EventWrapper.find('button').simulate('click');
            expect(EventWrapper.find('.event-details')).toHaveLength(1);
        });

        when('the user clicks on the "Hide details" button', () => {
            EventWrapper.find('button').simulate('click');
        });

        then('the event should collapse to hide its details', () => {
            expect(EventWrapper.find('.event-summary')).toHaveLength(1);
            expect(EventWrapper.find('.event-details')).toHaveLength(0);
        });
    });
});