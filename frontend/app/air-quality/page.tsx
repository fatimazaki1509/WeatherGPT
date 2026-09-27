"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/AppLayout";

import AQIOverview from "@/components/AQIOverview";
import PollutantBreakdown from "@/components/PollutantBreakdown";
import HealthRecommendations from "@/components/HealthRecommendations";
import AQITrend from "@/components/AQITrend";

export default function AirQualityPage() {

  const [data, setData] = useState<any>(null);

  const lat = 21.1458;
  const lon = 79.0882;

  useEffect(() => {

   fetch(
  `http://localhost:8000/api/air-quality?lat=${lat}&lon=${lon}`
)
      .then((res) => res.json())
      .then(setData);

  }, []);

  if (!data)
    return (
      <AppLayout>
        <div className="text-white">
          Loading...
        </div>
      </AppLayout>
    );

  return (
    <AppLayout>

      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Air Quality Monitoring
          </h1>

          <p className="text-slate-400 mt-2">
            Real-time air pollution intelligence
          </p>

        </div>

        <AQIOverview
          aqi={data.aqi}
          updated={data.timestamp}
        />

        <PollutantBreakdown
          components={data.components}
        />

        <div className="grid lg:grid-cols-2 gap-6">

          <HealthRecommendations
            aqi={data.aqi}
          />

         <AQITrend
  aqi={data.aqi}
/>

        </div>

      </div>

    </AppLayout>
  );
}