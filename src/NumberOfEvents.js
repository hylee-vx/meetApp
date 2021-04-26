import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        numberEvents: 32
    };

    handleInputChange = event => {
        const value = event.target.value;
        this.setState({
            numberEvents: value
        });
        this.props.updateEventCount(value);
    }

    render() {
        return (
            <div className="NumberOfEvents">
                <input
                    type="number"
                    className="numberInput"
                    value={this.state.numberEvents}
                    onChange={this.handleInputChange}
                />
            </div>
        );
    }
}

export default NumberOfEvents;