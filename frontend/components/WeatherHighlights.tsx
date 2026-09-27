"use client";

import {
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  AlertCircle,
} from "lucide-react";

export default function WeatherHighlights({
  data,
}: {
  data: any;
}) {
  const highlights = [];

  if (data?.temperature >= 35) {
    highlights.push({
      icon: Thermometer,
      text: `High temperature detected (${data.temperature}°C). Heat stress conditions possible.`,
      color: "text-red-400",
    });
  } else {
    highlights.push({
      icon: Thermometer,
      text: `Current temperature is ${data.temperature}°C with stable atmospheric conditions.`,
      color: "text-orange-400",
    });
  }

  if (data?.humidity >= 80) {
    highlights.push({
      icon: Droplets,
      text: `Humidity level is ${data.humidity}%. High moisture conditions detected.`,
      color: "text-cyan-400",
    });
  } else {
    highlights.push({
      icon: Droplets,
      text: `Humidity remains at ${data.humidity}% and is within a comfortable range.`,
      color: "text-cyan-400",
    });
  }

  if (data?.wind_speed >= 25) {
    highlights.push({
      icon: Wind,
      text: `Strong winds recorded at ${data.wind_speed} km/h.`,
      color: "text-emerald-400",
    });
  } else {
    highlights.push({
      icon: Wind,
      text: `Wind speed currently ${data.wind_speed} km/h. No major wind threat detected.`,
      color: "text-emerald-400",
    });
  }

  highlights.push({
    icon: CloudRain,
    text: `Pressure level is ${Math.round(
      data?.pressure || 0
    )} hPa indicating normal weather activity.`,
    color: "text-violet-400",
  });

  return (
    <div
      className="
      bg-slate-900
      rounded-3xl
      border border-cyan-500/10
      p-6
    "
    >
      <div className="flex items-center gap-3 mb-6">
        <AlertCircle
          size={28}
          className="text-cyan-400"
        />

        <h2 className="text-3xl font-bold text-white">
          Weather Intelligence
        </h2>
      </div>

      <div className="space-y-4">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="
            bg-slate-800
            rounded-2xl
            p-5
            flex
            items-start
            gap-4
            hover:border-cyan-500/20
            border border-transparent
            transition-all
          "
          >
            <item.icon
              size={22}
              className={item.color}
            />

            <p className="text-slate-200 leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}