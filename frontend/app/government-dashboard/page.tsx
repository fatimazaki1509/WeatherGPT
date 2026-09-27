"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/AppLayout";

import GovOverview from "@/components/GovOverview";
import DisasterDistribution from "@/components/DisasterDistribution";
import ResourceDeployment from "@/components/ResourceDeployment";
import DistrictRiskTable from "@/components/DistrictRiskTable";
import AIInsights from "@/components/AIlInsights";
import NationalRiskMap from "@/components/NationalRiskMap";

export default function GovernmentDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://localhost:8000/api/government-dashboard"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("Government Dashboard Data:", result);

        setData(result || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);

        setData({});
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-cyan-400 text-xl">
            Loading Government Dashboard...
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-950 via-cyan-950 to-indigo-950 rounded-3xl border border-cyan-500/20 p-8">
          <h1 className="text-4xl font-bold text-white">
            Government Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            National Disaster Monitoring &
            Resource Intelligence
          </p>
        </div>

        {/* Overview */}

        <GovOverview
          totalAlerts={
            data?.total_alerts ?? 0
          }
          activeDisasters={
            data?.active_disasters ?? 0
          }
          resourcesDeployed={
            data?.resources_deployed ?? 0
          }
        />

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-6">

          <DisasterDistribution
  data={data.disaster_distribution}
/>

<ResourceDeployment
  data={data.resource_deployment}
/>
        </div>

        {/* National Map */}

        <NationalRiskMap
          regions={data?.regions || []}
        />

        {/* District Table */}

        <DistrictRiskTable
          districts={
            data?.districts || []
          }
        />

        {/* AI Insights */}

        <AIInsights
          insights={
            data?.insights || []
          }
        />

      </div>
    </AppLayout>
  );
}