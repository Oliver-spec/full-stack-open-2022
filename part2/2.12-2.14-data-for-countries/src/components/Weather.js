import { useState, useEffect } from "react";
import axios from "axios";

export default function Weather({ country }) {
  // variables
  const lat =
    country.capital === undefined
      ? country.latlng[0]
      : country.capitalInfo.latlng[0];
  const lon =
    country.capital === undefined
      ? country.latlng[1]
      : country.capitalInfo.latlng[1];

  const api_key = process.env.REACT_APP_API_KEY;

  // states
  const [weather, setWeather] = useState({});

  // effects
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${api_key}`
      )
      .then((response) => setWeather(response.data));
  });

  if (Object.keys(weather).length === 0) {
    return (
      <div>
        <h1>Weather in {country.name.common}</h1>
        <p>Can't find weather in {country.name.common}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Weather in {country.name.common}</h1>
        <p>temperature {weather.current.temp} Celcius</p>
        <p>wind {weather.current.wind_speed} m/s</p>
      </div>
    );
  }
}
