"use client";
import { useState } from "react";
import { Navigation, Car, Train, Plane, X, CheckCircle, AlertCircle, MapPin, Clock, Thermometer, Droplets } from "lucide-react";

interface TravelAdvisoryProps {
  onClose: () => void;
}

export default function TravelAdvisory({ onClose }: TravelAdvisoryProps) {
  const [fromLoc, setFromLoc] = useState("");
  const [toLoc, setToLoc] = useState("");
  const [mode, setMode] = useState("road");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const checkRoute = async () => {
    if (!fromLoc || !toLoc) {
      setError("Please enter both From and To locations");
      return;
    }
    
    setLoading(true);
    setError("");
    setResult(null);
    
    try {
      const res = await fetch("http://localhost:8000/api/v1/travel-advisory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          from_location: fromLoc, 
          to_location: toLoc, 
          mode: mode 
        })
      });
      
      if (!res.ok) {
        throw new Error("Failed to fetch travel advisory");
      }
      
      const data = await res.json();
      setResult(data.data);
    } catch (err: any) {
      setError(err.message || "Error fetching route data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-[#0f172a] border-2 border-cyan-500/50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <Navigation className="text-white" size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Travel Advisory Engine</h3>
              <p className="text-xs text-gray-400">Real-time route safety checker</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-cyan-400 uppercase tracking-wider mb-1.5 block flex items-center gap-1">
                <MapPin size={12} /> From
              </label>
              <input
                type="text"
                value={fromLoc}
                onChange={(e) => setFromLoc(e.target.value)}
                placeholder="e.g., Mumbai"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs text-cyan-400 uppercase tracking-wider mb-1.5 block flex items-center gap-1">
                <MapPin size={12} /> To
              </label>
              <input
                type="text"
                value={toLoc}
                onChange={(e) => setToLoc(e.target.value)}
                placeholder="e.g., Delhi"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Travel Mode */}
          <div>
            <label className="text-xs text-cyan-400 uppercase tracking-wider mb-2 block">Travel Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "road", icon: Car, label: "Road" },
                { id: "train", icon: Train, label: "Train" },
                { id: "flight", icon: Plane, label: "Flight" }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`p-3 rounded-lg border transition flex items-center justify-center gap-2 ${
                    mode === m.id 
                      ? "bg-cyan-600/20 border-cyan-500 text-cyan-400" 
                      : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  <m.icon size={18} />
                  <span className="text-sm font-medium">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Check Button */}
          <button
            onClick={checkRoute}
            disabled={loading || !fromLoc || !toLoc}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition shadow-lg"
          >
            {loading ? "🔄 Calculating Real-time Route..." : "️ Check Route Safety"}
          </button>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-400 text-sm">❌ {error}</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4 pt-4 border-t border-gray-700 animate-fade-in">
              {/* Route Summary */}
              <div className={`bg-gradient-to-r rounded-xl p-5 border ${
                result.risk_level === "HIGH" ? "from-red-600/20 to-red-800/20 border-red-500/50" :
                result.risk_level === "MEDIUM" ? "from-yellow-600/20 to-orange-600/20 border-yellow-500/50" :
                "from-green-600/20 to-emerald-600/20 border-green-500/50"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white text-xl">{result.route}</h4>
                  <span className={`px-4 py-2 rounded-full text-xs font-bold border ${
                    result.risk_level === "HIGH" ? "bg-red-500/20 text-red-400 border-red-500" :
                    result.risk_level === "MEDIUM" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500" :
                    "bg-green-500/20 text-green-400 border-green-500"
                  }`}>
                    {result.risk_level} RISK
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                      <MapPin size={12} /> Distance
                    </div>
                    <div className="text-lg font-bold text-white">{result.distance_km} km</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                      <Clock size={12} /> Duration
                    </div>
                    <div className="text-lg font-bold text-white">{result.estimated_duration}</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Best Time</div>
                    <div className="text-sm font-bold text-white">{result.best_time}</div>
                  </div>
                </div>
              </div>

              {/* Weather Info */}
              {result.destination_weather && (
                <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Thermometer size={18} className="text-cyan-400" />
                    Destination Weather ({result.route.split('→')[1]?.trim()})
                  </h5>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <Thermometer size={16} className="text-orange-400" />
                      <span className="text-sm text-gray-300">Temp:</span>
                      <span className="text-white font-semibold">{result.destination_weather.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets size={16} className="text-blue-400" />
                      <span className="text-sm text-gray-300">Rain:</span>
                      <span className="text-white font-semibold">{result.destination_weather.rain_probability_next_12h}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation size={16} className="text-green-400" />
                      <span className="text-sm text-gray-300">Wind:</span>
                      <span className="text-white font-semibold">{result.destination_weather.wind_speed} km/h</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" />
                  Recommendations
                </h5>
                <ul className="space-y-2">
                  {result.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">▸</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warnings */}
              {result.warnings && result.warnings.length > 0 && (
                <div className="bg-yellow-500/5 rounded-xl p-4 border border-yellow-500/30">
                  <h5 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                    <AlertCircle size={18} />
                    Warnings
                  </h5>
                  <ul className="space-y-2">
                    {result.warnings.map((warn: string, i: number) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-yellow-400"></span>
                        {warn}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}