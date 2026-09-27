"use client";

import {
  Wind,
  CloudRain,
  Thermometer,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface Props {
  wind: number;
  rainfall: number;
  temp: number;
}

export default function ThreatIndicators({
  wind,
  rainfall,
  temp,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-cyan-500/20">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">
            Environmental Conditions
          </h3>

          <p className="text-slate-400 text-sm">
            Real-time weather & threat indicators
          </p>
        </div>

        <div className="px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <span className="text-cyan-400 text-sm">
            Live Data
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">

        {/* Wind */}

        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-5 hover:scale-[1.02] transition-all">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-400 text-sm">
                Wind Speed
              </p>

              <h4 className="text-4xl font-bold text-white mt-2">
                {wind}
              </h4>

              <p className="text-cyan-400 text-sm">
                km/h
              </p>
            </div>

            <div className="bg-cyan-500/10 p-3 rounded-xl">
              <Wind
                size={32}
                className="text-cyan-400"
              />
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
            <TrendingDown size={16} />
            Stable Conditions
          </div>

        </div>

        {/* Rainfall */}

        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-5 hover:scale-[1.02] transition-all">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-400 text-sm">
                Rainfall
              </p>

              <h4 className="text-4xl font-bold text-white mt-2">
                {rainfall}
              </h4>

              <p className="text-blue-400 text-sm">
                mm
              </p>
            </div>

            <div className="bg-blue-500/10 p-3 rounded-xl">
              <CloudRain
                size={32}
                className="text-blue-400"
              />
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-yellow-400 text-sm">
            <TrendingUp size={16} />
            Monitoring Required
          </div>

        </div>

        {/* Temperature */}

        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-5 hover:scale-[1.02] transition-all">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-400 text-sm">
                Temperature
              </p>

              <h4 className="text-4xl font-bold text-white mt-2">
                {temp}
              </h4>

              <p className="text-orange-400 text-sm">
                °C
              </p>
            </div>

            <div className="bg-orange-500/10 p-3 rounded-xl">
              <Thermometer
                size={32}
                className="text-orange-400"
              />
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-orange-400 text-sm">
            <TrendingUp size={16} />
            Heat Monitoring
          </div>

        </div>

      </div>

      {/* Bottom Risk Summary */}

      <div className="mt-6 grid md:grid-cols-3 gap-4">

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">
            Flood Probability
          </p>
          <h4 className="text-cyan-400 text-xl font-bold">
            Moderate
          </h4>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">
            Weather Stability
          </p>
          <h4 className="text-emerald-400 text-xl font-bold">
            Stable
          </h4>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">
            Risk Status
          </p>
          <h4 className="text-yellow-400 text-xl font-bold">
            Under Observation
          </h4>
        </div>

      </div>

    </div>
  );
}