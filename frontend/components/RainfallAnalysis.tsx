"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
} from "recharts";

import {
  Droplets,
  CloudRain,
  Waves,
} from "lucide-react";

interface Props {
  rainfallProbability: number;
}

export default function RainfallAnalysis({
  rainfallProbability,
}: Props) {

  const rainfallData = [
    { time: "00", rain: rainfallProbability * 0.2 },
    { time: "03", rain: rainfallProbability * 0.35 },
    { time: "06", rain: rainfallProbability * 0.55 },
    { time: "09", rain: rainfallProbability * 0.75 },
    { time: "12", rain: rainfallProbability },
    { time: "15", rain: rainfallProbability * 0.85 },
    { time: "18", rain: rainfallProbability * 0.65 },
    { time: "21", rain: rainfallProbability * 0.4 },
  ];

  const peak = rainfallData.reduce((a, b) =>
    a.rain > b.rain ? a : b
  );

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (rainfallProbability / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-950 border border-cyan-500/20 rounded-3xl p-8 shadow-xl">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Rainfall Analysis
          </h2>

          <p className="text-slate-400 mt-1">
            Water availability & precipitation forecast
          </p>
        </div>

        <CloudRain className="text-cyan-400" size={28} />
      </div>

      {/* Gauge */}

      <div className="flex justify-center mb-8">

        <div className="relative w-48 h-48">

          <svg
            className="transform -rotate-90"
            width="192"
            height="192"
          >
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#1e293b"
              strokeWidth="14"
              fill="transparent"
            />

            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="14"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />

            <defs>
              <linearGradient
                id="gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-white">
              {rainfallProbability}%
            </div>

            <div className="text-cyan-400 text-sm mt-1">
              Rain Chance
            </div>
          </div>

        </div>

      </div>

      {/* Peak Rain Alert */}

      <div className="mb-8 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">

        <div className="text-cyan-300 text-sm">
          Peak Rainfall Window
        </div>

        <div className="text-white text-xl font-semibold mt-1">
          {peak.time}:00 Hours
        </div>

      </div>

      {/* Progress */}

      <div className="mb-8">

        <div className="flex justify-between mb-2">
          <span className="text-slate-300">
            Water Availability
          </span>

          <span className="text-white font-semibold">
            {rainfallProbability}%
          </span>
        </div>

        <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            style={{
              width: `${rainfallProbability}%`,
            }}
          />

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 hover:scale-105 transition">

          <Droplets
            className="text-cyan-400 mb-3"
            size={24}
          />

          <p className="text-slate-400 text-sm">
            Moisture
          </p>

          <p className="text-white text-xl font-bold">
            {Math.min(
              rainfallProbability + 15,
              100
            )}
            %
          </p>

        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 hover:scale-105 transition">

          <CloudRain
            className="text-blue-400 mb-3"
            size={24}
          />

          <p className="text-slate-400 text-sm">
            Rain Chance
          </p>

          <p className="text-white text-xl font-bold">
            {rainfallProbability}%
          </p>

        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 hover:scale-105 transition">

          <Waves
            className="text-emerald-400 mb-3"
            size={24}
          />

          <p className="text-slate-400 text-sm">
            Irrigation Need
          </p>

          <p className="text-white text-xl font-bold">
            {rainfallProbability > 70
              ? "Low"
              : rainfallProbability > 40
              ? "Medium"
              : "High"}
          </p>

        </div>

      </div>

      {/* Chart */}

      <div>

        <h3 className="text-xl font-semibold text-white mb-4">
          Hourly Rainfall Forecast
        </h3>

        <div className="h-72">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={rainfallData}>

              <XAxis
                dataKey="time"
                stroke="#94a3b8"
              />

              <Tooltip />

              <Bar
                dataKey="rain"
                radius={[10, 10, 0, 0]}
              >
                {rainfallData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      index === 4
                        ? "#22d3ee"
                        : "#3b82f6"
                    }
                  />
                ))}
              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}