import React from "react";
import moment from "moment";

const WeatherCard = props => {
  const { weather } = props;

  return (
    <div className="card ml-2">
      <div className="card-body">
        <h6 className="card-title">
          {moment
            .unix(weather.time)
            .format("llll")
            .slice(0, 3)}
        </h6>
        <img
          src={require(`../../assets/images/weather-icons/${weather.icon.replace(
            "/-+",
            "_"
          )}.svg`)}
          alt=""
          style={{ width: "75%" }}
        />
        <p className="card-text">
          Hi: {Math.trunc(weather.temperatureHigh)}&#176; F
        </p>
        <p className="card-text">
          Lo: {Math.trunc(weather.temperatureLow)}&#176; F
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
