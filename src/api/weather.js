import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 5,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

// Nueva función para obtener el clima por coordenadas
export const getWeatherByCoords = async (lat, lon) => {
  try {
      const response = await axios.get(`${BASE_URL}/forecast.json`, {
          params: {
              key: API_KEY,
              q: `${lat},${lon}`,
              days: 5,
          },
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching weather data:", error);
  }
};