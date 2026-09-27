"use client";

import { motion } from "framer-motion";
import {
  Brain,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface Props {
  insights: string[];
}

export default function AIInsights({
  insights,
}: Props) {

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/20 rounded-3xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-cyan-400" />
        <h2 className="text-3xl font-bold text-white">
          AI Intelligence
        </h2>
      </div>

      <div className="space-y-4">

        {insights?.map((item, index) => (

          <motion.div
            key={index}
            whileHover={{ x: 5 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
          >
            <div className="flex gap-3">

              {item.toLowerCase().includes("high") ? (
                <AlertTriangle className="text-red-400 mt-1" />
              ) : (
                <CheckCircle className="text-green-400 mt-1" />
              )}

              <p className="text-slate-200">
                {item}
              </p>

            </div>

          </motion.div>

        ))}

      </div>
    </motion.div>
  );
}