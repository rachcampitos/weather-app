const SearchBar = ({ city, setCity, fetchWeather, getUserLocation }) => {
  return (
    <div className="flex gap-3 mb-5">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 rounded-lg text-white text-bold border-solid border-2 border-gray-300"
      />
      <button
        onClick={() => fetchWeather(city)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
      >
        Search
      </button>
      <button
        onClick={getUserLocation}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
      >
        Get My Location
      </button>
    </div>
  );
};

export default SearchBar;