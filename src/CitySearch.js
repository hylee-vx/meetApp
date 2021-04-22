import React from 'react';

const CitySearch = () => {
    return (
        <div className="CitySearch">
            <input
                type="text"
                className="city"
            />

            <ul className="suggestions">
            </ul>
        </div>
    );
};

export default CitySearch;