"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Map,
  Sprout,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from "lucide-react";

interface Props {
  lat: number;
  lon: number;
}

interface Zone {
  name: string;
  crop: string;
  health_score: number;
}

export default function CropHealthHeatmap({
  lat,
  lon,
}: Props) {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] =
    useState<Zone | null>(null);

  useEffect(() => {
    fetchData();
  }, [lat, lon]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/api/v1/crop-health?lat=${lat}&lon=${lon}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const result = await res.json();

      console.log("Crop Health API:", result);

      setZones(result?.zones || []);

      if (
        result?.zones &&
        result.zones.length > 0
      ) {
        setSelected(result.zones[0]);
      }
    } catch (err) {
      console.error("Crop Health Error:", err);

      setZones([]);
      setSelected(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (score: number) => {
    if (score >= 80)
      return {
        label: "Healthy",
        color:
          "from-green-500 to-emerald-600",
        badge: "bg-green-500",
      };

    if (score >= 60)
      return {
        label: "Moderate",
        color:
          "from-yellow-500 to-orange-500",
        badge: "bg-yellow-500",
      };

    if (score >= 40)
      return {
        label: "High",
        color: "from-red-500 to-red-700",
        badge: "bg-red-500",
      };

    return {
      label: "Critical",
      color:
        "from-purple-600 to-fuchsia-700",
      badge: "bg-purple-500",
    };
  };

  const healthy =
    zones.filter(
      (z) => z.health_score >= 80
    ).length;

  const moderate =
    zones.filter(
      (z) =>
        z.health_score >= 60 &&
        z.health_score < 80
    ).length;

  const high =
    zones.filter(
      (z) =>
        z.health_score >= 40 &&
        z.health_score < 60
    ).length;

  const critical =
    zones.filter(
      (z) => z.health_score < 40
    ).length;

  return (
    <div className="bg-[#081528] rounded-3xl border border-green-500/20 p-6 text-white">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <Map
          className="text-green-400"
          size={28}
        />

        <div>
          <h2 className="text-2xl font-bold">
            Crop Health Heatmap
          </h2>

          <p className="text-slate-400 text-sm">
            AI Powered District Analysis
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2
            size={40}
            className="animate-spin text-green-400"
          />

          <p className="mt-4 text-slate-400">
            Loading crop health data...
          </p>
        </div>
      ) : zones.length === 0 ? (
        <div className="text-center py-20">
          <Map
            size={40}
            className="mx-auto text-slate-500 mb-3"
          />

          <p className="text-slate-400">
            No crop health data available
          </p>
        </div>
      ) : (
        <>
          {/* Summary */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <SummaryCard
              title="Healthy"
              value={healthy}
              color="green"
            />

            <SummaryCard
              title="Moderate"
              value={moderate}
              color="yellow"
            />

            <SummaryCard
              title="High"
              value={high}
              color="red"
            />

            <SummaryCard
              title="Critical"
              value={critical}
              color="purple"
            />
          </div>

          {/* Heatmap */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

            {zones.map((zone, idx) => {
              const status = getStatus(
                zone.health_score
              );

              return (
                <motion.div
                  key={idx}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() =>
                    setSelected(zone)
                  }
                  className={`
                    cursor-pointer
                    rounded-2xl
                    p-5
                    bg-gradient-to-br
                    ${status.color}
                    shadow-xl
                  `}
                >
                  <div className="flex justify-between items-center mb-3">
                    <Sprout size={20} />

                    <span className="text-xs font-bold">
                      {status.label}
                    </span>
                  </div>

                  <h3 className="font-bold">
                    {zone.name}
                  </h3>

                  <p className="text-sm mt-1">
                    {zone.crop}
                  </p>

                  <p className="mt-3 text-xs">
                    Health Score:
                    {" "}
                    {zone.health_score}%
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Zone */}

          {selected && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mt-6
                rounded-2xl
                bg-slate-900
                border
                border-slate-700
                p-6
              "
            >
              <h3 className="text-xl font-bold mb-5">
                {selected.name}
              </h3>

              <div className="grid md:grid-cols-3 gap-5">

                <div>
                  <p className="text-slate-400">
                    Crop
                  </p>

                  <p className="font-semibold mt-2">
                    {selected.crop}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    Health Score
                  </p>

                  <p className="font-semibold mt-2">
                    {selected.health_score}%
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    AI Insight
                  </p>

                  <p className="text-sm mt-2">
                    {selected.health_score <
                    50
                      ? "⚠️ Immediate monitoring required. Crop stress detected."
                      : "✅ Crop health looks stable and suitable for current weather conditions."}
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  color,
}: any) {
  const bg =
    color === "green"
      ? "bg-green-500/10 border-green-500/20"
      : color === "yellow"
      ? "bg-yellow-500/10 border-yellow-500/20"
      : color === "red"
      ? "bg-red-500/10 border-red-500/20"
      : "bg-purple-500/10 border-purple-500/20";

  return (
    <div
      className={`rounded-2xl p-4 border ${bg}`}
    >
      <p className="text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold">
        {value}
      </h3>
    </div>
  );
}