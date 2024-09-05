import React, { useState } from 'react';
import Weather from './Weather';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const apiKey = 'API_KEY'; // Replace with your weather API key
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError('');
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError("Failed to fetch data");
      setWeather(null);
    }
  };

  const handleInputChange = (e) => setCity(e.target.value);

  const handleSearchClick = () => fetchWeather();

  return (
    <div className="App">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city"
      />
      <button onClick={handleSearchClick}>Search</button>
      {error && <p>{error}</p>}
      {weather && <Weather data={weather} />}
    </div>
  );
}

export default App;
