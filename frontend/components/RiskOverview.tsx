"use client";

import {
  AlertTriangle,
  ShieldAlert,
  Clock,
} from "lucide-react";

export default function RiskOverview({ data }: any) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      <Card
        title="Risk Score"
        value={`${data.overall_risk}/100`}
      />

      <Card
        title="Risk Level"
        value={data.risk_level}
      />

      <Card
        title="Highest Threat"
        value={data.highest_threat.type}
      />

      <Card
        title="Updated"
        value={data.updated_at}
      />

    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-[#081528] rounded-2xl border border-blue-500/20 p-5">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-white mt-2">
        {value}
      </h3>

    </div>
  );
}