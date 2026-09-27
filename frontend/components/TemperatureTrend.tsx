"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  trend: {
    hour: string;
    value: number;
  }[];
}

export default function TemperatureTrend({
  trend = [],
}: Props) {

  if (!trend?.length) {
    return (
      <div className="bg-slate-900 rounded-3xl border border-cyan-500/20 p-6 h-[400px] flex items-center justify-center">
        <p className="text-slate-400">
          Temperature data unavailable
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-3xl border border-cyan-500/20 p-6 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-300">

      <h2 className="text-3xl font-bold text-white mb-1">
        Temperature Trend
      </h2>

      <p className="text-slate-400 mb-6">
        24-Hour Forecast
      </p>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={trend}>

            <defs>
              <linearGradient
                id="tempGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#06b6d4"
                  stopOpacity={0.7}
                />
                <stop
                  offset="100%"
                  stopColor="#06b6d4"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="hour"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
              unit="°C"
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #06b6d4",
                borderRadius: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={4}
              fill="url(#tempGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}