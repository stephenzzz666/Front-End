import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherWidget({ city }) {
  const [weather, setWeather] = useState(null);

  // Use Vite's env variable syntax
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    // Safety check: Don't fetch if there's no city or API key
    if (!city || !apiKey) {
      console.error("Missing City or API Key. Check your .env file!");
      return;
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((res) => setWeather(res.data))
      .catch((err) => {
        console.error("Weather API Error:", err);
      });
  }, [city, apiKey]);

  if (!apiKey) return <p className="text-red-500">API Key Missing</p>;
  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="bg-white p-4 rounded shadow w-64 border border-gray-100">
      <h3 className="font-bold text-lg">{weather.name}</h3>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold">{Math.round(weather.main.temp)}°C</span>
        {/* Added dynamic icon based on API response */}
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
          alt="icon"
        />
      </div>
      <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
    </div>
  );
}