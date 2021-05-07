import React, { useState, useEffect } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const ScatterPlotData = ({ locations, events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = () => {
            const data = locations.map(location => {
                const number = events.filter(event => event.location === location).length;
                const city = location.split(',').shift();
                return { city, number };
            });
            return data;
        };

        setData(() => getData());
    }, [locations, events]);

    return (
        <ResponsiveContainer height={400} >
            <ScatterChart
                margin={{ top: 0, right: 40, bottom: 20, left: 0 }}>
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="City" />
                <YAxis
                    type="number"
                    dataKey="number"
                    name="Number of events"
                    allowDecimals={false}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={data} fill="#82ca9d" />
            </ScatterChart>
        </ResponsiveContainer >
    );
};

export default ScatterPlotData;

