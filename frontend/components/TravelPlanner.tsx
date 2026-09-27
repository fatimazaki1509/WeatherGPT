import { Car } from "lucide-react";

export default function TravelPlanner() {
  return (
    <div
      className="
      rounded-3xl
      border border-orange-500/30
      bg-gradient-to-br
      from-orange-950/80
      via-amber-950/40
      to-slate-900
      p-5
      text-white
      h-full
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-orange-500/10
          flex
          items-center
          justify-center
          "
        >
          <Car className="text-orange-400" size={28} />
        </div>

        <div>
          <h3 className="font-bold text-xl">
            Travel Planner
          </h3>

          <p className="text-orange-400 text-sm">
            Check route weather & travel risk →
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-6">
        <p className="text-gray-300 leading-relaxed">
          Plan your journey with real-time weather
          insights and route forecasts.
        </p>
      </div>

      <button
        className="
        mt-8
        w-full
        py-4
        rounded-2xl
        border
        border-orange-500/40
        bg-orange-500/20
        hover:bg-orange-500/30
        transition
        font-semibold
        "
      >
        Plan Your Travel →
      </button>
    </div>
  );
}