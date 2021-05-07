import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEventCount={() => { }} />);
    });

    test('render number input', () => {
        expect(NumberOfEventsWrapper.find('.numberInput')).toHaveLength(1);
    });

    test('render number input correctly', () => {
        const numberEvents = NumberOfEventsWrapper.state('numberEvents');
        expect(NumberOfEventsWrapper.find('.numberInput').prop('value')).toBe(numberEvents);
    });

    test('change state when number input changes', () => {
        NumberOfEventsWrapper.setState({
            numberEvents: 6
        });
        NumberOfEventsWrapper.find('.numberInput').simulate('change', {
            target: { value: 10 }
        });

        expect(NumberOfEventsWrapper.state('numberEvents')).toBe(10);
    });
});