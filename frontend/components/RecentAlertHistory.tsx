interface Props {
  alerts?: any[];
}

export default function RecentAlertHistory({
  alerts = [],
}: Props) {

  return (
    <div className="bg-slate-900 rounded-3xl p-6">

      <h3 className="text-xl font-bold text-white mb-5">
        Recent Alert History
      </h3>

      {alerts.length === 0 ? (
        <div className="bg-emerald-900/20 p-4 rounded-xl">
          No recent alerts found.
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div
              key={i}
              className="bg-slate-800 p-4 rounded-xl"
            >
              <p className="font-semibold">
                {a.event || "Weather Alert"}
              </p>

              <p className="text-sm text-slate-400">
                {a.description || "No details available"}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}