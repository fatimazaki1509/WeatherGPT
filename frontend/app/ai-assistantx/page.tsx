"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";

export default function AIAssistantPage() {
  const [city, setCity] = useState("Nagpur");

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;

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

        <div className="mt-6">
          <AIAssistant city={city} />
        </div>
      </main>
    </div>
  );
}