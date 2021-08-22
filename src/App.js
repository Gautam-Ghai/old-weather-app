import "./App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

//Components
import SearchBar from "./utils/SearchBar/SearchBar";
import SwipeUpButton from "./components/SwipeUpButton/SwipeUpButton";
import SwipeUpDrawer from "./components/SwipeUpDrawer/SwipeUpDrawer";
import Header from "./components/Header/Header";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";

//Material-UI
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";

const WEATHER_API_KEY = "4c262a856a5c5d1cbc78c723bdc58d38";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [themeState, setThemeState] = useState(false);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const getTheme = localStorage.getItem("Theme");
    if (getTheme === "dark") {
      setThemeState(true);
    }
    if (city === "") {
      load();
    } else {
      onSubmit(city);
    }
  }, [units]);

  useEffect(() => {
    if (themeState) {
      localStorage.setItem("Theme", "dark");
      document.body.classList.add("dark-mode");
    } else {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark-mode");
    }
  }, [themeState]);

  function onClose() {
    setIsOpen(false);
  }

  function onOpen() {
    setIsOpen(true);
  }

  function onToggle() {
    setIsOpen(!isOpen);
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos) {
    var crd = pos.coords;
    const weatherUrl = `${BASE_WEATHER_URL}lat=${crd.latitude}&lon=${crd.longitude}&units=${units}&appid=${WEATHER_API_KEY}`;
    const response = await axios.get(weatherUrl);
    if (response.status === 200) {
      setWeather(response.data);
    } else {
      setError("Server Problem");
    }
  }

  function errors(err) {
    setError(`ERROR(${err.code}): ${err.message}`);
  }

  function onSubmit(city) {
    const weatherUrl = `${BASE_WEATHER_URL}q=${city}&units=${units}&appid=${WEATHER_API_KEY}`;
    axios
      .get(weatherUrl)
      .then((response) => {
        if (response.status === 200) {
          setWeather(response.data);
        } else {
          setError("Server Problem");
        }
      })
      .catch((err) => {
        setError("City Not Found");
      });
    setIsOpen(false);
  }

  function load() {
    setWeather(null);
    setError(null);

    try {
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              navigator.geolocation.getCurrentPosition(success);
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                success,
                errors,
                options
              );
            } else if (result.state === "denied") {
              setError("Permission Denied");
            }
          });
      } else {
        setError("Location not Available");
      }
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    if (error !== null) {
      window.alert(error);
    }
  }, [error]);

  if (weather) {
    const {
      main: { temp },
    } = weather;

    return (
      <div>
        <Header
          theme={themeState}
          setTheme={setThemeState}
          setUnits={setUnits}
          load={load}
          city={city}
          setCity={setCity}
          onSubmit={onSubmit}
        />
        <div>
          <WeatherInfo weather={weather} theme={themeState} />
          <WeatherDetails weather={weather} units={units} theme={themeState} />
        </div>
        <Hidden smUp>
          <SwipeUpDrawer
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onClose}
            theme={themeState}
          >
            <SwipeUpButton onClick={onToggle} theme={themeState} />
            <section style={{ marginTop: 100 }}>
              <SearchBar
                theme={themeState}
                city={city}
                setCity={setCity}
                onSubmit={onSubmit}
              />
            </section>
          </SwipeUpDrawer>
        </Hidden>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <Header
          theme={themeState}
          setTheme={setThemeState}
          setUnits={setUnits}
          load={load}
          city={city}
          setCity={setCity}
          onSubmit={onSubmit}
        />
        <p className="message">
          We don't have the access to your location. But you can still serach a
          city.
        </p>
        <Hidden smUp>
          <SwipeUpDrawer
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onClose}
            theme={themeState}
          >
            <SwipeUpButton onClick={onToggle} theme={themeState} />
            <section style={{ marginTop: 100 }}>
              <SearchBar
                theme={themeState}
                city={city}
                setCity={setCity}
                onSubmit={onSubmit}
              />
            </section>
          </SwipeUpDrawer>
        </Hidden>
      </div>
    );
  } else {
    return (
      <div>
        <Header
          theme={themeState}
          setTheme={setThemeState}
          setUnits={setUnits}
          load={load}
          city={city}
          setCity={setCity}
          onSubmit={onSubmit}
        />
        <span className="progress">
          <CircularProgress size={50} />
        </span>
        <Hidden smUp>
          <SwipeUpDrawer
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onClose}
            theme={themeState}
          >
            <SwipeUpButton onClick={onToggle} theme={themeState} />
            <section style={{ marginTop: 100 }}>
              <SearchBar
                theme={themeState}
                city={city}
                setCity={setCity}
                onSubmit={onSubmit}
              />
            </section>
          </SwipeUpDrawer>
        </Hidden>
      </div>
    );
  }
}

export default App;
