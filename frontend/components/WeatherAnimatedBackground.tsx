"use client";

export default function WeatherAnimatedBackground({
  condition,
}: {
  condition: string;
}) {
  const weather = condition?.toLowerCase() || "";

  let bg =
    "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900";

  if (weather.includes("rain")) {
    bg =
      "bg-gradient-to-br from-slate-950 via-blue-900 to-slate-800";
  }

  if (weather.includes("cloud")) {
    bg =
      "bg-gradient-to-br from-slate-950 via-slate-800 to-blue-950";
  }

  if (
    weather.includes("clear") ||
    weather.includes("sun")
  ) {
    bg =
      "bg-gradient-to-br from-blue-950 via-cyan-900 to-indigo-950";
  }

  return (
    <div
      className={`
      fixed
      inset-0
      -z-10
      ${bg}
      overflow-hidden
    `}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-cyan-500 blur-[180px] animate-pulse rounded-full top-0 left-0" />
        <div className="absolute w-96 h-96 bg-blue-500 blur-[180px] animate-pulse rounded-full bottom-0 right-0" />
      </div>
    </div>
  );
}