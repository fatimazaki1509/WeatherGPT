import {
  Umbrella,
  TriangleAlert,
  CheckCircle,
  Sun,
} from "lucide-react";

export default function RecommendationCard() {
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
      <h2 className="font-bold text-2xl">
        Today's Recommendations
      </h2>

      <div className="mt-5 space-y-4">

        <Item
          icon={<Umbrella size={18} />}
          text="Carry umbrella due to chance of rain."
        />

        <Item
          icon={<TriangleAlert size={18} />}
          text="Avoid outdoor activities after 4 PM."
        />

        <Item
          icon={<CheckCircle size={18} />}
          text="Good conditions for indoor work."
        />

        <Item
          icon={<CheckCircle size={18} />}
          text="No heatwave risk today."
        />

        <Item
          icon={<Sun size={18} />}
          text="Air quality is moderate."
        />
      </div>
    </div>
  );
}

function Item({ icon, text }: any) {
  return (
    <div className="flex gap-3">
      {icon}
      <span>{text}</span>
    </div>
  );
}