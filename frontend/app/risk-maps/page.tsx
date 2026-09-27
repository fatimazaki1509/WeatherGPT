"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/AppLayout";

import RiskOverview from "@/components/RiskOverview";
import RiskDistribution from "@/components/RiskDistribution";
import AIInsights from "@/components/AIInsights";
import RecommendedActions from "@/components/RecommendedActions";

export default function RiskMapsPage() {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiskData();
  }, []);

  const fetchRiskData = async () => {
    try {

      const res = await fetch(
        "http://localhost:8000/api/risk-maps/"
      );

      const result = await res.json();

      setData(result);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="text-white">
          Loading Risk Maps...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <div className="space-y-6">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Risk Maps
          </h1>

          <p className="text-slate-400 mt-2">
            AI Powered Climate Risk Visualization
          </p>
        </div>

        <RiskOverview data={data} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <RiskDistribution data={data} />

          <AIInsights data={data} />

        </div>

        <RecommendedActions data={data} />

      </div>

    </AppLayout>
  );
}