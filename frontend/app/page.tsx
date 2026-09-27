"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastSection from "@/components/ForecastSection";
import AQICard from "@/components/AQICard";
import RiskScore from "@/components/RiskScore";
import FarmerAdvisory from "@/components/FarmerAdvisory";
import DisasterAlerts from "@/components/DisasterAlerts";
import TravelPlanner from "@/components/TravelPlanner";
import WeatherMap from "@/components/WeatherMap";
import AIAssistant from "@/components/AIAssistant";
import ClimateInsights from "@/components/ClimateInsights";
import RecommendationCard from "@/components/RecommendationCard";

export default function Home() {
  const [city, setCity] = useState("Nagpur");
  const [lat, setLat] = useState(21.1458);
  const [lon, setLon] = useState(79.0882);

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );

        const data = await res.json();

        if (data.length > 0) {
          setCity(data[0].name);
        }
      } catch (error) {
        console.error(error);
      }
    },
    (error) => {
      console.error(error);
    }
  );
};

  return (
    <div className="bg-[#071a35] min-h-screen text-white">
      <Sidebar />

      <main className="ml-[250px] p-5 min-h-screen bg-[#071a35]">

        <Navbar
  city={city}
  setCity={setCity}
  getCurrentLocation={getCurrentLocation}
/>

        <div className="mt-4">
          <HeroSection />
        </div>

        {/* Weather Row */}
        <div className="grid grid-cols-12 gap-4 -mt-2">

          <div className="col-span-3">
            <CurrentWeather
           city={city}
           setLat={setLat}
           setLon={setLon}
          />
          </div>

          <div className="col-span-6">
            <ForecastSection city={city} />
          </div>

          <div className="col-span-3">
            <AQICard city={city} />
          </div>

        </div>

        {/* Quick Cards */}
        <div className="grid grid-cols-4 gap-4 mt-4">

          <RiskScore  />

          <FarmerAdvisory city={city} />

          <DisasterAlerts  />

          <TravelPlanner  />

        </div>

        {/* Main Section */}
        <div className="grid grid-cols-12 gap-4 mt-4">

          {/* LEFT */}
          <div className="col-span-3 space-y-4">
            <RecommendationCard  />
          </div>

          {/* CENTER */}
          <div className="col-span-5">
            <WeatherMap
             lat={lat}
             lon={lon}
/>
          </div>

          {/* RIGHT */}
          <div className="col-span-4 space-y-4">
            <AIAssistant city={city} />
            <ClimateInsights  />
          </div>

        </div>

      </main>
    </div>
  );
}
