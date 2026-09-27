"use client";

import { useEffect, useState } from "react";
import {
  Sprout,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

interface Props {
  lat: number;
  lon: number;
}

interface CropResponse {
  recommended_crop: string;
  confidence: number;
  alternatives: string[];
}

export default function AICropRecommendation({
  lat,
  lon,
}: Props) {
  const [data, setData] = useState<CropResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCropRecommendation();
  }, [lat, lon]);

  const fetchCropRecommendation = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/api/v1/crop-recommendation?lat=${lat}&lon=${lon}`
      );

      const result = await res.json();

      setData(result);
    } catch (error) {
      console.error("Crop Recommendation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#081528] rounded-3xl border border-green-500/20 p-6 text-white">
        Loading crop recommendation...
      </div>
    );
  }

  return (
    <div
      className="
      bg-[#081528]
      rounded-3xl
      border
      border-green-500/20
      p-6
      text-white
      "
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="
          w-12
          h-12
          rounded-xl
          bg-green-500/10
          flex
          items-center
          justify-center
          "
        >
          <Sprout
            className="text-green-400"
            size={24}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            AI Crop Recommendation
          </h2>

          <p className="text-slate-400 text-sm">
            Weather-based crop suitability analysis
          </p>
        </div>
      </div>

      <div
        className="
        bg-green-500/10
        border
        border-green-500/20
        rounded-2xl
        p-5
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">
              Recommended Crop
            </p>

            <h3 className="text-4xl font-bold text-green-400 mt-2">
              {data?.recommended_crop || "N/A"}
            </h3>
          </div>

          <TrendingUp
            size={42}
            className="text-green-400"
          />
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2 text-green-300">
            <CheckCircle size={16} />
            AI weather suitability matched
          </div>

          <div className="flex items-center gap-2 text-green-300 mt-2">
            <CheckCircle size={16} />
            Rainfall conditions analyzed
          </div>

          <div className="flex items-center gap-2 text-green-300 mt-2">
            <CheckCircle size={16} />
            Humidity conditions evaluated
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">
              AI Confidence
            </span>

            <span className="text-white font-semibold">
              {data?.confidence || 0}%
            </span>
          </div>

          <div
            className="
            h-3
            bg-slate-700
            rounded-full
            overflow-hidden
            "
          >
            <div
              className="
              h-full
              bg-green-500
              rounded-full
              transition-all
              duration-500
              "
              style={{
                width: `${data?.confidence || 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-4">
          Alternative Crops
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {data?.alternatives?.map(
            (crop, index) => (
              <div
                key={index}
                className="
                bg-slate-800
                rounded-xl
                p-4
                border
                border-slate-700
                text-center
                "
              >
                {crop}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}