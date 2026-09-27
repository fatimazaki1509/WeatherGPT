"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface DisasterItem {
  name: string;
  value: number;
}

interface Props {
  data?: DisasterItem[];
}

const COLORS = [
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

export default function DisasterDistribution({
  data = [],
}: Props) {
  const hasData = data.length > 0;

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Disaster Distribution
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          National disaster category analysis
        </p>
      </div>

      {!hasData ? (
        <div className="h-[350px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-400 text-lg">
              No disaster data available
            </p>

            <p className="text-slate-500 text-sm mt-2">
              Waiting for backend response...
            </p>
          </div>
        </div>
      ) : (
        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={60}
                paddingAngle={4}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "#0f172a",
                  border:
                    "1px solid #334155",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>
      )}

      {hasData && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-6">

          {data.map((item, index) => (
            <div
              key={item.name}
              className="bg-slate-800/60 border border-slate-700 rounded-xl p-3 hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-center gap-2">

                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[
                        index %
                          COLORS.length
                      ],
                  }}
                />

                <span className="text-slate-300 text-sm">
                  {item.name}
                </span>
              </div>

              <p className="text-white text-xl font-bold mt-2">
                {item.value}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}