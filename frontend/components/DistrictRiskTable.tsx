"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Shield,
  CheckCircle,
} from "lucide-react";

interface District {
  district: string;
  risk_score: number;
  risk_level: string;
  population: string;
}

interface Props {
  districts: District[];
}

export default function DistrictRiskTable({
  districts,
}: Props) {

  const getColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-red-400";
      case "Moderate":
        return "text-yellow-400";
      default:
        return "text-green-400";
    }
  };

  const getIcon = (level: string) => {
    switch (level) {
      case "High":
        return <AlertTriangle size={16} />;
      case "Moderate":
        return <Shield size={16} />;
      default:
        return <CheckCircle size={16} />;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-slate-900/70 border border-cyan-500/20 rounded-3xl p-6"
    >
      <h2 className="text-3xl font-bold text-white mb-6">
        District Risk Assessment
      </h2>

      <div className="overflow-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-4 text-slate-400">
                District
              </th>

              <th className="text-left py-4 text-slate-400">
                Population
              </th>

              <th className="text-left py-4 text-slate-400">
                Risk Score
              </th>

              <th className="text-left py-4 text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody>

            {districts?.map((item, index) => (

              <tr
                key={index}
                className="border-b border-slate-800 hover:bg-slate-800/40 transition"
              >
                <td className="py-4 text-white font-medium">
                  {item.district}
                </td>

                <td className="py-4 text-slate-300">
                  {item.population}
                </td>

                <td className="py-4">

                  <div className="flex items-center gap-3">

                    <div className="w-32 bg-slate-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-cyan-400"
                        style={{
                          width: `${item.risk_score}%`,
                        }}
                      />
                    </div>

                    <span className="text-white">
                      {item.risk_score}
                    </span>

                  </div>

                </td>

                <td className={`py-4 flex items-center gap-2 ${getColor(item.risk_level)}`}>
                  {getIcon(item.risk_level)}
                  {item.risk_level}
                </td>
              </tr>

            ))}

          </tbody>

        </table>
      </div>

    </motion.div>
  );
}