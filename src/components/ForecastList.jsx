const ForecastList = ({ forecast, unit, convertTemperature }) => {
  return (
    <div className="mt-10 w-full max-w-5xl">
      <h3 className="text-2xl font-bold mb-4 text-center">Next 5 Days</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.forecastday.map((day, index) => (
          <div key={index} className="bg-white text-gray-900 p-4 rounded-lg shadow-lg text-center">
            <p className="text-lg font-bold">{day.date}</p>
            <img src={day.day.condition.icon} alt="Weather icon" className="mx-auto my-2"/>
            <p className="text-sm text-gray-600">{day.day.condition.text}</p>
            <p className="mt-2 text-lg font-semibold">Max: {convertTemperature(day.day.maxtemp_c)}°{unit}</p>
            <p className="text-gray-500">Min: {convertTemperature(day.day.mintemp_c)}°{unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;