import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        numberEvents: 32
    };

    handleInputChange = event => {
        const value = event.target.value;
        const valueInteger = parseInt(value);

        if (valueInteger <= 0) {
            this.setState({
                numberEvents: value,
                errorText: 'Please enter a value of 1 or more'
            });
        } else if (isNaN(valueInteger)) {
            this.setState({
                numberEvents: value,
                errorText: 'Please enter a valid number'
            });
        } else {
            this.setState({
                numberEvents: value,
                errorText: ''
            });
        }
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
                <ErrorAlert text={this.state.errorText} />
            </div>
        );
    }
}

export default NumberOfEvents;