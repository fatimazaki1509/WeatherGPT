"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, CloudRain, X } from "lucide-react";

interface ClimateTrendsProps {
  lat: number;
  lon: number;
  locationName: string;
  onClose: () => void;
}

export default function ClimateTrends({
  lat,
  lon,
  locationName,
  onClose,
}: ClimateTrendsProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrends();
  }, [lat, lon]);

  const fetchTrends = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/climate-trends?lat=${lat}&lon=${lon}`
      );

      const result = await res.json();

      console.log("Climate API Response:", result);

      setData(Array.isArray(result?.data) ? result.data : []);
    } catch (error) {
      console.error("Climate Trends Error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const temperatureChange =
    data.length > 1
      ? (
          (data[data.length - 1]?.avg_temp || 0) -
          (data[0]?.avg_temp || 0)
        ).toFixed(1)
      : "0.0";

  const rainfallTrend =
    data.length > 1
      ? (data[data.length - 1]?.total_rain || 0) >
        (data[0]?.total_rain || 0)
        ? "increasing"
        : "decreasing"
      : "stable";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-[#0f172a] border-2 border-purple-500/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700 bg-gradient-to-r from-purple-600/20 to-pink-600/20 sticky top-0">
          <div>
            <h3 className="font-bold text-white text-lg">
              Climate Trends Analysis (10 Years)
            </h3>
            <p className="text-xs text-gray-400">
              Historical data for {locationName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              Loading 10 years of data...
            </div>
          ) : (
            <>
              {/* Temperature Trend */}
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-red-400" />
                  Average Temperature Trend (°C)
                </h4>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                    />

                    <XAxis
                      dataKey="year"
                      stroke="#9CA3AF"
                    />

                    <YAxis stroke="#9CA3AF" />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="avg_temp"
                      stroke="#F87171"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Rainfall Trend */}
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <CloudRain size={18} className="text-blue-400" />
                  Total Annual Rainfall (mm)
                </h4>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                    />

                    <XAxis
                      dataKey="year"
                      stroke="#9CA3AF"
                    />

                    <YAxis stroke="#9CA3AF" />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    />

                    <Bar
                      dataKey="total_rain"
                      fill="#60A5FA"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* AI Insights */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                <h5 className="font-bold text-purple-400 mb-2">
                  AI Climate Insights
                </h5>

                <p className="text-sm text-gray-300">
                  Over the last 10 years, {locationName} has seen a
                  temperature variation of{" "}
                  <span className="text-white font-bold">
                    {temperatureChange}°C
                  </span>
                  . Rainfall patterns show{" "}
                  <span className="text-white font-bold">
                    {rainfallTrend}
                  </span>{" "}
                  trends.
                </p>
              </div>

              {/* No Data Message */}
              {!loading && data.length === 0 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center text-red-300">
                  No climate trend data available from API.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}