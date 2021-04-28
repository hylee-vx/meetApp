import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the main page is open', () => {

        });

        when('the user first views the list of events', () => {

        });

        then('the user should see each event is collapsed by default', () => {

        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('all event elements are collapsed', () => {

        });

        when('the user clicks on the "Show details" button on an event', () => {

        });

        then('the event should expand so the user can see its details', () => {

        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        given('an event element is expanded', () => {

        });

        when('the user clicks on the "Hide details" button', () => {

        });

        then('the event should collapse to hide its details', () => {

        });
    });
});