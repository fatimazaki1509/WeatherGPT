"use client";

import { useEffect, useState } from "react";
import {
  Bug,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Loader2,
} from "lucide-react";

interface Props {
  lat: number;
  lon: number;
}

interface DiseaseData {
  risk: string;
  score: number;
  threats: string[];
}

export default function DiseasePestPrediction({
  lat,
  lon,
}: Props) {
  const [data, setData] = useState<DiseaseData>({
    risk: "Low",
    score: 0,
    threats: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lat && lon) {
      fetchDiseaseData();
    }
  }, [lat, lon]);

  const fetchDiseaseData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8000/api/v1/disease-prediction?lat=${lat}&lon=${lon}`
      );

      if (!response.ok) {
        throw new Error("API Error");
      }

      const result = await response.json();

      console.log("Disease API:", result);

      setData({
        risk: result.risk ?? "Low",
        score: result.score ?? 0,
        threats: result.threats ?? [],
      });
    } catch (err) {
      console.error("Disease API Error:", err);

      setData({
        risk: "Low",
        score: 0,
        threats: ["No threats detected"],
      });
    } finally {
      setLoading(false);
    }
  };

  const riskColor =
    data.risk === "High"
      ? "text-red-400"
      : data.risk === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  const barColor =
    data.risk === "High"
      ? "bg-red-500"
      : data.risk === "Medium"
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="bg-[#081528] rounded-3xl border border-red-500/20 p-6 text-white">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
          <Bug size={24} className="text-red-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Disease & Pest Prediction
          </h2>

          <p className="text-slate-400 text-sm">
            AI-powered crop risk analysis
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2
            size={40}
            className="animate-spin text-green-400"
          />
        </div>
      ) : (
        <>
          {/* Risk Card */}

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">

            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">
                  Overall Risk
                </p>

                <h3 className={`text-4xl font-bold mt-2 ${riskColor}`}>
                  {data.risk}
                </h3>
              </div>

              <Activity
                size={40}
                className={riskColor}
              />
            </div>

            <div className="mt-5">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-slate-400">
                  Risk Score
                </span>

                <span>
                  {data.score}%
                </span>
              </div>

              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${barColor}`}
                  style={{
                    width: `${data.score}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Threats */}

          <div className="mt-6">
            <h3 className="font-semibold mb-4">
              Possible Threats
            </h3>

            {data.threats.length === 0 ? (
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                No threats detected
              </div>
            ) : (
              <div className="space-y-3">
                {data.threats.map((threat, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        size={18}
                        className="text-yellow-400"
                      />

                      <span className="font-medium">
                        {threat}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips */}

          <div className="mt-6">
            <h3 className="font-semibold mb-4">
              Prevention Tips
            </h3>

            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">

              <div className="flex gap-3">

                <ShieldCheck
                  size={20}
                  className="text-green-400 mt-1"
                />

                <div className="space-y-2 text-green-300">
                  <p>Monitor crop leaves regularly.</p>
                  <p>Ensure proper field drainage.</p>
                  <p>Avoid excess irrigation.</p>
                  <p>Apply pesticides only if symptoms appear.</p>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}