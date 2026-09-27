"use client";

import { Bot } from "lucide-react";

export default function AIInsights({ data }: any) {

  return (

    <div className="bg-[#081528] rounded-2xl border border-cyan-500/20 p-6">

      <div className="flex items-center gap-2 mb-5">

        <Bot className="text-cyan-400" />

        <h2 className="text-white text-xl font-bold">
          AI Insights
        </h2>

      </div>

      <div className="space-y-4">

        {data.insights.map(
          (item: string, index: number) => (

            <div
              key={index}
              className="bg-slate-800 rounded-xl p-4 text-white"
            >
              {item}
            </div>
          )
        )}

      </div>

    </div>
  );
}