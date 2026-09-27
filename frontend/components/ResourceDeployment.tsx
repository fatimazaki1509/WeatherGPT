"use client";

import {
  Shield,
  Tent,
  HeartPulse,
  Truck,
  CheckCircle2,
} from "lucide-react";

interface Props {
  ndrf?: number;
  camps?: number;
  medical?: number;
  vehicles?: number;
}

export default function ResourceDeployment({
  ndrf = 124,
  camps = 67,
  medical = 93,
  vehicles = 180,
}: Props) {
  const resources = [
    {
      title: "NDRF Teams",
      value: ndrf,
      capacity: 82,
      status: "Active",
      icon: Shield,
      color: "text-red-400",
      bg: "from-red-500/10 to-red-500/5",
      border: "border-red-500/20",
    },
    {
      title: "Relief Camps",
      value: camps,
      capacity: 64,
      status: "Operational",
      icon: Tent,
      color: "text-cyan-400",
      bg: "from-cyan-500/10 to-cyan-500/5",
      border: "border-cyan-500/20",
    },
    {
      title: "Medical Units",
      value: medical,
      capacity: 91,
      status: "Ready",
      icon: HeartPulse,
      color: "text-emerald-400",
      bg: "from-emerald-500/10 to-emerald-500/5",
      border: "border-emerald-500/20",
    },
    {
      title: "Rescue Vehicles",
      value: vehicles,
      capacity: 76,
      status: "Deployed",
      icon: Truck,
      color: "text-yellow-400",
      bg: "from-yellow-500/10 to-yellow-500/5",
      border: "border-yellow-500/20",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 to-blue-950 rounded-3xl border border-cyan-500/20 p-6">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Resource Deployment
          </h2>

          <p className="text-slate-400">
            National emergency response resources
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 text-sm">
          Live Operations
        </div>
      </div>

      {/* Summary */}

      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/5">
          <h4 className="text-slate-400 text-sm">
            Total Resources
          </h4>

          <p className="text-3xl font-bold text-white mt-2">
            {ndrf + camps + medical + vehicles}
          </p>
        </div>

        <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/5">
          <h4 className="text-slate-400 text-sm">
            Operational Rate
          </h4>

          <p className="text-3xl font-bold text-green-400 mt-2">
            87%
          </p>
        </div>

        <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/5">
          <h4 className="text-slate-400 text-sm">
            Response Status
          </h4>

          <p className="text-3xl font-bold text-cyan-400 mt-2">
            Stable
          </p>
        </div>

      </div>

      {/* Resource Cards */}

      <div className="grid md:grid-cols-2 gap-5">

        {resources.map((resource) => (
          <div
            key={resource.title}
            className={`
              bg-gradient-to-br ${resource.bg}
              border ${resource.border}
              rounded-2xl
              p-5
              hover:scale-[1.02]
              transition-all duration-300
            `}
          >

            <div className="flex justify-between items-start">

              <div>

                <p className="text-slate-400">
                  {resource.title}
                </p>

                <h3 className="text-4xl font-bold text-white mt-2">
                  {resource.value}
                </h3>

              </div>

              <resource.icon
                size={32}
                className={resource.color}
              />

            </div>

            <div className="mt-5">

              <div className="flex justify-between text-sm mb-2">

                <span className="text-slate-400">
                  Capacity Utilization
                </span>

                <span className="text-white">
                  {resource.capacity}%
                </span>

              </div>

              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  style={{
                    width: `${resource.capacity}%`,
                  }}
                />

              </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <CheckCircle2
                  size={16}
                  className="text-green-400"
                />

                <span className="text-green-400 text-sm">
                  {resource.status}
                </span>

              </div>

              <span className="text-slate-500 text-xs">
                Updated 2 mins ago
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}