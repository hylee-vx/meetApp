import React from 'react';
import Event from './Event';

const EventList = props => {
    const { events, numberOfEvents } = props;
    const slicedEvents = events.slice(0, numberOfEvents);

    return (
        <ul className="EventList">
            {slicedEvents.map(event =>
                <li key={event.id}>
                    <Event event={event} />
                </li>
            )}
        </ul>
    );
};

export default EventList;