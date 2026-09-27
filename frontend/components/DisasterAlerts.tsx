import { ShieldAlert } from "lucide-react";

export default function DisasterAlerts() {
  return (
    <div
      className="
      bg-[#0a1730]
      border border-cyan-500/30
      rounded-3xl
      p-5
      h-full
      "
    >
      <div className="flex items-start gap-3">
        <ShieldAlert
          size={24}
          className="text-cyan-400"
        />

        <div>
          <h2 className="text-2xl font-bold">
            Disaster Alert Center
          </h2>

          <p className="text-cyan-300 text-sm">
            Real-time early warning system
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-slate-300">
          Monitor floods, cyclones,
          lightning and severe weather
          alerts in real-time.
        </p>
      </div>

      <button
        className="
        mt-6
        w-full
        bg-cyan-500
        hover:bg-cyan-600
        text-white
        font-semibold
        py-4
        rounded-xl
        transition
        "
      >
        View Alerts →
      </button>
    </div>
  );
}