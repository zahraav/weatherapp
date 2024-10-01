import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './forecast.css'; 

const Forecast = ({ city }) => {
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedDay, setSelectedDay] = useState(0);
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

    useEffect(() => {
        const fetchForecast = () => {
            if (!city) return;

            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

            axios.get(url)
                .then(response => {
                    setForecastData(response.data);
                    setError(null);
                })
                .catch(err => {
                    setError('Weather data cannot be fetched for your location.');
                    setForecastData(null);
                });
        };

        fetchForecast();
    }, [city, apiKey]);

    if (error) return <p>{error}</p>;
    if (!forecastData) return <p>Loading forecast...</p>;

    const dailyForecasts = forecastData.list.reduce(function(acc, item) {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    const days = Object.keys(dailyForecasts);

    return (
        <div className="forecast-container">
            <div className="forecast-tabs">
                {days.map(function(day, index) {
                    return (
                        <div
                            key={index}
                            className={`forecast-tab ${selectedDay === index ? 'active' : ''}`}
                            onClick={function() { setSelectedDay(index); }}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
            <div className="forecast-details">
                <h2>Forecast for {days[selectedDay]}</h2>
                <ul>
                    {dailyForecasts[days[selectedDay]].map(function(item) {
                        return (
                            <li key={item.dt} className="forecast-item">
                                <span>{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                <span className="tab-separator"></span>
                                <span>{item.main.temp}°C</span>
                                <span className="tab-separator"></span>
                                <span>{item.weather[0].description}</span>
                                <span><img 
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} 
                                    alt={item.weather[0].description} 
                                /></span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Forecast;
