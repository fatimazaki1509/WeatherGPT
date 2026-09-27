"use client";

import {
  Sprout,
  CalendarDays,
  TrendingUp,
  CloudRain,
  ShieldCheck,
} from "lucide-react";

interface Props {
  season: string;
  rainfallProbability: number;
  riskLevel: string;
}

export default function SeasonalForecast({
  season,
  rainfallProbability,
  riskLevel,
}: Props) {
  const suitability = Math.max(
    40,
    100 - rainfallProbability * 0.15
  );

  const crops =
    season.toLowerCase().includes("monsoon")
      ? ["Rice", "Soybean", "Cotton"]
      : ["Wheat", "Mustard", "Gram"];

  return (
    <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 border border-cyan-500/20 rounded-3xl p-6 shadow-xl">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Seasonal Forecast
          </h2>

          <p className="text-slate-400">
            Agriculture climate outlook
          </p>
        </div>

        <CloudRain
          size={28}
          className="text-cyan-400"
        />
      </div>

      {/* Main Season Card */}

      <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5 mb-6 hover:border-cyan-500 transition-all">

        <div className="flex justify-between items-center">

          <div>
            <h3 className="text-2xl font-bold text-white">
              {season}
            </h3>

            <p className="text-slate-400 mt-1">
              Climate conditions are favorable for
              seasonal crop growth.
            </p>
          </div>

          <div className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold">
            Active Season
          </div>

        </div>
      </div>

      {/* Stats Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700 hover:border-green-500 transition">

          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-3 rounded-xl">
              <Sprout
                size={22}
                className="text-green-400"
              />
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Recommended Crops
              </p>

              <p className="text-white font-semibold">
                {crops.join(", ")}
              </p>
            </div>
          </div>

        </div>

        <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700 hover:border-blue-500 transition">

          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <CalendarDays
                size={22}
                className="text-blue-400"
              />
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Expected Harvest
              </p>

              <p className="text-white font-semibold">
                September – November
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Forecast Metrics */}

      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-slate-900/40 rounded-2xl p-4 text-center">

          <p className="text-slate-400 text-sm">
            Rain Chance
          </p>

          <p className="text-3xl font-bold text-cyan-400 mt-2">
            {rainfallProbability}%
          </p>

        </div>

        <div className="bg-slate-900/40 rounded-2xl p-4 text-center">

          <p className="text-slate-400 text-sm">
            Risk Level
          </p>

          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {riskLevel}
          </p>

        </div>

        <div className="bg-slate-900/40 rounded-2xl p-4 text-center">

          <p className="text-slate-400 text-sm">
            Forecast Confidence
          </p>

          <p className="text-3xl font-bold text-emerald-400 mt-2">
            92%
          </p>

        </div>

      </div>

      {/* Suitability */}

      <div className="mb-6">

        <div className="flex justify-between mb-2">
          <span className="text-slate-300">
            Climate Suitability
          </span>

          <span className="text-white font-semibold">
            {Math.round(suitability)}%
          </span>
        </div>

        <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-cyan-400"
            style={{
              width: `${suitability}%`,
            }}
          />

        </div>

      </div>

      {/* AI Recommendation */}

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">

        <div className="flex gap-3">

          <ShieldCheck
            size={22}
            className="text-emerald-400 mt-1"
          />

          <div>

            <h4 className="text-white font-semibold">
              AI Recommendation
            </h4>

            <p className="text-slate-300 mt-1">
              Current climate conditions support
              healthy crop growth. Monitor rainfall
              intensity and avoid excess irrigation
              during peak precipitation periods.
            </p>

          </div>

        </div>

      </div>

      {/* Trend Badge */}

      <div className="mt-5 flex items-center gap-2 text-cyan-300">

        <TrendingUp size={18} />

        <span className="text-sm">
          Seasonal outlook improving for agriculture
        </span>

      </div>

    </div>
  );
}