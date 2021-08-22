import React, { useEffect } from "react";
import "./WeatherInfo.scss";

function WeatherInfo({ weather, theme }) {
  const {
    main: { temp },
    weather: [details],
    name,
  } = weather;

  const { icon, main, description } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  useEffect(() => {
    if (theme) {
      document.getElementById("textPrimary").classList.add("dark-mode");
      document.getElementById("textSecondary").classList.add("dark-mode");
    } else {
      document.getElementById("textPrimary").classList.remove("dark-mode");
      document.getElementById("textSecondary").classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <div className="weatherInfo">
      <p className="cityName">{name}</p>
      <img src={iconUrl} className="icon" alt="weather icon" />
      <p id="textPrimary">{temp}°</p>
      <p className="weatherDescription">{description}</p>
      <p id="textSecondary">{main}</p>
    </div>
  );
}

export default WeatherInfo;
