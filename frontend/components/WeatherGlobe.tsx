"use client";
import { useEffect, useRef, useState } from "react";

interface WeatherGlobeProps {
  lat: number;
  lon: number;
  weatherData: any;
}

export default function WeatherGlobe({ lat, lon, weatherData }: WeatherGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const loadGlobe = async () => {
      try {
        const GlobeModule = await import("react-globe.gl");
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load Globe:", error);
      }
    };
    
    loadGlobe();
  }, []);

  const weatherPoints = [
    { lat: lat, lng: lon, size: 0.5, color: weatherData.rainfall_prob_24h > 60 ? '#ef4444' : weatherData.rainfall_prob_24h > 30 ? '#f59e0b' : '#10b981', name: 'Your Location' },
    { lat: 19.0760, lng: 72.8777, size: 0.3, color: '#3b82f6', name: 'Mumbai' },
    { lat: 28.7041, lng: 77.1025, size: 0.3, color: '#8b5cf6', name: 'Delhi' },
    { lat: 12.9716, lng: 77.5946, size: 0.3, color: '#10b981', name: 'Bangalore' },
    { lat: 22.5726, lng: 88.3639, size: 0.3, color: '#f59e0b', name: 'Kolkata' },
  ];

  if (!isLoaded) {
    return (
      <div className="backdrop-blur-xl bg-black/20 border border-white/20 rounded-2xl p-4 shadow-xl">
        <div className="h-96 flex items-center justify-center">
          <div className="text-blue-300">Loading 3D Globe...</div>
        </div>
      </div>
    );
  }

  // Lazy load the Globe component
  const Globe = require("react-globe.gl").default;

  return (
    <div className="backdrop-blur-xl bg-black/20 border border-white/20 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">🌍 Global Weather View</h3>
        <div className="flex items-center gap-2 text-xs text-blue-200">
          <span className="w-3 h-3 rounded-full bg-red-500"></span> Heavy Rain
          <span className="w-3 h-3 rounded-full bg-yellow-500 ml-2"></span> Medium
          <span className="w-3 h-3 rounded-full bg-green-500 ml-2"></span> Clear
        </div>
      </div>
      
      <div className="h-96 rounded-xl overflow-hidden">
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={weatherPoints}
          pointAltitude={0.1}
          pointColor="color"
          pointRadius="size"
          pointsMerge={true}
          pointLabel={(d: any) => `${d.name}: ${d.lat.toFixed(2)}°, ${d.lng.toFixed(2)}°`}
          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.15}
          width={800}
          height={400}
        />
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-xs text-blue-200 mb-1">Your Location</div>
          <div className="text-white font-bold">{lat.toFixed(2)}°, {lon.toFixed(2)}°</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-xs text-blue-200 mb-1">Temperature</div>
          <div className="text-white font-bold">{weatherData.temp}°C</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-xs text-blue-200 mb-1">Rain Probability</div>
          <div className="text-white font-bold">{weatherData.rainfall_prob_24h}%</div>
        </div>
      </div>
    </div>
  );
}