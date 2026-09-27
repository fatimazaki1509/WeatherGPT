"use client";

interface Props {
  components?: Record<string, number>;
}

export default function PollutantBreakdown({
  components = {},
}: Props) {

  const pollutantInfo: Record<
    string,
    { name: string; unit: string }
  > = {
    co: { name: "CO", unit: "μg/m³" },
    no: { name: "NO", unit: "μg/m³" },
    no2: { name: "NO₂", unit: "μg/m³" },
    o3: { name: "O₃", unit: "μg/m³" },
    so2: { name: "SO₂", unit: "μg/m³" },
    pm2_5: { name: "PM2.5", unit: "μg/m³" },
    pm10: { name: "PM10", unit: "μg/m³" },
    nh3: { name: "NH₃", unit: "μg/m³" },
  };

  return (
    <div className="
      bg-slate-950/60
      border border-cyan-900
      rounded-3xl
      p-6
    ">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-white">
          Pollutant Breakdown
        </h2>

        <p className="text-slate-400 mt-1">
          Real-time atmospheric composition
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-5
      ">

        {Object.entries(components).map(
          ([key, value]) => {

            const info =
              pollutantInfo[key] || {
                name: key.toUpperCase(),
                unit: "",
              };

            return (
              <div
                key={key}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-700
                  bg-slate-800/60
                  p-5
                  transition-all
                  duration-300
                  hover:border-cyan-500
                  hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
                  hover:-translate-y-1
                "
              >

                {/* Glow */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-cyan-500/5
                    opacity-0
                    group-hover:opacity-100
                    transition
                  "
                />

                <div className="relative">

                  <p className="text-slate-400 text-sm">
                    {info.name}
                  </p>

                  <h3 className="
                    text-3xl
                    font-bold
                    text-cyan-400
                    mt-3
                  ">
                    {Number(value).toFixed(2)}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2">
                    {info.unit}
                  </p>

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}