"use client";
import { motion } from "framer-motion";
import { Bike, Camera, Waves, Umbrella, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface ImpactScoreProps {
  scores: Array<{
    activity: string;
    icon: any;
    score: number;
    color: string;
  }>;
}

export default function ImpactScore({ scores }: ImpactScoreProps) {
  const getIcon = (activity: string) => {
    switch(activity) {
      case "Cycling": return Bike;
      case "Photography": return Camera;
      case "Beach Trip": return Waves;
      case "Outdoor Events": return Umbrella;
      default: return CheckCircle;
    }
  };

  const getStatusIcon = (score: number) => {
    if (score >= 75) return <CheckCircle size={16} className="text-green-400" />;
    if (score >= 50) return <AlertCircle size={16} className="text-yellow-400" />;
    return <XCircle size={16} className="text-red-400" />;
  };

  const getStatusText = (score: number) => {
    if (score >= 75) return "Excellent";
    if (score >= 50) return "Moderate";
    return "Not Recommended";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/20 rounded-2xl p-6 shadow-xl mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            💯 Weather Impact Score
          </h3>
          <p className="text-sm text-blue-200 mt-1">Activity-based weather suitability</p>
        </div>
        <div className="text-xs text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
          Real-time Analysis
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {scores.map((item, idx) => {
          const IconComponent = getIcon(item.activity);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{item.activity}</div>
                    <div className="text-xs text-blue-300">Suitability Score</div>
                  </div>
                </div>
                {getStatusIcon(item.score)}
              </div>

              {/* Score Bar */}
              <div className="mb-2">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-3xl font-bold text-white">{item.score}</span>
                  <span className="text-xs text-blue-300">/100</span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                    className={`h-full rounded-full ${
                      item.score >= 75 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      item.score >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                      'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                  />
                </div>
              </div>

              <div className={`text-xs font-semibold ${
                item.score >= 75 ? 'text-green-400' :
                item.score >= 50 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {getStatusText(item.score)}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-4 text-center">
        <p className="text-xs text-blue-300/60">
          💡 Scores are calculated based on real-time weather conditions including rain probability, temperature, and wind speed
        </p>
      </div>
    </motion.div>
  );
}