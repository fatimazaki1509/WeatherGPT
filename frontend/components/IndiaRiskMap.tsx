"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const states = [
  {
    name: "Maharashtra",
    lat: 19.7515,
    lng: 75.7139,
    risk: 68,
  },

  {
    name: "Rajasthan",
    lat: 27.0238,
    lng: 74.2179,
    risk: 82,
  },

  {
    name: "Tamil Nadu",
    lat: 11.1271,
    lng: 78.6569,
    risk: 55,
  },

  {
    name: "Gujarat",
    lat: 22.2587,
    lng: 71.1924,
    risk: 40,
  },

  {
    name: "Karnataka",
    lat: 15.3173,
    lng: 75.7139,
    risk: 25,
  },
];

function getColor(risk: number) {
  if (risk > 70) return "#ef4444";
  if (risk > 40) return "#facc15";
  return "#22c55e";
}

export default function IndiaRiskMap() {
  return (
    <div className="bg-slate-900 rounded-3xl border border-cyan-500/20 overflow-hidden">

      <div className="p-6 border-b border-white/10">
        <h2 className="text-3xl font-bold text-white">
          India Disaster Heatmap
        </h2>

        <p className="text-slate-400 mt-2">
          Real-time regional risk intelligence
        </p>
      </div>

      <MapContainer
        center={[22.5937, 78.9629]}
        zoom={5}
        style={{
          height: "650px",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {states.map((state) => (
          <CircleMarker
            key={state.name}
            center={[state.lat, state.lng]}
            radius={20}
            pathOptions={{
              color: getColor(state.risk),
              fillColor: getColor(state.risk),
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              <div>
                <h3>{state.name}</h3>
                <p>Risk Score: {state.risk}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}