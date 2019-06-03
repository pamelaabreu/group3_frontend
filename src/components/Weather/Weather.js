import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";

const Weather = props => {
  return (
    <div className="row">
      {props.weatherInfo.map((e, i) => (
        <WeatherCard weather={e} key={i} />
      ))}
    </div>
  );
};

export default Weather;
