"use client";

import { useEffect, useState } from "react";
import { getCurrentWeather } from "@/services/weather";

interface CurrentWeatherProps {
  city: string;
  setLat: (lat: number) => void;
  setLon: (lon: number) => void;
}

export default function CurrentWeather({
  city,
  setLat,
  setLon,
}: CurrentWeatherProps) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        const data = await getCurrentWeather(city);

        setWeather(data);

        if (data.coord) {
          setLat(data.coord.lat);
          setLon(data.coord.lon);
        }
      } catch (error) {
        console.error("Weather Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, setLat, setLon]);

  if (loading) {
    return (
      <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6 text-white h-full flex items-center justify-center">
        Loading Weather...
      </div>
    );
  }

  if (!weather || !weather.main) {
    return (
      <div className="bg-slate-900/80 border border-red-700 rounded-3xl p-6 text-white">
        City not found
      </div>
    );
  }

  const icon = weather.weather?.[0]?.icon;

  const condition =
    weather.weather?.[0]?.main?.toLowerCase() || "";

  return (
    <div
      className="
      relative
      overflow-hidden
      mt-3
      bg-gradient-to-br
      from-[#081528]
      via-[#071f46]
      to-[#02112d]
      border border-cyan-900/40
      rounded-3xl
      p-6
      text-white
      h-full
      shadow-xl
    "
    >
      {/* Rain */}
      {condition.includes("rain") && (
        <div className="rain-container">
          {[...Array(30)].map((_, i) => (
            <span
              key={i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Clouds */}
      {condition.includes("cloud") && (
        <>
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
        </>
      )}

      {/* Fog */}
      {(condition.includes("mist") ||
        condition.includes("fog") ||
        condition.includes("haze")) && (
        <>
          <div className="fog fog1"></div>
          <div className="fog fog2"></div>
        </>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold">
              {weather.name}
            </h2>

            <p className="text-slate-300 capitalize mt-1">
              {weather.weather[0].description}
            </p>
          </div>

          <img
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt="weather"
            className="w-24 h-24"
          />
        </div>

        <div className="mt-4">
          <h1 className="text-7xl font-bold">
            {Math.round(weather.main.temp)}°
          </h1>

          <p className="text-cyan-300 font-medium mt-1">
            Feels like{" "}
            {Math.round(weather.main.feels_like)}°
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5">
            <p className="text-slate-400 text-sm">
              Humidity
            </p>
            <p className="font-bold text-3xl">
              {weather.main.humidity}%
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5">
            <p className="text-slate-400 text-sm">
              Wind Speed
            </p>
            <p className="font-bold text-3xl">
              {weather.wind.speed}
            </p>
            <span className="text-slate-400 text-sm">
              km/h
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5">
            <p className="text-slate-400 text-sm">
              Visibility
            </p>
            <p className="font-bold text-3xl">
              {(weather.visibility / 1000).toFixed(
                1
              )}
            </p>
            <span className="text-slate-400 text-sm">
              km
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5">
            <p className="text-slate-400 text-sm">
              Pressure
            </p>
            <p className="font-bold text-3xl">
              {weather.main.pressure}
            </p>
            <span className="text-slate-400 text-sm">
              hPa
            </span>
          </div>
        </div>

        <div className="mt-5">
          <button
            className="
            px-4
            py-2
            rounded-full
            bg-cyan-500/20
            border border-cyan-500/30
            text-cyan-300
            text-sm
          "
          >
            ● Live Weather Monitoring
          </button>
        </div>
      </div>
    </div>
  );
}