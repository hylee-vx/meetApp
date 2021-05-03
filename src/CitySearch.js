import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined
    };

    handleInputChange = event => {
        const value = event.target.value;
        this.setState({ showSuggestions: true });
        const suggestions = this.props.locations.filter(location => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });

        if (suggestions.length === 0) {
            this.setState({
                query: value,
                infoText: 'City not found - please try another city'
            });
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText: ''
            });
        }
    }

    handleItemClick = suggestion => {
        this.setState({
            query: suggestion,
            showSuggestions: false,
            infoText: ''
        });
        this.props.updateEvents(suggestion);
    }


    render() {
        return (
            <div className="CitySearch" >
                <input
                    type="text"
                    className="city"
                    placeholder="Search cities"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />

                <ul
                    className="suggestions"
                    style={this.state.showSuggestions ? {} : { display: 'none' }}
                >
                    {this.state.suggestions.map(suggestion => (
                        <li
                            key={suggestion}
                            onClick={() => this.handleItemClick(suggestion)}
                        >{suggestion}</li>
                    ))}
                    <li
                        key='all'
                        onClick={() => this.handleItemClick('all')}>
                        <b>See all cities</b>
                    </li>
                </ul>
                <InfoAlert text={this.state.infoText} />
            </div>
        );
    }
}

export default CitySearch;