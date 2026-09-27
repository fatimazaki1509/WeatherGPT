"use client";

import {
  AlertTriangle,
  Building2,
  Users,
  BellRing,
} from "lucide-react";

interface Props {
  districts: number;
  highRisk: number;
  alerts: number;
  population: string;
}

export default function GovOverview({
  districts,
  highRisk,
  alerts,
  population,
}: Props) {

  const cards = [
    {
      title: "Districts Monitored",
      value: districts,
      icon: Building2,
      gradient:
        "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-cyan-400",
    },
    {
      title: "High Risk Areas",
      value: highRisk,
      icon: AlertTriangle,
      gradient:
        "from-red-500/20 to-orange-500/20",
      iconColor: "text-orange-400",
    },
    {
      title: "Active Alerts",
      value: alerts,
      icon: BellRing,
      gradient:
        "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-yellow-400",
    },
    {
      title: "Population Impacted",
      value: population,
      icon: Users,
      gradient:
        "from-emerald-500/20 to-green-500/20",
      iconColor: "text-green-400",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-5">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`
            bg-gradient-to-br ${card.gradient}
            border border-white/10
            rounded-2xl
            p-6
            backdrop-blur-xl
            hover:scale-[1.03]
            hover:border-cyan-400/30
            hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
            transition-all duration-300
          `}
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold text-white mt-2">
                {card.value}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">

              <card.icon
                size={28}
                className={card.iconColor}
              />

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}