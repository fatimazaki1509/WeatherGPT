"use client";

import { CheckCircle } from "lucide-react";

export default function RecommendedActions({
  data,
}: any) {

  return (

    <div className="bg-[#081528] rounded-2xl border border-green-500/20 p-6">

      <h2 className="text-xl font-bold text-white mb-5">
        Recommended Actions
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {data.recommendations.map(
          (item: string, index: number) => (

            <div
              key={index}
              className="bg-green-500/10 border border-green-500/20 rounded-xl p-4"
            >

              <div className="flex items-center gap-2 text-green-400">

                <CheckCircle size={18} />

                <span>{item}</span>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}