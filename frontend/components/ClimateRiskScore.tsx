"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

interface Props {
  score: number;
  level: string;
}

export default function ClimateRiskScore({
  score,
  level,
}: Props) {

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (score / 100) * circumference;

  const getColor = () => {

    if (level === "Low")
      return {
        stroke: "#22c55e",
        text: "text-green-400",
        bg: "from-green-500/10 to-emerald-500/10",
        border: "border-green-500/20",
        icon: (
          <ShieldCheck
            size={26}
            className="text-green-400"
          />
        ),
      };

    if (level === "Moderate")
      return {
        stroke: "#facc15",
        text: "text-yellow-400",
        bg: "from-yellow-500/10 to-orange-500/10",
        border: "border-yellow-500/20",
        icon: (
          <AlertTriangle
            size={26}
            className="text-yellow-400"
          />
        ),
      };

    return {
      stroke: "#ef4444",
      text: "text-red-400",
      bg: "from-red-500/10 to-rose-500/10",
      border: "border-red-500/20",
      icon: (
        <ShieldAlert
          size={26}
          className="text-red-400"
        />
      ),
    };
  };

  const theme = getColor();

  return (
    <div
      className={`
      rounded-3xl
      border
      ${theme.border}
      bg-gradient-to-br
      ${theme.bg}
      backdrop-blur-xl
      p-6
      text-white
      shadow-xl
      `}
    >

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            Climate Risk Score
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            AI-based environmental risk analysis
          </p>

        </div>

        {theme.icon}

      </div>

      <div className="flex justify-center">

        <div className="relative w-[220px] h-[220px]">

          <svg
            width="220"
            height="220"
            className="-rotate-90"
          >

            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#1e293b"
              strokeWidth="16"
              fill="transparent"
            />

            <motion.circle
              cx="110"
              cy="110"
              r={radius}
              stroke={theme.stroke}
              strokeWidth="16"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{
                strokeDashoffset:
                  circumference,
              }}
              animate={{
                strokeDashoffset: offset,
              }}
              transition={{
                duration: 2,
              }}
            />

          </svg>

          <div
            className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            "
          >

            <h1 className="text-5xl font-bold">
              {score}
            </h1>

            <p
              className={`
              mt-2
              font-semibold
              ${theme.text}
              `}
            >
              {level}
            </p>

          </div>

        </div>

      </div>

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="text-slate-400">
            Climate Stability
          </span>

          <span>
            {100 - score}%
          </span>

        </div>

        <div
          className="
          h-3
          bg-slate-800
          rounded-full
          overflow-hidden
          "
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${100 - score}%`,
            }}
            transition={{
              duration: 2,
            }}
            className="h-full bg-green-500"
          />
        </div>

      </div>

      <div
        className="
        mt-6
        rounded-2xl
        bg-black/20
        p-4
        border border-white/5
        "
      >

        <p className="text-sm text-slate-300">

          {level === "Low" &&
            "Weather conditions are favorable with minimal climate threats expected."}

          {level === "Moderate" &&
            "Moderate climate fluctuations detected. Monitor rainfall and temperature changes."}

          {(level === "High" ||
            level === "Extreme") &&
            "High climate risk detected. Immediate monitoring and preventive measures recommended."}

        </p>

      </div>

    </div>
  );
}