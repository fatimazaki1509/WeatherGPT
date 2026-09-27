"use client";

interface Props {
  aqi: number;
  updated: string;
}

export default function AQIOverview({
  aqi,
  updated,
}: Props) {

  const getCategory = () => {
    switch (aqi) {
      case 1:
        return {
          text: "Good",
          color: "text-emerald-400",
          ring: "border-emerald-500",
        };

      case 2:
        return {
          text: "Fair",
          color: "text-cyan-400",
          ring: "border-cyan-500",
        };

      case 3:
        return {
          text: "Moderate",
          color: "text-yellow-400",
          ring: "border-yellow-500",
        };

      case 4:
        return {
          text: "Poor",
          color: "text-orange-400",
          ring: "border-orange-500",
        };

      default:
        return {
          text: "Very Poor",
          color: "text-red-400",
          ring: "border-red-500",
        };
    }
  };

  const category = getCategory();

  return (
    <div className="space-y-6">

      {/* Hero Banner */}

      <div className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-900
        bg-gradient-to-r
        from-slate-950
        via-[#071d3a]
        to-slate-950
        p-8
      ">

        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl" />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Left */}

          <div>

            <p className="text-cyan-400 text-sm uppercase tracking-wider">
              Real Time Monitoring
            </p>

            <h2 className="text-4xl font-bold text-white mt-2">
              Air Quality Index
            </h2>

            <p className="text-slate-400 mt-3">
              Live atmospheric pollution intelligence
            </p>

          </div>

          {/* Circular AQI */}

          <div
            className={`
              w-40 h-40
              rounded-full
              border-8
              ${category.ring}
              flex
              flex-col
              items-center
              justify-center
              bg-slate-900/70
              backdrop-blur-xl
              shadow-xl
            `}
          >
            <span className="text-5xl font-bold text-white">
              {aqi}
            </span>

            <span className={`text-sm font-semibold ${category.color}`}>
              {category.text}
            </span>
          </div>

        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="
          bg-slate-800/60
          rounded-2xl
          p-5
          border border-slate-700
        ">
          <p className="text-slate-400 text-sm">
            AQI Value
          </p>

          <h3 className="text-4xl font-bold text-cyan-400 mt-2">
            {aqi}
          </h3>
        </div>

        <div className="
          bg-slate-800/60
          rounded-2xl
          p-5
          border border-slate-700
        ">
          <p className="text-slate-400 text-sm">
            Category
          </p>

          <h3 className={`text-3xl font-bold mt-2 ${category.color}`}>
            {category.text}
          </h3>
        </div>

        <div className="
          bg-slate-800/60
          rounded-2xl
          p-5
          border border-slate-700
        ">
          <p className="text-slate-400 text-sm">
            Updated
          </p>

          <h3 className="text-white mt-2">
            {updated}
          </h3>
        </div>

      </div>

    </div>
  );
}