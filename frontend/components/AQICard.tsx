"use client";

import { useEffect, useState } from "react";
import { getAQI } from "@/services/weather";

interface AQICardProps {
  city: string;
  lat?: number;
  lon?: number;
}

export default function AQICard({
  city,
  lat,
  lon,
}: AQICardProps) {
  const [aqi, setAqi] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAQI = async () => {
      try {
        setLoading(true);

        const data = await getAQI(city);

        setAqi(data);
      } catch (err) {
        console.error("AQI Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAQI();
  }, [city]);

  if (loading) {
    return (
      <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6 text-white h-full flex items-center justify-center">
        Loading AQI...
      </div>
    );
  }

  if (!aqi?.list?.length) {
    return (
      <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6 text-white">
        AQI Data Not Available
      </div>
    );
  }

  const pollution = aqi.list[0];
  const aqiLevel = pollution.main.aqi;

  const getAQIData = (level: number) => {
    switch (level) {
      case 1:
        return {
          label: "Good",
          color: "#22c55e",
        };

      case 2:
        return {
          label: "Fair",
          color: "#84cc16",
        };

      case 3:
        return {
          label: "Moderate",
          color: "#facc15",
        };

      case 4:
        return {
          label: "Poor",
          color: "#f97316",
        };

      default:
        return {
          label: "Very Poor",
          color: "#ef4444",
        };
    }
  };

  const status = getAQIData(aqiLevel);

  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6 text-white h-full">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold">
          Air Quality Index
        </h2>

        <span className="text-sm text-slate-400">
          {city}
        </span>
      </div>

      {/* AQI Circle */}
      <div className="flex justify-center mb-6">

        <div
          className="w-28 h-28 rounded-full border-[8px] flex flex-col items-center justify-center"
          style={{
            borderColor: status.color,
            boxShadow: `0 0 20px ${status.color}`,
          }}
        >
          <p className="text-4xl font-bold">
            {aqiLevel}
          </p>

          <p
            className="text-sm font-semibold"
            style={{
              color: status.color,
            }}
          >
            {status.label}
          </p>
        </div>

      </div>

      {/* Pollutants */}
      <div className="grid grid-cols-2 gap-3">

        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-xs text-slate-400">
            PM2.5
          </p>

          <p className="font-semibold">
            {pollution.components.pm2_5}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-xs text-slate-400">
            PM10
          </p>

          <p className="font-semibold">
            {pollution.components.pm10}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-xs text-slate-400">
            NO₂
          </p>

          <p className="font-semibold">
            {pollution.components.no2}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-xs text-slate-400">
            CO
          </p>

          <p className="font-semibold">
            {pollution.components.co}
          </p>
        </div>

      </div>

      {/* Status Banner */}
      <div
        className="mt-5 rounded-xl p-3 text-center text-sm font-medium"
        style={{
          backgroundColor: `${status.color}20`,
          border: `1px solid ${status.color}`,
          color: status.color,
        }}
      >
        Air quality is currently {status.label.toLowerCase()}
      </div>

    </div>
  );
}