"use client";

import {
  MapPin,
  Sunrise,
  Sunset,
  Clock3,
  CloudSun,
} from "lucide-react";

interface Props {
  data: {
    city?: string;
    temperature?: number;
    condition?: string;
    sunrise?: string;
    sunset?: string;
    last_updated?: string;
  };
}

export default function WeatherCommandCenter({
  data,
}: Props) {
  const formatTime = (value?: string) => {
    if (!value || value === "--") return "--";

    try {
      return new Date(value).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return value;
    }
  };

  return (
    <div
      className="
      bg-gradient-to-r
      from-slate-900
      via-cyan-950
      to-indigo-950
      rounded-3xl
      border border-cyan-500/20
      p-8
      overflow-hidden
      relative
    "
    >
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-2 text-cyan-400 mb-3">
            <MapPin size={18} />
            <span className="font-medium">
              {data.city || "Selected Location"}
            </span>
          </div>

          <h1 className="text-6xl font-bold text-white">
            {data.temperature ?? "--"}°C
          </h1>

          <p className="text-2xl text-slate-300 mt-2">
            {data.condition || "Weather Data"}
          </p>

          <p className="text-slate-400 mt-4">
            Real-time weather intelligence
          </p>
        </div>

        {/* Weather Icon */}
        <div className="flex items-start justify-center">
          <div
            className="
            h-24
            w-24
            rounded-full
            bg-cyan-500/10
            border border-cyan-500/20
            flex
            items-center
            justify-center
          "
          >
            <CloudSun
              size={52}
              className="text-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Sunrise size={16} />
            <span className="text-sm font-medium">
              Sunrise
            </span>
          </div>

          <p className="text-2xl font-bold text-white">
            {formatTime(data.sunrise)}
          </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-orange-400 mb-2">
            <Sunset size={16} />
            <span className="text-sm font-medium">
              Sunset
            </span>
          </div>

          <p className="text-2xl font-bold text-white">
            {formatTime(data.sunset)}
          </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Clock3 size={16} />
            <span className="text-sm font-medium">
              Last Updated
            </span>
          </div>

          <p className="text-2xl font-bold text-white">
            {data.last_updated || "Live"}
          </p>
        </div>
      </div>
    </div>
  );
}