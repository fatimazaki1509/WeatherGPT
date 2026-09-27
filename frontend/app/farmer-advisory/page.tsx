"use client";

import { useState } from "react";

import AppLayout from "@/components/AppLayout";

import CurrentWeather from "@/components/CurrentWeather";
import AQICard from "@/components/AQICard";

import AICropRecommendation from "@/components/AICropRecommendation";
import CropHealthHeatmap from "@/components/CropHealthHeatmap";
import DiseasePestPrediction from "@/components/DiseasePestPrediction";
import IrrigationPlanner from "@/components/IrrigationPlanner";
import FarmCalendar from "@/components/FarmCalendar";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import FarmerAssistant from "@/components/FarmerAssistant";

export default function FarmerAdvisoryPage() {
  const [lat, setLat] = useState(21.1458);
  const [lon, setLon] = useState(79.0882);

  const city = "Nagpur";

  return (
    <AppLayout>
      <div className="space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Smart Farming Advisory
          </h1>

          <p className="text-slate-400 mt-2">
            AI powered farming insights based on weather,
            crop health, irrigation and climate intelligence.
          </p>
        </div>

        {/* Weather + AQI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CurrentWeather
            city={city}
            setLat={setLat}
            setLon={setLon}
          />

          <AQICard city={city} />
        </div>

        {/* AI Crop Recommendation */}
        <AICropRecommendation
          lat={lat}
          lon={lon}
        />

        {/* Heatmap + Disease */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <CropHealthHeatmap
  lat={lat}
  lon={lon}
/>

          <DiseasePestPrediction
            lat={lat}
            lon={lon}
          />

        </div>

        {/* Irrigation + Farm Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <IrrigationPlanner
            lat={lat}
            lon={lon}
          />

          <FarmCalendar
            lat={lat}
            lon={lon}
          />

        </div>

        {/* Government Schemes */}
        <GovernmentSchemes
  state="Maharashtra"
/>

        {/* Multilingual AI Assistant */}
        <FarmerAssistant city={city} />

      </div>
    </AppLayout>
  );
}