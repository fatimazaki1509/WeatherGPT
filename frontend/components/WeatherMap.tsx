"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import {
  CloudRain,
  Thermometer,
  Wind,
  Cloud,
  MapPinned,
} from "lucide-react";

const LiveMap = dynamic(
  () => import("./LiveMap"),
  {
    ssr: false,
  }
);

interface Props {
  lat: number;
  lon: number;
}

export default function WeatherMap({
  lat,
  lon,
}: Props) {
  const [layer, setLayer] =
    useState("rain");

  return (
    <div
      className="
      bg-[#081528]
      border border-blue-900/50
      rounded-3xl
      p-4
      text-white
      shadow-xl
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">
          Live Weather Radar
        </h2>

        <div
          className="
          flex items-center gap-2
          text-xs text-slate-400
          "
        >
          <MapPinned size={14} />
          {lat.toFixed(2)},
          {lon.toFixed(2)}
        </div>
      </div>

      {/* Layer Buttons */}

      <div className="flex gap-2 mt-4 flex-wrap">
        <MapChip
          icon={<CloudRain size={14} />}
          text="Rain Radar"
          active={layer === "rain"}
          onClick={() =>
            setLayer("rain")
          }
        />

        <MapChip
          icon={
            <Thermometer size={14} />
          }
          text="Temperature"
          active={layer === "temp"}
          onClick={() =>
            setLayer("temp")
          }
        />

        <MapChip
          icon={<Wind size={14} />}
          text="Wind"
          active={layer === "wind"}
          onClick={() =>
            setLayer("wind")
          }
        />

        <MapChip
          icon={<Cloud size={14} />}
          text="Clouds"
          active={layer === "clouds"}
          onClick={() =>
            setLayer("clouds")
          }
        />
      </div>

      {/* Map */}

      <div
        className="
        mt-4
        overflow-hidden
        rounded-2xl
        border border-slate-700
        "
      >
        <LiveMap
          lat={lat}
          lon={lon}
          layer={layer}
        />
      </div>

      {/* Footer */}

      <div className="mt-3 flex justify-between text-xs text-slate-500">
        <span>
          Powered by Windy
        </span>

        <span>
          Live Global Weather Data
        </span>
      </div>
    </div>
  );
}

function MapChip({
  icon,
  text,
  active,
  onClick,
}: any) {
  return (
    <button
      onClick={onClick}
      className={`
      px-4 py-2
      rounded-xl
      flex items-center
      gap-2
      text-sm
      transition-all
      duration-300

      ${
        active
          ? `
            bg-blue-500
            text-white
            shadow-lg
            shadow-blue-500/40
            scale-105
          `
          : `
            bg-slate-800
            hover:bg-slate-700
          `
      }
      `}
    >
      {icon}
      {text}
    </button>
  );
}