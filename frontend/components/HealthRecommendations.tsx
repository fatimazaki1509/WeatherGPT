"use client";

interface Props {
  aqi: number;
}

export default function HealthRecommendations({
  aqi,
}: Props) {

  const recommendations = {
    1: [
      "Outdoor activities safe",
      "Excellent air quality",
    ],
    2: [
      "Normal outdoor activity",
      "Sensitive groups stay aware",
    ],
    3: [
      "Reduce prolonged outdoor exposure",
      "Wear mask if sensitive",
    ],
    4: [
      "Avoid strenuous outdoor activity",
      "Use N95 mask",
    ],
    5: [
      "Stay indoors",
      "Use air purifier",
    ],
  };

  const tips =
    recommendations[aqi as keyof typeof recommendations] || [];

  return (
    <div className="rounded-2xl border border-green-900 bg-slate-900 p-6">

      <h2 className="text-xl font-bold text-white mb-4">
        Health Recommendations
      </h2>

      <div className="space-y-3">

        {tips.map((tip) => (
          <div
            key={tip}
            className="bg-emerald-900/20 border border-emerald-700 rounded-xl p-3 text-emerald-300"
          >
            ✓ {tip}
          </div>
        ))}

      </div>
    </div>
  );
}