"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  aqi: number;
}

export default function AQITrend({ aqi }: Props) {

  const trendData = [
    { time: "00", value: Math.max(aqi - 1, 1) },
    { time: "04", value: aqi },
    { time: "08", value: aqi + 1 },
    { time: "12", value: aqi },
    { time: "16", value: Math.max(aqi - 1, 1) },
    { time: "20", value: aqi + 1 },
    { time: "24", value: aqi },
  ];

  return (
    <div
      className="
      bg-slate-950/60
      border border-cyan-900
      rounded-3xl
      p-6
      h-[380px]
    "
    >
      <div className="mb-5">

        <h2 className="text-2xl font-bold text-white">
          AQI Trend
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Last 24 hour trend
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height="80%"
      >
        <AreaChart data={trendData}>

          <defs>

            <linearGradient
              id="aqiGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#22d3ee"
                stopOpacity={0.7}
              />

              <stop
                offset="100%"
                stopColor="#22d3ee"
                stopOpacity={0}
              />
            </linearGradient>

          </defs>

          <XAxis
            dataKey="time"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #164e63",
              borderRadius: "12px",
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#22d3ee"
            strokeWidth={3}
            fill="url(#aqiGradient)"
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}