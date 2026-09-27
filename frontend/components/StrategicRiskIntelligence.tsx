"use client";

import { ShieldAlert } from "lucide-react";

export default function AIInsights({
  insights,
}: {
  insights: string[];
}) {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-cyan-500/20">

      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert className="text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">
          AI Risk Intelligence
        </h2>
      </div>

      <div className="space-y-4">

        {insights.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-xl p-4 border border-white/5"
          >
            <p className="text-slate-300">
              {item}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}