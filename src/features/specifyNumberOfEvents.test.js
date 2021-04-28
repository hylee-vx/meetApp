import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the user hasn\'t specified a number of events to view', () => {

        });

        when('the user views the list of events', () => {

        });

        then('the user should see a list of 32 events', () => {

        });
    });

    test('User can change the number of events they want to see', ({ given, when, then, and }) => {
        given('the main page is open', () => {

        });

        when('the user types a number in the "Number of Events" input field', () => {

        });

        then('the number of events should be changed to that number', () => {

        });

        and('the user should receive a list of that number of events', () => {

        });
    });
});