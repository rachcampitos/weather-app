import { useState, useEffect } from "react";
import { getWeatherByCity, getWeatherByCoords } from "../api/weather";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ForecastList from './ForecastList'

const WeatherApp = () => {
  const [city, setCity] = useState("Lima");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedWeather = localStorage.getItem("weatherData");
    if (storedWeather) {
      setWeather(JSON.parse(storedWeather));
    } else {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    if (weather) {
      localStorage.setItem("weatherData", JSON.stringify(weather));
    }
  }, [weather]);

  useEffect(() => {
    if (!city) return;

    const timeoutId = setTimeout(async () => {
      try {
        const data = await getWeatherByCity(city);
        if (data) {
          setWeather(data);
          setError(null);
        } else {
          setError("No se encontró la ciudad");
        }
      } catch (err) {
        console.error("Error al obtener datos del clima:", err);
        setError("Error al obtener datos del clima");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const data = await getWeatherByCity(cityName);
      if (data) {
        setWeather(data);
        localStorage.setItem("weatherData", JSON.stringify(data));
      }
    } catch (err) {
      console.error("Error al obtener datos del clima:", err);
      setError("Error al obtener datos del clima");
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const data = await getWeatherByCoords(lat, lon);
      if (data) {
        setWeather(data);
        localStorage.setItem("weatherData", JSON.stringify(data));
      }
    } catch (err) {
      console.error("Error al obtener datos del clima:", err);
      setError("Error al obtener datos del clima");
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const convertTemperature = (tempC) => {
    return unit === "C" ? tempC : (tempC * 9) / 5 + 32;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white flex flex-col items-center p-5">
      <h1 className="text-4xl font-bold mb-6">Weather App</h1>
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} getUserLocation={getUserLocation} />
      {error && <p className="text-red-400">{error}</p>}
      {weather ? (
        <>
          <WeatherCard weather={weather} unit={unit} convertTemperature={convertTemperature} setUnit={setUnit} />
          {weather.forecast && weather.forecast.forecastday ? (
            <ForecastList forecast={weather.forecast} unit={unit} convertTemperature={convertTemperature} />
          ): (
            <p className="mt-10">Forecast data not available.</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherApp;