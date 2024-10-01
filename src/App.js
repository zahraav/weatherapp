import React, { useState} from 'react';
import axios from 'axios';
import CityInput from './components/cityInput';
import Weather from './components/weather';
import WeatherByLocation from './components/weatherByLocation';
import Forecast from './components/forecast';
import './App.css'; 

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('weather');
    const [city,setCity]=useState('');

    const fetchWeather = async (city) => {
        const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
            setError(null);
            setCity(city);
        } catch (err) {
            setError('City not found. Please try again.');
            setWeatherData(null);
        }
    };
    const handleTabChanges = (tab) => {
      if (tab === 'weather') {
          setWeatherData(null);
          setError(null);
      }
      setActiveTab(tab);
    };

    return (
        <div>
            <h1>Weather App</h1>
            <div className="tabs">
                <div 
                    className={`tab ${activeTab === 'weather' ? 'active' : ''}`} 
                    onClick={() => handleTabChanges('weather')}
                >
                    Weather
                </div>
                <div 
                    className={`tab ${activeTab === 'weatherByLocation' ? 'active' : ''}`} 
                    onClick={() => handleTabChanges('weatherByLocation')}
                >
                    Current Weather
                </div>
                <div 
                    className={`tab ${activeTab === 'forecast' ? 'active' : ''}`} 
                    onClick={() => handleTabChanges('forecast')}
                >
                    5-Day Forecast
                </div>
                <div 
                    className={`tab ${activeTab === 'info' ? 'active' : ''}`} 
                   onClick={() => handleTabChanges('info')}
                >
                    Info
                </div>
            </div>
            {activeTab === 'weather' && (
                <div>
                    <CityInput fetchWeather={fetchWeather} />
                    {error && <p>{error}</p>}
                    {weatherData && <Weather data={weatherData} />}
                </div>
            )}
            {activeTab === 'weatherByLocation' && (
                <div>
                    <WeatherByLocation setWeatherData={setWeatherData} setError={setError} />
                    {error && <p>{error}</p>}
                    {weatherData && <Weather data={weatherData} />}
                </div>
            )}
            {activeTab === 'forecast' && city && (
                <div>
                    <Forecast city={city} />
                </div>
            )}
            {activeTab === 'info' && (
                <div>
                    <h2>Hello World!</h2>
                </div>
            )}
        </div>
    );
};

export default App;
