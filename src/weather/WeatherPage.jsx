import React, { useState } from "react";
import "./base.css";

const api = {
  key: "d9a1ab948347178b7e012ccd7a275c3b",
  base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherPage = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});

  const searchButton = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
      .then((response) => response.json())
      .then((result) => {
        setWeather(result);
        const { lat, lon } = result.coord;
        return fetch(
          `${api.base}onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`
        );
      })
      .then((response) => response.json())
      .then((result) => {
        setForecast(result);
        console.log(result);
      });
  };

  return (
    <div className="container">
      <input
        type="text"
        className="search-input"
        placeholder="Enter the City"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-button" onClick={searchButton}>
        Search
      </button>
      {weather.main && weather.weather && (
        <div className="weather-main">
          <div className="location">{weather.name}</div>
          <div className="temperature">{Math.round(weather.main.temp)}°C</div>
          <div className="description">({weather.weather[0].description})</div>
          <div className="date">
            {new Date().toLocaleDateString()} | Local Time:{" "}
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      )}
      {weather.main && (
        <div className="info-grid">
          <div className="info">
            <div className="label">FEELS LIKE</div>
            <div className="value">{Math.round(weather.main.feels_like)}°C</div>
          </div>
          <div className="info">
            <div className="label">WIND</div>
            <div className="value">{weather.wind.speed} Km/hr</div>
          </div>
          <div className="info">
            <div className="label">PRESSURE</div>
            <div className="value">{weather.main.pressure} mB</div>
          </div>
          <div className="info">
            <div className="label">HUMIDITY</div>
            <div className="value">{weather.main.humidity}%</div>
          </div>
        </div>
      )}
      {weather.sys && (
        <div className="additional-info">
          <div className="uv-index">
            <div className="value">
              Sunrise:{" "}
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="value">
              Sunset:{" "}
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      )}
      {forecast.hourly && (
        <div className="forecast">
          <div className="hourly-forecast">
            <div className="title">HOURLY FORECAST</div>
            <div className="hourly">
              {forecast.hourly.slice(0, 6).map((hour, index) => (
                <div key={index} className="hour">
                  {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  <div className="temp">{Math.round(hour.temp)}°C</div>
                  <div className="icon">🌧️</div> {/* Replace with appropriate icon */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {forecast.daily && (
        <div className="five-day-forecast">
          <div className="title">5 DAY FORECAST</div>
          <div className="day">
            {forecast.daily.slice(0, 5).map((day, index) => (
              <div key={index} className="day">
                {new Date(day.dt * 1000).toLocaleDateString([], { weekday: "short" })}
                <div className="temp">{Math.round(day.temp.day)}°C</div>
                <div className="icon">🌧️</div> {/* Replace with appropriate icon */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
