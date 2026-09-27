"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";

import DisasterAlerts from "@/components/DisasterAlerts";
import ThreatIndicators from "@/components/ThreatIndicators";
import EmergencyContacts from "@/components/EmergencyContacts";
import RecentAlertHistory from "@/components/RecentAlertHistory";

import {
  MapPin,
  Search,
  ShieldAlert,
  Activity,
} from "lucide-react";

export default function DisasterAlertsPage() {
  const [city, setCity] = useState("Nagpur");
  const [data, setData] = useState<any>(null);

  const fetchAlerts = async () => {
    const res = await fetch(
      "http://127.0.0.1:8000/api/disaster-alerts?lat=21.1458&lon=79.0882"
    );

    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  if (!data) {
    return (
      <AppLayout>
        <div className="text-white text-lg">
          Loading Disaster Intelligence...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}

        <div className="bg-gradient-to-r from-red-950 via-orange-950 to-yellow-950 border border-red-500/20 rounded-3xl p-8">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>
              <h1 className="text-4xl font-bold text-white">
                City Disaster Intelligence
              </h1>

              <p className="text-slate-400 mt-2">
                Real-time disaster monitoring & risk assessment
              </p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2 flex items-center gap-2">
              <Activity className="text-red-400" size={18} />
              <span className="text-red-300">
                Live Monitoring Active
              </span>
            </div>

          </div>
        </div>

        {/* Search */}

        <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-5">

          <div className="flex gap-3">

            <div className="flex-1 relative">

              <MapPin
                className="absolute left-4 top-3.5 text-cyan-400"
                size={18}
              />

              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="
                w-full
                pl-11
                pr-4
                py-3
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                text-white
                outline-none
                "
              />
            </div>

            <button
              className="
              bg-cyan-500
              hover:bg-cyan-600
              text-white
              px-5
              rounded-xl
              flex items-center gap-2
              "
            >
              <Search size={18} />
              Search
            </button>

          </div>
        </div>

        {/* Current City Status */}

        <div className="bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/20 rounded-3xl p-6">

          <div className="flex items-center gap-3">

            <ShieldAlert
              className="text-cyan-400"
              size={28}
            />

            <div>
              <h2 className="text-white text-2xl font-bold">
                {city}
              </h2>

              <p className="text-slate-400">
                Current Disaster Monitoring Status
              </p>
            </div>

          </div>
        </div>

        {/* Risk Overview */}

        <DisasterAlerts
          riskLevel={data.risk_level}
          activeAlerts={data.active_alerts}
          monitoringStatus="Live"
        />

        {/* Weather Indicators */}

        <ThreatIndicators
          wind={data.wind_speed}
          rainfall={data.rainfall}
          temp={data.temperature}
        />

        {/* AI Recommendations */}

        <div className="bg-slate-900 rounded-3xl border border-cyan-500/20 p-6">

          <h2 className="text-white text-2xl font-bold mb-5">
            Recommended Actions
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-emerald-300">
              Keep emergency kit ready.
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-emerald-300">
              Monitor local authority advisories.
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-emerald-300">
              Avoid flood-prone routes.
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-emerald-300">
              Stay updated with weather forecasts.
            </div>

          </div>

        </div>

        {/* Contacts + History */}

        <div className="grid lg:grid-cols-2 gap-6">

          <EmergencyContacts />

          <RecentAlertHistory
            alerts={data.alerts}
          />

        </div>

      </div>
    </AppLayout>
  );
}