const WeatherCard = ({ weather, unit, convertTemperature, setUnit }) => {
  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg w-full max-w-3xl">
      <h2 className="text-2xl font-bold">{weather.location.name}, {weather.location.country}</h2>
      <p className="text-lg text-gray-600">Date: {weather.location.localtime}</p>
      <div className="flex items-center justify-center gap-4 mt-4">
        <img src={weather.current.condition.icon} alt="Weather icon" className="w-16 h-16"/>
        <p className="text-4xl font-bold">{convertTemperature(weather.current.temp_c)}°{unit}</p>
      </div>
      <button onClick={() => setUnit(unit === "C" ? "F" : "C")}
        className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition w-full">
        Switch to {unit === "C" ? "°F" : "°C"}
      </button>
      <p className="text-lg mt-4">{weather.current.condition.text}</p>
      <p className="text-gray-700 mt-2">Max: {convertTemperature(weather.forecast?.forecastday[0]?.day?.maxtemp_c)}°{unit} | Min: {convertTemperature(weather.forecast?.forecastday[0]?.day?.mintemp_c)}°{unit}</p>
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <p><strong>Wind:</strong> {weather.current.wind_kph} km/h {weather.current.wind_dir}</p>
        <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
        <p><strong>Visibility:</strong> {weather.current.vis_km} km</p>
        <p><strong>Pressure:</strong> {weather.current.pressure_mb} mb</p>
      </div>
    </div>
  );
};

export default WeatherCard;