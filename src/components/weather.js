import React from 'react';

const Weather = ({ data }) => {
const { name, main, weather } = data;

return (
    <div>
        <h2>Weather in {name}</h2>
        <div className="weather-details">
            <p>Temperature: <span>{main.temp} °C</span></p>
            <p>Condition: <span>{weather[0].description}</span>
            <img 
                src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} 
                alt={weather[0].description} 
                className="weather-icon"
            /></p>
            <p>Humidity: <span>{main.humidity}%</span></p>
            <p>Wind Speed: <span>{data.wind.speed} m/s</span></p>
        </div>
    </div>
  );
};

export default Weather;
