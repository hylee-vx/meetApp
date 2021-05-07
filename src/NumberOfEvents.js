import React, { useState } from 'react';
import { ErrorAlert } from './Alert';

const NumberOfEvents = props => {
    const [eventCount, setEventCount] = useState(props);
    const [errorText, setErrorText] = useState('');

    const handleInputChange = event => {
        const value = event.target.value;
        const valueInteger = parseInt(value);

        if (valueInteger <= 0) {
            setEventCount({ value });
            setErrorText('Please enter a value of 1 or more');
        } else if (isNaN(valueInteger)) {
            setEventCount({ value });
            setErrorText('Please enter a valid number');
        } else {
            setEventCount({ value });
            setErrorText('');
        }
        props.updateEventCount(value);
    }

    return (
        <div className="NumberOfEvents">
            <input
                type="number"
                className="numberInput"
                value={eventCount}
                onChange={handleInputChange}
            />
            <ErrorAlert text={errorText} className="ErrorAlert" />
        </div>
    );
}

export default NumberOfEvents;