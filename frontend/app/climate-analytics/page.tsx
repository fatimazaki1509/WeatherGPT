"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/AppLayout";

import ClimateOverview from "@/components/ClimateOverview";
import TemperatureTrend from "@/components/TemperatureTrend";
import RainfallAnalysis from "@/components/RainfallAnalysis";
import ClimateRiskScore from "@/components/ClimateRiskScore";
import SeasonalForecast from "@/components/SeasonalForecast";
import AIClimateInsights from "@/components/AIClimateInsights";

export default function ClimateAnalyticsPage() {

  const [data, setData] = useState<any>(null);

  const lat = 21.1458;
  const lon = 79.0882;

  useEffect(() => {

    fetch(
      `http://localhost:8000/api/climate-analytics?lat=${lat}&lon=${lon}`
    )
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);

  }, []);

  if (!data) {

    return (
      <AppLayout>
        <div className="text-white text-xl">
          Loading Climate Analytics...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <div className="space-y-6">

        {/* Hero */}

        <div
          className="
          rounded-3xl
          p-8
          bg-gradient-to-r
          from-emerald-900/40
          via-cyan-900/30
          to-blue-900/40
          border border-emerald-500/20
          "
        >
          <h1 className="text-4xl font-bold text-white">
            Climate Analytics
          </h1>

          <p className="text-slate-300 mt-2">
            Advanced climate intelligence and agricultural forecasting
          </p>
        </div>

        <ClimateOverview data={data} />

        <div className="grid lg:grid-cols-2 gap-6">

         <TemperatureTrend
  trend={data.temperature_trend}
/>

          <ClimateRiskScore
            score={data.risk_score}
            level={data.risk_level}
          />

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

         <RainfallAnalysis
  rainfallProbability={
    data.rainfall_probability
  }
/>

         <SeasonalForecast
  season={data.season}
  rainfallProbability={data.rainfall_probability}
  riskLevel={data.risk_level}
/>

        </div>

        <AIClimateInsights
          insights={data.insights}
        />

      </div>

    </AppLayout>
  );
}