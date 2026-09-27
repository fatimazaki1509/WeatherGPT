"use client";

import {
  Wind,
  Droplets,
  Eye,
  Thermometer,
  Gauge,
  SunMedium,
} from "lucide-react";

interface Props {
  data: any;
}

export default function WeatherMetrics({
  data,
}: Props) {
  const metrics = [
    {
      title: "Humidity",
      value: `${data.humidity}%`,
      icon: Droplets,
      color: "text-cyan-400",
      bg: "from-cyan-500/10 to-blue-500/10",
    },
    {
      title: "Wind Speed",
      value: `${data.wind_speed} km/h`,
      icon: Wind,
      color: "text-emerald-400",
      bg: "from-emerald-500/10 to-green-500/10",
    },
    {
      title: "Visibility",
      value: `${data.visibility} km`,
      icon: Eye,
      color: "text-yellow-400",
      bg: "from-yellow-500/10 to-orange-500/10",
    },
    {
      title: "Feels Like",
      value: `${data.feels_like}°C`,
      icon: Thermometer,
      color: "text-red-400",
      bg: "from-red-500/10 to-pink-500/10",
    },
    {
      title: "Air Quality",
      value: data.air_quality,
      icon: Wind,
      color: "text-green-400",
      bg: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "UV Index",
      value: data.uv_index,
      icon: SunMedium,
      color: "text-amber-400",
      bg: "from-amber-500/10 to-yellow-500/10",
    },
    {
      title: "Pressure",
      value: `${data.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-400",
      bg: "from-purple-500/10 to-indigo-500/10",
    },
    {
      title: "Weather Status",
      value: "Live",
      icon: Eye,
      color: "text-cyan-400",
      bg: "from-cyan-500/10 to-sky-500/10",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

      {metrics.map((item) => (
        <div
          key={item.title}
          className={`
            bg-gradient-to-br ${item.bg}
            backdrop-blur-sm
            border border-white/10
            rounded-2xl
            p-5
            hover:scale-[1.02]
            transition-all duration-300
          `}
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                {item.title}
              </p>

              <h2 className="text-2xl font-bold text-white mt-2">
                {item.value}
              </h2>
            </div>

            <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
              <item.icon
                size={24}
                className={item.color}
              />
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}