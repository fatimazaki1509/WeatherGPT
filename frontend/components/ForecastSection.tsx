"use client";

import { useEffect, useState } from "react";
import { getForecast } from "@/services/weather";

interface ForecastProps {
  city: string;
}

export default function ForecastSection({
  city,
}: ForecastProps) {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);

        const data = await getForecast(city);

        if (!data?.list) return;

        const dailyData = data.list.filter(
          (item: any) =>
            item.dt_txt.includes("12:00:00")
        );

        setForecast(dailyData.slice(0, 5));
      } catch (error) {
        console.error(
          "Forecast Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  const getDayName = (date: string) => {
    return new Date(date).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
      }
    );
  };

  const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  if (loading) {
    return (
      <div
        className="
        bg-slate-900/80
        border border-slate-700
        rounded-3xl
        p-6
        min-h-[360px]
        mt-6
        flex items-center justify-center
        text-white
      "
      >
        Loading Forecast...
      </div>
    );
  }

  return (
    <div
      className="
      bg-slate-900/80
      border border-slate-700
      rounded-3xl
      p-6
      min-h-[360px]
      mt-6
      text-white
      backdrop-blur-xl
    "
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          5-Day Forecast
        </h2>

        <span className="text-sm text-slate-400">
          {city}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="
            bg-slate-800/70
            border border-slate-700/50
            hover:border-cyan-500/40
            hover:bg-slate-800
            hover:-translate-y-1
            transition-all duration-300
            rounded-2xl
            p-4
            text-center
            h-[190px]
            flex
            flex-col
            justify-center
            items-center
          "
          >
            <p className="text-slate-300 text-sm mb-1">
              {index === 0
                ? "Today"
                : getDayName(item.dt_txt)}
            </p>

            <img
              src={getWeatherIcon(
                item.weather[0].icon
              )}
              alt="weather"
              className="w-16 h-16"
            />

            <p className="font-bold text-3xl">
              {Math.round(item.main.temp)}°
            </p>

            <p className="text-xs text-slate-400 mt-2 capitalize line-clamp-2">
              {item.weather[0].description}
            </p>
          </div>
        ))}
      </div>

      {/* Weather Highlights */}
      <div className="grid grid-cols-4 gap-3 mt-8">
        <div className="bg-slate-800/60 rounded-xl p-3 text-center">
          <p className="text-slate-400 text-xs">
            Rain Chance
          </p>

          <p className="font-semibold text-lg text-cyan-400">
            {Math.round(
              (forecast[0]?.pop || 0) * 100
            )}
            %
          </p>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-3 text-center">
          <p className="text-slate-400 text-xs">
            Min Temp
          </p>

          <p className="font-semibold text-lg text-blue-300">
            {Math.round(
              forecast[0]?.main?.temp_min ?? 0
            )}
            °
          </p>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-3 text-center">
          <p className="text-slate-400 text-xs">
            Max Temp
          </p>

          <p className="font-semibold text-lg text-orange-400">
            {Math.round(
              forecast[0]?.main?.temp_max ?? 0
            )}
            °
          </p>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-3 text-center">
          <p className="text-slate-400 text-xs">
            Weather
          </p>

          <p className="font-semibold text-lg text-green-400 capitalize">
            {forecast[0]?.weather?.[0]?.main}
          </p>
        </div>
      </div>
    </div>
  );
}