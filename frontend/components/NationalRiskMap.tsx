"use client";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import {
  ShieldAlert,
  Activity,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface Region {
  state: string;
  risk: number;
  lat?: number;
  lng?: number;
  type?: string;
  reason?: string;
}

interface Props {
  regions?: Region[];
}

export default function NationalRiskMap({
  regions = [],
}: Props) {
  const indiaRegions = [
    {
      state: "Rajasthan",
      risk: 72,
      lat: 27.0238,
      lng: 74.2179,
      type: "Heatwave",
      reason:
        "Extreme temperature above 44°C and prolonged dry conditions.",
    },
    {
      state: "Maharashtra",
      risk: 68,
      lat: 19.7515,
      lng: 75.7139,
      type: "Heavy Rainfall",
      reason:
        "Persistent rainfall alerts and localized flood risk in coastal districts.",
    },
    {
      state: "Tamil Nadu",
      risk: 55,
      lat: 11.1271,
      lng: 78.6569,
      type: "Cyclone Watch",
      reason:
        "Strong coastal winds and depression activity over the Bay of Bengal.",
    },
    {
      state: "Gujarat",
      risk: 40,
      lat: 22.2587,
      lng: 71.1924,
      type: "Flood Risk",
      reason:
        "High river discharge levels and moderate rainfall accumulation.",
    },
    {
      state: "Karnataka",
      risk: 25,
      lat: 15.3173,
      lng: 75.7139,
      type: "Low Risk",
      reason:
        "Stable weather conditions with no major active alerts.",
    },
  ];

  const data =
    regions.length > 0
      ? regions.map((r) => {
          const match = indiaRegions.find(
            (x) => x.state === r.state
          );

          return {
            ...r,
            lat: match?.lat || 20,
            lng: match?.lng || 78,
            type: match?.type || "Weather Risk",
            reason:
              match?.reason ||
              "Risk assessment currently active.",
          };
        })
      : indiaRegions;

  const highRisk = data.filter(
    (x) => x.risk >= 70
  ).length;

  const moderateRisk = data.filter(
    (x) => x.risk >= 40 && x.risk < 70
  ).length;

  const safeRegions = data.filter(
    (x) => x.risk < 40
  ).length;

  const getColor = (risk: number) => {
    if (risk >= 70) return "#ef4444";
    if (risk >= 40) return "#facc15";
    return "#22c55e";
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 to-blue-950 rounded-3xl border border-cyan-500/20 p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">
            National Risk Intelligence
          </h2>

          <p className="text-slate-400">
            Real-time disaster monitoring
          </p>
        </div>

        <div className="bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-xl text-sm">
          Live Monitoring
        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-4 mb-6">

        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
          <ShieldAlert className="text-red-400 mb-2" />
          <h3 className="text-3xl font-bold text-white">
            {highRisk}
          </h3>
          <p className="text-slate-400">
            Critical Regions
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
          <AlertTriangle className="text-yellow-400 mb-2" />
          <h3 className="text-3xl font-bold text-white">
            {moderateRisk}
          </h3>
          <p className="text-slate-400">
            Moderate Risk
          </p>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
          <CheckCircle2 className="text-green-400 mb-2" />
          <h3 className="text-3xl font-bold text-white">
            {safeRegions}
          </h3>
          <p className="text-slate-400">
            Safe Regions
          </p>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">
          <Activity className="text-cyan-400 mb-2" />
          <h3 className="text-3xl font-bold text-white">
            {data.length}
          </h3>
          <p className="text-slate-400">
            States Tracked
          </p>
        </div>

      </div>

      {/* Risk Categories */}

      <div className="flex flex-wrap gap-3 mb-6">

        <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          Heatwave
        </div>

        <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
          Flood Risk
        </div>

        <div className="px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
          Cyclone Watch
        </div>

        <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
          Low Risk
        </div>

      </div>

      {/* Map + Right Panel */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* MAP */}

        <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-cyan-500/20">

          <MapContainer
            center={[22.5937, 78.9629]}
            zoom={5}
            style={{
              height: "550px",
              width: "100%",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {data.map((region) => (
              <CircleMarker
                key={region.state}
                center={[
                  region.lat || 20,
                  region.lng || 78,
                ]}
                radius={20}
                pathOptions={{
                  color: getColor(region.risk),
                  fillColor: getColor(region.risk),
                  fillOpacity: 0.7,
                }}
              >
                <Popup>
                  <strong>{region.state}</strong>

                  <br />

                  Risk Score: {region.risk}

                  <br />

                  Category: {region.type}

                  <br />

                  {region.reason}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

        </div>

        {/* RIGHT PANEL */}

        <div className="space-y-4">

          <h3 className="text-2xl font-bold text-white">
            Top Risk States
          </h3>

          {data
            .sort((a, b) => b.risk - a.risk)
            .map((item, index) => (
              <div
                key={item.state}
                className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      #{index + 1} {item.state}
                    </h4>

                    <p className="text-cyan-400 text-sm mt-1">
                      {item.type}
                    </p>

                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                      {item.reason}
                    </p>
                  </div>

                  <span
                    className="text-2xl font-bold"
                    style={{
                      color: getColor(item.risk),
                    }}
                  >
                    {item.risk}
                  </span>

                </div>
              </div>
            ))}

        </div>

      </div>

    </div>
  );
}