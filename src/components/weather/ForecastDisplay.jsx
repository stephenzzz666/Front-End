import { useEffect, useState } from "react";
import axios from "axios";

export default function ForecastDisplay({ city }) {
    const [forecast, setForecast] = useState([]);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
            .then(res => {
                // The API gives data every 3 hours; we filter to get one per day (at 12:00)
                const dailyData = res.data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
                setForecast(dailyData);
            })
            .catch(err => console.error(err));
    }, [city, apiKey]);

    return (
        <div className="mt-6">
            <h4 className="font-bold mb-3">5-Day Forecast</h4>
            <div className="grid grid-cols-5 gap-2">
                {forecast.map((day, index) => (
                    <div key={index} className="bg-blue-50 p-2 rounded text-center border border-blue-100">
                        <p className="text-xs font-bold">{new Date(day.dt_txt).toLocaleDateString('en-US', {weekday: 'short'})}</p>
                        <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" className="mx-auto w-10" />
                        <p className="text-sm font-semibold">{Math.round(day.main.temp)}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
}