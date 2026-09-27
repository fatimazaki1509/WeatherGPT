import {
  Waves,
  Flame,
  Zap,
  Wind,
} from "lucide-react";

export default function RiskScore() {
  return (
    <div
      className="
      bg-[#081528]
      border border-blue-900/50
      rounded-3xl
      p-5
      text-white
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-2xl">
            Weather Impact Score
          </h2>

          <p className="text-green-400 mt-2 font-semibold">
            Low Risk
          </p>
        </div>

        <div>
          <span className="text-6xl font-bold">
            25
          </span>

          <span className="text-gray-400">
            /100
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
          <div className="w-1/4 h-full bg-green-400 rounded-full" />
        </div>
      </div>

      <div className="mt-6 space-y-5">

        <RiskRow
          icon={<Waves size={18} />}
          title="Flood Risk"
          value="20"
        />

        <RiskRow
          icon={<Flame size={18} />}
          title="Heatwave Risk"
          value="30"
        />

        <RiskRow
          icon={<Zap size={18} />}
          title="Lightning Risk"
          value="15"
        />

        <RiskRow
          icon={<Wind size={18} />}
          title="Cyclone Risk"
          value="10"
        />
      </div>

      <div className="border-t border-white/10 mt-6 pt-4 flex justify-between">
        <span className="font-semibold">
          Overall Risk
        </span>

        <span className="text-green-400 font-bold">
          Low
        </span>
      </div>
    </div>
  );
}

function RiskRow({
  icon,
  title,
  value,
}: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <span>{title}</span>
      </div>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}