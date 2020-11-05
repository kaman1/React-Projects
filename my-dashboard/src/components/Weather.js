/** @format */

import React, { useState, useEffect } from "react";

let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
let apiKey = process.env.REACT_APP_WEATHER_API_KEY;
let city = "Washington DC, USA";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let api = `${apiUrl}?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  }, []);

  return (
    <div>
      <h1>
        It is curently {weather && weather.main.temp}°  in {city}
      </h1>
    </div>
  );
};

export default Weather;
