import React, { Component } from 'react';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: []
    };

    handleInputChange = event => {
        const value = event.target.value;
        this.setState({ query: value });
    }


    render() {
        return (
            <div className="CitySearch" >
                <input
                    type="text"
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                />

                <ul className="suggestions">
                    {this.state.suggestions.map(suggestion => (
                        <li key={suggestion}>{suggestion}</li>
                    ))}
                    <li key='all'>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;