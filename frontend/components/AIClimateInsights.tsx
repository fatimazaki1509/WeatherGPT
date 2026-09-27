"use client";

import { motion } from "framer-motion";

import {
  Brain,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

interface Props {
  insights: string[];
}

export default function AIClimateInsights({
  insights,
}: Props) {

  const getType = (text: string) => {

    const lower = text.toLowerCase();

    if (
      lower.includes("risk") ||
      lower.includes("flood") ||
      lower.includes("drought") ||
      lower.includes("extreme")
    ) {
      return {
        icon: ShieldAlert,
        color:
          "border-red-500/20 bg-red-500/10",
        text: "text-red-400",
      };
    }

    if (
      lower.includes("monitor") ||
      lower.includes("watch") ||
      lower.includes("warning")
    ) {
      return {
        icon: AlertTriangle,
        color:
          "border-yellow-500/20 bg-yellow-500/10",
        text: "text-yellow-400",
      };
    }

    return {
      icon: CheckCircle,
      color:
        "border-green-500/20 bg-green-500/10",
      text: "text-green-400",
    };
  };

  return (
    <div
      className="
      rounded-3xl
      border border-cyan-500/20
      bg-gradient-to-br
      from-[#081528]
      via-[#0f1f38]
      to-[#081528]
      p-6
      text-white
      shadow-xl
      "
    >

      <div className="flex items-center gap-3 mb-6">

        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-cyan-500/10
          flex
          items-center
          justify-center
          "
        >
          <Brain
            size={24}
            className="text-cyan-400"
          />
        </div>

        <div>

          <h2 className="text-2xl font-bold">
            AI Climate Insights
          </h2>

          <p className="text-slate-400 text-sm">
            Intelligent weather & climate analysis
          </p>

        </div>

      </div>

      <div className="space-y-4">

        {insights?.map(
          (insight, index) => {

            const style =
              getType(insight);

            const Icon =
              style.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.15,
                }}
                whileHover={{
                  scale: 1.02,
                }}
                className={`
                  rounded-2xl
                  border
                  p-4
                  ${style.color}
                  transition-all
                `}
              >

                <div className="flex gap-3">

                  <Icon
                    size={20}
                    className={style.text}
                  />

                  <div>

                    <p className="text-sm leading-relaxed">
                      {insight}
                    </p>

                  </div>

                </div>

              </motion.div>
            );
          }
        )}

      </div>

      <div
        className="
        mt-6
        rounded-2xl
        border border-cyan-500/10
        bg-cyan-500/5
        p-4
        "
      >

        <h3 className="font-semibold mb-2">
          AI Summary
        </h3>

        <p className="text-slate-300 text-sm">
          Climate analytics combines
          temperature trends, rainfall
          forecasts, seasonal patterns
          and environmental risks to
          provide actionable farming
          intelligence.
        </p>

      </div>

    </div>
  );
}