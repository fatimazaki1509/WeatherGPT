"use client";

import { useEffect, useState } from "react";
import {
  Droplets,
  Calendar,
  CloudRain,
  Loader2,
} from "lucide-react";

interface Props {
  lat: number;
  lon: number;
}

interface IrrigationData {
  next_irrigation: string;
  required_water_mm: number;
  soil_moisture: number;
  rainfall_probability: number;
  recommendation: string;
}

export default function IrrigationPlanner({
  lat,
  lon,
}: Props) {
  const [data, setData] =
    useState<IrrigationData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchData();
  }, [lat, lon]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/api/v1/irrigation-plan?lat=${lat}&lon=${lon}`
      );

      const result = await res.json();

      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#081528] rounded-3xl p-6 flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#081528] rounded-3xl border border-blue-500/20 p-6 text-white">

      <div className="flex items-center gap-3 mb-5">
        <Droplets
          className="text-blue-400"
          size={28}
        />
        <div>
          <h2 className="text-2xl font-bold">
            Irrigation Planner
          </h2>
          <p className="text-slate-400 text-sm">
            Smart irrigation recommendations
          </p>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">

        <p className="text-slate-400 text-sm">
          Next Irrigation
        </p>

        <h3 className="text-4xl font-bold text-blue-400 mt-2">
          {data?.next_irrigation}
        </h3>

        <p className="mt-4 text-slate-300">
          {data?.recommendation}
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">
            Required Water
          </p>
          <h4 className="text-2xl font-bold mt-2">
            {data?.required_water_mm} mm
          </h4>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">
            Soil Moisture
          </p>
          <h4 className="text-2xl font-bold text-green-400 mt-2">
            {data?.soil_moisture}%
          </h4>
        </div>

      </div>

      <div className="bg-slate-800 rounded-xl p-4 mt-5">
        <div className="flex items-center gap-2">
          <CloudRain
            size={18}
            className="text-cyan-400"
          />
          Rainfall Probability:
          {data?.rainfall_probability}%
        </div>
      </div>

    </div>
  );
}