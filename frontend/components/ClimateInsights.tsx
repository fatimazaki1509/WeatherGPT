import Image from "next/image";

export default function ClimateInsights() {
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
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">
          India Climate Insights
        </h2>

        <button className="text-blue-400">
          See More →
        </button>
      </div>

      <div className="flex gap-4 mt-5">
        <Image
          src="/images/india-climate.png"
          alt="india"
          width={180}
          height={180}
          className="rounded-xl"
        />

        <div>
          <h3 className="font-bold text-xl">
            Rising temperature trend
            in Central India
          </h3>

          <p className="text-gray-400 mt-2">
            Average temperature has
            increased by 1.2°C in the
            last 10 years.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <button className="bg-slate-800 py-3 rounded-xl">
          Rainfall Trends
        </button>

        <button className="bg-slate-800 py-3 rounded-xl">
          Temperature
        </button>

        <button className="bg-slate-800 py-3 rounded-xl">
          Extreme Events
        </button>
      </div>
    </div>
  );
}