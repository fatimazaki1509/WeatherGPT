"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Phone, MapPin, Shield, Siren, CheckCircle, Navigation, X } from "lucide-react";

interface EmergencySOSProps {
  lat: number;
  lon: number;
  onClose: () => void;
}

export default function EmergencySOS({ lat, lon, onClose }: EmergencySOSProps) {
  const [distressSent, setDistressSent] = useState(false);

  const emergencyContacts = [
    { name: "NDMA Helpline", number: "1078", icon: "️" },
    { name: "Police Control", number: "112", icon: "👮" },
    { name: "Ambulance", number: "108", icon: "🚑" },
    { name: "Fire Brigade", number: "101", icon: "🚒" },
  ];

  const actionSteps = [
    { title: "Stay Indoors", desc: "Do not go outside unless absolutely necessary.", icon: "🏠", color: "bg-blue-500/20 border-blue-500/50" },
    { title: "Avoid Water", desc: "Do not walk or drive through flood waters.", icon: "🌊", color: "bg-cyan-500/20 border-cyan-500/50" },
    { title: "Charge Devices", desc: "Keep phones and power banks fully charged.", icon: "🔋", color: "bg-green-500/20 border-green-500/50" },
    { title: "Emergency Kit", desc: "Keep water, food, and medicines ready.", icon: "🎒", color: "bg-yellow-500/20 border-yellow-500/50" },
  ];

  const safeZones = [
    { name: "District Collector Office", distance: "2.5 km", status: "OPEN" },
    { name: "Civil Hospital", distance: "1.8 km", status: "OPEN" },
    { name: "Community Center", distance: "3.2 km", status: "CROWDED" },
  ];

  const sendDistressSignal = () => {
    // Simulate sending distress signal
    setDistressSent(true);
    setTimeout(() => setDistressSent(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-red-950/90 backdrop-blur-xl flex items-center justify-center z-[10000] p-4 overflow-y-auto"
    >
      {/* Pulsing Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-red-600/20"
        />
      </div>

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative bg-gradient-to-br from-slate-900 via-red-950/50 to-slate-900 border-2 border-red-500/50 rounded-3xl w-full max-w-4xl shadow-[0_0_50px_rgba(239,68,68,0.5)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-red-500/30 bg-red-900/30">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/50"
            >
              <Siren className="text-white" size={24} />
            </motion.div>
            <div>
              <h3 className="font-black text-white text-2xl tracking-wider">EMERGENCY SOS</h3>
              <p className="text-red-300 text-sm font-semibold">SEVERE WEATHER ALERT • IMMEDIATE ACTION REQUIRED</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-500/20 rounded-lg transition">
            <X size={24} className="text-red-300" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Severity Status */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-red-600/20 border border-red-500 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-400" size={32} />
              <div>
                <div className="text-white font-bold text-lg">CRITICAL RISK DETECTED</div>
                <div className="text-red-200 text-sm">Heavy rainfall and lightning in your area</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-red-300">Risk Score</div>
              <div className="text-3xl font-black text-red-500">92/100</div>
            </div>
          </motion.div>

          {/* Immediate Action Steps */}
          <div>
            <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              <Shield className="text-blue-400" size={20} /> Immediate Safety Steps
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {actionSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${step.color} border rounded-xl p-4 flex items-start gap-3`}
                >
                  <div className="text-2xl">{step.icon}</div>
                  <div>
                    <div className="text-white font-bold">{step.title}</div>
                    <div className="text-gray-300 text-sm">{step.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              <Phone className="text-green-400" size={20} /> Emergency Contacts
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {emergencyContacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={`tel:${contact.number}`}
                  className="bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 rounded-xl p-3 text-center transition group"
                >
                  <div className="text-2xl mb-1">{contact.icon}</div>
                  <div className="text-white font-semibold text-sm">{contact.name}</div>
                  <div className="text-green-400 font-bold text-lg group-hover:scale-110 transition">{contact.number}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Safe Zones */}
          <div>
            <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              <Navigation className="text-cyan-400" size={20} /> Nearest Safe Zones
            </h4>
            <div className="space-y-2">
              {safeZones.map((zone, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-cyan-400" size={18} />
                    <div>
                      <div className="text-white font-medium">{zone.name}</div>
                      <div className="text-gray-400 text-xs">{zone.distance} away</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    zone.status === "OPEN" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {zone.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Distress Signal Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={sendDistressSignal}
            disabled={distressSent}
            className={`w-full py-4 rounded-xl font-black text-lg tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${
              distressSent
                ? "bg-green-600 text-white"
                : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white animate-pulse"
            }`}
          >
            {distressSent ? (
              <>
                <CheckCircle size={24} /> DISTRESS SIGNAL SENT SUCCESSFULLY
              </>
            ) : (
              <>
                <Siren size={24} /> SEND DISTRESS SIGNAL TO AUTHORITIES
              </>
            )}
          </motion.button>

          <div className="text-center text-xs text-red-300/60">
            Your location ({lat.toFixed(4)}, {lon.toFixed(4)}) will be shared with emergency services.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}