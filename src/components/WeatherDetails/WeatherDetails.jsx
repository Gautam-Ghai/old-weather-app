import React, { useEffect } from "react";
import "./WeatherDetails.scss";

//Material-UI
import OpacityIcon from "@material-ui/icons/Opacity";
import ToysIcon from "@material-ui/icons/Toys";
import SpeedIcon from "@material-ui/icons/Speed";
import WavesIcon from "@material-ui/icons/Waves";

function WeatherDetails({ weather, units, theme }) {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = weather;

  const windSpeed =
    units === "metric"
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} miles/h`;

  useEffect(() => {
    var icons = document.getElementsByClassName("weatherDetailsIcon");
    var weatherSecondaryDetails =
      document.getElementsByClassName("weatherSecondary");
    if (theme) {
      for (let i = 0; i < icons.length; i++) {
        icons[i].classList.add("dark-mode");
      }
      for (let i = 0; i < weatherSecondaryDetails.length; i++) {
        weatherSecondaryDetails[i].classList.add("dark-mode");
      }
    } else {
      for (let i = 0; i < icons.length; i++) {
        icons[i].classList.remove("dark-mode");
      }
      for (let i = 0; i < weatherSecondaryDetails.length; i++) {
        weatherSecondaryDetails[i].classList.remove("dark-mode");
      }
    }
  }, [theme]);
  return (
    <div className="weatherDetails">
      <div className="weatherDetailsRow">
        <span className="weatherDetailsBox">
          <span className="weatherDetailsRowInside">
            <WavesIcon className="weatherDetailsIcon" />
            <span className="weatherDetailsItems">
              <p className="text">Feels like:</p>
              <p className="weatherSecondary">{feels_like} °</p>
            </span>
          </span>
        </span>
        <span className="weatherDetailsBox">
          <span className="weatherDetailsRowInside">
            <OpacityIcon className="weatherDetailsIcon" />
            <span className="weatherDetailsItems">
              <p className="text">Humidity:</p>
              <p className="weatherSecondary">{humidity} %</p>
            </span>
          </span>
        </span>
      </div>
      <div className="weatherDetailsRow">
        <span className="weatherDetailsBox">
          <span className="weatherDetailsRowInside">
            <ToysIcon className="weatherDetailsIcon" />
            <span className="weatherDetailsItems">
              <p className="text">Wind Speed:</p>
              <p className="weatherSecondary">{windSpeed}</p>
            </span>
          </span>
        </span>
        <span className="weatherDetailsBox">
          <span className="weatherDetailsRowInside">
            <SpeedIcon className="weatherDetailsIcon" />
            <span className="weatherDetailsItems">
              <p className="text">Humidity:</p>
              <p className="weatherSecondary">{pressure} hPa</p>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}

export default WeatherDetails;
