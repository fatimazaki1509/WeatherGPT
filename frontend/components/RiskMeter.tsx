type Props = {
  risk: number;
};

export default function RiskMeter({
  risk,
}: Props) {
  return (
    <div className="bg-slate-800 rounded-2xl p-5">
      <h3 className="text-white mb-3">
        Crop Risk
      </h3>

      <div className="w-full bg-slate-700 h-3 rounded-full">
        <div
          className="
          bg-green-500
          h-3
          rounded-full
          "
          style={{
            width: `${risk}%`,
          }}
        />
      </div>

      <p className="mt-2 text-white">
        {risk}% Risk
      </p>
    </div>
  );
}