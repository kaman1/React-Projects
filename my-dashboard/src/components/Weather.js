/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
        console.log(data);
      });
  }, []);

  return (
    <Wrapper>
      <h1>
        It is curently {weather && weather.main.temp}° in {city}
      </h1>
    </Wrapper>
  );
};

export default Weather;

const Wrapper = styled.section``;
