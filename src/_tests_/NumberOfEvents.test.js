import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
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
            numberEvents: 32
        });
        NumberOfEventsWrapper.find('.numberInput').simulate('change', {
            target: { value: 16 }
        });

        expect(NumberOfEventsWrapper.state('numberEvents')).toBe(16);
    });
});