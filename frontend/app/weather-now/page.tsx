"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/AppLayout";
import WeatherCommandCenter from "@/components/WeatherCommandCenter";
import WeatherMetrics from "@/components/WeatherMetrics";
import WeatherHighlights from "@/components/WeatherHighlights";
import WeatherSafetyCard from "@/components/WeatherSafetyCard";

export default function WeatherNowPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/weather-now?city=Nagpur"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch weather");
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Unable to load weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="bg-slate-900 rounded-3xl p-8 border border-cyan-500/20">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-800 rounded w-1/3"></div>
            <div className="h-40 bg-slate-800 rounded"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error || !data) {
    return (
      <AppLayout>
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-6 rounded-2xl">
          {error || "Weather data unavailable"}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Main Weather Hero */}
        <WeatherCommandCenter data={data} />

        {/* Weather Metrics */}
        <WeatherMetrics data={data} />

        {/* Highlights + Advisory */}
        <div className="grid lg:grid-cols-2 gap-6">
          <WeatherHighlights data={data} />
          <WeatherSafetyCard data={data} />
        </div>

      </div>
    </AppLayout>
  );
}