import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherByLocation = ({ setWeatherData, setError }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherByLocation = async () => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                    try {
                        const response = await axios.get(url);
                        setWeatherData(response.data);
                        setError(null);
                    } catch (err) {
                        setError('Weather data cannot be fetched for your location!');
                    } finally {
                        setLoading(false);
                    }
                },
                () => {
                    setError('Geolocation is not enabled or permission denied.');
                    setLoading(false);
                }
            );
        };

        fetchWeatherByLocation();
    }, [setWeatherData, setError]);

    if (loading) return <p>Loading current weather...</p>;

    return null; 
};

export default WeatherByLocation;
