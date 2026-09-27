"use client";

import {
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function WeatherSafetyCard({
  data,
}: {
  data?: any;
}) {
  const temp = data?.temperature || 0;
  const wind = data?.wind_speed || 0;
  const uv = data?.uv_index || 0;

  const advisories = [];

  if (temp < 35)
    advisories.push(
      "Weather conditions are currently safe."
    );

  if (wind < 30)
    advisories.push(
      "Outdoor activities are recommended."
    );

  if (uv < 8)
    advisories.push(
      "UV exposure remains within acceptable levels."
    );

  advisories.push(
    "Continue monitoring local forecasts."
  );

  return (
    <div
      className="
      rounded-3xl
      p-8
      bg-gradient-to-r
      from-green-950
      to-teal-950
      border border-green-500/20
    "
    >
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck
          size={30}
          className="text-emerald-400"
        />

        <h2 className="text-4xl font-bold text-white">
          Safety Advisory
        </h2>
      </div>

      <div className="space-y-5">
        {advisories.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
          >
            <CheckCircle2
              size={18}
              className="text-green-400 mt-1"
            />

            <span className="text-white text-lg">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}