"use client";

export default function RiskDistribution({ data }: any) {

  return (

    <div className="bg-[#081528] rounded-2xl border border-red-500/20 p-6">

      <h2 className="text-white text-xl font-bold mb-5">
        Risk Distribution
      </h2>

      <div className="space-y-5">

        {Object.entries(data.distribution).map(
          ([key, value]: any) => (

            <div key={key}>

              <div className="flex justify-between text-white mb-2">

                <span>{key}</span>

                <span>{value}%</span>

              </div>

              <div className="h-3 bg-slate-700 rounded-full">

                <div
                  className="h-3 bg-red-500 rounded-full"
                  style={{
                    width: `${value}%`,
                  }}
                />

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}