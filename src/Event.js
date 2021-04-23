import React, { Component } from 'react';

class Event extends Component {
    state = {
        showDetails: false
    };

    handleClick = () => {
        this.setState(previousState => ({
            showDetails: !previousState.showDetails
        }));
    }

    render() {
        const { event } = this.props;
        const { showDetails } = this.state;

        return (
            <div className="event">
                <div className="event-summary">
                    <h2>{event.summary}</h2>
                    <p>{event.start.dateTime}</p>
                    <p>{event.start.timeZone}</p>
                    <p>{event.location}</p>
                </div>

                {showDetails
                    ? <div>
                        <div className="event-details">
                            <a href={event.htmlLink}>See details on Google Calendar</a>
                            <p>{event.description}</p>
                        </div>
                        <button
                            className="hide-details-btn"
                            onClick={() => this.handleClick()}
                        >Hide details</button>
                    </div>
                    : <button
                        className="show-details-btn"
                        onClick={() => this.handleClick()}
                    >Show details</button>
                }


            </div>
        );
    }
};

export default Event;