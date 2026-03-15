import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherWidget({ city = "Tagum" }) {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // OPTION A: Use .env (Make sure you restarted your terminal!)
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // OPTION B: If .env fails, uncomment the line below and paste your key directly:
  // const API_KEY = "0c71fe407f6f1c554e171cd87936cddd";

  useEffect(() => {
    const fetchWeatherData = async () => {
      // MODIFIED: Simplified check so it doesn't get stuck on the "your_actual_key" string
      if (!API_KEY || API_KEY.length < 10) {
        setError("API Key Missing or Invalid");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const cleanCity = encodeURIComponent(city);

        // 1. Fetch Current Weather
        const currentRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cleanCity}&units=metric&appid=${API_KEY}`
        );
        setCurrent(currentRes.data);

        // 2. Fetch 5-Day Forecast
        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cleanCity}&units=metric&appid=${API_KEY}`
        );

        // Filter to get roughly one reading per day (at noon)
        const dailyData = forecastRes.data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        );
        
        // If the 12:00:00 filter results in 0 (rare), just take the first 5 entries
        setForecast(dailyData.length > 0 ? dailyData : forecastRes.data.list.slice(0, 5));

      } catch (err) {
        console.error("Weather API Error:", err.response ? err.response.data : err.message);
        // This will show "Invalid API Key" if the key isn't active yet
        setError(err.response?.data?.message || "Connection Error");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, API_KEY]);

  if (loading) return <div className="text-slate-500 text-xs animate-pulse p-4 text-center font-bold uppercase tracking-widest">Updating Tagum Weather...</div>;
  
  if (error) return (
    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-center">
      <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Weather Error</p>
      <p className="text-white text-xs mt-1 capitalize">{error}</p>
      <p className="text-slate-500 text-[9px] mt-2 italic font-medium">Wait 1-2 hours for new keys to activate</p>
    </div>
  );

  if (!current) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Current Weather UI */}
      <div className="flex items-center justify-between bg-blue-600/10 p-4 rounded-2xl border border-blue-500/20">
        <div className="flex items-center gap-3">
          <img 
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} 
            alt="icon" 
            className="w-14 h-14"
          />
          <div>
            <h3 className="text-2xl font-black text-white leading-tight">{Math.round(current.main.temp)}°C</h3>
            <p className="text-[10px] uppercase font-black text-blue-400 tracking-tighter">{current.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-300 font-bold capitalize">{current.weather[0].description}</p>
          <p className="text-[10px] text-slate-500 font-medium">Humidity: {current.main.humidity}%</p>
        </div>
      </div>

      {/* 5-Day Forecast Grid */}
      <div className="grid grid-cols-5 gap-2">
        {forecast.slice(0, 5).map((day, index) => (
          <div key={index} className="flex flex-col items-center bg-slate-800/40 p-2 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
            <span className="text-[9px] font-black text-slate-500 uppercase">
              {new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}
            </span>
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
              alt="forecast" 
              className="w-8 h-8 my-1"
            />
            <span className="text-xs font-black text-white">{Math.round(day.main.temp)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}