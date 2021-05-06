import React, { useState, useEffect } from 'react';
import Event from './Event';
import { WarningAlert } from './Alert';

const EventList = props => {
    const { events } = props;
    const [warningText, setWarningText] = useState('');

    const handleConnectionStatus = () => {
        if (!navigator.onLine) {
            setWarningText('You are offline - events are not up to date');
        } else {
            setWarningText('');
        }
    };

    useEffect(() => {
        handleConnectionStatus();
    });

    return (
        <div>
            <ul className="EventList">
                {events.map(event =>
                    <li key={event.id}>
                        <Event event={event} />
                    </li>
                )}
            </ul>
            <WarningAlert text={warningText} />
        </div>
    );
};

export default EventList;